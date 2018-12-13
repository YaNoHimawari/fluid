
cc.Class({
    extends: cc.Component,

    properties: {
        body:null,
    },

    awake:function () {
        var position = this.node.position;
        let width = this.node.width;
        let height = this.node.height;

        var bd = new b2BodyDef();
        bd.angle = -this.node.rotation * RADTODEG;
        bd.type = 2;
        bd.position = convertToPWorld(position);
        bd.gravityScale = 0.5;
        this.body = world.CreateBody(bd);
        var shape = new b2PolygonShape();
        shape.SetAsBoxXY(width/SCALE/2,height/SCALE/2);
        this.body.CreateFixtureFromShape(shape, 0.1);
    },

    update (dt) {
        if(STRAT_FLAG)
        {
            if(this.body === null)
            {
                this.awake();
            }
            this.node.position = convertToNode(this.body.GetPosition());
            this.node.rotation = -this.body.GetAngle()/RADTODEG ;
        }
    },
});
