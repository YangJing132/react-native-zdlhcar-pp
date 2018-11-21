import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native'
import ThemeDao from '../dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen';
export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        });
        this.timer=setTimeout(()=> {
            SplashScreen.hide();
            this.props.navigation.navigate('Home')
        }, 500);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render() {
        return null;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29
    }
})

