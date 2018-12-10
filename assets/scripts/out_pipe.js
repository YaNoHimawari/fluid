cc.Class({
    extends: cc.Component,

    properties: {
        body:null,
    },

    start () {
        var position = this.node.position;
        let width = this.node.width;
        let height = this.node.height;

        var bd = new b2BodyDef();
        //bd.type = 2;
        bd.position = convertToPWorld(position);
        this.body = world.CreateBody(bd);

        var shape = new b2PolygonShape();
        shape.SetAsBoxXY(width/SCALE/2,height/SCALE/2);
        this.body.CreateFixtureFromShape(shape, 0);
        console.log(this.body);
    },

    update (dt) {
        this.node.position = convertToNode(this.body.GetPosition());
        //this.node.rotation = this.bodyA.GetAngle()*this.RADTODEG%360-180;
    },
});
