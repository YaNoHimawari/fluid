

cc.Class({
    extends: cc.Component,

    properties: {
        rank:{
            default:null,
            type:cc.Label,
        },
        pname:{
            default:null,
            type:cc.Label,
        },
        score:{
            default:null,
            type:cc.Label,
        }
    },


    //设置值
    setValue:function(rank,name,score){
        this.rank.string = rank;
        this.pname.string = name;
        this.score.string = score;
    },

    
});
