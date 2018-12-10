cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        //创建物理世界
        var gravity = new b2Vec2(0, -10);
        window.world = new b2World(gravity, true);
    },

    start () {

    },

    update (dt) {
        world.Step(dt, 8, 3);
    },

    //重新开始当前关卡
    replay: function(){
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },
});
