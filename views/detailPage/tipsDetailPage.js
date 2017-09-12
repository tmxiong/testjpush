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
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText="文章详情"
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