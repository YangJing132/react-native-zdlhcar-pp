/**
 * Created by Administrator on 2018/11/21.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Message extends Component<props> {
    constructor(props) {
        super(props);
    }

    render() {
        const {isShow,type,message} = this.props;
        if (!this.props.isShow) return null;

        return(
            <View style={styles.container}>
                <View style={styles.message}>
                    <Text style={styles.iconFont}>&#xe61a;</Text>
                    <Text style={styles.text}>{message}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    message:{
        width:300,
        height:225,
        padding:20,
        backgroundColor: 'rgba(0,0,0,.6)',
        borderRadius:20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconFont:{
        fontFamily:'iconfont',
        fontSize:70,
        color:"#ffffff",
        marginBottom:10
    },
    text:{
        fontSize:32,
        lineHeight:50,
        color:"#ffffff"
    }
})

