window.CURR_CHAPTER_NUM = 1;    //当前关卡
window.MAX_CHAPTER_NUM = 1;     //用户最大可选关卡
window.USER_NAME = "";          //用户名

window.world = null;            //物理世界
window.vertices = [];           //线条节点数组
window.STRAT_FLAG = false;      //物理世界开启标志
window.SCALE = 32;              //物理世界距离转化值
window.RADTODEG = Math.PI/180;  //物理世界角度转化值
window.SCORE = 100;             //当前关卡得分
window.MAX_CHAPTER_COUNT = 15;   //游戏最大关卡数
window.LIQUID_COUNT = 540;      //过关粒子数
window.MAG = 20;                //一点得分等价的距离

window.address = 'http://47.112.20.107:3000'; //服务器地址


window.convertToPWorld = function(position){
    let leftDownPos = position;
    return new b2Vec2(leftDownPos.x/SCALE,leftDownPos.y/SCALE);
}

window.convertToNode = function(worldPoint){
    let leftUpPos = cc.pMult(worldPoint,SCALE);
    let leftDownPos = cc.v2(leftUpPos.x,leftUpPos.y);
    return leftDownPos;
}