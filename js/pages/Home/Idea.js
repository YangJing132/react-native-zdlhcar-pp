/**
 * Created by Administrator on 2018/10/23.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import TitleNav from '../../common/TitleNav';
type props = {}

export default class Idea extends Component<props>{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.container}>
                <TitleNav title={'购车新理念'} iconImg={require('../../../res/images/rexiao.png')} more={false}
                ></TitleNav>
                <Text style={styles.text}>
                    中大联合致力于为国人提供一生的用车解决方案。为您提供全面的汽车购买及金融服务，让拥有一辆车变得更简单。
                </Text>
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
        fontSize:26,
        color:'#333',
        lineHeight:34,
        padding:26,
    }
});
