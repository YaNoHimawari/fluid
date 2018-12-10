cc.Class({
    extends: cc.Component,

    properties: {
       graphics:{
           default:null,
           type:cc.Graphics,
       },
       pipe:{
           default:null,
           type:cc.Node,
       }
    },

    start () {
        var shape = new b2PolygonShape;
        shape.SetAsBoxXYCenterAngle(1, 1, convertToPWorld(this.pipe.position), 0);

        var psd = new b2ParticleSystemDef();
        psd.radius = 0.04;
        //psd.dampingStrength = 0.1;
        var particleSystem = world.CreateParticleSystem(psd);

        var pd = new b2ParticleGroupDef();
        pd.shape = shape;
        var group = particleSystem.CreateParticleGroup(pd);

        var numParticles = particleSystem.GetParticleCount();
        var kForceMagnitude = 1.0;
        var direction = new b2Vec2(1, 0);
        var force = new b2Vec2();
        b2Vec2.MulScalar(force, direction, kForceMagnitude * numParticles);
        console.log(group, force);
        group.ApplyForce(force);
    },

    update (dt) {
        world.Step(dt, 8, 3);
        for (var i = 0, max = world.particleSystems.length; i < max; i++) {
            this.drawParticleSystem(world.particleSystems[i]);
        }
    },

    drawParticleSystem:function(system) {
        var particles = system.GetPositionBuffer();
        var maxParticles = particles.length;
        this.graphics.clear();
        for (var i = 0; i < maxParticles; i += 2) {
            this.insertParticleVertices(particles[i], particles[i + 1]);
        }
    },

    insertParticleVertices:function(x, y) {
        this.graphics.circle(x*SCALE, y*SCALE,0.1*SCALE);
        this.graphics.fill();
    },
});
