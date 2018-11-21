/**
 * Created by Administrator on 2018/10/23.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import TitleNav from '../../common/TitleNav';
type props = {}

export default class Flow extends Component<props>{
    constructor(props){
        super(props);
        this.state={
            iconHide:props.iconHide,
            moreIconHide:props.moreIconHide
        }
    }
    render(){
        const {iconHide,moreIconHide} = this.props;
        return (
            <View style={styles.container}>
                <TitleNav title={'购车流程'} iconHide={iconHide} iconImg={require('../../../res/images/liucheng.png')} more={false}
                          moreIconHide={moreIconHide}
                ></TitleNav>
                <View style={styles.flowImg}>
                    <View>
                        <Image resizeMode='contain' source={ require('../../../res/images/1.png')} style={styles.img} />
                        <Text style={styles.text}>线上申请</Text>
                    </View>
                    <View>
                        <Image resizeMode='contain' source={ require('../../../res/images/next.png')} style={styles.imgE} />
                    </View>
                    <View>
                        <Image resizeMode='contain' source={ require('../../../res/images/2.png')} style={styles.img} />
                        <Text style={styles.text}>电子签约</Text>
                    </View>
                    <View>
                        <Image resizeMode='contain' source={ require('../../../res/images/next.png')} style={styles.imgE} />
                    </View>
                    <View>
                        <Image resizeMode='contain' source={ require('../../../res/images/3.png')} style={styles.img} />
                        <Text style={styles.text}>线下提车</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:26
    },
    text:{
        fontSize:24,
        color:'#666666',
        lineHeight:24,
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10
    },
    flowImg:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    img:{
        width:90,
        height:90
    },
    imgE:{
        width:68,
        marginLeft:50,
        marginRight:50
    }
});
