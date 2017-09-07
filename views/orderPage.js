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
import cfn from '../tools/commonFun'
import NavBar from '../component/NavBar'
export default class OrderPage extends Component {
    goToDetail(route,params) {
        this.props.navigation.navigate(route,params)
    }

    _keyExtractor = (item, index) => item.id;

    //列表的头部
    ListHeaderComponent() {

    }

    //列表的每一行
    renderItem({item,index}) {
        let width = (index+1)%2;
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={()=>this.goToDetail('Kaijiang',{
                    id:item.id,
                    icon:cqssc,
                    title:item.name
                })}
                style={styles.itemContainer}>
                <Image source={cqssc} style={styles.icon}/>
                <Text style={[styles.text, styles.title_text]}>{item.name}</Text>
                <Text style={[styles.text, styles.des_text]}>小伙豪中500万</Text>
                <View style={[styles.right_border,{width:width}]}/>
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
                <NavBar
                middleText="开奖大厅"
                leftIcon={null}
                leftFn={this.props.navigation.goBack()}
                />
                <FlatList
                    style={styles.flatListStyle}
                    data={lotterys}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    flatListStyle: {

        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
    },
    itemContainer: {
        width: cfn.deviceWidth() / 2,
        height: cfn.picHeight(120),
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
        color: '#444'
    },
    des_text: {
        fontSize: 10,
        marginTop: cfn.picHeight(10),
        color: '#666'
    },
    right_border: {
        width: 1,
        height: cfn.picHeight(80),
        backgroundColor: '#ddd',
        position: 'absolute',
        right: 0
    }
});