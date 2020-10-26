
var imgBackground;
var imgGameOver;
var imgLose;
var txtPlayAgain;



var over_state = {
    preload: function() {
        game.load.image('imgBackground', 'assets/background.jpg');
        game.load.image('imgGameOver', 'assets/game-over.png');
        game.load.image('imgLose', 'assets/lose.png');
    },
    create: function() {
        imgBackground = game.add.tileSprite(0, 0, 800, 480, 'imgBackground');
        imgGameOver = game.add.sprite(150, 220, 'imgGameOver');
        imgLose = game.add.sprite(730, 20, 'imgLose');
        imgLose.inputEnabled = true;
        imgLose.events.onInputDown.add(closeStateOver, this);

        textStyle = {
            font: '25px Arial',
            fill: '#ffffff'
        };
        txtPlayAgain = game.add.text(game.world.centerX, 400, 'Tap to play again!', textStyle);
        txtPlayAgain.anchor.set(0.5);
        txtPlayAgain.visible = false;
        setTimeout(() => {
            txtPlayAgain.visible = true;
            game.input.onDown.addOnce(() => {
                game.state.start('fruit');
            }, this);
        }, 1500);
    }

}

function closeStateOver() {
    game.state.start('home');
}