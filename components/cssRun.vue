<script setup>

</script>

<template>
<div class="box"></div>
</template>

<style scoped>
.box{
  width: 140px;
  height: 140px;
  background: url("/run.png") no-repeat 0 center/auto 100%;
  /**
  * 计算方法：将图片分为几块
  * 1680 / 140 = 12
  * 第二个参数
  * start，代表动画直接开始，也就是时间才开始，就已经执行了一个距离段。点位在140，280，140*3 ...，140*12（那这里就直接看不到图片了）
  * 如果是end,表示戛然而止。也就是时间一结束，当前距离位移就停止。点位在0，140，280，140*（n-1）...,140*(12 -1) 这里还可以看到最后一帧
  * 所以这里用end
  */
  animation-timing-function: steps(12,end);
  animation-name: run;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  //animation-fill-mode: both;
}
@keyframes  run {
  0%{
    background-position-x: 0;
  }
  100%{
    /*这里直接填写图片的宽度，将配合*/
    background-position-x: calc(-1680px);
  }
}
</style>