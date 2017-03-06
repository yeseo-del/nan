!function e(t,a,i){function r(s,o){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(n)return n(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[s]={exports:{}};t[s][0].call(u.exports,function(e){var a=t[s][1][e];return r(a?a:e)},u,u.exports,e,t,a,i)}return a[s].exports}for(var n="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,t,a){t.exports={apiURL:"http://test.namelesswarrior.com:8080/",debug:"true"}},{}],2:[function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(t,a){i(this,e),this.trigger=t,this.target=a,this.bindEvents()}return r(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.trigger),a=$(".overlay");t.each(function(){var t=$(this).data("target"),i=$(t),r=i.find(".formbox__close");r.click(function(e){e.preventDefault(),a.addClass("hide"),i.removeClass("active")}),a.click(function(){a.addClass("hide"),i.removeClass("active")}),$(this).click(function(t){t.preventDefault(),e.closeAll(),a.removeClass("hide"),i.addClass("active")})})}},{key:"closeAll",value:function(){var e=$(".formbox");e.each(function(){$(this).removeClass("active")}),$(".overlay").addClass("hide")}}]),e}();a["default"]=n},{}],3:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={PLAYER:"player",NPC:"NPC",ENEMY:"enemy",SWORDSMAN:"SwordsMan",MAGE:"Mage",ARCHER:"Archer"};a["default"]=i},{}],4:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),s=e("config"),o=i(s),l=e("./Utils"),c=i(l),u=e("./Boxes"),h=i(u),d=e("../game/Game"),f=i(d),g=function(){function e(){r(this,e),this.utils=new c["default"],this.boxes=new h["default"](".open-formbox",".formbox"),this.formsSelector=".form",this.menuNotLogged=$(".menu--not-logged"),this.loggedMenu=$(".menu--logged"),this.notLoggedText=$(".not-logged--text"),this.loggedText=$(".logged--text"),this.loggedInfo=$(".logged--info"),$(".tooltip").tooltipster(),this.bindEvents(),this.checkLogin()}return n(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.formsSelector);t.each(function(){var t=$(this),a=t.data("target"),i=t.find(".formbox__result");t.submit(function(r){var n=e.utils.serializeObject($(this));r.preventDefault(),e.validation(a,t,i)||(e.ajaxPOST(a,i,n),e.cleanForms(t,a,i))})}),$(".logout").click(function(){e.logout()}),$(".character__wrapper").on("click",".character",function(t){var a=$(this).data("character-id");localStorage.setItem("NWarriorCharID",a),e.boxes.closeAll(),$(".content").addClass("hide"),$(".game__wrapper").removeClass("hide"),new f["default"]})}},{key:"validation",value:function(e,t,a){var i=!1;switch(e){case"users":var r=t.find("[name=signupPassword]").val(),n=t.find("[name=signupRepeatPassword]").val();r!=n&&(a.html("The passwords must be equal!"),i=!0);break;case"characters":var s=t.find(".remaining-stats").html();0!=s&&(a.html("You must distribute all attributes!"),i=!0)}return i}},{key:"cleanForms",value:function(e,t){switch(e.find("input[type=text]:not([readonly])").val(""),t){case"characters":e.find(".stats__input").val(5),e.find(".stats__counter").val(10)}}},{key:"ajaxPOST",value:function(e,t,a){var i=this,r=$(".loader"),n=o["default"].apiURL+e;r.addClass("active"),a.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"POST",url:n,data:a,success:function(a){if(r.removeClass("active"),a.failedAuth)return i.logout();switch(e){case"users":i.handleSignUp(a,t);break;case"users/login":i.handleLogin(a,t);break;case"characters":i.handleCharacterCreation(a,t)}},error:function(e,t,a){403==t&&i.logout()}})}},{key:"handleSignUp",value:function(e,t){var a=this;t.html(e.message),e.created&&setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-login"]').click()},500)}},{key:"handleLogin",value:function(e,t){var a=this;t.html(e.message),e.logged&&(setTimeout(function(){a.boxes.closeAll()},500),this.saveSession(e),this.checkLogin())}},{key:"saveSession",value:function(e){localStorage.setItem("NWarriorUserID",e.userId),localStorage.setItem("NWarriorEmail",e.email),localStorage.setItem("NWarriorToken",e.token)}},{key:"checkLogin",value:function(){localStorage.getItem("NWarriorToken")?(this.loggedInfo.find("span").html(localStorage.getItem("NWarriorEmail")),this.loggedMenu.removeClass("hide"),this.loggedText.removeClass("hide"),this.loggedInfo.removeClass("hide"),this.menuNotLogged.addClass("hide"),this.notLoggedText.addClass("hide"),this.setupCharacterCreation(),this.updateCharacterList()):(this.loggedMenu.addClass("hide"),this.loggedText.addClass("hide"),this.loggedInfo.addClass("hide"),this.menuNotLogged.removeClass("hide"),this.notLoggedText.removeClass("hide"))}},{key:"setupCharacterCreation",value:function(){var e=$('[name="form_create"]'),t=e.find(".stats__group"),a=e.find(".remaining-stats");$(".formbox__group__character").on("click",function(e){var t=$(e.currentTarget);$(".formbox__group__character").removeClass("active"),t.addClass("active")}),t.each(function(){var e=$(this),t=e.find(".stats__btn--plus"),i=e.find(".stats__btn--minus"),r=e.find(".stats__input");t.click(function(e){e.preventDefault();var t=a.html(),i=r.val();t>0&&(i++,r.val(i),t--,a.html(t))}),i.click(function(e){e.preventDefault();var t=a.html(),i=r.val();t<10&&i>5&&(i--,r.val(i),t++,a.html(t))})}),$("[name=userId]").val(localStorage.getItem("NWarriorUserID"))}},{key:"handleCharacterCreation",value:function(e,t){var a=this;t.html(e.message),setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-select"]').click(),t.html(""),$("[name=characterClass]").val(""),$(".create__img img").attr("src","")},500),this.updateCharacterList()}},{key:"updateCharacterList",value:function(){var e=this,t=$(".loader"),a=localStorage.getItem("NWarriorUserID"),i=o["default"].apiURL+"characters/byUser/"+a,r=$(".character__wrapper");t.addClass("active"),$(".character__wrapper > *").remove(),this.utils.getTemplate("characterSelection",function(a){var n=a,s={};s.token=localStorage.getItem("NWarriorToken"),$.ajax({url:i,type:"get",data:s,success:function(a){if(t.removeClass("active"),a.length)for(var i in a){var s=a[i],o=n;o=o.replace("{CharacterClass}",e.utils.formatClass(s.characterClass)),o=o.replace("{Strength}",s.strength),o=o.replace("{Constitution}",s.constitution),o=o.replace("{Dexterity}",s.dexterity),o=o.replace("{Intelligence}",s.intelligence),o=o.replace("{Charisma}",s.charisma),o=o.replace("{ClassImg}",s.characterClass),r.append('<div class="character" data-character-id="'+s._id+'">'+o+"</div>")}else r.append('<p>No characters found! Press "New Character" to create your first!</p>')},error:function(t,a,i){e.logout()}})})}},{key:"logout",value:function(){localStorage.clear(),location.reload()}}]),e}();a["default"]=g},{"../game/Game":8,"./Boxes":2,"./Utils":5,config:1}],5:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),s=e("../core/Globals"),o=i(s),l=function(){function e(){r(this,e)}return n(e,[{key:"formatClass",value:function(e){var t=void 0;switch(e){case 1:t=o["default"].SWORDSMAN;break;case 2:t=o["default"].MAGE;break;case 3:t=o["default"].ARCHER}return t}},{key:"getTemplate",value:function(e,t){$.get("templates/"+e+".html",function(e){t(e)})}},{key:"serializeObject",value:function(e){var t={},a=e.serializeArray();return $.each(a,function(){t[this.name]?(t[this.name].push||(t[this.name]=[t[this.name]]),t[this.name].push(this.value||"")):t[this.name]=this.value||""}),t}}]),e}();a["default"]=l},{"../core/Globals":3}],6:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=e("../core/Globals"),c=i(l),u=e("config"),h=(i(u),function(e){function t(e,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c["default"].PLAYER;r(this,t);var s=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,e.world.randomX,e.world.randomY,a.characterClass));return s.anchor.setTo(.5,.5),s.type=i,s.input=s.game.input,s.setCharacterInfo(a),s.type===c["default"].PLAYER&&s.bind(),s}return s(t,e),o(t,[{key:"setCharacterInfo",value:function(e){this.characterClass=e.characterClass,this.str=e.strength,this.con=e.constitution,this.dex=e.dexterity,this["int"]=e.intelligence,this.cha=e.charisma,this.HP=e.health,this.currentHP=e.currentHealth,this.MP=e.mana,this.currentMP=e.currentMana,this.frame=0,this.speed=225,this.alive=!0,this.create()}},{key:"bind",value:function(){var e=this;$(document).on("keydown",function(t){var a=t.key;"a"!==a&&"A"!==a||e.attacking||e.attack()}),this.setupAttackEndCallback()}},{key:"create",value:function(){this.game.add.existing(this),this.game.physics.arcade.enable(this),this.body.collideWorldBounds=!0,this.type===c["default"].PLAYER&&this.game.camera.follow(this),this.setupAnimations(),this.type===c["default"].ENEMY&&(this.body.immovable=!0,this.randomWalk())}},{key:"update",value:function(){this.type===c["default"].PLAYER&&(this.handleWalking(),this.updateBars())}},{key:"updateBars",value:function(){var e=($(".bar--health .bar__value"),$(".bar--health .bar__text span")),t=($(".bar--mana .bar__value"),$(".bar--mana .bar__text span"));e.html(this.currentHP+"/"+this.HP),t.html(this.currentMP+"/"+this.MP)}},{key:"handleWalking",value:function(){var e=this.input.keyboard.isDown(Phaser.Keyboard.S),t=e?this.speed+50:this.speed,a=void 0;a=this.input.keyboard.isDown(Phaser.Keyboard.LEFT)?"left":this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)?"right":this.input.keyboard.isDown(Phaser.Keyboard.UP)?"up":this.input.keyboard.isDown(Phaser.Keyboard.DOWN)?"down":"stop",this.attacking?(this.body.velocity.x=0,this.body.velocity.y=0):this.walk(a,t)}},{key:"setupAnimations",value:function(){var e=this.type===c["default"].ENEMY;this.animations.add("dead",[0,1,2],3,!0),this.animations.add("down",[0,1,2],10,e),this.animations.add("right",[3,4,5],10,e),this.animations.add("up",[6,7,8],10,e),this.animations.add("left",[9,10,11],10,e)}},{key:"walk",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;switch(e){case"down":this.lastFrame=0,this.body.velocity.y=t,this.body.velocity.x=0;break;case"right":this.lastFrame=3,this.body.velocity.y=0,this.body.velocity.x=t;break;case"up":this.lastFrame=6,this.body.velocity.y=-t,this.body.velocity.x=0;break;case"left":this.lastFrame=9,this.body.velocity.x=-t,this.body.velocity.y=0;break;case"stop":this.attacking||(this.body.velocity.x=0,this.body.velocity.y=0,this.frame=this.lastFrame,this.animations.stop())}this.animations.play(e)}},{key:"attack",value:function(){var e=this.lastFrame||0,t=this.getDirection(e),a=this.characterClass+"_attack";this.loadTexture(a),this.anchor.setTo(.5,.5),this.body.width=64,this.body.height=64,this.game.camera.follow(null),this.attacking=!0,this.animations.play(t)}},{key:"getDirection",value:function(e){switch(e){case 0:return"down";case 3:return"right";case 6:return"up";case 9:return"left"}}},{key:"setupDeadAnimation",value:function(){var e=this.characterClass+"_dead";this.loadTexture(e),this.anchor.setTo(.5,.5),this.body.width=64,this.body.height=64,this.animations.play("dead")}},{key:"randomWalk",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;this.randomWalkInterval=setInterval(function(){var a=Math.floor(5*Math.random())+1;if(!e.receivingAttack&&e.alive)switch(a){case 1:e.walk("down",t);break;case 2:e.walk("up",t);break;case 3:e.walk("left",t);break;case 4:e.walk("right",t);break;case 5:e.walk("stop",t)}},1e3)}},{key:"setupAttackEndCallback",value:function(){var e=this;for(var t in this.animations._anims){var a=this.animations._anims[t];a.onComplete.add(function(){e.attacking&&(e.loadTexture(e.characterClass),e.anchor.setTo(.5,.5),e.body.width=32,e.body.height=32,e.game.camera.follow(e),e.attacking=!1)},this)}}},{key:"stepBack",value:function(e){var t=this;switch(this.body.velocity.x=0,this.body.velocity.y=0,e){case"up":this.body.velocity.y=-200;break;case"down":this.body.velocity.y=200;break;case"left":this.body.velocity.x=-200;break;case"right":this.body.velocity.x=200}this.animations.stop(),setTimeout(function(){t.body.velocity.x=0,t.body.velocity.y=0},500)}},{key:"receiveAttack",value:function(e){var t=this,a=e.lastFrame||0,i=this.getDirection(a);this.receivingAttack||(this.receivingAttack=!0,this.currentHP=this.currentHP-2*e.str,this.currentHP<=0?(this.alive=!1,this.type===c["default"].ENEMY&&clearInterval(this.randomWalkInterval),this.setupDeadAnimation()):this.stepBack(i),setTimeout(function(){t.receivingAttack=!1},500))}}]),t}(Phaser.Sprite));a["default"]=h},{"../core/Globals":3,config:1}],7:[function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(t,a){i(this,e),this.data=t,this.cb=a,this.$dialogWrapper=$(".dialog__wrapper"),this.$dialogText=this.$dialogWrapper.find(".dialog__text"),this.actualLine=1,this.numberOfLines=this.data.lines.length,this.setup(),this.bind()}return r(e,[{key:"setup",value:function(){this.$dialogText.html(this.data.lines[0]),this.$dialogWrapper.removeClass("hide")}},{key:"bind",value:function(){var e=this;$(document).on("keydown",function(t){var a=t.key;"Enter"===a&&e.nextLine()})}},{key:"nextLine",value:function(){this.actualLine===this.numberOfLines?(this.$dialogWrapper.addClass("hide"),this.cb()):(this.actualLine++,this.$dialogText.html(this.data.lines[this.actualLine-1]))}}]),e}();a["default"]=n},{}],8:[function(e,t,a){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),s=e("../states"),o=i(s),l=function(){function e(){var t=this;r(this,e);var a={w:980,h:470};localStorage.getItem("NWarriorToken")||window.location.assign("/"),this.game=new Phaser.Game(a.w,a.h,Phaser.AUTO,"phaser"),Object.keys(o).forEach(function(e){return t.game.state.add(e,o[e])}),this.game.state.start("Boot"),this.uiStyle()}return n(e,[{key:"uiStyle",value:function(){$(".ui-style").each(function(){$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>')})}}]),e}();a["default"]=l},{"../states":13}],9:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=e("../core/Globals"),s=(i(n),e("config")),o=(i(s),e("../core/Utils")),l=(i(o),function c(e){r(this,c),this.game=e,this.map=this.game.add.tilemap("forest_dummy");var t=this.map.widthInPixels,a=this.map.heightInPixels;this.game.world.setBounds(0,0,t,a),this.map.addTilesetImage("sprites_background_32x32","sprites_background_32x32"),this.groundLayer=this.map.createLayer("Ground"),this.treesLayer=this.map.createLayer("Trees"),this.objectsLayer=this.map.createLayer("Objects"),this.groundLayer.resizeWorld(),this.treesLayer.resizeWorld(),this.objectsLayer.resizeWorld()});a["default"]=l},{"../core/Globals":3,"../core/Utils":5,config:1}],10:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=e("core/Home"),s=i(n),o=function l(){r(this,l),new s["default"]};$(document).ready(function(){new o})},{"core/Home":4}],11:[function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),o=function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),s(t,[{key:"preload",value:function(){this.game.load.spritesheet("SwordsMan","img/classes/swordman_walk.png",32,32),this.game.load.spritesheet("SwordsMan_attack","img/classes/swordman_attack.png",64,64),this.game.load.spritesheet("SwordsMan_sleep","img/classes/swordman_sleep.png",64,64),this.game.load.spritesheet("SwordsMan_dead","img/classes/swordman_dead.png",64,64),this.game.load.spritesheet("Archer","img/classes/archer_walk.png",32,32),this.game.load.spritesheet("Archer_attack","img/classes/archer_attack.png",64,64),this.game.load.spritesheet("Archer_sleep","img/classes/archer_sleep.png",64,64),this.game.load.spritesheet("Archer_dead","img/classes/archer_dead.png",64,64),this.game.load.spritesheet("Mage","img/classes/mage_walk.png",32,32),this.game.load.spritesheet("Mage_attack","img/classes/mage_attack.png",64,64),this.game.load.spritesheet("Mage_sleep","img/classes/mage_sleep.png",64,64),this.game.load.spritesheet("Mage_dead","img/classes/mage_dead.png",64,64),this.game.load.tilemap("forest_dummy","tiles/forest_dummy.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.image("sprites_background_32x32","tiles/sprites_background_32x32.png")}},{key:"create",value:function(){this.game.state.start("Game")}},{key:"setLoader",value:function(){this.loadingStyle={font:"18px Helvetica",fill:"#fff"},this.loading=this.game.add.text(this.game.world.centerX,this.game.world.centerY,"Loading...",this.loadingStyle),this.loading.anchor.setTo(.5)}}]),t}(Phaser.State);a["default"]=o},{}],12:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=e("../core/Globals"),c=i(l),u=e("config"),h=i(u),d=e("../game/Character"),f=i(d),g=e("../game/Map"),p=i(g),m=e("../game/Dialog"),v=i(m),y=e("../core/Utils"),b=i(y),_=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),o(t,[{key:"create",value:function(){var e=this;this.debug=h["default"].debug,this.game.time.advancedTiming=!0,this.utils=new b["default"],this.map=new p["default"](this.game),this.getCharacterInfo(),this.welcome=new v["default"]({lines:["Welcome to Nameless Warrior! (Press ENTER to advance)","Use the Arrow Keys to move your character! (Press ENTER to advance)",'Use the "A" key to attack your enemies(Press ENTER to advance)']},function(){e.enemies=[];for(var t=0;t<2;t++)e.enemies.push(new f["default"](e.game,{characterClass:c["default"].SWORDSMAN,health:100,currentHealth:100},c["default"].ENEMY)),e.welcomeDialogFinished=!0})}},{key:"update",value:function(){this.welcomeDialogFinished&&this.game.physics.arcade.collide(this.player,this.enemies,this.collisionHandler)}},{key:"render",value:function(){if(this.debug&&(this.game.debug.text(this.game.time.fps||"--",10,20,"#fff"),this.player&&(this.game.debug.bodyInfo(this.player,32,32),this.game.debug.body(this.player)),this.enemies))for(var e in this.enemies){var t=this.enemies[e];this.game.debug.body(t)}}},{key:"collisionHandler",value:function(e,t){e.attacking&&t.receiveAttack(e)}},{key:"getCharacterInfo",value:function(){var e=this,t=localStorage.getItem("NWarriorCharID"),a=h["default"].apiURL+"characters/"+t,i={};i.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"get",url:a,data:i,success:function(t){t.characterClass=e.utils.formatClass(t.characterClass),e.player=new f["default"](e.game,t)}})}}]),t}(Phaser.State);a["default"]=_},{"../core/Globals":3,"../core/Utils":5,"../game/Character":6,"../game/Dialog":7,"../game/Map":9,config:1}],13:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(a,"__esModule",{value:!0});var r=e("./Boot");Object.defineProperty(a,"Boot",{enumerable:!0,get:function(){return i(r)["default"]}});var n=e("./Game");Object.defineProperty(a,"Game",{enumerable:!0,get:function(){return i(n)["default"]}})},{"./Boot":11,"./Game":12}]},{},[10]);