var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#ABD1B5", // game background color
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            //debugShowInternalEdges: true,
            //debugShowConvexHulls: true
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

let points = "";

function create ()
{
    // setting Matter world bounds
    this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

    // waiting for user input
    this.input.on("pointerdown", function(pointer) {

        //console.log(pointer.upX, pointer.upY);
        points += pointer.upX + " ";
        points += pointer.upY + " ";
        console.log(points);

        // getting Matter bodies under the pointer
        var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

        // if there isn't any body under the pointer...
        if(bodiesUnderPointer.length == 0){

            // create a crate
            let b = this.matter.add.sprite(pointer.x, pointer.y, "bunny");
            b.setScale(0.5);
        }

        // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
        // bound to a Matter body, so I am setting it to invisible, then remove the body.
        else{
            //bodiesUnderPointer[0].gameObject.visible = false;
            //this.matter.world.remove(bodiesUnderPointer[0])
            bodiesUnderPointer[0].gameObject.body.force = {x: Math.random()/1 - 0.5/2, y: -Math.random()/1}
        }

    }, this);

    var star = '0 0 122 5 120 63 148 89 151 155 193 159 285 200 284 245 291 305 222 317 175 354 180 403 118 454 136 505 171 543 169 592 9 589';
    var poly = this.add.polygon(100, 300, star, 0x00ff00, 0);
    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: star, flagInternal: true } });
    poly.setStatic(true);

    var star2 = '314 16 603 7 627 593 354 594 354 551 278 492 308 423 373 387 375 290 408 243 395 141 298 105 263 72';
    var poly2 = this.add.polygon(500, 300, star2, 0x00ff00, 0);
    this.matter.add.gameObject(poly2, { shape: { type: 'fromVerts', verts: star2, flagInternal: true } });
    poly2.setStatic(true);


    /*
    var star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';
    var poly = this.add.polygon(600, 400, star, 0x00ff00, 0.2);
    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: star, flagInternal: true } });

    poly.setVelocity(4, -2);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);
    poly.setFrictionAir(0.005); */

}
