/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavBar from '../component/NavBar';
export default class MinePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='我的'
                    leftIcon={null}
                />
                <Text>我的</Text>
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
    icon:{
        width:20,
        height:20
    }
});