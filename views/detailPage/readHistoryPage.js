/**
 * Created by Administrator on 2017/9/14.
 */
/**
 * Created by timxiong on 2017/9/11.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    Platform,
    StatusBar
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    static defaultProps = {};

    goBack() {
        this.props.navigation.goBack();
    }

    getReadHistory() {
        // 获取某个key下的所有数据
        Global.storage.getAllDataForKey('collection').then((data) => {
            this.setData(data);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText="阅读历史"
                />

            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight()
    }
});