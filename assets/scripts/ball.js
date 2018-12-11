
cc.Class({
    extends: cc.Component,

    properties: {
        body:null,
    },

    start () {
        var position = this.node.position;
        let radius = this.node.width/2;

        var bd = new b2BodyDef();
        bd.angle = -this.node.rotation * RADTODEG;
        //bd.type = 2;
        bd.position = convertToPWorld(position);
        this.body = world.CreateBody(bd);
        var shape = new b2CircleShape();
        shape.radius = radius/SCALE;
        this.body.CreateFixtureFromShape(shape, 0);
    },

    update (dt) {
        this.node.position = convertToNode(this.body.GetPosition());
        this.node.rotation = -this.body.GetAngle()/RADTODEG;
    },
});
