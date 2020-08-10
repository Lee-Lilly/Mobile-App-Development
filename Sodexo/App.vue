<template>
  <view class="container">
    <view v-if="loading">
      <text>Ladataan...</text>
    </view>      
    <scroll-view  v-if="!loading">
      <view class="sodexo">
        <text class="title">{{title}} {{timeperiod}}</text>
        <view class="mealdates">
          <mealDate-item
            v-for="mealdate in mealdates"
            :key="mealdate.date"
            :item="mealdate"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import MealDateItem from "./MealDateItem"

export default {
  name: "Sodexo",
  components: {
    MealDateItem
  },
  data() {
    return {
      title: '',
      timeperiod: '',
      mealdates: [],
      loading: true
    };
  },
  methods: {
    getSodexoData() {
      fetch("http://ptm.fi/materials/sodexo.json")
        .then(response => response.json())
        .then(data => {
          this.title = data.meta.ref_title,
          this.timeperiod = data.timeperiod,
          this.mealdates = data.mealdates
        });
        this.loading = false
    }
  },
  beforeMount(){
    this.getSodexoData()
 },
};
</script>
<style>
.container {
  background-color: #b6dbf39f;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 30;
}
.sodexo {
  align-items: center;
}
.mealdates {
  align-items: flex-start;
}
.title {
  color: rgba(7, 48, 48, 0.753);
  font-size: 20px;
  margin-top: 10;
}
</style>
