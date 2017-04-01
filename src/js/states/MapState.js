import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';

export default class MapState extends Phaser.State {
  init(options) {
    this.options = options;

    if(!this.options.previousMap) {
      this.shouldChangeMap = true;
    } else {
      this.shouldChangeMap = false;
    }

    this.playerPositionThreshold = 36;

    this.playerPosition = this.getPlayerPosition();
    this.playerFirstPosition = this.playerPosition;
  }

  create() {
    this.debug = false;

		this.game.time.advancedTiming = true;

    this.map = new Map(this.game, {map: this.options.map});

    this.player = new Character(this.game, this.options.characterData, GLOBALS.PLAYER, this.playerPosition.x, this.playerPosition.y);

    this.enemies = [];

    this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, health: 70, currentHealth: 70}, GLOBALS.ENEMY, 450, 450));
    this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, health: 70, currentHealth: 70}, GLOBALS.ENEMY, 150, 150));

    this.map.renderLastLayer();

    this.addMapTransitions();

    this.bind();
  }

	update() {
    this.game.physics.arcade.collide(this.player, this.enemies, this.collisionHandler);

    if(this.options.previousMap) {
      this.checkShouldChangeMap();
    }

    if(this.player) {
      this.game.physics.arcade.collide(this.player, this.map.collideLayer);
      this.game.physics.arcade.collide(this.player, this.map.groundLayer);
    }

    if(this.enemies) {
      for (let key in this.enemies) {
        if(this.enemies[key].alive) {
          this.game.physics.arcade.collide(this.enemies[key], this.map.collideLayer);

          this.enemies[key].checkPlayerPosition(this.player);
        }
      }
    }
	}

	render() {
    if(this.debug) {
      this.game.debug.text(this.game.time.fps || '--', 10, 20, "#fff");

      if(this.player && this.debug) {
          this.game.debug.bodyInfo(this.player, 32, 32);
          this.game.debug.body(this.player);
      }

      if(this.enemies && this.debug) {
        for (let key in this.enemies) {
          const enemy = this.enemies[key];

          this.game.debug.body(enemy);
        }
      }
    }
	}

  getPlayerPosition() {
    return {x: this.options.characterData.lastXPosition, y: this.options.characterData.lastYPosition};
  }

  collisionHandler(player, enemy) {
    if(player.attacking) {
      enemy.receiveAttack(player);
    }
  }

  bind() {
    $('[name=debug-mode]').change((e) => {
      const checkbox = $(e.currentTarget);

      if(checkbox.is(':checked')) {
        this.debug = true;
      } else {
        this.debug = false;
      }
    });
  }

  checkShouldChangeMap() {
    const playerCurrentPosition = {
      x: this.player.body.x,
      y: this.player.body.y
    }

    switch(this.options.enterPosition) {
      case GLOBALS.DIRECTIONS.TOP:
        if((this.playerFirstPosition.y + this.playerPositionThreshold) <= playerCurrentPosition.y) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.BOTTOM:
        if((this.playerFirstPosition.y - this.playerPositionThreshold) >= playerCurrentPosition.y) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.LEFT:
        if((this.playerFirstPosition.x + this.playerPositionThreshold) <= playerCurrentPosition.x) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        if((this.playerFirstPosition.x + this.playerPositionThreshold) >= playerCurrentPosition.x) {
          this.shouldChangeMap = true;
        }

        break;
    }
  }

  addMapTransitions() {
    this.willChangeMap = false;
  }
}