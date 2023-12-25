# 状态模式
- **使用场景**

1. 音乐播放器：播放中、暂停、播放完成
2. 文件上传：待上传、上传中、暂停、上传成功、上传失败

- **demo**
```js
class StateMachine {
    constructor() {
        this.currentState = new NotLoggedInState(this);
    }
    login() {
        this.currentState.login();
    }
    logout() {
        this.currentState.logout();
    }
    setState(state) {
        this.currentState = state;
    }
}
class NotLoggedInState {
    constructor(stateMachine) {
        this.stateMachine = stateMachine;
    }
    login() {
        console.log('Logging in...');
        this.stateMachine.setState(new LoggedInState(this.stateMachine));
    }
    logout() {
        console.log('You are not logged in.');
    }
}
class LoggedInState {
    constructor(stateMachine) {
        this.stateMachine = stateMachine;
    }
    login() {
        console.log('You are already logged in.');
    }
    logout() {
        console.log('Logging out...');
        this.stateMachine.setState(new NotLoggedInState(this.stateMachine));
    }
}
// Usage
const stateMachine = new StateMachine();
stateMachine.login(); // Logging in...
stateMachine.logout(); // Logging out...
stateMachine.logout(); // You are not logged in.
stateMachine.login(); // Logging in...
stateMachine.login(); // You are already logged in.
stateMachine.logout(); // Logging out...

```
