/**
 * Created by Administrator on 2018/10/23.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

type props = {}

export default class List extends Component<props>{
    constructor(props){
        super(props);
        this.state = {
            listType:props.listType,
            onPressItem:props.onPressItem,
            productId:props.productId,
            modelId:props.modelId,
            modelName:props.modelName,
            brandName:props.brandName,
            seriesName:props.seriesName,
            carmodelContent:props.carmodelContent,
            firstPayment:props.firstPayment,
            monthlySupply:props.monthlySupply,
            pricing:props.pricing,
            gbPricing:props.gbPricing,
            picUrl:props.picUrl,
            modelPrice:props.modelPrice,
            pot:true,
        }
    }
    render(){
        const {modelName,picUrl,modelPrice,monthlySupply,firstPayment,onPressItem} = this.props;
        if(this.state.listType == 'index'){
            return (
                <TouchableOpacity onPress={onPressItem} activeOpacity={1}>
                    <View style={styles.container}>
                        <View style={styles.imageBox} >
                            <Image source={{ uri: picUrl }} style={{width: 220,height: 120}}
                                   defaultSource={require('../../res/images/b1.jpg')}
                            />
                        </View>
                        <View style={styles.carInfo}>
                            <Text style={styles.title}>{modelName}</Text>
                            <Text style={styles.price}>厂家销售指导价：{modelPrice}元</Text>
                            {
                                this.state.pot ? <Text style={styles.pot}>最高可享5年分期</Text> :<Text style={styles.pot}>含一年保险 购置税</Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }else if(this.state.listType == 'Buycar'){
            return (
                <TouchableOpacity onPress={onPressItem} activeOpacity={1}>
                    <View style={styles.container}>
                        <View style={styles.imageBox} >
                            <Image source={{uri: picUrl}} style={styles.image}
                                   defaultSource={require('../../res/images/b1.jpg')}
                            />
                        </View>

                        <View style={styles.carInfo}>
                            <Text style={styles.title}>{modelName}</Text>
                            <View style={styles.describe}>
                                <Text style={styles.Bprice}>指导价：{modelPrice}元</Text>
                                {
                                    this.state.pot ? <Text style={styles.pot}>最高可享5年分期</Text> :
                                        <Text style={styles.pot}>含一年保险 购置税</Text>
                                }
                            </View>
                            <View style={styles.supply}>
                                <Text style={styles.text}>首付: <Text style={styles.priceInfo}>{firstPayment}</Text></Text>
                                <Text style={styles.text}>月供: <Text style={styles.priceInfo}>{monthlySupply}</Text></Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}
const styles = StyleSheet.create({
    container:{
        paddingTop:36,
        paddingBottom:36,
        paddingLeft:25,
        paddingRight:25,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    imageBox:{
        width:220,
        height:124,
    },
    image:{
        width:220,
        height:124,
    },
    carInfo:{
        flex:1,
        paddingLeft:20,
        paddingRight:20,
    },
    title:{
        fontSize:26,
        color:'#333333',
        marginBottom:16,
        lineHeight:28
    },
    price:{
        fontSize:20,
        lineHeight:24,
        color:'#666666',
        marginBottom:22,
    },
    pot:{
        width:186,
        height:32,
        lineHeight:32,
        textAlign:'center',
        fontSize:20,
        color:'#ff5562',
        borderRadius:6,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ff5562'
    },
    describe:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom:20
    },
    Bprice:{
        fontSize:24,
        lineHeight:24,
        color:'#666666'
    },
    supply:{
        flex:1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems:'center',
    },
    priceInfo:{
        fontSize:30,
        color:'#ff9c00',
    },
    text:{
        fontSize:20,
        color:'#666666',
        lineHeight:30,
        width:'40%',
        marginRight:20
    }
});
