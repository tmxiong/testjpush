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
import config from '../config/config'
const url_id = require('../config/urls').getUrlId();
let {getArticleList} = require('../config/urls');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import Banner from '../component/Banner';
import fetchp from '../tools/fetch-polyfill'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            isRefreshing: false,
        };
        this.nowPage = 0;

    }

    static defaultProps = {};
    _keyExtractor = (item, index) => item.docid;

    componentDidMount() {
        // true 为首次加载
        // false 为上拉加载
        this.getData(true, 0, 10);
    }

    getData(isFirst, now, next) {
        if (isFirst) {
            this.setState({
                isLoading: true,
                isError: false,
            });
        }

        let url = getArticleList(now, next);
        fetchp(url, {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'http://c.m.163.com',
                // 以下一条可防止出现403拒绝访问错误
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        }, {timeout: 10 * 1000})
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
        this.setState({
            data: data[url_id],
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
        this.getData(false, 0, 10);
    }

    render() {
        return (
            <View style={{height:cfn.deviceHeight()}}>
                {/*<NavBar*/}
                    {/*middleText="购彩攻略"*/}
                    {/*leftIcon={null}*/}
                {/*/>*/}
                {/*<View style={{height:cfn.picHeight(50),position:'absolute',top:0,zIndex:99,backgroundColor:'rgba(0,0,0,0.5)'}}/>*/}
                <View
                    style={styles.container}

                >
                    <Banner
                        bannerList={[
                            require('../imgs/banner/banner_01.jpg'),
                            require('../imgs/banner/banner_03.jpg'),
                            require('../imgs/banner/banner_02.jpg'),]}
                    />
                    <View
                        style={{
                            width: cfn.deviceWidth(), alignItems: 'flex-end',
                            height: cfn.picHeight(80), backgroundColor: '#fff', justifyContent: 'center'
                        }}
                    >
                        <View style={{
                            position: 'absolute', left: cfn.picWidth(20),
                            borderLeftColor: '#b22222',
                            borderLeftWidth: cfn.picWidth(5)
                        }}>
                            <Text style={{marginLeft: cfn.picWidth(10), color: '#333'}}>
                                购彩攻略
                            </Text>
                        </View>

                        {/*<TouchableOpacity*/}
                        {/*//onPress={()=>this.goToDetail('MoreArticle')}*/}
                        {/*activeOpacity={0.8}*/}
                        {/*>*/}
                        {/*<Text style={{color:'#666',fontSize:11,marginRight:10}}>查看更多>></Text>*/}
                        {/*</TouchableOpacity>*/}

                    </View>
                    <View style={styles.cp_btn_container}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToDetail('PlayTips', {
                                type: 'fc',
                                name: '福彩3D推荐'
                            })}
                            style={styles.cp_btn}>
                            <Image
                                style={styles.cp_btn_img}
                                source={require('../imgs/fc.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToDetail('PlayTips', {
                                type: 'szc',
                                name: '数字彩推荐'
                            })}
                            style={[styles.cp_btn, {marginLeft: cfn.picWidth(10), marginRight: cfn.picWidth(10)}]}>
                            <Image
                                style={styles.cp_btn_img}
                                source={require('../imgs/szc.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToDetail('PlayTips', {
                                type: 'gpc',
                                name: '高频彩推荐'
                            })}
                            style={styles.cp_btn}>
                            <Image
                                style={styles.cp_btn_img}
                                source={require('../imgs/gpc.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    {this.state.data ?
                        <View
                            style={{
                                width: cfn.deviceWidth(), alignItems: 'flex-end', marginTop: cfn.picHeight(30),
                                height: cfn.picHeight(80), backgroundColor: '#fff', justifyContent: 'center'
                            }}
                        >
                            <View style={{
                                position: 'absolute', left: cfn.picWidth(20),
                                borderLeftColor: '#b22222',
                                borderLeftWidth: cfn.picWidth(5)
                            }}>
                                <Text style={{marginLeft: cfn.picWidth(10), color: '#333'}}>
                                    购彩资讯
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={()=>this.goToDetail('MoreArticle')}
                                activeOpacity={0.8}
                            >
                                <Text style={{color: '#666', fontSize: 11, marginRight: 10}}>查看更多>></Text>
                            </TouchableOpacity>

                        </View> : null}
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

                        //onEndReached={this._onEndReached.bind(this)}
                        //onEndReachedThreshold={0.8}
                    />
                    <View style={{height:cfn.picHeight(109)}}/>
                    <Loading
                        isLoading={this.state.isLoading}
                        isError={this.state.isError}
                        reload={()=>this.getData(true, 0, 10)}
                    />
                </View>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth()
    },
    cp_btn_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(170),
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    border_right: {
        width: 1,
        height: cfn.picHeight(80),
        backgroundColor: '#ddd'
    },
    cp_btn: {
        width: (cfn.deviceWidth() - cfn.picWidth(40)) / 3,
        height: cfn.picHeight(170),
        alignItems: 'center',
        justifyContent: 'center'
    },
    cp_btn_img: {
        width: (cfn.deviceWidth() - cfn.picWidth(40)) / 3,
        height: cfn.picHeight(150),
        resizeMode: 'stretch',
        borderRadius: 7
    },
    flatListStyle: {
        width: cfn.deviceWidth(),
        //height: cfn.deviceHeight() -  cfn.picHeight(110+80+30+170+80+30+365),
        zIndex: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingBottom:cfn.picHeight(20)
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
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