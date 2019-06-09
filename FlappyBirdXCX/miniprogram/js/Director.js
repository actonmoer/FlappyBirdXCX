// 导演类，控制游戏的逻辑
import { DataStore } from './base/DataStore.js';
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil } from './runtime/DownPencil.js';

export class Director {
    constructor () {
        console.log("导演类，初始化！");
        this.dataStore = DataStore.getInstance();
        this.speed = 2; // 画面运行速度
    }

    // 单例模式创建导演类
    static getInstance () {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }


    // 动态创建铅笔
    createPencils () {
        // 铅笔的最小高度
        const minTop = DataStore.getInstance().canvas.height / 8;
        // 铅笔的最大高度
        const maxTop = DataStore.getInstance().canvas.height / 2;
        // 铅笔的实际高度
        const top = minTop + Math.random() * (maxTop - minTop);
    
        // 创建一组铅笔
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    //小鸟点击事件
    birdsEvent () {
        for (let i = 0; i < 3; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 判断小鸟是否和铅笔撞击
    static isStrike (bird, pencil) {
        let flog = false;

        if (bird.top > pencil.bottom || 
            bird.bottom < pencil.top || 
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            flog = true;
        }
        console.log("flog", flog);

        return !flog;
    }
    // 判断小鸟是否撞击地板和铅笔
    check () {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        // 撞击地板判断
        if (birds.birdsY[0] + birds.clippingHeight[0] >= land.y) {
            console.log('撞击地板啦！');
            return this.isGameOver = true;
        }

        // 小鸟边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        // 铅笔边框模型
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
          const pencil = pencils[i];
          const pencilBorder = {
              top: pencil.y,
              bottom: pencil.y + pencil.height,
              left: pencil.x,
              right: pencils.x + pencil.width

          };
          
          if (Director.isStrike(birdsBorder, pencilBorder)) {
              console.log("撞到铅笔了！");
              return this.isGameOver = true;
          }
            
            
        }

        // 加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    // 开始运行，统一控制游戏运行
    run() {
        // 踫撞检测
        this.check();

        if (!this.isGameOver) {

            //创建背影图片
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');

            // 当这个铅笔走过屏幕，看不见了，就把这组铅笔从数组中移除
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length == 4) {
                pencils.shift(); // 把数组的第一个元素推出数组，并且数组长度 -1
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }

            // 当屏幕内只有一组铅笔，会再创建一组铅笔，保证屏幕内有2级铅笔
          if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencils();
            }

            // 创建铅笔
            this.dataStore.get('pencils').forEach(value => {
                value.draw();
            });

            // 创建地板
            this.dataStore.get('land').draw();

            // 创建分数
            this.dataStore.get('score').draw();

            // 创建小鸟
            this.dataStore.get('birds').draw();
         
            // 运动
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {
            // 游戏结束

            // 创建开始按钮
            this.dataStore.get('startButton').draw();

            // 结束动画
            cancelAnimationFrame(this.dataStore.get('timer'));

            // 清空数据
            this.dataStore.destroy();

            // 触发小游戏垃圾回收
            wx.triggerGC();
        }


       
    }
}