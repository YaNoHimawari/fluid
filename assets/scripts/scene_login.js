
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
    logIn:function(){
        var player = {'name':this.account.string, 'password':this.password.string};
        var socket = window.io('http://localhost:3000');
        socket.emit('login', player);
        socket.on('loginResult',function(msg){
            if(msg !== null)
            {
                USER_NAME = msg.name;
                CURR_CHAPTER_NUM = MAX_CHAPTER_NUM = msg.maxc;
                cc.director.loadScene("Setting");
            }
            else{
                this.message.string = "登录失败";
            }
        });
    },

    //注册
    signIn:function(){
        cc.director.loadScene("Signin");
    },

    //返回设置
    back:function(){
        cc.director.loadScene("Setting");
    },
});
