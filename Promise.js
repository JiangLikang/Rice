/* 手写一个Promise */
class Promise {
  constructor(exec) {
    this.state = 'pendding' //状态定义
    this.value = undefined 
    this.reason = undefined
    //解决异步调用的问题
    this.onResolveCbs = []
    this.onRejectCbs = []
    
    this.resolve = value => {
      if (this.state == 'pendding') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolveCbs.forEach(fn => fn())
      }
    }

    this.reject = reason => {
      if (this.state == 'pendding') {
        this.state = 'reject'
        this.reason = reason
        this.onRejectCbs.forEach(fn => fn())
      }
    }

    try {
      exec(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onReject)  {
    if (this.state == 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.state == 'reject') {
      onReject(this.reason)
    }
    if (this.state == 'pending') {
      this.onRejectCbs.push(onFulfilled(this.value))
      this.onRejectCbs.push(onReject(this.reason))
    }
  }
}

/* 并行promise */
let promiseQueue = Array(5).fill('promise').map(v => new Promise((resolve,__) => {
  resolve()
}))

Promise.all(promiseQueue)

/* 串行Promise */

// recude写法
let promiseQueue = Array(5).fill('promise').map(v => () => new Promise((resolve,__) => {
  resolve()
}))

serialPromises = promises =>  {
  promises.reduce((prev, next) => prev.then((preVal) => next(preVal)), Promise.resolve());
}

// await写法
let promiseQueue = Array(5).fill('promise').map(v => async () => new Promise((resolve,__) => {
  resolve()
}))

serialPromises = promises =>  {
  for (let i = 0; i < promises.length; i++) {
    await promises[i]
  }
}

// 利用promise.race实现异步并发请求最大并发数的控制
class PoolRequest{
  // 连接池
  #quene = [];
  #max = 1;

  #doRequest(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        url % 2 == 0 ? resolve() : reject();
      }, url);
    });
  }

  constructor(limit = 1) {
    // limit check
    this.#max = limit;
  }

  get(url, callback) {
    if(this.#quene.length >= this.#max) {
      return Promise.race(this.#quene).finally(() => this.get(url, callback));
    }
    let promise = this.#doRequest(url);
    let fin = () => {
      let index = this.#quene.indexOf(promise);
      this.#quene.splice(index, 1);
    }
    let res = (data) => {
      callback(null, data);
    }
    let rej = (err) => {
      callback(err);
    }
    promise.then(res, rej).finally(fin);
  
    this.#quene.push(promise);
  }
}

const p = new PoolRequest(5);
let callback = (index) => {
  return (err, data) => {
    console.log(index);
    console.log(err);
    console.log(data);
  }
}
p.get(10000, callback(1));
p.get(10001, callback(2));
p.get(5000, callback(3));
p.get(10000, callback(4));
p.get(10001, callback(5));
p.get(11000, callback(6));

