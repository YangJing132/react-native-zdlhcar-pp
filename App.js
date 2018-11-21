import React, {Component} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';
import Welcome from './js/pages/Welcome';

//进行一些初始化配置
export default class App extends Component {
    renderScene(route, navigator) {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    }

    render() {
        return <Navigator
            initialRoute={{component: Welcome}}
            renderScene={(route, navigator)=>this.renderScene(route, navigator)}
        />
    }
}
