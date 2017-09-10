import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import KjDetailPage from './views/detailPage/kjDetailPage';
import articleDetailPage from './views/detailPage/articleDetailPage'
const routers = StackNavigator({
    Main: {screen: MainPage,},
    //Detail: {screen: DetailPagDe,},
    Kaijiang: {screen: KjDetailPage,},
    Article: {screen: articleDetailPage,}

});
module.exports = routers;