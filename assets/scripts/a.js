
cc.Class({
    extends: cc.Component,

    properties: {
       body:{
           default:null
        },
        shape:{
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let visibleSize = cc.director.getVisibleSize();
        this.visibleSize = visibleSize;
        
        let SCALE = 30;
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
        console.log(particleSystem);
        console.log(group);
        this.bodyA = particleSystem;
        // var bodyDef = new b2BodyDef();
		// 	bodyDef.type = b2Body.b2_kinematiccBody;
		// 	bodyDef.position.Set(worldPoint.x,worldPoint.y);
		// 	bodyDef.angle = 45*DEGTORAD;
		// 	bodyDef.linearVelocity = new b2Vec2(1,0);
		// 	bodyDef.angularVelocity = -30;
			
		// 	var bodyA = world.CreateBody(bodyDef);
		// 	this.bodyA = bodyA;
			
		// var fixDef = new b2FixtureDef();
        //     fixDef.shape = new b2PolygonShape();
            
		// 	fixDef.shape.SetAsBoxXY(this.node.width/2/SCALE,this.node.height/2/SCALE);
		// 	fixDef.density = 1.0;
		// 	fixDef.friction = 0.5;
		// 	fixDef.restitution = 0.8;
        //     this.bodyA.CreateFixtureFromDef(fixDef);
        //     console.log(this.bodyA);
    },

    start () {
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
    
    update: function (dt) {
        // this.node.position = this.convertToNode(this.bodyA.GetPosition());
        // this.node.rotation = this.bodyA.GetAngle()*this.RADTODEG%360-180;
        // console.log(this.node.position, this.node.rotation);
        // var positions = this.bodyA.GetPositionBuffer();
        // this.node.position = this.convertToNode(positions[1000]);
        // console.log(positions.length);
    },
    // update (dt) {},
});
