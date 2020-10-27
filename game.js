var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game_div');


game.state.add('home', home_state);
game.state.add('fruit', fruit_state);
game.state.add('play', play_state);
game.state.add('over', over_state);

game.state.start('home');