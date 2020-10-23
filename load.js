
var txtTitle;
var homeMask;
var imgBackground;
var imgLogo;
var imgBanana;
var imgApple;
var imgWatermelon;
var imgNewGame;
var emitter1;
var emitter2;
var imgQuit;
var emitter3;
var emitter4;
var imgDojo;
var slashes;
var points = [];



var load_state = {
    preload: function() {
        game.load.image('imgBackground', 'assets/background.jpg');
        game.load.image('homeMask', 'assets/home-mask.png');
        game.load.image('imgLogo', 'assets/logo.png');
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
    },
    create: function() {
        /* Background*/
        imgBackground = game.add.tileSprite(0, 0, 800, 480, 'imgBackground');
        homeMask = game.add.sprite(0, 0 , 'homeMask');

        imgLogo = game.add.sprite(100,50 , 'imgLogo');
        imgLogo.alpha = 0;
        game.add.tween(imgLogo).to( {alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        /* Title */
        txtTitle = game.add.text(game.world.centerX + 150, game.world.centerY - 90, "Quiz", {
            font: "100px Arial",
            fill: "#4968d6",
            align: "center"
        });
        txtTitle.anchor.setTo(0.5, 0.5);

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

        /* Watermelon */
        imgWatermelon = game.add.sprite(200, 300, 'imgWatermelon');
        imgWatermelon.anchor.setTo(0.5, 0.5);
        /*imgWatermelon.inputEnabled = true;
        imgWatermelon.events.onInputDown.add(clickInWatermelon, this);*/

        emitter1 = game.add.emitter(0, 0, 100);
        emitter1.makeParticles('imgWatermelon1');
        emitter1.gravity = 200;

        emitter2 = game.add.emitter(0, 0, 100);
        emitter2.makeParticles('imgWatermelon2');
        emitter2.gravity = 200;
        /**/

        /* Image Apple*/
        imgApple = game.add.sprite(400, 280, 'imgApple');
        imgApple.anchor.setTo(0.5, 0.5);
        imgApple.inputEnabled = true;
        imgApple.events.onInputDown.add(clickInApple, this); // ham chua hanh dong chuyen man

        emitter3 = game.add.emitter(0, 0, 100);
        emitter3.makeParticles('imgApple1');
        emitter3.gravity = 200;

        emitter4 = game.add.emitter(0, 0, 100);
        emitter4.makeParticles('imgApple2');
        emitter4.gravity = 200;

        /* Image NewGame */
        imgNewGame = game.add.sprite(200, 300, 'imgNewGame');
        imgNewGame.anchor.setTo(0.5, 0.5);

        /* Image Quit*/
        imgQuit = game.add.sprite(400, 280, 'imgQuit');
        imgQuit.anchor.setTo(0.5, 0.5);

    },
    update: function () {
        /* Rotation */
        imgWatermelon.angle += 2;
        imgNewGame.angle += 1;
        imgApple.angle += 3;
        imgQuit.angle += 1.5;

        /* */
        points.push({
            x: game.input.x,
            y: game.input.y,
        });

        points = points.splice(points.length-10, points.length);
        if (points.length<1 || points[0].x==0) {
            return;
        }

        slashes.clear();
        slashes.beginFill(0xFFFFFF);
        slashes.alpha = .5;
        slashes.moveTo(points[0].x, points[0].y);
        for (var i=1; i<points.length; i++) {
            slashes.lineTo(points[i].x, points[i].y);
        }
        slashes.endFill();

        for(var i = 1; i< points.length; i++) {
            line = new Phaser.Line(points[i].x, points[i].y, points[i-1].x, points[i-1].y);

            imgWatermelon.forEachExists(startPlayScreen);
        }
    }
}

function startPlayScreen(fruit) {
    var l1 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom - fruit.height, fruit.body.right, fruit.body.bottom);
    var l2 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom, fruit.body.right, fruit.body.bottom-fruit.height);
    l2.angle = 90;

    if(Phaser.Line.intersects(line, l1, true) ||
        Phaser.Line.intersects(line, l2, true)) {

        contactPoint.x = game.input.x;
        contactPoint.y = game.input.y;
        var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y));
        if (Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y)) > 110) {
            return;
        }

        if (fruit.parent == imgWatermelon) {
            game.state.start('fruit');
        } else {

        }
    }

}

function clickInApple() {
    particleBurst2();
}

function particleBurst() {
    emitter1.x = imgWatermelon.x;
    emitter1.y = imgWatermelon.y;
    emitter1.start(true, 3000, null, 1);

    emitter2.x = imgWatermelon.x;
    emitter2.y = imgWatermelon.y;
    emitter2.start(true, 3000, null, 1);
}

function particleBurst2() {
    emitter3.x = imgApple.x;
    emitter3.y = imgApple.y;
    emitter3.start(true, 3000, null, 1);

    emitter4.x = imgApple.x;
    emitter4.y = imgApple.y;
    emitter4.start(true, 3000, null, 1);
}

