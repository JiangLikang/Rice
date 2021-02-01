## useMemo useCallback React.memo()

目的： 性能优化

useMemo返回一个值，useCallback返回一个函数，这个函数或值在依赖变化之前，依旧指向最初的状态。

React.memo()可接受2个参数，
第一个参数为纯函数的组件。
第二个参数用于对比props控制是否刷新，与shouldComponentUpdate()功能类似。

```js
React.memo(Child,(preProps, nextProps) => {})
```

## useRef

useRef会在每次渲染时返回`同一个ref对象`，即返回的ref对象在组件的整个生命周期内保持不变。

- 可以使用useRef来跨越渲染周期存储数据，而且对它修改也不会引起组件渲染。

```jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function App(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const timerID = useRef();
  
  useEffect(() => {
    timerID.current = setInterval(()=>{ //本质上，useRef就是一个其.current属性保存着一个可变值“盒子”。
        setCount(count => count + 1);   // 你可以用它来保存dom，对象等任何可变值。
    }, 1000); 
  }, []);
  
  useEffect(()=>{
      if(count > 10){
          clearInterval(timerID.current);
      }
  });
  
  return (
    <>
      <button ref={couterRef} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
    </>
  );
}
```