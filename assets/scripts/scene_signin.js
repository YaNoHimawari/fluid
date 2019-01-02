
cc.Class({
    extends: cc.Component,

    properties: {
       account:{
           default:null,
           type:cc.EditBox,
       },
       password:{
           default:null,
           type:cc.EditBox,
       },
       message:{
           default:null,
           type:cc.Label,
       },
    },


    //注册
    signin:function(){
        let self = this;
        var player = {'name':this.account.string, 'password':this.password.string};
        var socket = window.io(address);
        socket.emit('signin', player);
        socket.on('signinResult',function(result){
            if(result)
            {
                USER_NAME = player.name;
                CURR_CHAPTER_NUM = MAX_CHAPTER_NUM = 1;
                cc.director.loadScene("Setting");
            }
            else{
                self.message.string = "注册失败";
            }
        });
    },

    //返回登录
    back:function(){
        cc.director.loadScene("Login");
    },
});
