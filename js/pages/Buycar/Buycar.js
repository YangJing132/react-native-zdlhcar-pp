/**
 * Created by Administrator on 2018/10/19.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Button,
    TextInput,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import List from '../../common/List';
import {observer, inject} from 'mobx-react/native';
import {reaction} from 'mobx'
import BuycarStore from '../../store/BuycarStore';
import Loading from '../../common/Loading'
@inject('account', 'app')
@observer

export default class Buycar extends Component<props>{
    constructor(props){
        super(props);
        this.state = {
            listType:'Buycar',
        };
        // 初始状态
        this.BuycarStore = new BuycarStore();
    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{

        });
        this.dispose = reaction(
            () => [
                this.BuycarStore.page,
                this.BuycarStore.pageSize,
                this.BuycarStore.brandId,
                this.BuycarStore.like,
            ],
            () => this.BuycarStore.fetchCarList()
        )
    }
    renderSearch = (navigation) => {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.searchBar}>
                {/*<TouchableOpacity style={{width:40,height:34,marginLeft:26}} onPress={() => goBack()}>*/}
                    {/*<Image style={styles.back} source={ require('../../../res/images/back.png')}/>*/}
                {/*</TouchableOpacity>*/}
                <View style={
                    {position:'relative'}
                }>
                    <TextInput placeholder={'搜索关键词'}
                               style={styles.textInput}
                               onChangeText={(text) => this.setState({text})}
                               value={this.state.text}
                               onBlur={() => { this._searchCars(this.state.text)}}/>
                    <Image style={styles.searchIcon} source={ require('../../../res/images/search.png')}
                    />
                    <Text style={styles.searchBtn} onPress={() => { this._searchCars(this.state.text)}}>搜索</Text>
                </View>
                {/*<View></View>*/}
            </View>
        )
    }
    renderBrands = () =>{
        const {brandList} = this.BuycarStore;
        return (
            <View style={styles.brandsList}>
                <ScrollView horizontal={true}
                            keyboardDismissMode="none"
                            keyboardShouldPersistTaps="always"
                            showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={()=> { this._changeBrands(0)}}>
                        <View
                            style={styles.brands}
                        >
                            <Image style={styles.brandsIcon} source={require("../../../res/images/all_down.png")}/>
                            <Text style={styles.text}>全部</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        brandList.map((item) => {
                            return (
                                <TouchableOpacity key={item.brandId} onPress={()=> {this._changeBrands(item.brandId)}}>
                                    <View
                                        item={item}
                                        style={styles.brands}
                                    >
                                        <Image style={styles.brandsIcon} source={{uri: item.url}}/>
                                        <Text style={styles.text}>{item.brandName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1, backgroundColor:'#ddd' }}></View>
    )
    _onPressItem = (id1:string,id2:string) => {
        const {navigate} = this.props.navigation;
        navigate('Detail',{modelId: id1,productId:id2,title:'车辆详情'})
    };
    _keyExtractor = (item, index) => item.modelId;
    _renderItems = ({item,index}) => (
        <List listType={this.state.listType}
              onPressItem={() =>this._onPressItem(item.modelId,item.productId)}
              item={item}
              modelName={item.modelName}
              productId={item.productId}
              modelId={item.modelId}
              picUrl={item.picUrl}
              modelPrice={item.modelPrice}
              firstPayment={item.firstPayment}
              monthlySupply={item.monthlySupply}
              pot={item.pot}
              key={index}
        />
    )
    _changeBrands(key) {
        this.setState({text:''});
        this.BuycarStore.brandId = key;
        this.BuycarStore.like = '';
        this.BuycarStore.isRefreshing = true;
        this.BuycarStore.fetchCarList();
    }
    _searchCars(value) {
        this.BuycarStore.like = value;
        this.BuycarStore.brandId = 0;
        this.BuycarStore.isRefreshing = true;
        this.BuycarStore.fetchCarList();
    }
    // 下拉刷新
    handleRefresh = () => {
        this.BuycarStore.isRefreshing = true;
        this.BuycarStore.fetchCarList();
    }
    // 上拉加载的事件
    handleLoadMore = () => {
        if (!this.BuycarStore.isNoMore) {
            this.BuycarStore.page++
        }
    }
    // Footer
    renderFooter = () => {
        const {isNoResult} = this.BuycarStore;
        if (!isNoResult){
            //true 没有数据了
            return (
                <Text style={{fontSize:28,color:'red',textAlign:'center',lineHeight:100}}>不好意思，没有更多数据了...</Text>
            )
        }else {
            return (
                <View
                    style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE"
                    }}
                >
                    <ActivityIndicator animating size="large"/>
                </View>
            );
        }
    }

    renderList = () =>{
        const {carList,isRefreshing} = this.BuycarStore;
        return(
            <FlatList
                data={carList}
                ItemSeparatorComponent={ this._renderItemSeparatorComponent }
                initialNumToRender={8}
                ListFooterComponent={this.renderFooter}
                keyExtractor={this._keyExtractor}
                onEndReached={this.handleLoadMore.bind(this)}
                onEndReachedThreshold={1}
                renderItem={this._renderItems}
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={isRefreshing}
                        onRefresh={this.handleRefresh.bind(this)}
                        colors={['rgb(255, 140, 0)']}
                        title={'大哥大姐稍候...'}
                        titleColor={['rgb(255, 140, 0)']}
                    />
                }
            />
        )
    }
    render(){
        const {isFetching} = this.BuycarStore;
        return (
            <View style={styles.container}>
                {this.renderSearch()}
                {this.renderBrands()}
                {/*车型list*/}
                {
                    !isFetching
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
                <Loading isShow={isFetching}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f3f1f4',
    },
    searchBar:{
        height:144,
        paddingTop:48,
        backgroundColor:'#ff8c00',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    back:{
        width:20,
        height:34,
        marginLeft:10
    },
    textInput:{
        height: 70,
        width:560,
        backgroundColor:'#fff',
        borderRadius:50,
        fontSize:26,
        paddingLeft:60,
        paddingRight:20,
    },
    searchIcon:{
        position:'absolute',
        width:32,
        height:32,
        left:18,
        top:18,
    },
    searchBtn:{
        position:'absolute',
        lineHeight:70,
        right:20,
        top:0,
        fontSize:28
    },
    brandsList:{
        backgroundColor:'#ff8c00',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:20,
        marginBottom:28,
        paddingLeft:6,
        paddingRight:6
    },
    brands:{
        width:130,
        height:150,
        justifyContent: 'center',
        alignItems:'center',
    },
    brandsIcon:{
        width:90,
        height:90,
        marginBottom:18,
        borderRadius:80
    },
    text:{
        fontSize:24,
        color:'#333',
        textAlign:'center',
    },
});
