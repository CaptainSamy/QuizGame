
var imgBG;
var imgApple;
var imgPeach;
var emitterPeach1;
var emitterPeach2;
var imgBoom;

var fruit_objects,
    boom_objects,
    slashes,
    line,
    scoreLabel,
    score = 0,
    points = [];

var fireRate = 1000;
var nextFire = 0;

var fruit_state = {
    preload: function () {
        game.load.image('imgBG', 'assets/background.jpg');
        game.load.image('imgApple', 'assets/fruit/apple.png');
        game.load.image('imgPeach', 'assets/fruit/peach.png');
        game.load.image('imgPeach1', 'assets/fruit/peach-1.png');
        game.load.image('imgPeach2', 'assets/fruit/peach-2.png');
        game.load.image('imgBoom', 'assets/fruit/boom.png');
    },
    create: function () {
        imgBG = game.add.tileSprite(0, 0, 800, 480, 'imgBG');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 300;

        fruit_objects = createGroup(4, 'imgPeach');
        boom_objects = createGroup(4, 'imgBoom');

        slashes = game.add.graphics(0, 0);

        scoreLabel = game.add.text(10,10,'Score:');
        scoreLabel.fill = 'white';

        emitterPeach1 = game.add.emitter(0, 0, 100);
        emitterPeach1.makeParticles('imgPeach1');
        emitterPeach1.gravity = 100;
        emitterPeach1.setYSpeed(-400,400);

        emitterPeach2 = game.add.emitter(0, 0, 100);
        emitterPeach2.makeParticles('imgPeach2');
        emitterPeach2.gravity = 100;
        emitterPeach2.setYSpeed(-400,400);

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

            fruit_objects.forEachExists(checkIntersects);
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
    if (game.time.now > nextFire && fruit_objects.countDead()>0 && boom_objects.countDead()>0) {
        nextFire = game.time.now + fireRate;
        throwFruitObject();
        if (Math.random()>.5) {
            throwBoomObject();
        }
    }
}

function throwFruitObject() {
    var obj = fruit_objects.getFirstDead();
    obj.reset(game.world.centerX + Math.random()*100-Math.random()*100, 600);
    obj.anchor.setTo(0.5, 0.5);
    //obj.body.angularAcceleration = 100;
    game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 530);
}

function throwBoomObject() {
    var obj = boom_objects.getFirstDead();
    obj.reset(game.world.centerX + Math.random()*100-Math.random()*100, 600);
    obj.anchor.setTo(0.5, 0.5);
    //obj.body.angularAcceleration = 100;
    game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 550);
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

        if (fruit.parent == fruit_objects) {
            killFruit(fruit);
        } else {
            resetScore();
        }
    }

}

function resetScore() {
    var highscore = Math.max(score, localStorage.getItem("highscore"));
    localStorage.setItem("highscore", highscore);

    fruit_objects.forEachExists(killFruit);
    boom_objects.forEachExists(killFruit);

    score = 0;
    game.state.start('over');
    //scoreLabel.text = 'Game Over!\nHigh Score: '+highscore;
    // Retrieve
}


function killFruit(fruit) {
    emitterPeach1.x = fruit.x;
    emitterPeach1.y = fruit.y;
    emitterPeach1.start(true, 3000, null, 1);

    emitterPeach2.x = fruit.x;
    emitterPeach2.y = fruit.y;
    emitterPeach2.start(true, 3000, null, 1);

    fruit.kill();
    points = [];
    score++;
    scoreLabel.text = 'Score: ' + score;
}