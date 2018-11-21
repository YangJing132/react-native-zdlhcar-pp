/**
 * Created by Administrator on 2018/10/26.
 */
import React, { Component } from 'react';
import {StyleSheet,Image,} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; //引入图标
import {StackNavigator,createBottomTabNavigator} from "react-navigation";
import StackNavigatorConfig from './StackNavigatorConfig'
// 引入路由 page
import Welcome from '../pages/Welcome'
import Home from '../pages/Home/Home'
import Buycar from '../pages/Buycar/Buycar'
import Mine from '../pages/Mine/Mine'

import Detail from '../pages/Detail/detail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Demo2 from '../main/Demo2'

// tabbar
const Tabbar = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            tabBarLabel:'首页',
            tabBarIcon: ({focused,tintColor}) => (
                focused ? <Image style={styles.icon} source={require('../../res/images/home.png')} /> : <Image style={styles.icon} source={require('../../res/images/home.png')} />
            )
        }),
    },
    Buycar: {
        screen: Buycar,
        navigationOptions: ({navigation}) => ({
            header:null,
            tabBarLabel: '买车',
            tabBarIcon: ({focused,tintColor}) => (
                focused ? <Image style={styles.icon} source={require('../../res/images/car.png')} /> : <Image style={styles.icon} source={require('../../res/images/car.png')} />
            )
        }),
    },
    Mine: {
        screen: Mine,
        statusBarHidden: true,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused,tintColor}) => (
                focused ? <Image style={styles.icon} source={require('../../res/images/mine.png')} /> : <Image style={styles.icon} source={require('../../res/images/mine.png')} />
            )
        }),
    },
},{
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy:true,
    tabBarOptions: {
        activeTintColor :'#bd7405',
        inactiveTintColor :'#333',
        lazy:true,
        labelStyle: {
            fontSize: 24,
        },
        style: {
            backgroundColor: '#fff',
            height:96,
            borderTopColor:'#aaa',
            borderTopWidth:1
        },
    }
})

/**
 * 全部组件路由，嵌入tababr ，不然没有navigator方法的
 */
const RouteConfigs = {
    Welcome:{
        screen: Welcome,
    },
    Tabbar: {
        screen: Tabbar,
    },
    Detail: {
        screen: Detail,
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Demo2:{
        screen: Demo2
    }
}
const MyApp = StackNavigator(RouteConfigs, StackNavigatorConfig);

const defaultGetStateForAction = MyApp.router.getStateForAction;

MyApp.router.getStateForAction = (action, state) => {
    //页面是MeScreen并且 global.user.loginState = false || ''（未登录）
    // alert(global.user.loginState)
    if (action.routeName ==='Mine' && !global.user.loginState ) {
        this.routes = [
            ...state.routes,
            {key: 'id-'+Date.now(), routeName: 'Login'},
        ];
        return {
            ...state,
            routes,
            index: this.routes.length - 1,
        };
    }
    return defaultGetStateForAction(action, state);
};

export default MyApp;

// 样式
const styles = StyleSheet.create ({
    icon: {
        width:74,
        height:57,
        marginTop:-16
    }
})

