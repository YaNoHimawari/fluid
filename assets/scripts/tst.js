
cc.Class({
    extends: cc.Component,

    properties: {
        world:{
            default:null,
        },
        bodyA:{
            default:null,
         },
         liquid:null,
         item:{
             default:null,
             type:cc.Prefab,
         },
         point :{
             default:null,
         },
         drawLf:{
             default:null,
             type:cc.Graphics,
         },
         vertices:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true; 
        // //开启调试绘制
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit;

        var gravity = new b2Vec2(0, -10);
        window.world = new b2World(gravity, true);
        this.liquid = [];
        this.vertices = [];
        this.point = new b2Vec2(0, 0);
    },

    start () {
        var bd = new b2BodyDef;
        var body = world.CreateBody(bd);
        var shape = new b2EdgeShape;
        shape.Set(new b2Vec2(-5, 0), new b2Vec2(5, 0));
        body.CreateFixtureFromShape(shape, 0.1);

        var shape2 = new b2PolygonShape;
        shape2.SetAsBoxXYCenterAngle(1, 1, new b2Vec2(0, 10), 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.04;
        //psd.dampingStrength = 0.1;

        var particleSystem = world.CreateParticleSystem(psd);

        var pd = new b2ParticleGroupDef();
        pd.shape = shape2;
        var group = particleSystem.CreateParticleGroup(pd);
    },

    
    update (dt) {
        world.Step(dt, 8, 3);
        for (var i = 0, max = world.particleSystems.length; i < max; i++) {
            this.drawParticleSystem(world.particleSystems[i]);
        }
    },

    // convertToWorld:function(){
    //     let leftDownPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
    //     return cc.v2(leftDownPos.x/this.SCALE,(this.visibleSize.height-leftDownPos.y)/this.SCALE);
    // },
    
    // convertToNode:function(worldPoint){
    //     let leftUpPos = cc.pMult(worldPoint,this.SCALE);
    //     let leftDownPosInWorldPixel = cc.v2(leftUpPos.x,(this.visibleSize.height-leftUpPos.y));
    //     let leftDownPos =  this.node.parent.convertToNodeSpaceAR(leftDownPosInWorldPixel);
    //     return leftDownPos;
    // },

    drawParticleSystem:function(system) {
        var particles = system.GetPositionBuffer();
        var maxParticles = particles.length,
          transform = new b2Transform();
        transform.SetIdentity();
        this.drawLf.clear();
        for (var i = 0; i < 1500; i += 2) {
            this.insertParticleVertices(5, particles[i], particles[i + 1]);
        }
    },

    insertParticleVertices:function(radius, x, y) {
        this.drawLf.circle(x*32, y*32,radius);
        this.drawLf.fill();
    },

});


