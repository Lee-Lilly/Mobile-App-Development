<template>
  <view class="row">
    <text>* {{item.text}}</text>
    <text :on-press="onRemoveTodo" class="listItemDelete">  X </text>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      Type: Object
    },
    removeTodo: { type: Function }
  },
  methods: {
    onRemoveTodo: function() {
      //alert("remove:" + this.item.id)
      this.$emit('removeTodo', this.item.id)
    },
  }
};
</script>

<style>
  .row {
    flex-direction: row;
    margin: 5  
  }
  .listItemDelete {
    margin-left: 10;
    color: red;
    font-weight: bold;
  }
</style>