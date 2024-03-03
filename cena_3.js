var SceneThree = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneThree" });
    },

    init: function() {},

    preload: function() {
        this.load.spritesheet("pac", "assets/pacman_ofc.png", {frameWidth: 47, frameHeight: 45});
        this.load.image('fundo_2', 'assets/cena_2.jpg');
        this.load.image('chao_2', 'assets/cena_2_baixo.jpg');
        this.load.image('v1', 'assets/coracao.png');
        this.load.image('v2', 'assets/coracao.png');
        this.load.image('v3', 'assets/coracao.png');
        this.load.spritesheet('green', 'assets/bird-green.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('red', 'assets/bird-red.png', {frameWidth: 75 , frameHeight: 75});
        this.load.image('morto', 'assets/pacman_morto.png');
        this.load.image('moeda', 'assets/moeda.png');
    },

    create: function() {
        // imagem de fundo
        this.add.image(626, 417, 'fundo_2').setScale(0.25);

        //reset da variavel popntuacao
        pontuacao = 0;

        //sprites vida
        v1 = this.add.image(100, 100, 'v1').setScale(1.5);
        v2 = this.add.image(200, 100, 'v2').setScale(1.5);
        v3 = this.add.image(300, 100, 'v3').setScale(1.5);

        //adição do pacman e configuração da física
        pacMan = this.physics.add.sprite(554, 757.5, 'pac').setScale(2);

        this.anims.create({ //criando a animação
            key: 'padraoPacMan', // nomeando a animação
            frames: this.anims.generateFrameNumbers('pac', {start: 0, end: 2}), // seleção das imagens da animação
            frameRate: 10, // definição de quantos frames serão executados por segundo
            repeat: -1   // quantidade de vezes que esse conjunto de frames serão reproduzidos -> -1 = infinito     
        });
        
        pacMan.anims.play('padraoPacMan', true);
        pacMan.setCollideWorldBounds(true);

        // sprite do pacman morto
        morto = this.physics.add.sprite(pacMan.x, pacMan.y, 'morto').setScale(2),
        morto.setVisible(false);
        
        // adição e configuração da física do chão
        chao = this.physics.add.staticImage(626, 1000, 'chao_2').setScale(0.25);
        this.physics.add.collider(pacMan, chao);
        this.physics.add.collider(morto, chao);

        // moeda
        moeda = this.physics.add.sprite(100, 100, 'moeda');
        moeda.setCollideWorldBounds(true);  
        moeda.setBounce(0.7);
        this.physics.add.collider(moeda, chao);

        this.physics.add.overlap(pacMan, moeda, function() {
            moeda.setVisible(false);

            var posicaoMoeda_Y = Phaser.Math.RND.between(50, 1202);
            moeda.setPosition(posicaoMoeda_Y, 100);
            moeda.setVisible(true);
            
            pontuacao +=1;  
            placar.setText('Moedas: ' + pontuacao);
        })

        // pontuação
        placar = this.add.text(75, 150, 'Moedas: ' + pontuacao, {fontSize:'50px', fill:'#00000'});

        //teclado
        teclado = this.input.keyboard.createCursorKeys();

        // passarinho verde
        green = this.physics.add.sprite(100, 600, 'green').setScale(1.6);
        green.body.allowGravity = false;
        green.setCollideWorldBounds(true);  
        green.setBounce(0.7);

        this.anims.create({ //criando a animação
            key: 'verde', // nomeando a animação
            frames: this.anims.generateFrameNumbers('green', {start: 0, end: 7}), // seleção das imagens da animação
            frameRate: 10, // definição de quantos frames serão executados por segundo
            repeat: -1   // quantidade de vezes que esse conjunto de frames serão reproduzidos -> -1 = infinito     
        })
        
        green.anims.play('verde', true);
        
        this.physics.add.overlap(pacMan, green, function() {
            green.setVisible(false),
            vida -= 1,
            green.x = gp;
        });

        // passarinho vermelho
        red = this.physics.add.sprite(1150, 750, 'red').setScale(1.6);
        red.body.allowGravity = false;
        red.setCollideWorldBounds(true);  
        red.setBounce(0.7);

        this.anims.create({ //criando a animação
            key: 'vermelho', // nomeando a animação
            frames: this.anims.generateFrameNumbers('red', {start: 0, end: 7}), // seleção das imagens da animação
            frameRate: 10, // definição de quantos frames serão executados por segundo
            repeat: -1   // quantidade de vezes que esse conjunto de frames serão reproduzidos -> -1 = infinito     
        })
        
        red.anims.play('vermelho', true);

        this.physics.add.overlap(pacMan, red, function() {
            red.setVisible(false),
            vida -=1,
            red.x = rp;
        })
    },

    update: function() {

        console.log(pacMan.y);
        // movimentação do PacMan
        if (teclado.left.isDown && vida > 0){
            pacMan.setVelocityX(-450),   
            pacMan.setFlip(true, false);
        }
        else if (teclado.right.isDown && vida > 0){
            pacMan.setVelocityX(+450); 
            pacMan.setFlip(false, false);
        }
        else {
            pacMan.setVelocityX(0);
        } 

        if (teclado.up.isDown && pacMan.y === 757.5 && vida > 0){
            pacMan.setVelocityY(-350);
        }

        //movimentação do passarinho vermelho
        if (red.x === 1150) {
            red.ida = true,
            red.setFlip (true, false),
            red.setVisible(true),
            rp = 100;
            } 

        if (red.x > 100 && red.ida === true) {
            red.x -=7;
        } 
        
        if (red.x === 100) {
            red.ida = false,
            red.setFlip (false, false),
            red.setVisible(true),
            rp = 1150;
        } 

        if (red.x < 1150 && red.ida === false) {
            red.x +=7;
        } 

        if (red.setVisible === false && red.ida === true){
            red.x = 100
        }
        
        if (red.setVisible === false && red.ida === false){
            red.x = 1150
        }

        // movimentação do passarinho verde
        if (green.x === 100) {
            green.ida = true,
            green.setFlip (false, false),
            green.setVisible(true),
            gp = 1150;
        } 

        if (green.x < 1150 && green.ida === true) {
            green.x +=7;
        } 
        
        if (green.x === 1150) {
            green.ida = false,
            green.setFlip (true, false),
            green.setVisible(true),
            gp = 100;
        } 
 
        if (green.x > 100 && green.ida === false) {
            green.x -=7;
        }

        // configuração vida
        if (vida === 3) {
            v1.setVisible(true),
            v2.setVisible(true),
            v3.setVisible(true);
        }

        if (vida === 2) {
            v1.setVisible(true),
            v2.setVisible(true),
            v3.setVisible(false);
        }

        if (vida === 1) {
            v1.setVisible(true),
            v2.setVisible(false),
            v3.setVisible(false);
        }

        if (vida === 0) {
            v1.setVisible(false),
            v2.setVisible(false),
            v3.setVisible(false),
            morto.x = pacMan.x,
            morto.y = pacMan.y,
            morto.setVisible(true),
            pacMan.setVisible(false);

            this.time.addEvent({
                delay: 3000,
                loop: false,
                callback: () => {
                    this.scene.start("SceneFour");
                },
            });
        }

        // pontuação maxima e tela final
        if (pontuacao >= 10) {
            pacMan.setCollideWorldBounds(false);
            this.time.addEvent({
                delay: 1,
                loop: false,
                callback: () => {
                    this.scene.start("SceneFive");
                },
            }); 
        }

    }
});