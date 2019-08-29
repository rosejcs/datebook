<template>
  <div class="index">
    <h1  @click="choose">住宿日期查询</h1>
    <datebook v-if="choose_date"/>
  </div>
</template>

<script>
import datebook from '@/components/Datebook.vue'
  export default {
    data() {
      return {
        // 用户点击日期显示入住日历
        choose_date:false
      }
    },
    methods: {
      choose() {
        // this.choose_date = true;
        this.choose_date = !this.choose_date;
      }
    },
    created() {

    },
    components:{
      datebook
    }
  }


</script>
