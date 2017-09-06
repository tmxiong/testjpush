import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './homePage';
import OrderPage from './orderPage';
import MinePage from './minePage';


const mainPage = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: '资讯',
            tabBarLabel: '资讯',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/home_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            headerTitleStyle: {
                alignSelf:'center'
            }
        }
    },
    Order: {
        screen: OrderPage,
        navigationOptions: {
            title: '开奖',
            tabBarLabel: '开奖',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/order_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            headerTitleStyle: {
                alignSelf:'center'
            }
        }
    },
    Mine: {
        screen: MinePage,
        //以下参数也可放置在MinePage.js页面
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../imgs/mine_icon.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
            headerTitleStyle: {
                alignSelf:'center'
            }
        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#d81e06', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#444', // TabBar 背景色
            height:50
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
        width:20,
        height:20
    }
});
module.exports = mainPage;