
var imgBackground;
var imgGameOver;

var over_state = {
    preload: function() {
        game.load.image('imgBackground', 'assets/background.jpg');
        game.load.image('imgGameOver', 'assets/game-over.png');
    },
    create: function() {
        imgBackground = game.add.tileSprite(0, 0, 800, 480, 'imgBackground');
        imgGameOver = game.add.sprite(150, 220, 'imgGameOver');

    }

}