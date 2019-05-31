import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadHole} from './entities/Hole.js';
import {loadFinish} from './entities/Finish.js';
import {loadFire} from './entities/Fire.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadHole().then(addAs('hole')),
        loadFinish().then(addAs('finish')),
        loadFire().then(addAs('fire'))
    ])
    .then(() => entityFactories);
}