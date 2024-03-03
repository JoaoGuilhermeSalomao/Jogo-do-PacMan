var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
    init: function() {},
    preload: function() {},
    create: function() {
        var text = this.add.text(
            640, 
            100, 
            "INSTRUÇÕES", 
            {
                fontSize: 50,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            360, 
            "1. Utilize as setas para se locomover pelo mapa.", 
            {
                fontSize: 30,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            460, 
            "2. Pegue 10 moedas para concluir cada fase.", 
            {
                fontSize: 30,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            560, 
            "3. Ao finalizar o nível, você será automaticamente transportado", 
            {
                fontSize: 30,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            600, 
            "para a próxima fase.", 
            {
                fontSize: 30,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            700, 
            "! ! ! CUIDADO COM OS PÁSSAROS ! ! !", 
            {
                fontSize: 30,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);


        this.time.addEvent({
            delay: 10000,
            loop: false,
            callback: () => {
                this.scene.start("SceneTwo");
            },
        });


        
        
    },
    update: function() {}
});