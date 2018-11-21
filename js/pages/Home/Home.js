/**
 * Created by Administrator on 2018/10/22.
 */
import React,{ Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import {observer, inject} from 'mobx-react/native';
import {reaction} from 'mobx'
import HomeStore from '../../store/HomeStore';
import Idea from './Idea';
import HotCar from './HotCar';
import Flow from './Flow';
import NetInfoDecorator from '../../common/NetInfoDecorator'
import Loading from '../../common/Loading'
import Toast from 'react-native-easy-toast'

const { width,height } = Dimensions.get('window');


@NetInfoDecorator
@inject('account', 'app')
@observer

export default class Home extends Component<props>{
    // 配置页面导航header选项
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            swiperShow:false,
            data:[]
        };
        // 初始状态
        this.HomeStore = new HomeStore();
    }
    componentDidMount(){
        this.timer =  setTimeout(()=>{
            this.setState({
                swiperShow:true
            });
        },0);
        reaction(
            () => this.HomeStore.fetchBannerList(),
            () => this.HomeStore.fetchHotCarList()
        );
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    componentWillUpdate() {
        const {isFetching,errorMsg} = this.HomeStore;
        !isFetching && this.toast.show("加载"+errorMsg)
    }
    componentWillReceiveProps(nextProps) {
        // const {isConnected} = nextProps;
        // const {isNoResult} = this.HomeStore;
        // if (isConnected && isNoResult) {
        //     this.HomeStore.fetchHotCarList();
        // }
    }
    _reconnectHandle = () => {
        this.HomeStore.fetchHotCarList();
    }

    renderSwiper = () => {
        const {bannerList} = this.HomeStore;
        if (this.state.swiperShow) {
            return(
                <View >
                    <Swiper autoplay={true} autoplayTimeout={3} height={440}
                            removeClippedSubviews={false}
                            dot={<View style={styles.dot}/>}
                            activeDot={<View style={styles.activeDot}/>}
                            paginationStyle={{
                                bottom: 20
                            }}
                            loop>
                        {
                            bannerList.map((item,index) =>{
                                return (
                                    <View style={styles.slide} key={index}>
                                        <Image resizeMode='cover' source={{ uri: item.filePath }} style={{width: '100%',height: '100%'}} />
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>
            );
        }else{
            return (
                <View style={{height:440}}>
                    <Image source={ require('../../../res/images/b2.jpg')} style={styles.image} />
                </View>
            );
        }
    }
    render() {
        const {hotCarList,isFetching} = this.HomeStore;
        const {isConnected} = this.props;
        return (
            <View style={styles.container} >
                <ScrollView
                    bounces={false}
                    keyboardDismissMode="on-drag">
                    {/*轮播图*/}
                    {this.renderSwiper()}
                    {/*购车新理念*/}
                    <Idea/>
                    {/*{isConnected ?*/}
                        {/*<Text style={{fontSize:28}}>{JSON.stringify(hotCarList)}</Text>*/}
                        {/*: <ReconnectView onPress={this._reconnectHandle}/>*/}
                    {/*}*/}

                    {/*热销车型*/}
                    {/*出错原因：在一个页面组件中调用了另一个组件，而跳转动作在被调用组件中定义。
                    则会出现：当前呈现页面的this与跳转动作发生的this不一致，导致跳转动作不能被调用。
                     解决办法：在当前呈现页面获取跳转动作调用方法，作为参数传递给跳转动作发生组件。*/}
                    {
                        !isFetching ?
                        <HotCar hotCarList={hotCarList}
                        navigate={this.props.navigation.navigate}/>  :null
                    }
                    <Loading isShow={isFetching}/>
                    {/*购车流程*/}
                    <Flow iconHide={false}/>

                </ScrollView>
                <Toast ref={toast => this.toast = toast}
                       style={{backgroundColor:'rgba(0,0,0,.8)'}}
                       position='top'
                       positionValue={400}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color:'#fff',fontSize:30}}
                />
            </View>
        )
    }
}
const ReconnectView = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={onPress}
        >
            <Text style={{fontSize:30}}>网络出错，点击重试~</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f3f1f4',
    },
    dot:{
        backgroundColor: '#dcdcdc',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 3,
        marginBottom: 3,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'#fff',
    },
    activeDot:{
        width: 16,
        height: 16,
        borderRadius: 8,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 3,
        marginBottom: 3,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'#fda821',
        backgroundColor: '#ddd',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {

    }
});

