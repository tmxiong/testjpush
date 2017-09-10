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
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.docid = props.navigation.state.params.docid;

        this.state={
            data:null
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
        let url = getArticleDetail(this.docid);
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data[this.docid]))
    }
    setData(data) {
        // let htmlTemp = '<!DOCTYPE html>'+
        //     '<html lang="en">'+
        //     '<head>'+
        //     '<meta charset="UTF-8">'+
        //     '<title></title>'+
        //     '</head>'+
        //     '<body>'+
        //     data.body +
        //     '</body>'+
        //     '</html>';
        this.setState({data:data.body})
    }
    render() {
        let htmlTemp = `<!DOCTYPE html>\n
            <html lang="en">
            <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <title></title>
            </head>
            <body>
            ${this.state.data}
            </body>
            </html>`;
       return(
        <View style={styles.container}>
            <NavBar
            middleText="文章详情"
            leftFn={()=>this.goBack()}
            />
            <Text>文章</Text>
            <WebView
            source={{html: htmlTemp}}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       justifyContent:'flex-start'
   }
});