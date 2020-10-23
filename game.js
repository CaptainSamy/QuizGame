var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game_div');

//var score = 0;

game.state.add('load', load_state);
game.state.add('fruit', fruit_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('over', over_state);

game.state.start('fruit');