// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        world:{
            default:null,
        },
        body:{
            default:null,
         },
         liquid:null,
         item:{
             default:null,
             type:cc.Prefab,
         },
         point :{
             default:null,
         }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // //开启物理引擎
        // cc.director.getPhysicsManager().enabled = true; 
        // //开启调试绘制
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit;

        var gravity = new b2Vec2(0, -10);
        window.world = new b2World(gravity, true);
        this.liquid = [];
        this.point = new b2Vec2(0, 0);
    },

    start () {
        let visibleSize = cc.director.getVisibleSize();
        this.visibleSize = visibleSize;
        
        let SCALE = 10;
        this.SCALE = SCALE;
        
        let DEGTORAD = Math.PI/180;
        
        let RADTODEG = 180/Math.PI;
        this.RADTODEG = RADTODEG;
        
        let worldPoint = this.convertToWorld();
        
        var shape = new b2PolygonShape;
        shape.SetAsBoxXYCenterAngle(0.8, 1, worldPoint, 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.025;
        psd.dampingStrength = 0.2;

        var particleSystem = world.CreateParticleSystem(psd);

        var pd = new b2ParticleGroupDef();
        pd.shape = shape;
        var group = particleSystem.CreateParticleGroup(pd);
        this.bodyA = particleSystem;
        
        var count = this.bodyA.GetParticleCount();
        for(let i =0;i<count/2;++i)
        {
            var t = cc.instantiate(this.item);
            this.node.addChild(t);
            this.liquid.push(t);
        }
        console.log(this.liquid);
        console.log(this.bodyA.GetParticleCount());
        console.log(this.bodyA.GetPositionBuffer());
    },

    
    update (dt) {
        world.Step(dt, 10, 10);
        var count = this.bodyA.GetParticleCount();
        let positions = this.bodyA.GetPositionBuffer();
        for(let i = 0;i< count/2;++i)
        {
            this.liquid[i].x = positions[2*i];
            this.liquid[i].y = positions[2*i+1];
            //console.log(this.liquid[i]);
        }
        //console.log(this.liquid[45].position);
    },

    convertToWorld:function(){
        let leftDownPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        return cc.v2(leftDownPos.x/this.SCALE,(this.visibleSize.height-leftDownPos.y)/this.SCALE);
    },
    
    convertToNode:function(worldPoint){
        let leftUpPos = cc.pMult(worldPoint,this.SCALE);
        let leftDownPosInWorldPixel = cc.v2(leftUpPos.x,(this.visibleSize.height-leftUpPos.y));
        let leftDownPos =  this.node.parent.convertToNodeSpaceAR(leftDownPosInWorldPixel);
        return leftDownPos;
    },
});


