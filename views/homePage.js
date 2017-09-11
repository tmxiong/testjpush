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
    TouchableOpacity,
    StatusBar,
    FlatList,
    RefreshControl,
    Animated,
    ScrollView
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loading'
import NavBar from '../component/NavBar';
import config from '../config/config'
const url_id = require('../config/urls').getUrlId();
let {getArticleList} = require('../config/urls');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import Banner from '../component/Banner';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            isRefreshing: false,
        };
        this.data = [];
        this.nowPage = 0;

    }

    static defaultProps = {};
    _keyExtractor = (item, index) => item.docid;

    componentDidMount() {
        // true 为首次加载
        // false 为上拉加载
        this.getData(true, 0, 20);
    }

    getData(isFirst, now, next) {
        if (isFirst) {
            this.setState({
                isLoading: true,
                isError: false,
            });
        }

        let url = getArticleList(now, next);
        fetch(url, {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'http://c.m.163.com',
                // 以下一条可防止出现403拒绝访问错误
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        })
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))

    }

    setError(error) {
        this.setState({
            isLoading: false,
            isError: true,
            isRefreshing: false,
        });
        // console.log(error);
    }

    setData(data) {
        this.data = this.data.concat(data[url_id]);
        this.setState({
            data: this.data,
            isLoading: false,
            isError: false,
            isRefreshing: false,
        });
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params);
    }

    renderItem({item, index}) {
        if (item.source == '网易彩票' && !item.specialextra && !item.imgextra && !item.title.match('网易')) {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={()=>this.goToDetail('newsDetail', {
                            docid: item.docid,
                            title: item.title,
                            mtime: item.mtime,
                        }
                    )}
                    style={styles.item_container}>
                    <Image
                        style={styles.item_img}
                        source={{uri: item.imgsrc}}/>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{item.title}</Text>
                        <Text style={styles.item_source}>{config.sourceName}</Text>
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
            isRefreshing: true,
        });
        this.getData(false, 0, 20);
    }

    _onEndReached() {
        this.nowPage++;
        this.getData(false, this.nowPage * 20, this.nowPage * 20 + 20);
        //alert(this.nowPage)
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
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
            >
                {/*<NavBar*/}
                    {/*middleText="购彩资讯"*/}
                    {/*leftIcon={null}*/}
                {/*/>*/}
                <Banner
                    bannerList={[
                        require('../imgs/banner/banner_01.jpg'),
                        require('../imgs/banner/banner_03.jpg'),
                        require('../imgs/banner/banner_02.jpg'),]}
                />
                <View style={styles.cp_btn_container}>
                    <TouchableOpacity
                        onPress={()=>this.goToDetail('PlayTips',{
                            type:'fc',
                            name:'福彩3D推荐'
                        })}
                        style={styles.cp_btn}>
                        <Text>福彩3D</Text>
                    </TouchableOpacity>
                    <View style={styles.border_right}/>
                    <TouchableOpacity
                        onPress={()=>this.goToDetail('PlayTips',{
                            type:'szc',
                            name:'数字彩推荐'
                        })}
                        style={styles.cp_btn}>
                        <Text>数字彩</Text>
                    </TouchableOpacity>
                    <View style={styles.border_right}/>
                    <TouchableOpacity
                        onPress={()=>this.goToDetail('PlayTips',{
                            type:'gpc',
                            name:'高频彩推荐'
                        })}
                        style={styles.cp_btn}>
                        <Text>高频彩</Text>
                    </TouchableOpacity>
                    <View style={styles.border_right}/>
                </View>

                <AnimatedFlatList
                    style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={(data, index) => ( {
                        length: cfn.picHeight(160),
                        offset: cfn.picHeight(160) * index,
                        index
                    } )}

                    //onEndReached={this._onEndReached.bind(this)}
                    //onEndReachedThreshold={0.8}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={{width:cfn.deviceWidth(), alignItems:'flex-end',
                        height:cfn.picHeight(70),backgroundColor:'#fff',justifyContent:'center'}}
                >
                    <Text style={{color:'#444',fontSize:11,marginRight:10}}>点击查看更多>></Text>
                </TouchableOpacity>
                <Loading
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    reload={()=>this.getData(true, 20, 40)}
                />
            </ScrollView>)
    }
}
const styles = StyleSheet.create({
    container: {
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    cp_btn_container: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(130),
        flexDirection:'row',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    border_right: {
        width:1,
        height:cfn.picHeight(80),
        backgroundColor:'#ddd'
    },
    cp_btn: {
        width:cfn.deviceWidth() / 3  ,
        height:cfn.picHeight(130),
        alignItems:'center',
        justifyContent:'center'
    },
    flatListStyle: {
        width: cfn.deviceWidth(),
        zIndex: 999,
        borderTopColor:'#ddd',
        borderTopWidth:1,
        marginTop:cfn.picHeight(20),
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:'#fff'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#444'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }

});