
cc.Class({
    extends: cc.Component,

    properties: {
        body:null,
        pen:{
                default:null,
                type:cc.Graphics,
        }
    },


    onLoad () {
        //创建物理世界
        var gravity = new b2Vec2(0, -10);
        window.world = new b2World(gravity, true);

        this.node.on(cc.Node.EventType.TOUCH_START,function(t){
            console.log("touch start!");
        })
    },

    start () {
        var points = [];
        points.push(cc.v2(-20,20));
        points.push(cc.v2(-20,-20));
        points.push(cc.v2(20,-20));
        points.push(cc.v2(20,20));
        for(let i=0;i<points.length-1;++i)
        {
            this.pen.moveTo(points[i].x,points[i].y);
            this.pen.lineTo(points[i+1].x,points[i+1].y);
            this.pen.stroke();
        }
        var bd = new b2BodyDef();
        bd.type = 2;
        this.body = world.CreateBody(bd);
        var chainShape = new b2ChainShape();
        for(let j=0;j<points.length;++j)
        {
            chainShape.vertices.push(convertToPWorld(points[j]));
        }
        this.body.CreateFixtureFromShape(chainShape, 0.1);
    },

    update (dt) {
        if(this.body)
        console.log(this.body);
    },
});
