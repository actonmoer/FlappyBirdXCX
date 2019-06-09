// 精妙的基类，负责初始化精妙加载的资源和大小以及位置
import { DataStore } from './DataStore.js';

export class Sprite {
    constructor (img = null, 
                 srcX = 0, 
                 srcY = 0, 
                 srcW = 0, 
                 srcH = 0, 
                 x = 0,
                 y = 0,
                 width = 0, 
                 height = 0) {

        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx; 
        this.img = img;         // 图片对象
        this.srcX = srcX;       // 图片横轴裁剪的起始位置
        this.srcY = srcY;       // 图片竖轴裁剪的起始位置
        this.srcW = srcW;       // 图片裁剪的宽度
        this.srcH = srcH;       // 图片裁剪的高度
        this.x = x;             // 图片在canvas横轴上的摆放位置
        this.y = y;             // 图片在canvas竖轴上的摆放位置
        this.width = width;     // 要使用的图片宽度
        this.height = height;   // 要使用的图片高度

    }

    // 获取图片
    static getImage(key) {
        return DataStore.getInstance().res.get(key);
    }

    // 画一张图片
    draw (img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height) {
        this.ctx.drawImage (
            img,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height);
    }
}