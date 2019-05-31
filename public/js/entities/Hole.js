import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadHole() {
    return loadSpriteSheet('hole')
        .then(createHoleFactory);
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


function createHoleFactory(sprite) {
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
        const hole = new Entity();
        hole.size.set(16, 16);

        hole.addTrait(new Physics());
        hole.addTrait(new Solid());
        //hole.addTrait(new PendulumMove());
        hole.addTrait(new Behavior());
        hole.addTrait(new Killable());

        hole.draw = drawHole;

        return hole;
    };
}
