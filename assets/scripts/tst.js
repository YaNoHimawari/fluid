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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true; 
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;
        initTestbed();
    },

    start () {
        camera.position.y = 2;
        camera.position.z = 3;
        var bodyDef = new b2BodyDef();
        var ground = world.CreateBody(bodyDef);

        var chainShape = new b2ChainShape();
        chainShape.vertices.push(new b2Vec2(-2, 0));
        chainShape.vertices.push(new b2Vec2(2, 0));
        chainShape.vertices.push(new b2Vec2(2, 4));
        chainShape.vertices.push(new b2Vec2(-2, 4));

        chainShape.CreateLoop();
        ground.CreateFixtureFromShape(chainShape, 0);

        var shape = new b2PolygonShape;
        shape.SetAsBoxXYCenterAngle(0.8, 1, new b2Vec2(-1.2, 1.01), 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.025;
        psd.dampingStrength = 0.2;

        var particleSystem = world.CreateParticleSystem(psd);

        var pd = new b2ParticleGroupDef();
        pd.shape = shape;
        var group = particleSystem.CreateParticleGroup(pd);

        // var bodyDef = new b2BodyDef(); 
        // bodyDef.position.Set(50,50);
        // var circleShape = new b2CircleShape();
        // circleShape.radius = 10;
        // // var fixtureDef = new b2FixtureDef();
        // // fixtureDef.shape = circleShape;
        // // fixtureDef.density = 1;
        // // fixtureDef.restitution = .6;
        // // fixtureDef.friction = .1;
        // var theBall = world.CreateBody(bodyDef);
        // theBall.CreateFixtureFromShape(circleShape, 1);
        // console.log(theBall);
        // console.log("finished!");
        // setInterval(function(){
        //     world.Step(1/30,10,10);
        //     //world.ClearForces(); // 清除作用力
        // }, 1000 / 60);
    },

    
    // update (dt) {},
});


