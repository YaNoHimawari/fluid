

cc.Class({
    extends: cc.Component,

    properties: {
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},

    //返回主页面
    toMenu: function(){
        cc.director.loadScene("MainMenu");
    },

    //跳转至指定关卡
    toChapter: function(event, customEventData){
        var scenename = "Chapter" + customEventData.toString();
        cc.director.loadScene(scenename);
    },
});
