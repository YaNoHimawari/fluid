//跳转至主页面
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            cc.director.loadScene("MainMenu");
          }, this);
    },

});
