import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
    Text,
    TouchableOpacity
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './homePage';
import OrderPage from './orderPage';
import MinePage from './minePage';
import cfn from '../tools/commonFun'
const navBar = {
    headerTitleStyle: {
        //alignSelf:'center',
        color:'#ddd',
    },
    headerStyle: {
        backgroundColor:'#b22222'
    },
};

const mainPage = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: '购彩攻略',
            tabBarLabel: '购彩攻略',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/home_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            header:null,
        }
    },
    Order: {
        screen: OrderPage,
        navigationOptions: {
            title: '开奖大厅',
            tabBarLabel: '开奖大厅',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/order_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            header:null,
            headerRight:<TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Kaijiang')}
            >
                <Text>查询</Text>
            </TouchableOpacity>
        }
    },
    Mine: {
        screen: MinePage,
        //以下参数也可放置在MinePage.js页面
        navigationOptions: {
            title: '更多',
            tabBarLabel: '更多',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/mine_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            header:null,

        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#b22222', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#eee', // TabBar 背景色
            height:cfn.picHeight(110)
        },
        labelStyle: {
            fontSize: 12, // 文字大小,
            marginTop: 0,
        },
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        width:cfn.picHeight(50),
        height:cfn.picHeight(50),
        resizeMode:'contain'
    }
});
module.exports = mainPage;