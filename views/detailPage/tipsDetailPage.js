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
import Loading from '../../component/loading'
import options from '../../imgs/options_icon.png'
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            isError:false
        };

        this.id = props.navigation.state.params.id;
        let statusBarHeight = Platform.OS == 'ios' ? cfn.picHeight(46) : StatusBar.currentHeight;
        this.navBarHeight = Platform.OS == 'ios' ? cfn.picHeight(160) : cfn.picHeight(200);
        this.navBarHeight = this.navBarHeight + statusBarHeight;
    }

    static defaultProps = {};

    goBack() {
        this.props.navigation.goBack();
    }

    // 加载成功
    _onLoad() {
        this.setState({
            isLoading:false,
            isError:false
        })
    }

    // 开始加载
    _onLoadStart() {
        this.setState({
            isLoading: true,
            isError:false
        })
    }

    // 加载错误
    _onError() {
        this.setState({
            isLoading:false,
            isError:true
        })
    }

    addCollection() {
        const {data} = this.props.navigation.state.params;
        Global.storage.save({
            key: 'collection',  // 注意:请不要在key中使用_下划线符号!
            id: data._id, //获取所有数据时，id 必须写
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
        this.props.dispatch(setCollection(true))
    }

    deleteCollection() {
        const {data} = this.props.navigation.state.params;
        Global.storage.remove({
            key: 'collection',
            id: data._id
        });

        Global.storage.getAllDataForKey('collection').then((data) => {
            console.log(data);
        });

        this.props.dispatch(setCollection(false));
    }

    shareArtical() {
        const {data} = this.props.navigation.state.params;
        Share.share({
            message: data.desc + data.url
        })
            .then(this._showResult)
            .catch((error) => {this.setModalVisible(false)})
    }

    _showResult(result) {
        this.setModalVisible(false);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                //this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                ToastAndroid.show('分享成功！',ToastAndroid.SHORT)
            }
        } else if (result.action === Share.dismissedAction) {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText="文章详情"
                    rightIcon={options}
                />

                <View style={{height:this.state.isLoading ? 0 : cfn.deviceHeight()}}>
                    <WebView
                        source={{uri: urls.getPlayTipsDetail(this.id)}}
                        injectedJavaScript={'document.getElementById("author").textContent="' + config.sourceName + '";' +
                        'document.getElementById("tuijian").style.display="none"'}
                        onLoad={()=>this._onLoad()}
                        onLoadStart={()=>this._onLoadStart()}
                    />
                </View>
                <Loading
                    isLoading={this.state.isLoading}
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