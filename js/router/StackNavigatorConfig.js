/**
 * Created by Administrator on 2018/10/26.
 */


import React, { Component } from 'react';
import { TabBarBottom, createStackNavigator} from "react-navigation";

import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
const StackNavigatorConfig = {
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        header:null,
    },
    // paths: '../page/HomePage',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {backgroundColor: "#000"},
    transitionConfig: (() => ({
        // 现在react-navigation 2.0.1
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    })),
    onTransitionStart: (() => {
        console.log('页面跳转动画开始');
    }),
    onTransitionEnd: (() => {
        console.log('页面跳转动画结束');
    }),
}

export default StackNavigatorConfig;