
cc.Class({
    extends: cc.Component,

    properties: {
      num:{
          default:null,
          type:cc.Label,
      },
      button:{
          default:null,
          type:cc.Button,
      }
    },

    //设为不可交互
    setEnable:function(){
        this.button.interactable = false;
    },

    //设置数字
    setNum:function(n){
        this.num.string = n;
    },

    //跳转至指定关卡
    toChapter: function(){
        if(this.num.string === "")
        {
            return;
        }
        CURR_CHAPTER_NUM = Number(this.num.string);
        var scenename = "Chapter" + CURR_CHAPTER_NUM;
        cc.director.loadScene(scenename);
    },
  
});
