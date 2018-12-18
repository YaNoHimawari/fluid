
cc.Class({
    extends: cc.Component,

    properties: {
       score:{
           default:null,
           type:cc.Label,
       },
       nextnode:{
           default:null,
           type:cc.Node,
       },
    },

    onLoad () {
        this.score.string = SCORE;
        if(CURR_CHAPTER_NUM + 1 > MAX_CHAPTER_COUNT)
        {
            MAX_CHAPTER_NUM = MAX_CHAPTER_COUNT;
            this.nextnode.active = false;
        }
        else if(CURR_CHAPTER_NUM + 1 > MAX_CHAPTER_NUM)
        {
            MAX_CHAPTER_NUM = CURR_CHAPTER_NUM + 1;
        }
        else{
            return;
        }
        
    },

    //下一关卡
    next:function(){
        if(USER_NAME !== "")
        {
            var socket = window.io('http://localhost:3000');
            var data = {'name':USER_NAME, 'num':MAX_CHAPTER_NUM};
            socket.emit('updateC', data);
        }
        CURR_CHAPTER_NUM = CURR_CHAPTER_NUM + 1;
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },

    //主页
    home:function(){
        cc.director.loadScene("MainMenu");
    },

    //重新开始
    replay:function(){
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },

    //排行榜
    rank:function(){
        cc.director.loadScene("Rank");
    }, 
});
