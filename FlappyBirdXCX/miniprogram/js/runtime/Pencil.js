import { Sprite } from '../base/Sprite.js';
import { Director } from '../Director.js';
import { DataStore } from '../base/DataStore.js';

export class Pencil extends Sprite {
    constructor (image, top) {
        console.log("image", image);
        super(image,
            0, 0,
            image.width, image.height,
          DataStore.getInstance().canvas.width, 0,
            image.width, image.height);

        // 铅笔的高度
        this.top = top;
    }

    draw () {
        // 铅笔水平偏移
        this.x -= Director.getInstance().speed;
        
        super.draw(this.img,
            0, 0,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height);
    }
}