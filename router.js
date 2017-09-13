import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import KjDetailPage from './views/detailPage/kjDetailPage';
import newsDetailPage from './views/detailPage/newsDetailPage'
import tipsDetailPage from './views/detailPage/tipsDetailPage'
import playTipsPage from './views/playTips';
import moreArticle from './views/moreArticle';
import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
const routers = StackNavigator({
    launch: {screen: launchPage},
    Main: {screen: MainPage,},
    //Detail: {screen: DetailPagDe,},
    Kaijiang: {screen: KjDetailPage,},
    newsDetail: {screen: newsDetailPage,},
    tipsDetail: {screen: tipsDetailPage,},
    PlayTips: {screen: playTipsPage},
    MoreArticle: {screen: moreArticle},
    Welcome: {screen: welcomePage},

});
module.exports = routers;