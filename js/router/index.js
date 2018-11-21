/**
 * Created by Administrator on 2018/10/26.
 */
import React, { Component } from 'react';
// import {createStackNavigator,StackNavigator} from "react-navigation";
import {observer, inject} from 'mobx-react/native'
import Resolution from "../common/Resolution"
import MyApp from './RouterConfig'

// const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);
@inject('app')
@observer

export default class APP extends Component {
    render() {
        return (
            <Resolution.FixWidthView>
                <MyApp />
            </Resolution.FixWidthView>
        )
    };
}
