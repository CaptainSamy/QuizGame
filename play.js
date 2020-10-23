
var imgBackground;
var txtTime;
var timer;
var totalTime = 10;
var txtQuestion;
var imgApple;
var imgBanana;
var imgBasaha;
var imgBoom;
var imgSandia;
var imgPeach;
var positionQuestion = 0;
var questionText = ["1.Quả gì như chú heo con\nDa xanh ruột đỏ ngọt ngon khi già\nĂn rồi nhớ lắm người xa\nCó chàng hoàng tử tìm ra giống này ?", "2.", "3."];


var play_state = {
    preload: function() {
        game.load.image('imgBackground', 'assets/background.jpg');
        game.load.image('imgApple', 'assets/fruit/apple.png');
        game.load.image('imgBanana', 'assets/fruit/banana.png');
        game.load.image('imgBasaha', 'assets/fruit/basaha.png');
        game.load.image('imgBoom', 'assets/fruit/boom.png');
        game.load.image('imgSandia', 'assets/fruit/sandia.png');
        game.load.image('imgWatermelon1', 'assets/fruit/sandia-1.png');
        game.load.image('imgWatermelon2', 'assets/fruit/sandia-2.png');
        game.load.image('imgPeach', 'assets/fruit/peach.png');
    },
    create: function () {
        imgBackground = game.add.tileSprite(0, 0, 800, 480, 'imgBackground');

        txtTime = game.add.text(20, 20, "Time: Ns", {
            font: "20px Arial",
            fill: "#63d649",
            align: "center"
        });

        imgPeach = game.add.sprite(250, -50, 'imgPeach');
        imgPeach.anchor.setTo(0.5, 0.5);
        imgBanana = game.add.sprite(100, 700, 'imgBanana');
        imgSandia = game.add.sprite(450, 700, 'imgSandia');
        imgBoom = game.add.sprite(650, 700, 'imgBoom');

        countdownTime();


        txtQuestion = game.add.text(170, -50, "Câu "+questionText[positionQuestion], {
            font: "25px Arial",
            fill: "#d6c349",
            align: "center"
        });
        game.add.tween(txtQuestion).to({y: 50}, 3000, Phaser.Easing.Bounce.Out, true);


        /* Transition Fruit */
        game.add.tween(imgPeach).to({y: 250}, 3000, Phaser.Easing.Bounce.Out, true);

        setTimeout(() => {game.add.tween(imgBanana).to({y: 300}, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);}, 1000);
        setTimeout(() => {game.add.tween(imgSandia).to({y: 200}, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);}, 500);
        setTimeout(() => {game.add.tween(imgBoom).to({y: 250}, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);}, 600);

    },
    update: function() {
        imgPeach.angle += 1;
        imgBanana.angle -= 1.5;
        imgSandia.angle += 0.5;
        imgBoom.angle += 2;

    }
}

function updateCounter() {
    if (totalTime > 0) {
        totalTime--;
        txtTime.setText("Time: " + totalTime + "s");
    } else if (totalTime == 0) {
        this.game.state.start('over');
    }
}

function countdownTime() {
    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    timer.start();
}


