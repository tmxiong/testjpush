/**
 * Created by timxiong on 2017/9/6.
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
import cfn from './tools/commonFun'
import Welcome from './component/welcome'
export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    render() {

        return (
           <View>
               <Welcome/>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
    }
});