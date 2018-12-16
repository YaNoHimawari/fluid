cc.Class({
    extends: cc.Component,

    properties: {
    },

    body:null,

    start () {
        var position = this.node.position;
        let width = this.node.width;
        let height = this.node.height;

        var bd = new b2BodyDef();
        //bd.type = 2;
        bd.position = convertToPWorld(position);
        this.body = world.CreateBody(bd);

        var shape = new b2PolygonShape();
        shape.SetAsBoxXYCenterAngle(0.1,height/2/SCALE,new b2Vec2(-width/2/SCALE,0),0);
        this.body.CreateFixtureFromShape(shape, 1);

        shape = new b2PolygonShape();
        shape.SetAsBoxXYCenterAngle(width/2/SCALE,0.1,new b2Vec2(0,-height/2/SCALE),0);
        this.body.CreateFixtureFromShape(shape, 1);

        shape = new b2PolygonShape();
        shape.SetAsBoxXYCenterAngle(0.1,height/2/SCALE,new b2Vec2(width/2/SCALE,0),0);
        this.body.CreateFixtureFromShape(shape, 1);

    },
});
