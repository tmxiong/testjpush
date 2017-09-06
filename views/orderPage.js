import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cqssc from '../imgs/lotteryIcons/cqssc_icon.png';
import lotterys from '../config/lotterys';
const mWidth = require('Dimensions').get('window').width;
const mHeight = require('Dimensions').get('window').height;

export default class OrderPage extends Component {
    goToDetail() {
        const {dispatch} = this.props.navigation;
        const resetAction = NavigationActions.reset({
            index: 0,//指定显示数组内的路由
            actions: [
                NavigationActions.navigate({ routeName: 'Detail',params:{user: 'xiongtm'}}),
                //NavigationActions.navigate({ routeName: 'others',params:{user: 'xiongtm'}}),
            ]
        });
        dispatch(resetAction);
    }

    //列表的头部
    ListHeaderComponent() {
        return (
            <DetailsHeadItem titleName='学习' unitName='111'/>
        )
    }

    //列表的每一行
    renderItem({item,index}) {
        return (
            <TouchableOpacity key={index} activeOpacity={1} onPress={this.clickItem.bind(this,item,index)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    //绘制列表的分割线
    renderItemSeparator(){

    }

    //点击列表点击每一行
    clickItem(item,index) {
        alert(index)
    }

    render() {
        return (
            <View style={styles.container}>
               <Image source={cqssc}/>
                <FlatList
                    //style={styles.flatListStyle}
                    data={lotterys}
                   // ListHeaderComponent={this.ListHeaderComponent.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}

                />
            </View>
        );
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