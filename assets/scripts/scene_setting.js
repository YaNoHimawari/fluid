

cc.Class({
    extends: cc.Component,

    properties: {
       playername:{
           default:null,
           type:cc.Label,
       },
       status:{
           default:null,
           type:cc.Label,
       }
    },

   
    onLoad () {
        if(USER_NAME !== "")
        {
            this.playername.string = USER_NAME;
            this.status.string = "注销";
        }
    },

    //登录or注销
    changeStatus:function(){
        if(this.status.string === "登录")
        {
            cc.director.loadScene("Login");
        }
        if(this.status.string === "注销")
        {
            USER_NAME = "";
            CURR_CHAPTER_NUM = MAX_CHAPTER_NUM = 1;
            this.playername.string = USER_NAME;
            this.status.string = "登录";
        }
    },

    //回到主菜单
    toMenu: function(){
        cc.director.loadScene("MainMenu");
    }
});
