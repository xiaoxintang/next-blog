<script setup>
import {ref} from "vue";

const runStart = ref(false)
const animationStart = ()=>{
  runStart.value= true
}
</script>

<template>
<div :class="['box',{'runStart':runStart}]"></div>
  <button @click="animationStart">开始运行</button>
</template>

<style scoped>
.box{
  width: 140px;
  height: 140px;
  background: url("/run.png") no-repeat 0 center/auto 100%;
  /**
  * 计算方法：将图片分为几块
  * 1680 / 140 = 12,但是配置了animation-fill-mode保留最后一帧的话，这里就需要再减1，不然最后一帧就是空白，超界了
  * 第二个参数
  * start，代表动画直接开始，也就是时间才开始，就已经执行了一个距离段。点位在140，280，140*3 ...，140*11（这里看到最后一帧）
  * 如果是end,表示戛然而止。也就是时间一结束，当前距离位移就停止。点位在0，140，280，140*（n-1）...,140*(11 -1) 这里看到倒数第二帧
  * 但是animation-fill-mode如果是`both`或者`forwards`,动画会保留最后一帧的位置，
  * 所以对应上面start的话，就是看不到动画图片，超界了
  * end的话，对应倒数第一帧，就会停留展示
  * 因此，这里是end
  */
  animation-timing-function: steps(11,end);
  animation-name: run;
  animation-duration: 1s;
  animation-iteration-count: 1;
  /*如果只是*/
  animation-fill-mode: both;
  animation-play-state: paused;
}
.runStart{
  animation-play-state: running;
}
@keyframes  run {
  0%{
    background-position-x: 0;
  }
  100%{
    /*这是只运行一次，因此这里展示最后一帧，将配合animation-fill-mode*/
    background-position-x: calc(-1680px + 140px);
  }
}
</style>