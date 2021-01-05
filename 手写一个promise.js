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