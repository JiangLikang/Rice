/* 
1.创建一个空的简单 JavaScript 对象（即{}）；

2.链接该对象（即设置该对象的构造函数）到另一个对象 ；（ 通俗理解就是新对象隐式原型__proto__链接到构造函数显式原型prototype上。）

3.将步骤 1 新创建的对象作为 this 的上下文 ；（ 实际是执行了构造函数 并将构造函数作用域指向新对象 ）

4.如果该函数没有返回对象，则返回 this。（ 实际是返回一个空对象， new Object()就是返回一个空对象{} ）
 */
function _new(constructor, ...arg) {
  var obj = {}; // 对应于上面的步骤 1
  
  obj.__proto__ = constructor.prototype; // 对应于上面的步骤 2

  var res = constructor.apply(obj, arg); // 对应于上面的步骤 3

  return Object.prototype.toString.call(res) === '[object Object]' ? res : obj; // 对应于上面的步骤 4
}

const Fun = function(name) {
  this.name = name;
};

console.log(_new(Fun, '小明'));

// Fun {name: "小明"}
