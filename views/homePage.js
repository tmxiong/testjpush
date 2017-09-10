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
    StatusBar,
    FlatList
} from 'react-native';
import cfn from '../tools/commonFun';
import NavBar from '../component/NavBar';
const url_id = require('../config/urls').getUrlId();
let {getArticleList} = require('../config/urls');
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:null,
        }
    }
    static defaultProps={

    };
    _keyExtractor = (item, index) => item.docid;

    componentDidMount() {
        this.getData();
    }
    getData() {
        let url = getArticleList(0,20);
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        console.log(error);
    }

    setData(data) {
        this.setState({data: data[url_id]});
    }

    goToDetail(route,params) {
        this.props.navigation.navigate(route,params);
    }

    renderItem({item, index}){
        if(item.source == '网易彩票'){
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={()=>this.goToDetail('Article',{
                        docid:item.docid,
                    })}
                    style={styles.item_container}>
                    <Image
                        style={styles.item_img}
                        source={{uri:item.imgsrc}}/>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{item.title}</Text>
                        <Text style={styles.item_source}>132彩票</Text>
                        <Text style={styles.item_time}>{item.mtime}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText="购彩资讯"
                    leftIcon={null}
                />
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flatListStyle: {
      width:cfn.deviceWidth(),
    },
    item_container: {
      width:cfn.deviceWidth() - cfn.picWidth(40),
        height:cfn.picHeight(160),
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        alignItems:'center',
        alignSelf:'center'
    },
    item_text_container: {
        flexWrap:'wrap',
        width:cfn.deviceWidth()-cfn.picWidth(180+40),
        paddingLeft:cfn.picWidth(20),
        height:cfn.picHeight(120),
    },
    item_source: {
        fontSize:13,
        color:'#888',
        position:'absolute',
        left:cfn.picWidth(20),
        bottom:0
    },
    item_time: {
        fontSize:13,
        color:'#888',
        position:'absolute',
        right:cfn.picWidth(20),
        bottom:0
    },
    item_title: {
        color:'#444'
    },
    item_img: {
        width:cfn.picWidth(180),
        height:cfn.picHeight(120),
    }

});