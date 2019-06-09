// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from './js/base/ResourceLoader.js';
import { BackGround } from './js/runtime/BackGround.js';
import { DataStore } from './js/base/DataStore.js';
import { Land } from './js/runtime/Land.js';
import { Director } from './js/Director.js';
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';

export class Main {
  constructor() {
    this.canvas = wx.createCanvas('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  // 资源第一次加载完成
  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    // 把 canvas 保存在 DataStore 中
    this.dataStore.ctx = this.ctx;
    // 把图片资源统一保存在 DataStore 的 res 中
    this.dataStore.res = map;

    // 初始化
    this._init();
  }


  _init() {
    // 游戏状态
    this.director.isGameOver = false;

    // 把背景图片、地板图片等资源统一保存到 DataStore 中
    this.dataStore
      .put('pencils', [])
      .put('background', BackGround)
      .put('land', Land)
      .put('birds', Birds)
      .put('startButton', StartButton)
      .put('score', Score);

  
    // 注册 canvas 触摸事件
    this.registerEvent();

    // 在游戏开始之前，要先绘制一组铅笔，放到页面中
    this.director.createPencils();

    // 图片保存完成，使用导演类统一初始化图片
    this.director.run();
  }

  registerEvent() {
    // this.canvas.addEventListener('touchstart', e => {
    //   // 阻止Js事件冒泡
    //   e.preventDefault();

    //   if (this.director.isGameOver) {
    //     console.log("游戏开始！");
    //     this._init();
    //   } else {
    //     this.director.birdsEvent();
    //   }

    // });

    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        console.log("游戏开始！");
        this._init();
      } else {
        this.director.birdsEvent();
      }
    });
  }
}