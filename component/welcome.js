/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../tools/commonFun'
export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(props) {

    }

    goHome() {
        this.props.navigation.navigate('Main');
    }

    render() {

        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                //onScroll={this.onScroll.bind(this)}
                //onTouchStart={()=>this.onTouchStart()}
                //onScrollEndDrag={()=>this.startScroll()}
                //onTouchEnd={()=>this.startScroll()}
                ref={(ref)=>this._scrollView = ref}
            >
                <Image style={styles.img} source={require('../imgs/welcome/welcome_1.png')}/>
                <Image style={styles.img} source={require('../imgs/welcome/welcome_2.png')}/>
                <Image style={[styles.img,{alignItems:'center',justifyContent:'flex-end',}]} source={require('../imgs/welcome/welcome_3.png')}>
                    <TouchableOpacity
                        onPress={()=>this.goHome()}
                        activeOpacity={0.8}
                        style={styles.btn}
                    >
                        <Text style={styles.text}>马上开始</Text>
                    </TouchableOpacity>
                </Image>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      justifyContent:'center'
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'cover'
    },
    btn: {
        width:cfn.picWidth(250),
        height:cfn.picHeight(80),
        borderRadius:cfn.picHeight(30),
        borderWidth:2,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:cfn.picHeight(180)
    },
    text: {
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'

    }
});