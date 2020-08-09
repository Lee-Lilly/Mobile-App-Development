<template>
  <view>
    <view class="addToDo">
      <text-input
        v-model="text"
        class="textInput"
      />
      <button
        :on-press="onAddTodo"
        title="ADD"
        color="#1ab2ff"
        accessibility-label="Add a new todo"
      />
    </view>
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :item="todo"
      @removeTodo="removeTodo"
    />
  </view>
</template>

<script>
import TodoItem from "./ToDoItem"
export default {
    components: { 'todo-item':TodoItem },
    data: function() {
        return {
        text:'',
        todos:[],
        id: 0
        };
    },
    methods: {
        onAddTodo: function() {
            //alert("add item" + this.text)
            this.todos.push({text:this.text, id:this.id})
            this.id++
            this.text = ''
        },
        removeTodo(id){
            this.todos = this.todos.filter(item => item.id !== id)
    }
    }
};
</script>

<style>
  .addToDo {
    flex-direction: row;
    margin-bottom: 20
  }
  .textInput {
    border-width: 1;
    border-style: solid;
    border-color: #ccc;
    padding: 5;
    margin: 2;
    flex: 1;
  }
</style>
