/**
 * Created by timxiong on 2017/9/6.
 */
// SyntaxError: Unexpected token < in JSON at position 0
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
    FlatList,
    RefreshControl
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loading'
import NavBar from '../component/NavBar';
const url_id = require('../config/urls').getUrlId();
let {getArticleList} = require('../config/urls');
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:null,
            isLoading:false,
            isError: false,
            isRefreshing:false,
        };
        this.data = [];
        this.nowPage = 0;

    }
    static defaultProps={

    };
    _keyExtractor = (item, index) => item.docid;

    componentDidMount() {
        this.getData(true,20,40);
    }

    getData(isFirst, now, next) {
        if(isFirst) {
            this.setState({
                isLoading:true,
                isError:false,
            });
        }

        let url = getArticleList(now, next);
        fetch(url,{dataType : 'json' })
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        this.setState({
            isLoading:false,
            isError:true,
            isRefreshing:false,
        });
        console.log(error);
    }

    setData(data) {
        this.setState({
            data: this.data.concat(data[url_id]),
            isLoading:false,
            isError: false,
            isRefreshing:false,
        });
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
    _onRefresh() {
        this.data = [];
        this.nowPage = 0;
        this.setState({
            isRefreshing:true,
        });
        this.getData(false,0,20);
    }
    _onEndReached() {
        this.nowPage ++;
        this.getData(false, this.nowPage*20, this.nowPage*20 + 20);
        alert('onEnd')
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#000"
                            title="正在努力加载..."
                            titleColor="#000"
                            colors={['#b22222']}
                            progressBackgroundColor="#fff"
                        />
                    }
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.9}
                />
                <Loading
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    reload={()=>this.getData(true,0,20)}
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
        zIndex:999
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