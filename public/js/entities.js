import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadHole} from './entities/Hole.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory =>{entityFactories[name] = factory
                                                                                if(name == 'mario'){
                                                                                    console.log('9. Mario addAs');
                                                                                    console.log(factory);
                                                                                    console.log(entityFactories)

                                                                                }

            console.log(entityFactories)

        } ;

    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadHole().then(addAs('hole')),

    ])
    .then(() => entityFactories);



}