
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import TitleBar from '../common/TitleBar';
type props = {}

export default class Register extends Component<props>{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.navigation.getParam("title"),
            phone:'',
            testNum:''
        }
    }
    toLogin = () => {
         this.props.navigation.navigate('Login');
    }
    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title}
                          hideLeftArrow={false}
                          LifeImage={require('../../res/images/back.png')}
                          navigation={navigation}/>
                <Text style={styles.infos}>请输入手机号作为登录账号</Text>
                <View style={styles.box}>
                    <View style={styles.loginBar}>
                        <Text style={styles.iconFont}>&#xe61a;</Text>
                        <TextInput placeholder={'请输入手机号'}
                                   style={styles.textInput}
                                   onChangeText={(phone) => this.setState({phone})}
                                   value={this.state.phone}
                        />
                        <Text></Text>
                    </View>
                    <View style={styles.loginBar}>
                        <Text style={styles.iconFont}>&#xe623;</Text>
                        <TextInput placeholder={'请输入验证码'}
                                   style={styles.textInput}
                                   onChangeText={(testNum) => this.setState({testNum})}
                                   value={this.state.testNum}
                        />
                        <Text style={styles.getTest}>获取验证码</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btns} activeOpacity={1}>
                    <Text style={[styles.button,styles.hot]}
                    >下一步</Text>
                    <Text style={styles.button}
                          onPress={() => this.toLogin()}
                    >立即登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f1f4'
    },
    infos:{
        fontSize:30,
        color:'#c7c4cd',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10
    },
    text:{
        fontSize:30,
        color:'black'
    },
    box:{
        height:180,
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20
    },
    loginBar:{
        paddingTop:15,
        paddingBottom:15,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:"#eee",
        // justifyContent:"space-between",
    },
    iconFont:{
        fontFamily:'iconfont',
        fontSize:36,
        color:"#606060"
    },
    textInput:{
        flex:1,
        color:'#000',
        fontSize:30,
        paddingLeft:20,
    },
    getTest:{
        fontSize:24,
        color:'#fff',
        backgroundColor:'#ff7900',
        padding:10,
        borderRadius:6
    },
    btns:{
        alignItems:'center',
        marginTop:100
    },
    button:{
        width:480,
        height:92,
        borderRadius:50,
        fontSize:40,
        textAlign:'center',
        lineHeight:92,
        borderColor:'#ff7900',
        borderWidth:2,
        marginBottom:40,
        backgroundColor:'#fff',
        color:"#ff7900"
    },
    hot:{
        backgroundColor:'#ff7900',
        color:"#fff"
    },
});
