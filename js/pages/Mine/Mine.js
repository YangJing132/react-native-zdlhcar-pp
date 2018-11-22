/**
 * Created by Administrator on 2018/10/19.
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import Message from "../../common/Message";

@inject('account', 'app')
@observer

export default class Mine extends Component<props>{
    constructor(props){
        super(props);
        this.state={
            renzheng:false,
            isWrong:false
        }
    }
    componentDidMount() {
        const {account: {name}, app} = this.props;
    }
    outLogin = () =>{
        //    退出登录
        this.setState({
            isWrong:true,
            message:'已退出登录'
        });
        this.timer =  setTimeout(()=>{
            this.setState({
                isWrong:false
            });
        },1000);
        storage.save({
            key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
            data: {
                userid: '',
                phone: "",
                token: ""
            },
            expires: null
        });
        global.user.loginState = false;//设置登录状态
        global.user.userData = { userid: '', phone:"", token: ""};//保存用户数据
        this.timerTwo =  setTimeout(()=>{
            this.props.navigation.navigate('Home');
        },2000);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.timerTwo && clearTimeout(this.timerTwo);
    }
    render(){
        return (
            <View style={styles.container}>
                <ImageBackground style={{width: '100%', height: 400}}
                                 source={require('../../../res/images/bg.png')}>
                    <View style={styles.header}>
                        <Text style={styles.text}>我的</Text>
                    </View>
                    <View style={styles.user}>
                        <Image style={styles.userLogo} source={require('../../../res/images/pic.png')}/>
                        <View style={styles.userName}>
                            <View style={{flexDirection: 'row', alignItems:'center',}}>
                                <Text style={styles.name}>{global.user.userData.userid}</Text>
                                {
                                    !this.state?<Text style={styles.renzheng}>未认证</Text>:<Text style={styles.renzheng}>已认证</Text>
                                }
                            </View>
                            <Text style={styles.phone}>{global.user.userData.phone}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.mineBody}>
                    <List
                        title="退出登录"
                        iconImg={require('../../../res/images/shezhi.png')}
                        onPressItem={() => this.outLogin()}
                    />
                </View>
                <Message isShow={this.state.isWrong} message={this.state.message}/>
            </View>
        );
    }
}
const List = ({
      onPressItem,iconImg,title
   }) => {
    return(
        <TouchableOpacity activeOpacity={.8} onPress={onPressItem}>
            <View style={styles.ListContainer} >
                <Image source={iconImg} style={styles.leftIcon} />
                <Text style={styles.ListText}>{title}</Text>
                <View style={styles.moreText}>
                    <Image source={ require('../../../res/images/more.png')} style={styles.moreIcon} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f1f4'
    },
    text:{
        fontSize:32,
        color:'#fff',
        textAlign:'center'
    },
    header:{
        marginTop:60,
    },
    user:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingLeft:30
    },
    userLogo:{
        width:150,
        height:150,
    },
    userName:{
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        flexDirection: 'column',
    },
    renzheng:{
        fontSize:32,
        color:'#666',
        backgroundColor:"#eee",
        paddingLeft:10,
        paddingRight:10,
        borderRadius:8,
        marginLeft:20
    },
    name:{
        fontSize:32,
        color:'#fff',
    },
    phone:{
        fontSize:32,
        color:'#fff',
        lineHeight:60
    },
    mineBody:{
        marginTop:26,
        flexDirection: 'column',
    },
    ListContainer:{
        height:80,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    leftIcon:{
        width:50,
        height:50,
        marginLeft:25,
    },
    ListText:{
        fontSize:30,
        color:'#333333',
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
