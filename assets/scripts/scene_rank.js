

cc.Class({
    extends: cc.Component,

    properties: {
       content:{
           default:null,
           type:cc.Node,
       },
       item:{
           default:null,
           type:cc.Prefab,
       },
       chapter:{
           default:null,
           type:cc.Label,
       }
    },


    onLoad () {
        let self = this;
        this.chapter.string += CURR_CHAPTER_NUM;
        var socket = window.io('http://localhost:3000');
        socket.emit('rank', CURR_CHAPTER_NUM);
        socket.on('rankResult',function(result){
            for(let i=0;i<result.length;++i)
            {
                var node = cc.instantiate(self.item);
                var js = node.getComponent("item");
                js.setValue(i+1,result[i].name,result[i].score);
                self.content.addChild(node);
            } 
        });
    },

    //返回
    back:function(){
        cc.director.loadScene("Pass");
    }

});
