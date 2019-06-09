// 变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
    constructor() {
        this.map = new Map();
    }

    // 插入
    put(key, value) {
      console.log("key", key);
      console.log("value", value);
        if (typeof value === `function`) {
            value = new value();
        }
        
        this.map.set(key, value);
        return this;
    }
    // 获取
    get(key) {
        return this.map.get(key);
    }

    // 置空
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }

    // 单例模式
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }

        return DataStore.instance;
    }
}