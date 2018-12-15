cc.Class({
    extends: cc.Component,

    properties: {
        //绘制用笔
        drawpen:{
            default:null,
            type:cc.Graphics,
        },
        //更新绘制组件用笔
        updatepen:{
            default:null,
            type:cc.Graphics,
        },
        //墨水条
        inkbar:{
            default:null,
            type:cc.Node,
        },
        //墨水值
        inkvalue:{
            default:null,
            type:cc.Label,
        },  
    },

    vertices:null,      //节点存储数组
    bodys:null,         //组件存储数组

    onLoad () {
        STRAT_FLAG = false;
        SCORE = 100;
        this.bodys = [];

        //创建物理世界
        var gravity = new b2Vec2(0, -10);
        world = new b2World(gravity, true);

        //开启事件监听
        this.node.on(cc.Node.EventType.TOUCH_START,this.draw_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.draw_move,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.draw_end,this);
    },

    update (dt) {
        world.Step(dt, 8, 3);
        if(this.bodys.length >0)
        {
            this.updatepen.clear();
        }
        for(let i=0;i<this.bodys.length;++i)
        {
            let center = this.bodys[i].GetPosition();
            let vertices = this.bodys[i].fixtures[0].shape.vertices;
            for(let j=0;j<vertices.length-1;++j)
            {
                let v1 = convertToNode(new b2Vec2(vertices[j].x+center.x,vertices[j].y+center.y));
                let v2 = convertToNode(new b2Vec2(vertices[j+1].x+center.x,vertices[j+1].y+center.y));
                this.updatepen.moveTo(v1.x,v1.y);
                this.updatepen.lineTo(v2.x,v2.y);
                this.updatepen.stroke();
            }
        }
    },

    draw_start:function(t){
        this.vertices = [];
    },

    draw_move:function(t){
        var position = t.getLocation();
        var nodeposition = this.drawpen.node.convertToNodeSpaceAR(position);
        if(this.vertices.length > 0)
        {
            var lastpoint = this.vertices[this.vertices.length-1];
            if((lastpoint.x === nodeposition.x) && (lastpoint.y === nodeposition.y))
            {
                return;
            }
            this.drawpen.moveTo(lastpoint.x, lastpoint.y);
            this.drawpen.lineTo(nodeposition.x, nodeposition.y);
            this.drawpen.stroke();
        }
        this.vertices.push(nodeposition);
        this.inkvalue.string = SCORE = SCORE - 1;
        this.inkbar.width = 250 * SCORE / 100;
        if(SCORE < 1)
        {
            this.draw_end();
            //关闭事件监听
            this.node.off(cc.Node.EventType.TOUCH_START,this.draw_start,this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE,this.draw_move,this);
            this.node.off(cc.Node.EventType.TOUCH_END,this.draw_end,this);
        }
    },

    draw_end:function(t){
        if(this.vertices.length === 0)
        {
            return;
        }
        var bd = new b2BodyDef();
        bd.type = 2;
        var body = world.CreateBody(bd);
        var chainShape = new b2ChainShape();
        for(let i=0;i<this.vertices.length;++i)
        {
            chainShape.vertices.push(convertToPWorld(this.vertices[i]));
        }
        body.CreateFixtureFromShape(chainShape, 15);
        this.bodys.push(body);
        
        this.drawpen.clear();
        STRAT_FLAG = true;
    },

    //重新开始当前关卡
    replay:function(){
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },

    //返回主页
    home:function(){
        cc.director.loadScene("MainMenu");
    },
});
