import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadFinish() {
    return loadSpriteSheet('finish')
        .then(createFinishFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                them.killable.kill();
                // us.pendulumMove.speed = 0;
            } else if(them.vel.y < us.vel.y){
                them.killable.kill();
            } else{
                them.killable.kill();
            }
        }
    }

}


function createFinishFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(finsih) {
        if (finsih.killable.dead) {
            return 'flat';
        }

        return walkAnim(finsih.lifetime);
    }

    function drawFinish(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createFinish() {
        const finsih = new Entity();
        finsih.size.set(16, 16);

      //  finsih.addTrait(new Physics());
        finsih.addTrait(new Solid());
     //   finsih.addTrait(new PendulumMove());
        finsih.addTrait(new Behavior());
        finsih.addTrait(new Killable());

        finsih.draw = drawFinish;

        return finsih;
    };
}
