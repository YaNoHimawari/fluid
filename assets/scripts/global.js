window.CURR_CHAPTER_NUM = 1;
window.MAX_CHAPTER_NUM = 1;
window.USER_ID = 1;
window.USER_NAME = "user";

window.SCALE = 30;

window.convertToPWorld = function(position){
    let leftDownPos = position;
    return new b2Vec2(leftDownPos.x/SCALE,leftDownPos.y/SCALE);
}

window.convertToNode = function(worldPoint){
    let leftUpPos = cc.pMult(worldPoint,SCALE);
    let leftDownPos = cc.v2(leftUpPos.x,leftUpPos.y);
    return leftDownPos;
}