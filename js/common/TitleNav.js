import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

type props = {}

export default class TitleNav extends Component<props>{
    constructor(props){
        super(props);
        this.state = {
            img:props.iconImg,
            title:props.title,
            more:props.more,
            iconHide:props.iconHide,
            moreIconHide:props.moreIconHide
        }
    }
    render(){
        const {iconImg,title,more,iconHide,moreIconHide,onPressItem} = this.props;
        return (
            <View style={styles.container}>
                {
                    !iconHide ? <Image source={ iconImg} style={styles.leftIcon} /> : null
                }
                <Text style={styles.text}>{title}</Text>
                <TouchableOpacity style={styles.moreText} onPress={onPressItem}>
                    {
                        more ? <Text style={styles.text} >更多</Text> : null
                    }
                    {
                        !moreIconHide ? <Image source={ require('../../res/images/more.png')} style={styles.moreIcon} /> : null
                    }
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        height:80,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    text:{
        fontSize:30,
        color:'#333333',
        marginLeft:25,
    },
    leftIcon:{
        width:50,
        height:50,
        marginLeft:25,
    },
    moreText:{
        flex:1,
        justifyContent:'flex-end',
        flexDirection: 'row',
        alignItems:'center',
    },
    moreIcon:{
        width:14,
        height:24,
        marginLeft:20,
        marginRight:25
    }
});
