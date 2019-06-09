// 小鸟类, 循环渲染三只小鸟
import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';

export class Birds extends Sprite {
    constructor () {
        const image = Sprite.getImage('birds');
        super(image,
         0, 0, 
         image.width, image.height,
         0, 0,
         image.width, image.height);

        // 小鸟的三种状态用一个数组存储
        // 小鸟的宽度是34，上下边距是10 左右边距是9

        // 每只小鸟的截取起始位置
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
        // 每只小小鸟的截取起始位置
        this.clippingY = [10, 10, 10];
        // 每只小鸟截取的宽度
        this.clippingWidth = [34, 34, 34];
        // 每只小鸟截取的高度
        this.clippingHeight = [24, 24, 24];
        // 小鸟在屏幕上的起始横坐标,占屏宽的 1/4
        const birdX = DataStore.getInstance().canvas.width / 4;
        // 每只小鸟的起始横坐标
        this.birdsX = [birdX, birdX, birdX];
        // 小鸟在屏幕的起始纵坐标, 占屏高的 1/2
        const birdY = DataStore.getInstance().canvas.height / 2;
        // 每只小鸟的起始纵坐标
        this.birdsY = [birdY, birdY, birdY];

        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];

        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];

        // 小鸟的Y坐标
        this.y = [birdY, birdY, birdY];

        // 当前小鸟下标
        this.index = 0;
        // 当前循环到的小鸟
        this.count = 0;
        // 小鸟下落的时间 
        this.time = 0;

    }

    draw () {
        // 小鸟切换频率
        const speed = .2;
        this.count += speed;

        // 当循环到第三只小鸟，重新回到第一只
        if (this.index >= 2) {
            this.count = 0;
        }

        // 减少小鸟切换频率
        this.index = Math.floor(this.count);

        // 模拟重力加速度
        const g = .98 / 2.4;

        // 下落之前向上偏移
        const offsetUp = 30;

        // 小鸟自由落体
        const offsetY = g * this.time * (this.time - offsetUp) / 2;

        this.time++;

        // 计算小鸟下落位置，因为是三个小鸟，需要循环
        for (let i = 0; i < 3; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }

        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]);
    }
}