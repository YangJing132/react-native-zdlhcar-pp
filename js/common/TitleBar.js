/**
 * Created by Administrator on 2018/10/31.
 */
import React, {Component} from 'react';
import { PropTypes} from 'prop-types';
import {
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');
const unitWidth = width / 750;
const titleHeight = 128;
const statusBarHeight = 32;
{/*<StatusBar*/}
{/*animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden*/}
{/*hidden={false}  //是否隐藏状态栏。*/}
{/*backgroundColor={'red'} //状态栏的背景色*/}
{/*translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。*/}
{/*barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')*/}
{/*>*/}
{/*</StatusBar>*/}
export default class TitleBar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
        hideLeftArrow: PropTypes.bool,
        pressLeft: PropTypes.func,
        pressRight: PropTypes.func,
        left: PropTypes.string,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        right: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        rightImage: Image.propTypes.source,
        LifeImage: Image.propTypes.source,
        statusBarBgColor: PropTypes.string,
        barStyle: PropTypes.string,
    }

    static defaultProps = {
        title: "",
        hideLeftArrow: false,
        pressRight: () => {
        },
    }

    back() {
        if (this.props.pressLeft) {
            this.props.pressLeft()
            return
        }
        this.props.navigation.goBack();
    }

    render() {
        const {backgroundColor, titleColor} = this.props;
        return (
            <View style={[TitleStyle.titleBar, backgroundColor ? {backgroundColor: backgroundColor} : null]}>
                {/*<StatusBar*/}
                    {/*backgroundColor={this.props.statusBarBgColor || "transparent"}*/}
                    {/*barStyle={this.props.barStyle || 'light-content'}*/}
                    {/*translucent={true}/>*/}
                <View style={TitleStyle.statusBar}/>

                <View style={TitleStyle.titleBarContent}>
                    {this.props.hideLeftArrow ? (
                        <View style={TitleStyle.left}/>
                    ) : (
                        <TouchableOpacity activeOpacity={1} onPress={this.back.bind(this)}
                                          style={TitleStyle.left}>
                            <Image style={TitleStyle.titleLeftImage}
                                   source={this.props.LifeImage}/>
                            <Text style={TitleStyle.leftText}>{this.props.left}</Text>
                        </TouchableOpacity>
                    )}
                    <View style={TitleStyle.middle}>
                        <Text numberOfLines={1}
                              style={[TitleStyle.middleTitle, titleColor ? {color: titleColor} : null]}>{this.props.title}</Text>
                    </View>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderRight() {
        if (!this.props.right && !this.props.rightImage) {
            return <View style={TitleStyle.right}/>
        }
        return (
            <TouchableOpacity activeOpacity={1} style={TitleStyle.right}
                              onPress={() => {
                                  this.props.pressRight().bind(this)
                              }}>
                {typeof this.props.right == 'object' ? (this.props.right) : (
                    <Text style={TitleStyle.rightText}>{this.props.right}</Text>
                )}
                {this.props.rightImage ? (
                    <Image style={TitleStyle.rightImage} source={this.props.rightImage}/>
                ) : (null)}
            </TouchableOpacity>
        )
    }
}

const TitleStyle = StyleSheet.create({
    titleBar: {
        height: titleHeight,
        backgroundColor: '#ff6900'
    },
    statusBar: {
        height: statusBarHeight,
        backgroundColor: 'transparent'
    },
    titleBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: titleHeight - statusBarHeight,
    },
    left: {
        width:180,
        height: titleHeight - statusBarHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 26,
    },
    middle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlign:'center',
    },
    middleTitle: {
        fontSize: 34,
        color: "#ffffff",
        fontWeight:'500',
        textAlign:'center'
    },
    right: {
        width:180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 26,
    },
    leftText: {
        fontSize: 30,
        color: "#ffffff",
    },
    rightText: {
        fontSize: 30,
        color: "#ffffff",
    },
    rightImage: {
        width: 20,
        height: 34,
        resizeMode: 'contain',
        marginLeft: 26,
        marginRight:26
    },
    titleLeftImage: {
        width: 20,
        height: 34,
        marginRight: 26,
        resizeMode: 'contain'
    },

    homeTitleIcon: {
        width: unitWidth * 213,
        height: unitWidth * 52,
        resizeMode: 'stretch'
    },
    titleRightImage: {
        width: unitWidth * 65,
        height: unitWidth * 65,
        resizeMode: 'contain'
    },

    titleBarSearchContent: {
        flexDirection: 'row',
        height: titleHeight,
        alignItems: 'center',
        width: width,
        height: titleHeight - statusBarHeight,
    },
    searchLeftIcon: {
        width: unitWidth * 30,
        height: unitWidth * 38,
        resizeMode: 'stretch',
        marginLeft: unitWidth * 24,
        marginRight: unitWidth * 15
    },
    searchLeftText: {
        width: unitWidth * 140,
        fontSize: unitWidth * 30,
        color: "#ffffff",
    },

    searchBlock: {
        flexDirection: 'row',
        width: unitWidth * 500,
        height: unitWidth * 60,
        borderRadius: unitWidth * 30,
        backgroundColor: "white",
        alignItems: 'center',
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30
    },

    searchIcon: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        resizeMode: 'stretch',
        marginRight: unitWidth * 30
    },

    searchBarInput: {
        width: unitWidth * 350,
        height: unitWidth * 60,
        fontSize: unitWidth * 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },

})
