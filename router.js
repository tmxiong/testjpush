import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import DetailPagDe from './views/detailPage/detailPage'
import KjDetailPage from './views/detailPage/kjDetailPage';
const routers = StackNavigator({
    Main: {screen: MainPage,},
    Detail: {screen: DetailPagDe,},
    Kaijiang: {screen: KjDetailPage,}

});
module.exports = routers;