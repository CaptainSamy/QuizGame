var txtTitle;
var homeMask;
var imgBackground;
var imgLogo;
var imgBoom;
var imgBanana;
var imgApple;
var imgWatermelon;
var imgNewGame;
var imgQuit;
var imgDojo;

var home_state = {
    preload: function() {
        game.load.image('imgBackground', 'assets/background.jpg');
        game.load.image('homeMask', 'assets/home-mask.png');
        game.load.image('imgLogo', 'assets/logo.png');
        game.load.image('imgBoom', 'assets/fruit/boom.png');
        game.load.image('imgBanana', 'assets/fruit/banana.png');
        game.load.image('imgApple', 'assets/fruit/apple.png');
        game.load.image('imgApple1', 'assets/fruit/apple-1.png');
        game.load.image('imgApple2', 'assets/fruit/apple-2.png');
        game.load.image('imgWatermelon', 'assets/fruit/sandia.png');
        game.load.image('imgWatermelon1', 'assets/fruit/sandia-1.png');
        game.load.image('imgWatermelon2', 'assets/fruit/sandia-2.png');
        game.load.image('imgNewGame', 'assets/new-game.png');
        game.load.image('imgQuit', 'assets/quit.png');
        game.load.image('imgDojo', 'assets/dojo.png');
        game.load.image('imgClose', 'assets/lose.png');
    },
    create: function() {
        /* Background*/
        imgBackground = game.add.tileSprite(0, 0, 800, 480, 'imgBackground');
        /**/

        /* Home Mask */
        homeMask = game.add.sprite(0, -100, 'homeMask'); // add asset
        homeMask.scale.setTo(1.3, 1);
        game.add.tween(homeMask).to({y: 0}, 1300, Phaser.Easing.Bounce.Out, true); // transition
        /**/

        /* Logo fruit */
        imgLogo = game.add.sprite(-400,35 , 'imgLogo');
        imgLogo.angle = -4;
        imgLogo.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgLogo).to({x: 100}, 1500, Phaser.Easing.Bounce.Out, true);
            }, 1000);
        game.add.tween(imgLogo).to( {alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        /**/

        /* Text Quiz */
        txtTitle = game.add.text(1200, 105, "Quiz", {
            font: "100px Arial",
            fill: "#4968d6",
            align: "center"
        });
        txtTitle.angle = -4;
        txtTitle.anchor.setTo(0.5, 0.5);
        setTimeout(() => {
            game.add.tween(txtTitle).to({x: game.world.centerX + 150}, 1500, Phaser.Easing.Bounce.Out, true);
        }, 2000);
        /**/

        /* Rain Fruit */
        var delay = 0;
        for (var i = 0; i < 10; i++) {
            var sprite = game.add.sprite(-100 + (game.world.randomX), 600, 'imgBanana');
            sprite.scale.set(game.rnd.realInRange(0.1, 0.6));
            var speed = game.rnd.between(4000, 6000);
            game.add.tween(sprite).to( { y: -200 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 200;
        }
        for (var j = 0; j < 10; j++) {
            var sprite = game.add.sprite(-100 + (game.world.randomX), 600, 'imgApple');
            sprite.scale.set(game.rnd.realInRange(0.1, 0.6));
            var speed2 = game.rnd.between(4000, 6000);
            game.add.tween(sprite).to( { y: -200 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 200;
        }

        /* Image Watermelon */
        imgWatermelon = game.add.sprite(200, 300, 'imgWatermelon');
        imgWatermelon.anchor.setTo(0.5, 0.5);
        imgWatermelon.inputEnabled = true;
        imgWatermelon.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgWatermelon).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);
        imgWatermelon.events.onInputDown.add(clickWatermelon, this);
        /**/

        /* Image Apple*/
        imgApple = game.add.sprite(400, 280, 'imgApple');
        imgApple.anchor.setTo(0.5, 0.5);
        imgApple.inputEnabled = true;
        imgApple.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgApple).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);
        imgApple.events.onInputDown.add(clickApple, this); // ham chua hanh dong chuyen man
        /**/

        /* Image Boom*/
        imgBoom = game.add.sprite(600, 300, 'imgBoom');
        imgBoom.anchor.setTo(0.5, 0.5);
        imgBoom.inputEnabled = true;
        imgBoom.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgBoom).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);
        imgBoom.events.onInputDown.add(clickBoom, this);
        /**/

        /* Image NewGame */
        imgNewGame = game.add.sprite(200, 300, 'imgNewGame');
        imgNewGame.anchor.setTo(0.5, 0.5);
        imgNewGame.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgNewGame).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);

        /* Image Dojo*/
        imgDojo = game.add.sprite(400, 280, 'imgDojo');
        imgDojo.anchor.setTo(0.5, 0.5);
        imgDojo.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgDojo).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);

        /* Image Quit */
        imgQuit = game.add.sprite(600, 300, 'imgQuit');
        imgQuit.anchor.setTo(0.5, 0.5);
        imgQuit.alpha = 0;
        setTimeout(() => {
            game.add.tween(imgQuit).to( {alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, 3000);

    },
    update: function () {
        /* Rotation */
        imgWatermelon.angle += 2;
        imgNewGame.angle += 1;
        imgApple.angle += 3;
        imgDojo.angle += 1.5;
        imgQuit.angle += 1.7;
    }
}


function clickWatermelon() {
    game.state.start('fruit');
}

function clickApple() {
    game.state.start('play');
}

function clickBoom() {

}




