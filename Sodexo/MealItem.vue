<template>
  <view class="container">
    <text class="category">{{item.category}}</text>
    <text>{{item.title_en}}</text>
    <text>{{item.price}}</text>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      Type: Object
    }
  }
};
</script>

<style>
  .container {
    margin: 5;
  }
  .category {
    color:rgb(115, 113, 230);  
  }
</style>