
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    onLoad () {
        var socket = window.io('http://localhost:3000');

        socket.emit('login', {'name':'wang','password':'123'});

        socket.on('answer',function(msg){
            console.log(msg);
        });
    },

    start () {

    },

    // update (dt) {},
});
