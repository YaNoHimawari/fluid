cc.Class({
    extends: cc.Component,

    properties: {
        drawpen:{
            default:null,
            type:cc.Graphics,
        },
    },

    body:null,
    //flag:false,

    awake:function () {
        //绘制图形
        for(let i = 0;i<vertices.length-1;++i)
        {
            this.drawpen.moveTo(vertices[i].x,vertices[i].y);
            this.drawpen.lineTo(vertices[i+1].x,vertices[i+1].y);
            this.drawpen.stroke();
        }

        //创建物理实体
        var position = this.node.position;

        var bd = new b2BodyDef();
        bd.type = 2;
        bd.bullet = true;
        bd.position = convertToPWorld(position);
        this.body = world.CreateBody(bd);

        /*基于b2PolygonShape创建线条*/
        // for(let i = 0;i<vertices.length-1;++i)
        // {
        //     this.makeLine(vertices[i],vertices[i+1]);
        // }

        /*基于b2CircleShape+b2ChainShape创建线条*/
        var shape = new b2CircleShape();
        shape.position = convertToPWorld(vertices[0]);
        shape.radius = 0.1;
        this.body.CreateFixtureFromShape(shape, 100);

        var chainShape = new b2ChainShape();
        for(let i=0;i<vertices.length;++i)
        {
            chainShape.vertices.push(convertToPWorld(vertices[i]));
        }
        this.body.CreateFixtureFromShape(chainShape, 100);

        shape = new b2CircleShape();
        shape.position = convertToPWorld(vertices[vertices.length-1]);
        shape.radius = 0.1;
        this.body.CreateFixtureFromShape(shape, 100);

        STRAT_FLAG = true;
    },

    // makeLine:function(v1,v2){
    //     let v = v1.sub(v2);
    //     if(v.y < 0)
    //     {
    //         v.negSelf();
    //     }
    //     let width = v.mag();
    //     let angle = v.angle(cc.v2(1,0));
    //     var shape = new b2PolygonShape();
    //     shape.SetAsBoxXYCenterAngle(width/2/SCALE,0.08,convertToPWorld(cc.v2((v1.x+v2.x)/2,(v1.y+v2.y)/2)),angle);
    //     this.body.CreateFixtureFromShape(shape, 10);
    // },

    update(dt){
        if(STRAT_FLAG)
        {
            this.node.position = convertToNode(this.body.GetPosition());
            this.node.rotation = -this.body.GetAngle()/RADTODEG;
            // this.drawpen.clear();
            // var fixtures = this.body.fixtures;
            // for(let i = 0;i<fixtures.length;++i)
            // {
            //     let vs = fixtures[i].shape.vertices;
            //     this.drawpen.moveTo(vs[0].x*SCALE,vs[0].y*SCALE);
            //     this.drawpen.lineTo(vs[2].x*SCALE,vs[2].y*SCALE);
            //     this.drawpen.stroke();
            // }
        }    
    }
});
