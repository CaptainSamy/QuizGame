
var imgBackground;
var txtTime;
var timer;
var totalTime = 15;
var txtQuestion;
var imgAnswerA;
var imgAnswerB;
var imgAnswerC;
var imgAnswerD;
var positionQuestion = 0;
var questionText = [
    "1.Quả gì như chú heo con\nDa xanh ruột đỏ ngọt ngon khi già\nĂn rồi nhớ lắm người xa\nCó chàng hoàng tử tìm ra giống này ?",
    "2.Quả gì xanh, đỏ, tím, hồng\nThích bay cùng bé tưng bừng ngày vui ?",
    "3."
];

var answerText = [

];


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

        setAnswer("imgSandia", "imgBoom", "imgBanana", "imgBasaha");
        countdownTime();

        textStyleQuestion = {
            font: "25px Arial",
            fill: "#d6c349",
            align: "center"
        }

        txtQuestion = game.add.text(170, -50, "Câu "+questionText[positionQuestion], textStyleQuestion);
        game.add.tween(txtQuestion).to({y: 50}, 2000, Phaser.Easing.Bounce.Out, true);


        /* Transition Fruit */
        game.add.tween(imgAnswerA).to({y: 300}, 3000, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            game.add.tween(imgAnswerB).to({y: 300}, 3000, Phaser.Easing.Bounce.Out, true);
            }, 1000);
        setTimeout(() => {
            game.add.tween(imgAnswerC).to({y: 300}, 3000, Phaser.Easing.Bounce.Out, true);
            }, 500);
        setTimeout(() => {
            game.add.tween(imgAnswerD).to({y: 300}, 3000, Phaser.Easing.Bounce.Out, true);
            }, 600);
    },
    update: function() {
        imgAnswerA.angle += 1;
        imgAnswerB.angle -= 1.5;
        imgAnswerC.angle += 0.5;
        imgAnswerD.angle += 2;
    }
}

function updateCounter() {
    totalTime--;
    txtTime.setText("Time: " + totalTime + "s");
}

function changeQuestion() {
    totalTime = 15;
    positionQuestion++;
    txtQuestion.setText("Câu "+questionText[positionQuestion]);
    updateCounter();
}

function countdownTime() {
    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    timer.add(15000, changeQuestion, this);
    timer.start();
}

function setAnswer(imgA, imgB, imgC, imgD) {
    imgAnswerA = game.add.sprite(100, -100, imgA);
    imgAnswerA.anchor.set(0.5, 0.5);

    imgAnswerB = game.add.sprite(250, -100, imgB);
    imgAnswerB.anchor.set(0.5, 0.5);

    imgAnswerC = game.add.sprite(450, -100, imgC);
    imgAnswerC.anchor.set(0.5, 0.5);

    imgAnswerD = game.add.sprite(650, -100, imgD);
    imgAnswerD.anchor.set(0.5, 0.5);
}


