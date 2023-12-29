<script setup>

</script>

<template>
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