// 这里记录一些面试的相关算法

// 数组交集，编写一个函数，输入两个数组，输出它们的交集。输出数组中不含重复的元素，元素排列顺序可随意。（微信笔试）
function arrIntersect (arr1,arr2) {
  if (Array.isArray(arr1)===false||Array.isArray(arr2)===false) {
    return
  }
  let resArr = []
  arr1.map(arr1Item => {
    arr2.map(arr2Item => {
      if (arr2Item === arr1Item) {
        resArr.push(arr2Item)
      }
    })
  })
  return [...new Set(resArr)]
}

function arrIntersect (arr1,arr2) {
  if (Array.isArray(arr1)===false||Array.isArray(arr2)===false) {
    return
  }
  let a = new Set(arr1), b = new Set(arr2)
  return [...a].filter(x => b.has(x))
}

