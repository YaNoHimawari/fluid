
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


    //登录
    login:function(){
        let self = this;
        var player = {'name':this.account.string, 'password':this.password.string};
        var socket = window.io(address);
        socket.emit('login', player);
        socket.on('loginResult',function(result){
            if(result !== null)
            {
                USER_NAME = result.name;
                CURR_CHAPTER_NUM = MAX_CHAPTER_NUM = result.maxC;
                cc.director.loadScene("Setting");
            }
            else{
                self.message.string = "登录失败";
            }
        });
    },

    //注册
    signin:function(){
        cc.director.loadScene("Signin");
    },

    //返回设置
    back:function(){
        cc.director.loadScene("Setting");
    },
});
