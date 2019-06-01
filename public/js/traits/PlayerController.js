import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';
//test
export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.time = 0;
        this.highscore = 0;
    }

    setPlayer(entity) {
        this.player = entity;

        this.player.stomper.onStomp = () => {
            this.score += 100;
        }
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        } else {
            this.time += deltaTime * 2;
            if (this.player.pos.x >= 6200 && this.player.pos.x <= 6210){
                this.highscore = this.time;
                console.log(this.highscore);
                document.getElementById("test").innerHTML = this.highscore.toFixed().toString().padStart(1, '0')+ " seconds";
                var btn = document.getElementById("button");
                btn.style.display = 'block';
                setTimeout(this.end,10000);
                document.onkeydown = function (e) {
                    e.preventDefault();
                    return false;
                }
            }

        }
    }

    end() {
        window.open('../public/menu.html', '_self');
        return;
    }

    level2(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(128, 128);
            level.entities.add(this.player);
        } else {
            this.time -= deltaTime * 2;
        }
    }

}
