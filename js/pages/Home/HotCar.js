/**
 * Created by Administrator on 2018/10/23.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    FlatList,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import TitleNav from '../../common/TitleNav';
import List from '../../common/List';

export default class HotCar extends Component<props>{
    constructor(props){
        super(props);
        this.state={
            listType:'index',
            isFetching:true
        }
    }
    componentDidMount() {
        // 这是一个管理互动操作的工具。
        // 其中有一个方法runAfterInteraction（func）。
        // 这个方法用来标记参数中传入的方法在所有当前进行的交互和动画完成后再执行。
        // 可以理解为将func加入到一个等待队列。
        // 避免在Component进入画面的动画完成前打断动画的问题
        // InteractionManager.runAfterInteractions(()=>{
        //     this.setState({
        //         isFetching:false,
        //         data:this.props.hotCarList
        //     })
        // });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isFetching:false,
            data:this.props.hotCarList
        })
    }
    _keyExtractor = (item, index) => item.modelId;
    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1, backgroundColor:'#ddd' }}></View>
    )
    _onPressItem = (id1:string,id2:string) => {
        this.props.navigate('Detail',{modelId: id1,productId:id2,title:'车辆详情'})
    };
    _getMore = () => {
        this.props.navigate('Buycar')
    }
    _renderItem = ({item,index}) => (
        <List
            key={index}
            listType={this.state.listType}
            item={item}
            productId={item.productId}
            modelId={item.modelId}
            onPressItem={() =>this._onPressItem(item.modelId,item.productId)}
            modelName={item.modelName}
            brandName={item.brandName}
            seriesName={item.seriesName}
            carmodelContent={item.carmodelContent}
            firstPayment={item.firstPayment}
            monthlySupply={item.monthlySupply}
            pricing={item.pricing}
            gbPricing={item.gbPricing}
            picUrl={item.picUrl}
            modelPrice={item.modelPrice}
            pot={item.pot}
        />
    );

    renderList = () =>{
        return (
            <FlatList
                data={this.state.data}
                ItemSeparatorComponent={ this._renderItemSeparatorComponent }
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
    renderLists = () =>{
        return (
            <View>
                {
                    this.props.data.map((item,index)=> {
                        return(
                            <List
                                key={index}
                                id={item.key}
                                onPressItem={this._onPressItem}
                                listType={this.state.listType}
                                item={item}
                                title={item.title}
                                imgUrl={item.imgUrl}
                                price={item.price}
                                pot={item.pot}
                            />
                        )
                    })
                }
            </View>
        );
    }
    render(){
        return (
            <View style={styles.container}>
                <TitleNav title={'热销车型'} iconImg={require('../../../res/images/rexiao.png')} more={true}
                          onPressItem={() => this._getMore()}
                ></TitleNav>
                {/*车型list*/}
                {
                    !this.state.isFetching
                        ? this.renderList()
                        :
                        <View
                            style={{
                                paddingVertical: 20,
                                borderTopWidth: 1,
                                borderColor: "#CED0CE"
                            }}
                        >
                            <ActivityIndicator animating size="large"/>
                        </View>

                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:26
    },
});
