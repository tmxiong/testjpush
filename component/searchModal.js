/**
 * Created by timxiong on 2017/9/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Platform,
    FlatList,
} from 'react-native';
import cfn from '../tools/commonFun';
import NavBar from './NavBar'
import lotterys from '../config/lotterys'
export default class searchModal extends PureComponent {

    static defaultProps = {
        visible: false,
        closeModal: ()=> {
        }
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    _keyExtractor=(item, index) => item.id;

    leftFn() {
        this.props.closeModal();
    }

    renderItem({item, index}) {
        return(
            <View style={styles.item_container}>
                <Image source={item.icon} style={styles.icon}/>
                <Text style={styles.cz_name}>{item.name}</Text>
            </View>
        )
    }
    render() {

        return (
            <Modal
                style={styles.container}
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.container}>
                    <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                    <NavBar
                        leftIcon={require('../imgs/close_icon.png')}
                        leftFn={this.leftFn.bind(this)}
                        middleText='开奖查询'
                        modalState={true}
                    />
                    <TextInput
                        style={styles.inputIssue}
                    placeholder='输入期号,如 20170915'
                    underlineColorAndroid="transparent"
                        placeholderTextColor='#ddd'
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                    style={styles.caizhong}
                    >
                        <Text style={styles.cz_text}>请选择彩种</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}>
                        <Text style={styles.btn_text}>开始查询</Text>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.flatListStyle}
                        data={lotterys}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </Modal>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2',
        alignItems:'center',
    },
    inputIssue: {
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        padding:0,
        paddingLeft:cfn.picWidth(10),
        paddingRight:cfn.picWidth(10),
        marginTop:cfn.picHeight(40),
        backgroundColor:'#fff',
    },
    caizhong: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:cfn.picWidth(10),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    cz_text: {
        color:'#ddd'
    },
    btn: {
      width: cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#f82222',
        marginTop:cfn.picHeight(40),
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    btn_text: {
        color:'#fff'
    },
    flatListStyle: {
        marginTop:cfn.picHeight(-120),
        width: cfn.deviceWidth()-cfn.picWidth(40),
        backgroundColor:'#fff'
    },
    item_container: {
      width:cfn.deviceWidth()-cfn.picWidth(40) ,
        flexDirection:'row',
        height:cfn.picHeight(100),
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
    icon: {
        width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    cz_name: {
        fontSize:15,
        color:'#666',
        marginLeft:cfn.picWidth(20)
    }
});