cc.Class({
    extends: cc.Component,

    properties: {
       graphics:{
           default:null,
           type:cc.Graphics,
       },
       outfall:{
           default:null,
           type:cc.Node,
       },
       box:{
           default:null,
           type:cc.Node,
       },
       hit:null,
       schedulefalg:null,
    },

    onLoad(){
        this.hit = 0;
        this.schedulefalg = false;
    },

    awake:function() {
        var shape = new b2PolygonShape;
        //shape.SetAsBoxXYCenterAngle(1, 1, convertToPWorld(this.pipe.position), 0);
        shape.SetAsBoxXYCenterAngle(1.5, 1.5, new b2Vec2(0,10), 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.05;
        psd.dampingStrength = 0.01;
        var particleSystem = world.CreateParticleSystem(psd);

        var pd = new b2ParticleGroupDef();
        pd.shape = shape;
        console.log(pd);
        var group = particleSystem.CreateParticleGroup(pd);

        // var numParticles = particleSystem.GetParticleCount();
        // var kForceMagnitude = 1.0;
        // var direction = new b2Vec2(1, 0);
        // var force = new b2Vec2();
        // b2Vec2.MulScalar(force, direction, kForceMagnitude * numParticles);
        // group.ApplyForce(force);
    },

    update (dt) {
        world.Step(dt, 8, 3);
        if(STRAT_FLAG)
        {
            if(world.particleSystems.length === 0)
            {
                this.awake();
            }
            for (var i = 0, max = world.particleSystems.length; i < max; i++) {
                this.drawParticleSystem(world.particleSystems[i]);
            }
        }
    },

    drawParticleSystem:function(system) {
        var particles = system.GetPositionBuffer();
        var maxParticles = particles.length;
        var count = 0;
        var minX = this.box.x-this.box.width/2;
        var maxX = this.box.x+this.box.width/2;
        var minY = this.box.y-this.box.height/2;
        var maxY = minY+this.box.height*0.8;
        this.graphics.clear();
        for (var i = 0; i < maxParticles; i += 2) {
            let x = particles[i]*SCALE;
            let y = particles[i+1]*SCALE;
            this.graphics.circle(x, y,0.055*SCALE);
            this.graphics.fill();
            if((minX<x && x<maxX) && (minY<y && y<maxY))
            {
                ++count;
            }
        }
        if(!this.schedulefalg && count > 0)
        {
            this.scheduleOnce(this.checkResult,5);
            this.schedulefalg = true;
        }
        if(count > 1000)
        {
            ++this.hit;
        }
    },

    checkResult:function(){
        if(this.hit > 50)
        {
            cc.director.loadScene("Pass");
        }
        else{
            console.log("false");
        }
    },
});
