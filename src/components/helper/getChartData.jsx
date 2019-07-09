import getFall from './getFall';
import getSmile from './getSmile';
import getInvade from './getInvade';
import getForbidden from './getForbidden';


function getChartData(){
    getFall();
    getSmile();
    getInvade();
    getForbidden();
}

export default getChartData;