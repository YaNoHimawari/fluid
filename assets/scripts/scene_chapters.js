

cc.Class({
    extends: cc.Component,

    properties: {
        view:{
            default:null,
            type:cc.Node,
        },
        chapter:{
            default:null,
            type:cc.Prefab,
        }
    },


    onLoad () {
        for(let i = 1;i <= MAX_CHAPTER_COUNT;++i)
        {
            var node = cc.instantiate(this.chapter);
            node.parent = this.view;
            var js = node.getComponent("chapter");
            js.setNum(i);
            if(MAX_CHAPTER_NUM < i)
            {
                js.setEnable();
            } 
        }  
    },


    //返回主页面
    toMenu: function(){
        cc.director.loadScene("MainMenu");
    },

});
