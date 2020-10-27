var imgBG;
var imgApple;
var emitterApple1, emitterApple2;
var imgBasaha;
var emitterBasaha1, emitterBasaha2;
var imgPeach;
var emitterPeach1, emitterPeach2;
var imgBoom;
var imgScore;

var x, xx, xxx;
var lives = 3;

var apple_objects, basaha_objects, peach_objects, boom_objects,
    slashes,
    line,
    scoreLabel,
    score = 0,
    points = [];

var fireRate = 1500;
var nextFire = 0;

var fruit_state = {
    preload: function () {
        game.load.image('imgBG', 'assets/background.jpg');
        game.load.image('imgApple', 'assets/fruit/apple.png');
        game.load.image('imgApple1', 'assets/fruit/apple-1.png');
        game.load.image('imgApple2', 'assets/fruit/apple-2.png');
        game.load.image('imgBasaha', 'assets/fruit/basaha.png');
        game.load.image('imgBasaha1', 'assets/fruit/basaha-1.png');
        game.load.image('imgBasaha2', 'assets/fruit/basaha-2.png');
        game.load.image('imgPeach', 'assets/fruit/peach.png');
        game.load.image('imgPeach1', 'assets/fruit/peach-1.png');
        game.load.image('imgPeach2', 'assets/fruit/peach-2.png');
        game.load.image('imgBoom', 'assets/fruit/boom.png');
        game.load.image('imgXF', 'assets/xf.png');
        game.load.image('imgX', 'assets/x.png');
        game.load.image('imgXXF', 'assets/xxf.png');
        game.load.image('imgXX', 'assets/xx.png');
        game.load.image('imgXXXF', 'assets/xxxf.png');
        game.load.image('imgXXX', 'assets/xxx.png');
        game.load.image('imgScore', 'assets/score.png');
    },
    create: function () {
        imgBG = game.add.tileSprite(0, 0, 800, 480, 'imgBG');

        imgScore = game.add.sprite(20, 16, 'imgScore');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 300;

        x = game.add.sprite(700, 20, 'imgXF');
        xx = game.add.sprite(730, 18, 'imgXXF');
        xxx = game.add.sprite(770, 16, 'imgXXXF');

        apple_objects = createGroup(4, 'imgApple');
        basaha_objects = createGroup(4, 'imgBasaha');
        peach_objects = createGroup(4, 'imgPeach');
        boom_objects = createGroup(4, 'imgBoom');

        slashes = game.add.graphics(0, 0);

        scoreLabel = game.add.text(60,20,'');
        scoreLabel.fill = 'white';

        /* Add emitter fruit - tao ham rieng bi loi */
        // Apple
        emitterApple1 = game.add.emitter(0, 0, 100);
        emitterApple1.makeParticles("imgApple1");
        emitterApple1.gravity = 100;
        emitterApple1.setYSpeed(-380, 300);
        emitterApple2 = game.add.emitter(0, 0, 100);
        emitterApple2.makeParticles("imgApple2");
        emitterApple2.gravity = 100;
        emitterApple2.setYSpeed(-380, 300);

        // Basaha
        emitterBasaha1 = game.add.emitter(0, 0, 100);
        emitterBasaha1.makeParticles("imgBasaha1");
        emitterBasaha1.gravity = 100;
        emitterBasaha1.setYSpeed(-380, 300);
        emitterBasaha2 = game.add.emitter(0, 0, 100);
        emitterBasaha2.makeParticles("imgBasaha2");
        emitterBasaha2.gravity = 100;
        emitterBasaha2.setYSpeed(-380, 300);

        //Peach
        emitterPeach1 = game.add.emitter(0, 0, 100);
        emitterPeach1.makeParticles("imgPeach1");
        emitterPeach1.gravity = 100;
        emitterPeach1.setYSpeed(-380, 300);
        emitterPeach2 = game.add.emitter(0, 0, 100);
        emitterPeach2.makeParticles("imgPeach2");
        emitterPeach2.gravity = 100;
        emitterPeach2.setYSpeed(-380, 300);

        throwObject();
    },
    update: function() {
        throwObject();

        points.push({
            x: game.input.x,
            y: game.input.y
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

            apple_objects.forEachExists(checkIntersects);
            basaha_objects.forEachExists(checkIntersects);
            peach_objects.forEachExists(checkIntersects);
            boom_objects.forEachExists(checkIntersects);
        }
    }

}


function createGroup (numItems, sprite) {
    var group = game.add.group();
    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;
    group.createMultiple(numItems, sprite);
    group.setAll('checkWorldBounds', true);
    group.setAll('outOfBoundsKill', true);
    return group;
}

function throwObject() {
    if (game.time.now > nextFire &&
        peach_objects.countDead()>0 &&
        apple_objects.countDead()>0 &&
        basaha_objects.countDead()>0 &&
        boom_objects.countDead()>0)
    {
        nextFire = game.time.now + fireRate;
        thrownAppleObject();
        thrownBasahaObject();
        throwPeachObject();
        if (Math.random()>.5) {
            throwBoomObject();
        }
    }
}

function thrownAppleObject() {
    var obj = apple_objects.getFirstDead();
    obj.reset(getRndInteger(150, 650), 560);
    obj.anchor.setTo(0.5, 0.5);
    game.physics.arcade.moveToXY(obj, getRndInteger(200, 600), getRndInteger(100, 300), 500);
}

function thrownBasahaObject() {
    var obj = basaha_objects.getFirstDead();
    obj.reset(getRndInteger(150, 650), 600);
    obj.anchor.setTo(0.5, 0.5);
    game.physics.arcade.moveToXY(obj, getRndInteger(200, 600), getRndInteger(100, 300), 480);
}

function throwPeachObject() {
    var obj = peach_objects.getFirstDead();
    obj.reset(getRndInteger(150, 650), 540);
    obj.anchor.setTo(0.5, 0.5);
    game.physics.arcade.moveToXY(obj, getRndInteger(200, 600), getRndInteger(100, 300), 530);
}

function throwBoomObject() {
    var obj = boom_objects.getFirstDead();
    obj.reset(getRndInteger(150, 650), 550);
    obj.anchor.setTo(0.5, 0.5);
    game.physics.arcade.moveToXY(obj, getRndInteger(200, 600), getRndInteger(100, 300), 550);
}


var contactPoint = new Phaser.Point(0,0);

function checkIntersects(fruit, callback) {
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

        if (fruit.parent == peach_objects) {
            killFruit(fruit);
        } else if (fruit.parent == apple_objects) {
            killFruit(fruit);
        } else if (fruit.parent == basaha_objects) {
            killFruit(fruit);
        } else {
            resetScore();
        }
    }

}

