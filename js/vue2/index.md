# vue2 响应式原理

## Vue 的 proto 注入

![proto](/vue2_proto.png)

## init 流程

![init](/vue2_init.png)

## mount 流程

![mount](/vue2_mount.png)

## data 处理流程

![data](/vue2_data.png)

## 组件逻辑梳理

1. 在 `Vue` 原型上挂有各种方法
2. 调用组件的 init，通过[Observe](/js/vue2/observe)将 `data` 的 `get`,`set` 劫持做好，定义好了每个 data[key]对应一个 [Dep](/js/vue2/dep) 实例，每个 dep 实例会与当前活动的 `watcher` 进行互相绑定
3. 实例化 [Watcher](/js/vue2/watcher),调用 `watcher` 实例的 `get` `方法。get` 方法会触发组件的更新方法，内部访问了 `data` 被劫持的属性，用来生成虚拟 dom。通过上一部的劫持逻辑，当前组件所依赖的 data 内的数据，与 watcher 进行了绑定
4. 当数据变化时，`dep` 实例会调用 `watcher` 的 `upate` 方法，将 `watcher` 实例的 `dirty` 设为 `true`
5. `watcher` 实例 `dirty` 为 `true`，将会在以后再次触发了组件的更新方法，重新收集依赖（将之前的依赖清空）
