import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadFire() {
    return loadSpriteSheet('fire')
        .then(createFireFactory);
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


function createFireFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(hole) {
        if (hole.killable.dead) {
            return 'flat';
        }

        return walkAnim(hole.lifetime);
    }

    function drawHole(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createHole() {
        const fire = new Entity();
        fire.size.set(16, 16);

        //hole.addTrait(new Physics());
        fire.addTrait(new Solid());
        //hole.addTrait(new PendulumMove());
        fire.addTrait(new Behavior());
        fire.addTrait(new Killable());

        fire.draw = drawHole;

        return fire;
    };
}
