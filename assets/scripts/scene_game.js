cc.Class({
    extends: cc.Component,

    properties: {
        pen:{
            default:null,
            type:cc.Graphics,
        },
        vertices:null,
        bodys:null,
    },

    onLoad () {
        STRAT_FLAG = false;
        //创建物理世界
        var gravity = new b2Vec2(0, -10);
        window.world = new b2World(gravity, true);

        //开启事件监听
        this.node.on(cc.Node.EventType.TOUCH_START,this.draw_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.draw_move,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.draw_end,this);

        this.bodys = [];
    },

    update (dt) {
        world.Step(dt, 8, 3);
        if(this.bodys.length >0)
        {
            this.pen.clear();
        }
        for(let i=0;i<this.bodys.length;++i)
        {
            let center = this.bodys[i].GetPosition();
            let vertices = this.bodys[i].fixtures[0].shape.vertices;
            for(let j=0;j<vertices.length-1;++j)
            {
                let v1 = convertToNode(new b2Vec2(vertices[j].x+center.x,vertices[j].y+center.y));
                let v2 = convertToNode(new b2Vec2(vertices[j+1].x+center.x,vertices[j+1].y+center.y));
                this.pen.moveTo(v1.x,v1.y);
                this.pen.lineTo(v2.x,v2.y);
                this.pen.stroke();
            }
        }
    },

    draw_start:function(t){
        this.vertices = [];
    },

    draw_move:function(t){
        
        var position = t.getLocation();
        var nodeposition = this.pen.node.convertToNodeSpaceAR(position);
        if(this.vertices.length > 0)
        {
            var lastpoint = this.vertices[this.vertices.length-1];
            if((lastpoint.x === nodeposition.x) && (lastpoint.y === nodeposition.y))
            {
                return;
            }
            this.pen.moveTo(lastpoint.x, lastpoint.y);
            this.pen.lineTo(nodeposition.x, nodeposition.y);
            this.pen.stroke();
        }
        this.vertices.push(nodeposition);
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
        body.CreateFixtureFromShape(chainShape, 1);
        this.bodys.push(body);
        console.log(this.vertices.length);
        STRAT_FLAG = true;
    },

    //重新开始当前关卡
    replay:function(){
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },
});
