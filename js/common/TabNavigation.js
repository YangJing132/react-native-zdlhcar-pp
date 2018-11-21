/**
 * Created by Administrator on 2018/10/19.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from '../pages/Home/Home';
import Buycar from '../pages/Buycar/Buycar';
import Mine from '../pages/Mine/Mine';

const dataSource = [
    {icon:require('../../res/images/home.png'),selectedIcon:require('../../res/images/home.png'),tabPage:'Home',tabName:'首页',component:Home},
    {icon:require('../../res/images/car.png'),selectedIcon:require('../../res/images/car.png'),tabPage:'Buycar',tabName:'买车',component:Buycar},
    {icon:require('../../res/images/mine.png'),selectedIcon:require('../../res/images/mine.png'),tabPage:'Mine',tabName:'我的',component:Mine},
];

var navigation = null;
type Props = {};

export default class Tab extends Component<Props> {
    constructor(props){
        super(props);
        navigation = this.props.navigation;
        this.state = {
            selectedTab:'Home'
        }
    }
    render() {
            let tabViews = dataSource.map((item,i) => {
                return (
                    <TabNavigator.Item
                        title={item.tabName}
                        selected={this.state.selectedTab===item.tabPage}
                        titleStyle={{color:'black'}}
                        selectedTitleStyle={{color:'#bd7405'}}
                        renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
                        renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
                        tabStyle={{alignSelf:'center'}}
                        onPress = {() => {this.setState({selectedTab:item.tabPage}).bind(this)}}
                        key={i}
                    >
                        <item.component  navigation={navigation}/>
                    </TabNavigator.Item>
                );
            })
            return (
                <View style={styles.container}>
                    <TabNavigator
                        hidesTabTouch={true}
                    >
                        {tabViews}
                    </TabNavigator>
                </View>
            );
        }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    tabIcon:{
        width:38,
        height:30,
        marginTop:-8
    }
});
