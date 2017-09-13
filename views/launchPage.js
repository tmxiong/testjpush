/**
 * Created by xiongtm on 2017/9/13.
 */
/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../tools/commonFun'
import Storage from 'react-native-storage';
import Global from '../global/global';
export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        setTimeout(()=>{
            this.goToPage('Welcome');
        },2000)
    }

    initStorage() {
        Global.storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            sync: require('../global/sync')  // 这个sync文件是要你自己写的
        })
    }

    goToPage(route) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: route})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    goToWelcome() {
        this.props.navigation.navigate('Welcome');
    }

    render() {

        return (
            <Image style={styles.img} source={require('../imgs/welcome/welcome_2.png')}/>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'center'
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'cover'
    },
});