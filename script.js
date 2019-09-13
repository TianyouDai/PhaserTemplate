var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000044", // game background color
    physics: {
        default: 'matter'
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('crate', 'img/crate.png');
}

function create ()
{
    // setting Matter world bounds
    this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

    // waiting for user input
    this.input.on("pointerdown", function(pointer){

        // getting Matter bodies under the pointer
        var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

        // if there isn't any body under the pointer...
        if(bodiesUnderPointer.length == 0){

            // create a crate
            this.matter.add.sprite(pointer.x, pointer.y, "crate");
        }

        // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
        // bound to a Matter body, so I am setting it to invisible, then remove the body.
        else{
            bodiesUnderPointer[0].gameObject.visible = false;
            this.matter.world.remove(bodiesUnderPointer[0])
        }
    }, this);
}
