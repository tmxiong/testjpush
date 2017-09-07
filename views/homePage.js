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
    TouchableOpacity,
    StatusBar
} from 'react-native';
import cqssc from '../imgs/lotteryIcons/cqssc_icon.png';
import cfn from '../tools/commonFun';
import NavBar from '../component/NavBar';
export default class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                middleText="购彩资讯"
                leftIcon={null}
                />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.itemContainer}>
                    <Image source={cqssc} style={styles.icon}/>
                    <Text style={[styles.text, styles.title_text]}>重庆时时彩</Text>
                    <Text style={[styles.text, styles.des_text]}>小伙豪中500万</Text>
                    <View style={styles.right_border}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.itemContainer}>
                    <Image source={cqssc} style={styles.icon}/>
                    <Text style={[styles.text, styles.title_text]}>重庆时时彩</Text>
                    <Text style={[styles.text, styles.des_text]}>小伙豪中500万</Text>
                    <View style={styles.right_border}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.itemContainer}>
                    <Image source={cqssc} style={styles.icon}/>
                    <Text style={[styles.text, styles.title_text]}>重庆时时彩</Text>
                    <Text style={[styles.text, styles.des_text]}>小伙豪中500万</Text>
                    <View style={styles.right_border}/>
                </TouchableOpacity>

            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemContainer: {
        width: cfn.deviceWidth() / 2,
        height: cfn.picHeight(100),
        justifyContent: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    icon: {
        width: cfn.picWidth(80),
        height: cfn.picWidth(80),
        position: 'absolute',
        left: cfn.picWidth(30)
    },
    text: {
        backgroundColor: 'transparent',
        marginLeft: cfn.picWidth(130)
    },
    title_text: {
        color: '#222'
    },
    des_text: {
        fontSize: 10,
        marginTop: cfn.picHeight(10),
        color: '#333'
    },
    right_border: {
        width: 1,
        height: cfn.picHeight(80),
        backgroundColor: '#ddd',
        position: 'absolute',
        right: 0
    }
});