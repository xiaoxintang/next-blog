# Watcher

1. 组件`beforeMount`与`mounted`生命周期之间。会为组件`new Watcher()`传入当前组件的实例与更新组件的方法
2. 实例化`Watcher`的时候，会调用`Watcher`实例的`get`方法。get 方法执行的时候会将当前 watcher 设为活跃状态`Dep.target`。实际上就是调用组件的更新方法，去生成虚拟 dom 之类的。而在生成虚拟 dom 的过程中，需要涉及到对 data 里被劫持对象的访问，从而触发 get 收集依赖

## get 方法

```ts
get() {
	// 当前wathcer实例执行的时候，将自身设为活跃的watcher
	pushTarget(this)
	let value
	const vm = this.vm
	try {
		// this.getter实际上就是当前组件传入的更新组件的方法
		value = this.getter.call(vm, vm)
	} catch (e: any) {
		if (this.user) {
			handleError(e, vm, `getter for watcher "${this.expression}"`)
		} else {
			throw e
		}
	} finally {
		// "touch" every property so they are all tracked as
		// dependencies for deep watching
		if (this.deep) {
			traverse(value)
		}
		// 执行完成之后，将当前watcher设为非活跃状态
		popTarget()
		this.cleanupDeps()
	}
	return value
}
```

## addDep 方法

```ts
addDep(dep: Dep) {
	const id = dep.id
	if (!this.newDepIds.has(id)) {
		this.newDepIds.add(id)
		// 将当前依赖放入watcher实例的deps列表里
		this.newDeps.push(dep)
		if (!this.depIds.has(id)) {
			// 反向操作，将依赖与当前watcher实例进行绑定
			dep.addSub(this)
		}
	}
}
```

## update 方法

```ts
update() {
	/* istanbul ignore else */
	if (this.lazy) {
		// lazy属性一般默认是true,源码中 this.lazy = !!options.lazy
		this.dirty = true
	} else if (this.sync) {
		// 同步的话，直接运行
		this.run()
	} else {
		// 这里是放入到了nextTick队列中，让watcher实例在下个事件循环中运行
		queueWatcher(this)
	}
}
```
