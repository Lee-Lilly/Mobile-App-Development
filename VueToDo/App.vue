<template>
  <view class="container">
    <Banner />
    <ToDoList />
  </view>
</template>

<script>
import Banner from './Banner'
import ToDoList from './ToDoList'

export default {
  name: 'App',
  components: {
    Banner,
    ToDoList
  }
}
</script>

<style>
.container {
  flex: 1;
  padding-top:25px;
  margin: 5;
  background-color: white;
  align-items: center;
  justify-content: center;
}
.banner {
  background-color: #5f9ea0;
  justify-content: center;
  margin-bottom: 20;
}
</style>
