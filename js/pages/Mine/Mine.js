/**
 * Created by Administrator on 2018/10/19.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {reaction} from 'mobx';

@inject('account', 'app')
@observer

export default class Mine extends Component<props>{
    constructor(props){
        super(props);
        const navigation = this.props.navigation;
    }
    componentDidMount() {
        const {account: {name}, app} = this.props;
        // if(name){
        //     return;
        // }else{
        //     this.props.navigation.navigate('Login')
        // }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>我的</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    text:{
        fontSize:30,
        color:'black'
    }
});