function resetScore() {
    lives--;
    if (lives == 2) {
        xxx = game.add.sprite(770, 16, 'imgXXX');
    } else if (lives == 1) {
        xx = game.add.sprite(730, 18, 'imgXX');
    } else if (lives == 0) {
        x = game.add.sprite(700, 20, 'imgX');
        score = 0;
        game.state.start('over');
    }

    apple_objects.forEachExists(killFruit);
    peach_objects.forEachExists(killFruit);
    boom_objects.forEachExists(killFruit);
}

function setEmitter(emitter1, emitter2, fruit) {
    emitter1.x = fruit.x;
    emitter1.y = fruit.y;
    emitter1.start(true, 3000, null,1);

    emitter2.x = fruit.x;
    emitter2.y = fruit.y;
    emitter2.start(true, 3000, null,1);
}

function killFruit(fruit) {
    if (fruit.parent == apple_objects) {
        setEmitter(emitterApple1, emitterApple2, fruit);

    } else if (fruit.parent == peach_objects) {
        setEmitter(emitterPeach1, emitterPeach2, fruit);

    } else if (fruit.parent == basaha_objects) {
        setEmitter(emitterBasaha1, emitterBasaha2, fruit);

    }

    fruit.kill();
    points = [];
    score++;
    scoreLabel.text = '' + score;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}