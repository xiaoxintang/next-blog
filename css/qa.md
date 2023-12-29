<script setup>
import CssRun from '../components/cssRun.vue';
import CssRunOnce from '../components/cssRunOnce.vue';
import RotateCard from '../components/rotateCard.vue';
</script>
# QA
## 多行文本省略 超出行之后 `overflow:hidden` 无效？
可能是父级添加了 `transform` 属性。使用其他方式定位父级
## 多行文本省略变成一行？
```css
white-space: normal;
```
## css3帧动画
- **animation-fill-mode**

设置 CSS 动画在执行之前和之后如何将样式应用于其目标，涉及场景如下：
1. 动画有delay的情况下，`backwards`应用第一帧动画
2. 动画执行完成的情况下，`forwards`保留由执行期间遇到的最后一个状态
3. `both`代表以上两个情况都设置。默认值是`none`不应用这两个情况

- **animation-timing-function**

设置动画在每个周期的持续时间内如何进行。编写css3动画，只需要将0%，100%的位置写好，用`step`去设置动画分割份数就可以快速完成
::: details 源码
```vue
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
```
:::
<CssRun/>

但是如果只需要动画执行一次，并且保留最后一帧的话，不能是图片的宽度，而是需要是减一个单位
::: details 源码
```vue
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
```
:::
<CssRunOnce/>

:::tip
动画看起来有点奇怪是因为run.png素材原因
:::

## 3D效果
- **perspective**

[perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective) 指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。
- **transform-style**
  
[transform-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style) 设置元素的子元素是位于 3D 空间中还是平面中。

父元素需要设置`transform-style: preserve-3d`

<RotateCard/>

:::details 源码
```vue
<div class="rotateCard">
  <div class="card"></div>
</div>
</template>

<style scoped>
.rotateCard{
  perspective: 1500px;
}

.card{
  width:375px;
  height: 375px;
  animation: run 1.96s 0.12s infinite;
  background: url("//tempim-1256796114.cos.ap-shanghai.myqcloud.com/466x466/4CD964/fff") no-repeat center/contain;
}
@keyframes run {
  0% {
    transform: rotateY(0);
  }

  10.2% {
    transform: rotateY(720deg);
  }

  34.69% {
    transform: rotateY(710deg);
  }

  59.18% {
    transform: rotateY(725deg);
  }

  100% {
    transform: rotateY(720deg);
  }
}

</style>
```
:::