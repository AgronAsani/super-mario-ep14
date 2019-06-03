import SpriteSheet from './SpriteSheet.js';
import {createAnim} from './anim.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;

                                                                            if(name == 'mario'){
                                                                                console.log('3. Bild von marios wird geladen');
                                                                            }
    });
}

export function loadJSON(url) {
    return fetch(url)
    .then(r => r.json());
}

export function loadSpriteSheet(name) {
                                                                            if(name == 'mario'){
                                                                                console.log('2. marios JSON file wird num vom geladen');
                                                                            }
    return loadJSON(`./sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);
                                                                                if(name == 'mario'){
                                                                                    console.log('4. json file wird nach tiles, frames oder animations überprüft')
                                                                                    console.log(sheetSpec.frames);
                                                                                    console.log(image)
                                                                                }


        if (sheetSpec.tiles) {
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.index[0],
                    tileSpec.index[1]);
            });
        }

        if (sheetSpec.frames) {
            sheetSpec.frames.forEach(frameSpec => {
                sprites.define(frameSpec.name, ...frameSpec.rect);

                                                                                    if(name == 'mario'){
                                                                                        console.log('7. Mario im buffer drin')
                                                                                        console.log(frameSpec.name);
                                                                                        console.log(frameSpec.rect)
                                                                                    }
            });
        }


        if (sheetSpec.animations) {
            sheetSpec.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);

                                                                                        if(name == 'mario'){
                                                                                            console.log(' Marios animationen im buffer drin');

                                                                                        }
            });
        }

        return sprites;
    });
}
