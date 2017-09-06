import {StackNavigator} from "react-navigation";
import MainPage from './views/mainPage';
import DetailPagDe from './views/detailPage'

const routers = StackNavigator({
    Main: {
        screen: MainPage,
    },
    Detail: {
        screen: DetailPagDe,

    },

});
module.exports = routers;