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
    WebView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config';
import Loading from '../../component/loading'
import fetchp from '../../tools/fetch-polyfill';
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.docid = props.navigation.state.params.docid;
        this.title = props.navigation.state.params.title;
        this.mtime = props.navigation.state.params.mtime;

        this.state={
            data:'',
            isError:false,
            isLoading: false,
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }
    getData() {

        this.setState({
            isError:false,
            isLoading:true,
        });

        let url = getArticleDetail(this.docid);
        fetchp(url,{headers: {
            'Accept':'*/*',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'http://c.m.163.com',
            // 以下一条可防止出现403拒绝访问错误
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }},{timeout:10*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data[this.docid]))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        this.setState({
            isError:true,
            isLoading:false,
        })
    }

    setData(data) {
        let bodySting = data.body;
        let imgs = data.img;
        if(imgs.length > 0) {
            for(let i = 0; i <imgs.length; i++){
                // let imgPixel = imgs[i].pixel.split('*');
                // let imgBili = imgPixel[1]/imgPixel[0]; //高除以宽;
                //
                // let imgWidth = cfn.deviceWidth()-cfn.picWidth(20);
                // let imgHeight = imgWidth * imgBili;

                //let imgTemp = `<img src="${imgs[i].src}" style="width:${imgWidth}px; height:${imgHeight}px">`;
                let imgTemp = `<img src='${imgs[i].src}' style='display: block;max-width: ${cfn.deviceWidth()-cfn.picWidth(40)}px'>`;
                bodySting = bodySting.replace(imgs[i].ref,imgTemp);
            }
        }
        bodySting = bodySting.replace('wangyicaipiao','');
        bodySting = bodySting.replace('网易彩票',config.sourceName);
        bodySting = bodySting.replace('【网易彩票】',config.sourceName);
        this.setState({
            data:bodySting,
            isError:false,
            isLoading:false,
        })
    }
    render() {
        let htmlTemp = `<!DOCTYPE html>\n
            <html lang="en">
            <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <title></title>
            </head>
            <h3>${this.title}</h3>
            <p>${this.mtime}</P>
            <body style="max-width:${cfn.deviceWidth()-cfn.picWidth(40)}px">
            ${this.state.data}
            </body>
            </html>`;
       return(
        <View style={styles.container}>
            <NavBar
            middleText="文章详情"
            leftFn={()=>this.goBack()}
            />

            <WebView
                style={styles.webView}
                source={{html: htmlTemp}}
                scalesPageToFit={false}
            />
            <Loading
                isError={this.state.isError}
                isLoading={this.state.isLoading}
                reload={this.getData.bind(this)}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
   container: {
       justifyContent:'flex-start',
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
   },
    webView: {
       width:cfn.deviceWidth(),
    }
});