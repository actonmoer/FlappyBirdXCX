// 资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import { Resources } from './Resources.js';

export class ResourceLoader {
    constructor () {
        // 创建 Map 数据结构
        this.map = new Map(Resources);  
        // 初始化
        this._init();
    }

    // 创建图片对象
    _init () {
        this.map.forEach((value, key) => {
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        });
    }

    // 加载完成方法
    onLoaded (callback) {
        let count = 0;
        for (let value of this.map.values()) {
             value.onload = () => {
                count++;
                if (count >= this.map.size) {
                    console.log("加载完成", count);
                    typeof callback === `function` && callback(this.map);
                }
            }
        }
    }

    // 静态方法，可以通过ResourceLoader.create() 访问
    static create () {
        return new ResourceLoader();
    }
}