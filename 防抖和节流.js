function debounce(fn, delay) {
  let timer 
  return function(...args) {
    clearTimeout(timer) //timer=null起不到终止计时器的作用，只是给timer变量赋了值
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/* 
为什么不用 timer = null ?

clearTimeout(timer)清除了timer指向的定时器，timer=null，是修改timer的指向，
是timer这个变量不指向某个定时器，然而并没有清除这个定时器，定时器依旧可以使用
 */

/* 通过 arguments 可以获取到所有传递给函数的参数，无论是否有形参接收。 */

/* 
arg的作用：

假设你现在监听了一个鼠标移动事件：
functionhandler(e){console.log(e,this);}
el.onmousemove=handler;
当触发事件时，打印得到事件对象以及当前元素（el）。
现在给事件处理函数加上了防抖：el.onmousemove=debounce(handler)。
对于debounce(handler)，返回值是一个函数，所以等同于el.onmousemove=denouceHandler，
只是一个新的事件处理函数而已，它的参数中就会包含事件对象，也就是arguments中包含事件对象。
 */

function throttle(fn, delay) {
  let timer
  return function(...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null //这里必须使用timer=null, 如若清除定时器, a仍有值。
    }, delay)
  }
}