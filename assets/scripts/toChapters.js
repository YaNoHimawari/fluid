//跳转至关卡选择页面
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            cc.director.loadScene("Chapters");
          }, this);
    },

});
