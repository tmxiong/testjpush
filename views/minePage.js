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
import config from '../config/config'
import fetchp from '../tools/fetch-polyfill';
export default class MinePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            version:''
        }
    }

    static defaultProps={

    };

    getData() {
        this.setState({
            version:'正在检查更新'
        });
        fetchp('http://c.m.163.com',{
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'http://c.m.163.com',
                // 以下一条可防止出现403拒绝访问错误
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        },{timeout:1000*10})
            .then((data)=>this.setData())
            .catch((error)=>this.setError(error))
    }
    setData() {
        this.setState({
            version:'已经是最新版本',
        })
    }

    setError() {
        this.setState({
            version:'连接错误'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='更多'
                    leftIcon={null}
                />
                <Image
                    style={styles.icon}
                    source={require('../imgs/appIcon/132.png')}/>
                <Text style={{marginTop:cfn.picHeight(30),color:'#888'}}>内核版本 v103200</Text>
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
                    onPress={()=>this.getData()}
                    activeOpacity={0.8}
                    style={[styles.item_container,{marginTop:cfn.picWidth(30)}]}>
                    <Text style={styles.item_text}>当前版本</Text>
                    <Text style={{marginLeft:cfn.picWidth(20)}}>{this.state.version}</Text>
                    <Text style={[styles.item_text,{position:'absolute',right:cfn.picWidth(40)}]}>v1.032</Text>
                </TouchableOpacity>
                <View style={styles.copyright}>
                    <Text style={styles.copyright_text}>{config.copyright[0]}</Text>
                    <Text style={styles.copyright_text}>{config.copyright[1]}</Text>
                </View>
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
    icon: {
        width:cfn.picWidth(130),
        height:cfn.picWidth(130),
        resizeMode:'contain',
        marginTop:cfn.picHeight(100)
    },
    item_container: {
        flexDirection: 'row',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#dedede',
        borderBottomWidth:1,
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20)
    },
    item_text: {
        fontSize:16,
        color:'#888'
    },
    icon_r:{
        width:cfn.picWidth(50),
        height:cfn.picHeight(50),
        resizeMode: 'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    },
    copyright: {
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        bottom:cfn.picHeight(20)
    },
    copyright_text: {
        color:'#999',
        marginTop:cfn.picHeight(10)
    }
});