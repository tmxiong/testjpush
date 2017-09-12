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
    TouchableOpacity
} from 'react-native';

import NavBar from '../component/NavBar';
import cfn from '../tools/commonFun'
export default class MinePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='更多'
                    leftIcon={null}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.item_container,{marginTop:cfn.picWidth(30)}]}>
                    <Text style={styles.item_text}>关于我们</Text>
                    <Image
                        style={styles.icon_r}
                        source={require('../imgs/more_r_icon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.item_container}>
                    <Text style={styles.item_text}>关于我们</Text>
                    <Image
                        style={styles.icon_r}
                        source={require('../imgs/more_r_icon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.item_container}>
                    <Text style={styles.item_text}>关于我们</Text>
                    <Image
                        style={styles.icon_r}
                        source={require('../imgs/more_r_icon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.item_container,{marginTop:cfn.picWidth(30)}]}>
                    <Text style={styles.item_text}>当前版本</Text>
                    <Text style={[styles.item_text,{position:'absolute',right:cfn.picWidth(40)}]}>V 1.032</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    item_container: {
        flexDirection: 'row',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20)
    },
    item_text: {
        fontSize:16,
        color:'#666'
    },
    icon_r:{
        width:cfn.picWidth(50),
        height:cfn.picHeight(50),
        resizeMode: 'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    }
});