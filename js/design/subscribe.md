# 发布订阅模式
- **应用场景**
  redux、多个组件间相互通信、eventbus
- **代码实现**
  代码核心就是将对应的回调函数放进对应事件的监听列表里，事件触发的时候，执行事件所有的回调函数

 [redux subscribe函数](https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L201)`nextListeners`保存所有回调函数，`dispatch`触发的时候执行所有回调
 
简化后的redux看起来像这样
```js
function createStore(){

  let nextListeners = new Map()
  function getState(): S {
    return currentState
  }
  function subscribe(listener) {
    let isSubscribed = true
    const listenerId = listenerIdCounter++
    nextListeners.set(listenerId, listener)
    
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      isSubscribed = false
      nextListeners.delete(listenerId)

    }
  }
  function dispatch(action) {
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    nextListeners.forEach(listener => {
      listener()
    })
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}
```