var NWarrior = NWarrior || {};

NWarrior.Game = function(){
	this.npcsNumber = 10;

	this.loadData();
};

NWarrior.Game.prototype = {
	create: function() {
		this.game.time.advancedTiming = true;

		/*this.map = new NWarrior.Map(this.game);    	*/

    this.game.stage.backgroundColor = "#00CC66";

		this.player = new NWarrior.Character(this.game);

		this.npcs = [];
		this.npcsGroup = this.game.add.group();

		for(var i = 0; i < this.npcsNumber; i++) {
    	this.npcs[i] = new NWarrior.Npc(this.game);
    	this.npcsGroup.add(this.npcs[i]);
		}

		this.hud = new NWarrior.Hud(this.game);
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npcsGroup);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 650, "#000");
	},

	loadData: function() {
		var token = localStorage.getItem('NWarriorToken'),
				characterId = window.location.search.replace('?characterId=', '');

		console.log(token);

		if(token) {
			$.ajax({
				url: config.apiURL+'characters/'+characterId,
				type: 'get',
				headers: {
					'x-access-token': token
				},
				success: function(data) {
					this.character = data;
					console.log(data)
				}
			});
		} else {
			window.location.assign('/');
		}
	}
}
