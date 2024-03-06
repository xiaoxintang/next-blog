# Dep 类

首先需要明确，有一个全局的`Dep.target`存储的是当前活跃的`Watcher`实例

## depend 方法

```ts
// 简化后如下，将当前依赖，放到watcher实例的依赖列表中
depend() {
	if (Dep.target) {
		Dep.target.addDep(this)
	}
}
```

## addSub 方法

```ts
addSub(sub: DepTarget) {
	// 将watcher实例放到当前依赖的订阅列表中
	this.subs.push(sub)
}
```

## notify 方法

```ts
notify() {
	// stabilize the subscriber list first
	const subs = this.subs.filter(s => s) as DepTarget[]

	for (let i = 0, l = subs.length; i < l; i++) {
		const sub = subs[i]
		// 依赖更新之后，去调用每个watcher实例的update方法
		sub.update()
	}
}
```
