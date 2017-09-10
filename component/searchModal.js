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
import Loading from'../component/loading'
export default class searchModal extends PureComponent {

    static defaultProps = {
        visible: false,
        closeModal: ()=> {
        }
    };

    constructor(props) {
        super(props);
        this.listHeight = cfn.deviceHeight() - cfn.picHeight(120)
        this.state = {
            issueNum:null,
            id:null,
            name: null,
            showList: false,
            listHeight:0,
            lotteryView:null,
            data:null,
            codeView: null,

            isLoading:false,
            isError: false,
        }
    }

    _keyExtractor=(item, index) => item.id;

    leftFn() {
        this.props.closeModal();
    }

    renderItem({item, index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.isShowList(false,
                    {icon:item.icon,name:item.name,id:item.id})}
                style={styles.item_container}>
                <Image source={item.icon} style={styles.icon}/>
                <Text style={styles.cz_name}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    isShowList(isShow,item) {
        if(isShow){
            this.setState({listHeight:this.listHeight})
        } else {
            let lotteryView = <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={item.icon} style={{
                    width:cfn.picWidth(50),
                    height:cfn.picWidth(50),
                    resizeMode:'contain',
                }}/>
                <Text style={styles.cz_name}>{item.name}</Text>
            </View>;
            this.setState({
                listHeight: 0,
                id: item.id,
                name: item.name,
                lotteryView: lotteryView
            })
        }

    }

    search(){
        const{issueNum} = this.state;
        var reg = new RegExp(/^(\d)*$/)
        if(!issueNum) {
            return alert('请输入期号');
        }else if(!reg.test(issueNum)) {
            return alert('期号只能是数字');
        }else if(!this.state.lotteryView) {
            return alert('请选择彩种');
        }
        this.getData(issueNum,this.state.id);
    }

    getData(num,id) {
        this.setState({
            isLoading:true,
            isError: false,
            codeView:null,
        });
        let url = 'http://uat.jiangyuan365.com/K259af8fe260271/'+num+'/'+id+'.json'
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        this.setState({isLoading:false, isError:true});
    }

    setData(data) {
        if(data.error) {
            this.setState({isLoading: false, isError:false});
            if(data.error == 'No data') {
                return alert('您输入的期号有误，请核对后重新输入');
            }  else {
                return alert('未知错误，请联系客服反馈');
            }
        }
        this.setState({data:data, isLoading: false, isError:false});
        this.renderCode(data);
    }

    renderCode(data) {
        let codes = data[0].code.split(',');
        let issueView = [];
        for(let i = 0; i < codes.length; i++) {
            issueView.push(
                <View
                    key={i}
                    style={{
                        width:cfn.picWidth(70),
                        height:cfn.picWidth(70),
                        borderRadius:cfn.picWidth(35),
                        borderWidth:2,
                        borderColor:'#b22222',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:cfn.picWidth(20),
                        marginRight:cfn.picWidth(10)
                    }}
                >
                    <Text style={{fontSize:20, color:'#b22222'}}>{codes[i]}</Text>
                </View>
            )
        }
        this.setState({
            codeView: (<View style={styles.result_container}>
                <View style={{
                    flexDirection:'row',alignItems:'center',

                }}>
                    <Image style={{
                        width:cfn.picWidth(80),
                        height:cfn.picWidth(80),
                        resizeMode:'contain',
                    }} source={require('../imgs/lotteryIcons/cqssc.png')}/>
                    <Text style={{
                        fontSize:20,
                        marginLeft:cfn.picWidth(20)
                    }}>{this.state.name}</Text>
                </View>
                <Text style={{marginTop:cfn.picHeight(20)}}>{data[0].opendate}</Text>
                <Text style={{marginTop:cfn.picHeight(20)}}>第 {data[0].issue} 期</Text>
                <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                    {issueView}
                </View>
            </View>)
        })
    }

    render() {
        const {lotteryView} = this.state;
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
                        placeholder='输入期号,如 20170909042'
                        underlineColorAndroid="transparent"
                        placeholderTextColor='#ddd'
                        onChangeText={(text)=>this.setState({issueNum:text})}
                    />
                    <TouchableOpacity
                        onPress={()=>this.isShowList(true)}
                        activeOpacity={1}
                        style={styles.caizhong}
                    >
                        {lotteryView ? lotteryView : <Text style={styles.cz_text}>请选择彩种</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.search()}
                        activeOpacity={0.8}
                        style={styles.btn}>
                        <Text style={styles.btn_text}>开始查询</Text>
                    </TouchableOpacity>
                    <View style={[styles.flatListStyle,{height:this.state.listHeight}]}>
                         <FlatList
                            data={lotterys}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                    {this.state.codeView}
                    <Loading
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    reload={()=>this.getData(this.state.issueNum,this.state.id)}
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
        backgroundColor:'#fff',
        zIndex:9
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
    },
    result_container: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        padding:cfn.picWidth(20),
        marginTop:cfn.picHeight(150),
        borderTopColor:'#ddd',
        borderTopWidth:1,
        flexWrap:'wrap'
    }
});