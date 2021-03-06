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
    Button,
    FlatList,

} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../../tools/commonFun';
import NavBar from '../../component/NavBar'
import Loading from '../../component/loading'
const base_url = 'http://www.jiangyuan365.com/K259af8fe260271/';
export default class kjDetailPage extends Component {

    static navigationOptions = {header: null};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false
        };

        this.lotteryID = this.props.navigation.state.params.id;
        this.lotteryIcon = this.props.navigation.state.params.icon
    }

    _keyExtractor = (item, index) => item.issue;

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({
            isLoading:true,
            isError: false,
        });
        fetch(base_url + this.lotteryID + '-10.json')
            .then((res)=>res.json())
            .then((data)=>this.onSucess(data))
            .catch((error)=>this.onError())
    }

    onSucess(data) {
        this.setState({
            data: data,
            isLoading: false
        })
    }

    onError() {
        this.setState({isError: true});
    }

    renderItem({item, index}) {
        let codes = item.code.split(',');
        let codeView = [];
        let codeStyle = styles.code;
        let codeText = styles.codeText;

        if(codes.length > 7 && codes.length <= 10) {
            codeStyle = styles.code_7_10;
        } else if(codes.length > 10){
            codeStyle = styles.code_10;
            codeText = styles.codeText_10;
        }

        for (let i = 0; i < codes.length; i++) {
            codeView.push(
                <View
                    key={'c' + i}
                    style={codeStyle}>
                    <Text style={codeText}>{codes[i]}</Text>
                </View>
            )
        }
        return (
            <View
                key={'a' + index}
                style={styles.item_container}>
                <View style={styles.icon_container}>
                    <Image
                        style={styles.icon}
                        source={this.lotteryIcon}/>
                    <View style={styles.border_right}/>
                </View>

                <View style={styles.issue_container}>
                    <Text style={styles.issue_text}>第 {item.issue} 期</Text>
                    <Text style={styles.date_text}>{item.opendate}</Text>
                </View>
                <View style={styles.code_container}>
                    {codeView}
                </View>
                <View style={styles.border}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={this.props.navigation.state.params.title}
                    leftFn={this.props.navigation.goBack.bind(this)}
                />
                <FlatList
                    //style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
                <Loading
                    reload={this.getData.bind(this)}
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                />
            </View>)
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    item_container: {
        height: cfn.picHeight(140),
        width: cfn.deviceWidth(),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    border: {
        backgroundColor: '#ddd',
        height: 1,
        width: cfn.deviceWidth() - cfn.picWidth(40),
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    icon_container: {
        width: cfn.picWidth(140),
        height: cfn.picWidth(140),
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        left:0,
        flexDirection:'row',
    },
    icon: {
        width: cfn.picWidth(100),
        height: cfn.picWidth(100),
        resizeMode: 'contain',
    },
    border_right: {
        backgroundColor:'#ddd',
        width: 1,
        height:cfn.picHeight(100),
        position: 'absolute',
        right:0
    },
    issue_container: {
        flexDirection: 'row',
        marginLeft: cfn.picWidth(160),
        alignItems: 'center'
    },
    issue_text: {
        color: '#b22222',
        fontSize: 12
    },
    date_text: {
        fontSize: 12,
        marginLeft: cfn.picWidth(20),
        color: '#888'
    },
    code_container: {
        width: cfn.deviceWidth() - cfn.picWidth(150),
        height: cfn.picWidth(60),
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: cfn.picWidth(160),
        alignItems: 'center',
        marginTop: cfn.picHeight(10)
    },
    codeText: {
        color:'#b22222',
        fontSize:18,
        fontWeight:'bold'
    },
    codeText_10: {
        color:'#b22222',
        fontSize:10,
    },
    code: {
        width: cfn.picWidth(60),
        height: cfn.picWidth(60),
        borderRadius: cfn.picWidth(30),
        //backgroundColor: '#f89',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#b22222',
        justifyContent: 'center',
        marginRight: cfn.picWidth(20),
    },
    code_7_10: {
        width: cfn.picWidth(50),
        height: cfn.picWidth(50),
        borderRadius: cfn.picWidth(25),
        //backgroundColor: '#f89',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#b22222',
        justifyContent: 'center',
        marginRight: cfn.picWidth(7),
    },
    code_10: {
        width: cfn.picWidth(30),
        height: cfn.picWidth(30),
        borderRadius: cfn.picWidth(15),
        //backgroundColor: '#f89',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#b22222',
        justifyContent: 'center',
        marginRight: cfn.picWidth(7),
        marginTop:cfn.picHeight(5)
    }

});
