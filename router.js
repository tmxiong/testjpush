import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import KjDetailPage from './views/detailPage/kjDetailPage';
import newsDetailPage from './views/detailPage/newsDetailPage'
import tipsDetailPage from './views/detailPage/tipsDetailPage'
import playTipsPage from './views/playTips';
import moreArticle from './views/moreArticle';
const routers = StackNavigator({
    Main: {screen: MainPage,},
    //Detail: {screen: DetailPagDe,},
    Kaijiang: {screen: KjDetailPage,},
    newsDetail: {screen: newsDetailPage,},
    tipsDetail: {screen: tipsDetailPage,},
    PlayTips: {screen: playTipsPage},
    MoreArticle: {screen: moreArticle}

});
module.exports = routers;