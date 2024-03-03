var SceneFour = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneFour" });
    },
    init: function() {},
    preload: function() {
        this.load.image('gameOver', 'assets/gameOver.jpg');
    },
    create: function() {
        this.add.image(626, 417, 'gameOver').setScale(1.5);
        teclado = this.input.keyboard.createCursorKeys();

        var text = this.add.text(
            640, 
            700, 
            "Press space to return to home screen", 
            {
                fontSize: 50,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
    update: function() {
        if(teclado.space.isDown){
            this.time.addEvent({
                delay: 1,
                loop: false,
                callback: () => {
                    this.scene.start("SceneZero");
                },
            });
        }

    }
});