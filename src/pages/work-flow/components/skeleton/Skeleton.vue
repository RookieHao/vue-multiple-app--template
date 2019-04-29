<template>
  <!-- 骨架屏内容自由编辑 -->
  <div class="skeleton-wrapper">
    <ul class="items-content">
      <li v-for="(item,index) in 6" :key="index" class="item">
        <div class="item-icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="item-label">{{item.name}}</div>
      </li>
    </ul>
    <div class="nav">
      <div class="nav-item"></div><div class="nav-item"></div><div class="nav-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>

<style scoped>
.skeleton-wrapper .items-content{
  display:flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  padding:10px;
}
.skeleton-wrapper .item{
  width:calc(100%/3 - 10px);
  height:calc(100vw/3 - 16px);
  border-radius:5px;
  margin-bottom:10px;
  font-size: 14px;
  border:1px solid #ededed;
}
.skeleton-wrapper .item:not(:nth-child(3n)){
  margin-right:10px;
}
.skeleton-wrapper .nav{
  position: absolute;
  bottom:0;
  left:0;
  width:100%;
  display: flex;
  height: 50px;
  background:#eee;
  border:1px solid #ededed;
}
.skeleton-wrapper .nav-item{
  flex:1
}
.skeleton-wrapper .nav-item:not(:last-child){
  border-right:1px solid #ededed;
}
</style>
