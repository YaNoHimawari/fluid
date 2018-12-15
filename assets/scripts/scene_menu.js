

cc.Class({
    extends: cc.Component,

    properties: {
    },

    //开始游戏
    startgame:function(){
        let scenenname = "Chapter" + MAX_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },

    //设置
    toSetting: function(){
        cc.director.loadScene("Setting");
    },

    //关卡选择
    toChapters: function(){
        cc.director.loadScene("Chapters");
    }
});
