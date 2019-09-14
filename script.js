var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000044", // game background color
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            debugShowInternalEdges: true,
            debugShowConvexHulls: true
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.image('crate', 'img/crate.png');
    this.load.image('bunny', 'img/bunny.png');
}

function create ()
{
    // setting Matter world bounds
    this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

    // waiting for user input
    this.input.on("pointerdown", function(pointer) {

        // getting Matter bodies under the pointer
        var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

        // if there isn't any body under the pointer...
        if(bodiesUnderPointer.length == 0){

            // create a crate
            this.matter.add.sprite(pointer.x, pointer.y, "bunny");
        }

        // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
        // bound to a Matter body, so I am setting it to invisible, then remove the body.
        else{
            //bodiesUnderPointer[0].gameObject.visible = false;
            //this.matter.world.remove(bodiesUnderPointer[0])
            bodiesUnderPointer[0].gameObject.body.force = {x: Math.random()/1 - 0.5/2, y: -Math.random()/1}
        }
    }, this);

    var star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

    var poly = this.add.polygon(600, 400, star, 0x00ff00, 0.2);

    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: star, flagInternal: true } });

    poly.setVelocity(4, -2);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);
    poly.setFrictionAir(0.005);

}
