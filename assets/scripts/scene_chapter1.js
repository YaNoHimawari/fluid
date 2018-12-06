
cc.Class({
    extends: cc.Component,

    properties: {
        tst:{
            default:null,
            type:cc.Node,
        },
    },

    onLoad () {
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true; 
        
    },

    start () { 
        var timeCallback = function (dt) {
            console.log("start");
            var t = this.tst.getComponent(cc.RigidBody);
            t.type = 2;
        }
        this.schedule(timeCallback, 10);
    },

    // update (dt) {},

    replay: function(){
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },
});
