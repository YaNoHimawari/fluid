cc.Class({
    extends: cc.Component,

    properties: {
        //绘制用笔
        drawpen:{
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
        //线条节点
        line:{
            default:null,
            type:cc.Prefab,
        },  
    },

    vertices:null,      //节点存储数组
    bodys:null,         //组件存储数组
    sumlength:null,     //线条累加长度
    lastpoint:null,     //最后一个点

    onLoad () {
        STRAT_FLAG = false;
        SCORE = 100;
        this.bodys = [];

        //创建物理世界
        if(world === null)
        {
            let gravity = new b2Vec2(0, -10);    //重力值
            world = new b2World(gravity, true);
        } else {
            while (world.joints.length > 0) {
              world.DestroyJoint(world.joints[0]);
            }
            while (world.bodies.length > 0) {
              world.DestroyBody(world.bodies[0]);
            }
            while (world.particleSystems.length > 0) {
              world.DestroyParticleSystem(world.particleSystems[0]);
            }
        }
        //开启事件监听
        this.node.on(cc.Node.EventType.TOUCH_START,this.draw_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.draw_move,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.draw_end,this);
    },

    update (dt) {
        world.Step(dt, 8, 3);
        this.inkvalue.string = SCORE;
        this.inkbar.width = 250 * SCORE / 100;
    },

    draw_start:function(t){
        this.vertices = [];
        this.sumlength = 0.0;
        this.lastpoint = null;
        SCORE = SCORE - 1;
    },

    draw_move:function(t){
        var position = t.getLocation();
        var nodeposition = this.drawpen.node.convertToNodeSpaceAR(position);

        if(this.lastpoint === null)
        {
            this.lastpoint = nodeposition;
            this.vertices.push(nodeposition);
            return;
        }

        if((this.lastpoint.x === nodeposition.x) && (this.lastpoint.y === nodeposition.y))
        {
            return;
        }
        this.drawpen.moveTo(this.lastpoint.x, this.lastpoint.y);
        this.drawpen.lineTo(nodeposition.x, nodeposition.y);
        this.drawpen.stroke();
        this.lastpoint = nodeposition;

        var delta = t.getDelta();
        this.sumlength += delta.mag();
        let flag = false;
        while(this.sumlength >= MAG)
        {
            flag = true;
            this.sumlength -= MAG;
            SCORE = SCORE - 1;
        }
        if(flag)
        {
            this.vertices.push(nodeposition);
        }
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
        vertices = this.vertices;
        var node = cc.instantiate(this.line);
        node.parent = this.node;
        var js = node.getComponent("line"); 
        js.awake();
        // var bd = new b2BodyDef();
        // bd.type = 2;
        // var body = world.CreateBody(bd);
        // var chainShape = new b2ChainShape();
        // for(let i=0;i<this.vertices.length;++i)
        // {
        //     chainShape.vertices.push(convertToPWorld(this.vertices[i]));
        // }
        // body.CreateFixtureFromShape(chainShape, 15);
        // this.bodys.push(body);
        
        this.drawpen.clear();
    },

    //重新开始当前关卡
    replay:function(){
        if (world !== null) {
            while (world.joints.length > 0) {
              world.DestroyJoint(world.joints[0]);
            }
            while (world.bodies.length > 0) {
              world.DestroyBody(world.bodies[0]);
            }
            while (world.particleSystems.length > 0) {
              world.DestroyParticleSystem(world.particleSystems[0]);
            }
        }
        let scenenname = "Chapter" + CURR_CHAPTER_NUM.toString();
        cc.director.loadScene(scenenname);
    },

    //返回主页
    home:function(){
        cc.director.loadScene("MainMenu");
    },
});
