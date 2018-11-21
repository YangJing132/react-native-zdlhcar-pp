/**
 * Created by Administrator on 2018/10/31.
 */
import React, { Component } from 'react';
import { Text, View,Image, StyleSheet,ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {observer} from 'mobx-react/native'
import {observable, runInAction, reaction, action, computed} from 'mobx'
import TitleBar from '../../common/TitleBar';
import TitleNav from '../../common/TitleNav';
import Flow from '../Home/Flow';
import Loading from '../../common/Loading'
class DetailStore {
    @observable detailList = {};
    @observable modelId = "";
    @observable productId = "";

    constructor(modelId, productId) {
        this.modelId = modelId;
        this.productId = productId;
        this.fetchCars();
    }
    @action
    fetchCars = async() => {
        try {
            const {code,msg, data} = await this._fetchCarUrl();
            runInAction(() => {
                this.detailList = data;
            })
        } catch (error) {
        }
    }
    _fetchCarUrl() {
        return new Promise((resolve, reject) => {
            const url = `http://app.zdlhcar.com/app/car/details?modelId=${this.modelId}&productId=${this.productId}`;
            fetch(url).then(response => {
                if (response.status === 200) return response.json();
            }).then(responseJson  => {
                if (responseJson ) {
                    const {code,msg, data} = responseJson;
                    // alert(JSON.stringify(responseJson.data))
                    resolve({code,msg,data})
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                reject('网络出错！')
            })
        })
    }
    @computed
    get isFetching() {
        return JSON.stringify(this.detailList) == "{}"
    }
    @computed
    get featurePicUrlList() {
        if(!this.detailList.featurePicUrlList){
            return this.detailList.featurePicUrlList
        }
    }
}

@observer
export default class Detail extends Component {
    // 数据初始化
    constructor (props) {
        super(props);
        const {navigation } = this.props;
        const modelId = navigation.getParam("modelId");
        const productId = navigation.getParam("productId");
        this.detailStore = new DetailStore(modelId,productId);

        this.state = {
            swiperShow:false,
            modelId: this.props.navigation.getParam("modelId"),
            productId: this.props.navigation.getParam("productId"),
            title: this.props.navigation.getParam("title"),
        }
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.setState({
                swiperShow:true
            });
        },0)
        // 使用 reaction 方法，在初次数据变化后触发副作用
        // reaction 相较于 autorun 提供了更符合直觉的控制方式。
        // 首先，它不会立即执行，而是会等到追踪的被观察变量第一次发生变化后才会执行。
        // 它的 API 相较于 autorun 也有微小的区别，最简单的情况你要提供两个参数：
        this.dispose = reaction(
            () => this.detailStore.detailList,
            () => this.detailStore.fetchCars()
        )
    }
    componentWillUnmount(){
        this.dispose();
        this.timer && clearTimeout(this.timer);
    }
    renderSwiper = () => {
        const { detailList } = this.detailStore;
        if (this.state.swiperShow) {
            return(
                <View>
                    <Swiper autoplay={true} autoplayTimeout={3} height={494}
                            removeClippedSubviews={false}
                            dot={<View style={styles.dot}/>}
                            activeDot={<View style={styles.activeDot}/>}
                            paginationStyle={{
                                bottom:10
                            }}
                            loop>
                        {
                            detailList.picUrlList.map(function (value,key) {
                                return (
                                    <View style={styles.slide} key={key}>
                                        <Image resizeMode='cover' source={{ uri: value.picUrl }} style={{width: '100%',height: '100%'}} />
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>
            );
        }else{
            return (
                <View style={{height:440,backgroundColor:'#fff'}}>
                    {/*<Image source={ require('../../../res/images/b2.jpg')} style={styles.image} />*/}
                </View>
            );
        }
    }
    renderInfo = () =>{
        const { detailList } = this.detailStore;
        return (
            <View style={styles.infoBox}>
                <View style={styles.listItem}>
                    <Text style={styles.listLeft}>首付</Text>
                    <Text style={styles.listRightText}>{detailList.firstPayment}
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listLeft}>期限</Text>
                    <View style={styles.listRight}>
                        <Text style={styles.listRightText}>24期</Text>
                        <Image source={ require('../../../res/images/more.png')} style={styles.listArrow}/>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listLeft}>尾款</Text>
                    <Text style={styles.listRightText}>10965,00
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listLeft}>尾款分期数</Text>
                    <View style={styles.listRight}>
                        <Text style={styles.listRightText}>24期</Text>
                        <Image source={ require('../../../res/images/more.png')} style={styles.listArrow}/>
                    </View>
                </View>
                <View style={styles.finance}>
                    <View style={[styles.financeList,{borderRightWidth:1,borderRightColor:'#dedede'}]}>
                        <Text style={styles.financeName}>首付</Text>
                        <Text style={styles.financeInfo}>18,000</Text>
                    </View>
                    <View style={styles.financeList}>
                        <Text style={styles.financeName}>月供</Text>
                        <Text style={styles.financeInfo}>18,000</Text>
                    </View>
                    <View style={[styles.financeList,{borderLeftWidth:1,borderLeftColor:'#dedede'}]}>
                        <Text style={styles.financeName}>尾款月供</Text>
                        <Text style={styles.financeInfo}>18,000</Text>
                    </View>
                </View>
                <Text style={styles.pot}>含一年保险 购置税</Text>
            </View>
        )
    }
    carConfigure = () =>{

    }
    // 组件渲染
    render () {
        const { detailList,isFetching} = this.detailStore;
        const {navigation} = this.props;

        if(detailList) {
            return (
                <View style={styles.container} >
                    <TitleBar title={this.state.title}
                              hideLeftArrow={false}
                              LifeImage={require('../../../res/images/back.png')}
                              navigation={navigation}/>
                    <ScrollView keyboardDismissMode="on-drag">
                        <View style={styles.D_banner}>
                            {/*轮播图*/}
                            {this.renderSwiper()}
                            <Text style={styles.D_name}>{detailList.modelName}</Text>
                            <Text style={styles.D_price}>厂家指导价  {detailList.modelPrice}元</Text>
                        </View>
                        {/*{详细信息}*/}
                        {this.renderInfo()}
                        <View style={styles.viewContainer}>
                            <TitleNav title={'车型亮点'} iconHide={true} more={false} moreIconHide={true}
                            ></TitleNav>
                            {
                                !isFetching ?
                                    <View style={styles.viewImgBox}>
                                        {
                                            detailList.featurePicUrlList.map(function (value,key) {
                                                return (
                                                    <View key={key}>
                                                        <Image source={{ uri: value.picUrl }} style={{width: 650,height: 120}} />
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    : null
                            }
                        </View>
                        {/*配置参数*/}
                        {/*{this.carConfigure()}*/}
                        {/*车型亮点*/}
                        {/*购车流程*/}
                        <Flow iconHide={true} moreIconHide={true}/>
                    </ScrollView>
                    <Loading isShow={isFetching}/>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
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
        height:440,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    D_banner:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        marginBottom:26,
    },
    D_name:{
        fontSize:26,
        color:'#333',
        lineHeight:30,
        paddingLeft:28,
        paddingRight:28,
        paddingTop:20
    },
    D_price:{
        fontSize:26,
        color:'#ff5562',
        lineHeight:30,
        paddingLeft:28,
        paddingRight:28,
        paddingTop:20,
        paddingBottom:20
    },
    infoBox:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        marginBottom:26,
        position:'relative'
    },
    listItem:{
        height:86,
        borderColor:'#dedede',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:25,
        paddingRight:25,
    },
    listLeft:{
        fontSize:26,
        color:'#333',
    },
    listRight:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    listRightText:{
        fontSize:26,
        color:'#666',
    },
    listArrow:{
        width:14,
        height:24,
        marginLeft:20,
    },
    finance:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:30,
        paddingBottom:76,
        height:176,
        paddingLeft:25,
        paddingRight:25,
    },
    financeList:{
        flexDirection:'column',
        justifyContent:'center',
        flexBasis:230,
    },
    financeName:{
        fontSize:20,
        color:'#666',
        lineHeight:38,
        textAlign:'center'
    },
    financeInfo:{
        fontSize:30,
        color:'#ff9c00',
        lineHeight:38,
        textAlign:'center'
    },
    pot:{
        width:186,
        height:32,
        position:'absolute',
        bottom:30,
        right:25,
        lineHeight:32,
        textAlign:'center',
        fontSize:20,
        color:'#ff5562',
        borderRadius:6,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ff5562'
    },
    viewContainer:{
        backgroundColor:'#fff',
        marginBottom:26,
        width:'100%'
    },
    viewImgBox:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        width:'100%'
    }
});