import React, { Component } from 'react';
/*
 * 引入这个两个头文件
 * */
import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';
import { Text, View, ScrollView,StyleSheet } from 'react-native';
import TitleBar from '../common/TitleBar';

const datas = [
    {name:'苹果',count:0},
    {name:'梨',count:0},
    {name:'香蕉',count:0},
    {name:'草莓',count:0},
    {name:'橘子',count:0},
];
/*
 * 对每一个Item添加观察,改变个数
 * */
@observer
class ItemView extends Component {
    countAdd = () => {
        this.props.item.add();
    };
    countDec = () => {
        this.props.item.dec();
    };
    render() {
        const {item} = this.props;
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.btn} onPress={this.countAdd.bind(this)}> + </Text>
                <Text style={styles.text}>{item.count}</Text>
                <Text style={styles.btn} onPress={this.countDec.bind(this)}> - </Text>
            </View>
        );
    }
}
/*
 * 整个列表页数据管理器
 * */
class DataSource {
    // 本地数据源
    @observable
    dataSource = [];

    // 添加初始数据
    @action
    replace = (items) => {
        // 1. 清空原数据
        this.dataSource.splice(0, this.dataSource.length);

        // 2. 加载新数据
        items.map((item, i) => {
            this.dataSource.push(new Item(item));
        });
    };

    // 添加新数据
    @action
    addItem = (item) => {
        this.dataSource.unshift(new Item(item));
    };


    // 删除一条数据
    @action
    deleteItem = (idx) => {
        this.dataSource.splice(idx, 1);
    };
}
/*
 * 单条Item数据管理器
 * */
class Item {
    /*
     * 商品名称（此值是不变的所以不需要检测此值）
     * */
    name;
    /*
     * 监控商品个数
     * */
    @observable
    count;
    constructor(item) {
        this.name = item.name;
        this.count = item.count;
    };
    /*
     * 商品个数+1
     * */
    @action
    add = () => {
        this.count += 1;
    };
    /*
     * 商品个数-1
     * */
    @action
    dec= () => {
        this.count > 0 && (this.count -= 1);
    };
}


/*
 * 对整个列表添加观察，观察列表个数的变化
 * */
@observer
export default class Demo2 extends Component {
    // 数据初始化
    constructor (props) {
        super(props)
        this.state = {
            'value': this.props.navigation.state.params.value,
            'title': this.props.navigation.state.params.title
        }
    }
    /*
     * 数据管理器
     * */
    dataManager = new DataSource();

    componentWillMount() {
        /*
         * 赋值初始数据
         * */
        this.dataManager.replace(datas);
    }

    /*
     * 添加一个新的Item
     * */
    addItem = () => {
        let item = {name: '西瓜', count: 0};
        this.dataManager.addItem(item)
    };

    /*
     * 删除第一个Item
     * */
    deleteItem = () => {
        this.dataManager.deleteItem(0);
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <TitleBar title={"意见反馈"}
                          hideLeftArrow={false}
                          LifeImage={require('../../res/images/back.png')}
                          left={'返回'}
                          navigation={navigation}/>
                <View style={styles.addItemView}>
                    <Text style={styles.addItem} onPress={this.addItem.bind(this)}>增加</Text>
                    <Text style={styles.addItem} onPress={this.deleteItem.bind(this)}>删除</Text>
                </View>
                <ScrollView>
                    {
                        this.dataManager.dataSource.slice(0).map((item, i) => <ItemView key={i} item={item}/>)
                    }
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    addItem:{
        fontSize:40,
    },
    btn:{
        fontSize:40,
    },
    text:{
        fontSize:40,
    }
})

