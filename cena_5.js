var SceneFive = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneFive" });
    },
    init: function() {},
    preload: function() {
        this.load.image('youWon', 'assets/youWon.jpg');
    },
    create: function() {
        this.add.image(626, 417, 'youWon').setScale(2.5);
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