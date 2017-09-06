/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
export default class HomePage extends Component {

    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        // tabBarIcon: ({ tintColor }) => (
        //     <Image
        //         source={
        //             require('../images/cert0.png')
        //         }
        //         style={[styles.icon,{tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
        //     />
        // ),
        headerTitleStyle: {
            alignSelf:'center'
        },
    };

    render() {
        return null
    }
}
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