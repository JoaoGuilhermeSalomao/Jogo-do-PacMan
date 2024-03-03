var SceneZero = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneZero" });
    },
    init: function() {},
    preload: function() {
        this.load.image('tela', 'assets/tela_inicial.jpg');
    },
    create: function() {
        this.add.image(626, 417, 'tela');
        teclado = this.input.keyboard.createCursorKeys();
        vida = 3;
        pontuacao = 0;
    },
    update: function() {
        if(teclado.space.isDown){
            this.time.addEvent({
                delay: 1,
                loop: false,
                callback: () => {
                    this.scene.start("SceneOne");
                },
            });
        }

    }
});