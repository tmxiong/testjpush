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
    FlatList
} from 'react-native';
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'
import cfn from '../../tools/commonFun'
export default class tipsDetailPage extends Component{

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state={

        }

        this.id = props.navigation.state.params.id;
    }

    static defaultProps={

    };

    injectJS = () => {
        const script = "document.getElementById('author').textContent('hahaha')";
        if(this._webView) {
            this._webView.injectJavaScript(script);
        }
    };

    getData() {
        // fetchp(urls.getPlayTipsDetail(this.id),{timeout:10*1000})
        //     .then(())
    }

    render() {
        return (<View style={styles.container}>
            <Text>tips</Text>
            <WebView
                source={{uri:urls.getPlayTipsDetail(this.id)}}
                ref={(ref)=>this._webView = ref}
                onLoad={this.injectJS()}
            />
        </View>)
    }

}
const styles = StyleSheet.create({
   container: {
        width:cfn.deviceWidth(),
       height:cfn.deviceHeight()
   }
});