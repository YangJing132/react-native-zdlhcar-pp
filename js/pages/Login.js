import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
} from 'react-native';
import Message from "../common/Message";
import {observer, inject} from 'mobx-react/native';
@inject('account', 'app')
@observer
export default class Login extends Component<props>{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            phone:'',
            passWord:'',
            noSee:true,
            test:false,
            testNum:'',
            isWrong:false
        }
        this.fetchLogin=this.fetchLogin.bind(this);
    }
    timer =  setTimeout(()=>{
        this.setState({
            isWrong:false
        });
    },2000);
    seePassword = () => {
        this.setState({
            noSee:!this.state.noSee,
        });
    }
    changeTest = () => {
        this.setState({
            test:!this.state.test,
        });
    }
    toRegister = (arr) => {
        arr == 'forget' ?
            this.props.navigation.navigate('Register',{title:'忘记密码'})
            :
            this.props.navigation.navigate('Register',{title:'注册'});
    }
    toLogin = () => {
        const reg = /^((1[3|4|5|7|8][0-9])|198|199|166)+\d{8}$/;
        if(this.state.phone !== ''&& reg.test(this.state.phone)){
            this.fetchLogin();
        }else{
            this.setState({
                isWrong:true,
                message:'手机号格式不正确'
            });
            this.timer =  setTimeout(()=>{
                this.setState({
                    isWrong:false
                });
            },1000);
        }
    }
    fetchLogin() {
        let formData = new FormData();
        formData.append("mobile",this.state.phone);
        formData.append("password",this.state.passWord);
        fetch("http://app.zdlhcar.com/app/ucenter/login",{
            method: "POST",
            body: formData
        }).then(response => {
                if (response.status === 200) return response.json();
            })
            .then(responseData => {
                // alert(JSON.stringify(responseData))
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    isWrong:true,
                    message:'登录成功'
                });
                this.timer =  setTimeout(()=>{
                    this.setState({
                        isWrong:false
                    });
                },1000);

                storage.save({
                    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
                    data: {
                        userid: '1001',
                        phone:this.state.phone,
                        token: this.state.passWord
                    },
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    // 8个小时后过期
                    expires: 1000 * 3600 * 8
                });
                global.user.loginState = true;//设置登录状态
                global.user.userData = { userid: '1001', phone:this.state.phone, token: this.state.passWord};//保存用户数据
                this.timerTwo =  setTimeout(()=>{
                    this.props.navigation.navigate('Mine');
                },2000);

            }).catch(error => {
                alert(error)
            });
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.timerTwo && clearTimeout(this.timerTwo);
    }
    render(){
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
                        <Image style={styles.back} source={ require('../../res/images/back.png')}/>
                    </TouchableOpacity>
                    <Image style={styles.zdicon} source={ require('../../res/images/ic_launcher.png')}/>
                </View>
                <View style={styles.loginBox}>
                    <View style={styles.loginBar}>
                        <Text style={styles.iconFont}>&#xe61a;</Text>
                        <TextInput placeholder={'请输入手机号'}
                                   style={styles.textInput}
                                   onChangeText={(phone) => {
                                       const newText = phone.replace(/[^\d]+/, '');
                                       this.setState({phone:newText})
                                   }}
                                   keyboardType='numeric'
                                   value={this.state.phone}
                        />
                        <Text></Text>
                    </View>
                    {
                        !this.state.test ?
                            <View style={styles.loginBar}>
                                <Text style={styles.iconFont}>&#xe670;</Text>
                                <TextInput placeholder={'请输入密码，长度为6-18位'}
                                           secureTextEntry={this.state.noSee}
                                           style={styles.textInput}
                                           onChangeText={(passWord) => this.setState({passWord})}
                                           value={this.state.passWord}
                                />
                                {
                                    this.state.noSee ?
                                        <Text style={styles.iconFont} onPress={() => this.seePassword()}>&#xe901;</Text>
                                        :
                                        <Text style={styles.iconFont} onPress={() => this.seePassword()}>&#xe60c;</Text>
                                }
                            </View>
                            :
                            <View style={styles.loginBar}>
                                <Text style={styles.iconFont}>&#xe623;</Text>
                                <TextInput placeholder={'请输入验证码'}
                                           style={styles.textInput}
                                           onChangeText={(testNum) => this.setState({testNum})}
                                           value={this.state.testNum}
                                />
                                <Text style={styles.getTest}>获取验证码</Text>
                            </View>
                        }
                    <View style={styles.loginBtns}>
                        <Text style={styles.text} onPress={() => this.changeTest()}>手机验证码登录</Text>
                        <Text style={styles.text} onPress={() => this.toRegister('forget')}>忘记密码</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btns} activeOpacity={1}>
                        <Text style={[styles.button,styles.hot]}
                              onPress={() => this.toLogin()}
                        >登录</Text>
                        <Text style={styles.button}
                              onPress={() => this.toRegister('Register')}
                        >注册</Text>
                </TouchableOpacity>
                <Message isShow={this.state.isWrong} message={this.state.message}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative',
    },
    head:{
        height:600,
        backgroundColor:'#ff7900',
        alignItems:'center',
        justifyContent:'center'
    },
    zdicon:{
        width:160,
        height:160,
    },
    backBtn:{
        position:'absolute',
        top:50,
        left:20,
        width:60,
        height:34,
        padding:20
    },
    back:{
        width:20,
        height:34,
    },
    loginBox:{
        height:340,
        backgroundColor:'#fff',
        marginTop:-120,
        marginLeft:30,
        marginRight:30,
        borderWidth:1,
        borderColor:"#eee",
        borderRadius:10,
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
    loginBtns:{
        flexDirection:'row',
        justifyContent:'space-between',
        lineHeight:40,
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:40,
        paddingRight:40
    },
    text:{
        fontSize:24,
        color:'#8c8c8c'
    },
    btns:{
        alignItems:'center',
        marginTop:-40
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
    getTest:{
        fontSize:24,
        color:'#fff',
        backgroundColor:'#ff7900',
        padding:10,
        borderRadius:6
    }
});
