
cc.Class({
    extends: cc.Component,

    properties: {
        body:null,
    },

    awake:function(){
        var position = this.node.position;
        let radius = this.node.width/2;

        var bd = new b2BodyDef();
        bd.angle = -this.node.rotation * RADTODEG;
        bd.type = 2;
        bd.position = convertToPWorld(position);
        this.body = world.CreateBody(bd);
        var shape = new b2CircleShape();
        shape.radius = radius/SCALE;
        this.body.CreateFixtureFromShape(shape, 10);
    },

    update (dt) {
        if(STRAT_FLAG)
        {
            if(this.body === null)
            {
                this.awake();
            }
            this.node.position = convertToNode(this.body.GetPosition());
            this.node.rotation = -this.body.GetAngle()/RADTODEG;
        }
    },
});
