<template>
    <div class="date">
      <h1>日期</h1>
      <ul class="date-book">
        <li v-for="n of 31" v-text="n" :class="{'day-cur':isReady,'before':n<date.day,'out-of-count':n>date.dayCount,yellowIn:n==day_in,yellowLive:n>day_in&&n<day_out,yellowOut:n==day_out,}" @click="choose(n)"></li>
      </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * date 日期,日期对象,存放
       * 1.year 年份
       * 2.month 月份
       * 3.day 日期
       * 4.dayCount 日期数,每月多少天
       * -5.is366 是否闰年 不存入对象,只在获取时间时获取并判断
       */
      date:{},
      /**
       * choose_status 节点,点击时获取选择的节点判断,入住/退房
       * 1. true - 入住
       * 2. false - 退房
       */
      choose_status:true,
      /**
       * day_in 入住日期
       * 当 choose_status为 true 时,点击获取的数值存入
       */
      day_in:undefined,
      /**
       * day_out 入住日期
       * 当 choose_status为 true 时,点击获取的数值存入
       */
      day_out:undefined,
      /**
       * limit [ in, out ] 房源可入住日期
       * 可由父->子,获取入住起始->结束的日期,但是不使用,那就不要
       */
      // limit: [0,0]
      /**
       * isReady 房源可入住(由父组件获取当前房源是否可入住)
       * 1.true  有 ,默认为true
       * 2.false 无
       */
      isReady:true,
    }
  },
  methods: {
    loadDate() {
      let now = new Date();
      console.log(now);
      let year = now.getFullYear();
      console.log(year);
      let is366 = year%4==0 &&year%100!==0 || year%400==0 ? 1:0;
      console.log(is366);
      let month = now.getMonth();
      console.log(month);
      let day = now.getDate();
      console.log(day);
      month = 2;
      let dayCount = 0;
      switch(month) {
        case 1: dayCount=31;
        break;
        case 2: dayCount= is366?29:28;
        break;
        case 3: dayCount=31;
        break;
        case 4: dayCount=30;
        break;
        case 5: dayCount=31;
        break;
        case 6: dayCount=30;
        break;
        case 7: dayCount=31;
        break;
        case 8: dayCount=31;
        break;
        case 9: dayCount=30;
        break;
        case 10: dayCount=31;
        break;
        case 11: dayCount=30;
        break;
        case 12: dayCount=31;
        break;
      }
      console.log(dayCount);
      let date = {
        year,
        // is366,
        month,
        day,
        dayCount
      }
      this.date = date;
      console.log(this.date);
    },
    choose(n) {
      let cs = this.choose_status;
      // 点击今日前的日期则返回
      if(n<this.date.day) return;
      // 两次都点同一天入住
      if(n == this.day_in) return;
      if(cs) {
        this.day_in = undefined;
        this.day_out = undefined;
        this.day_in = n;
      }
      else {
        if(n<this.day_in) {
          this.day_in = n;
          return;
        }
        else {
          this.day_out = n;
          // 执行计算入住日期或计费的函数在这里,还没写,那就先空着
          // this.computeSale();
        }
      }
      this.choose_status = !cs;
      console.log(this.day_in,this.day_out);
    }
  },
  created () {
    this.loadDate();
  }
}
</script>
<style scoped>

  .date {
    width: 300px;
  }

  .date ul.date-book {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #f1f1f1;
    padding: 10px;
    max-width: 300px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .date ul.date-book li.day-cur{
    width: 20px;
    height: 20px;
    background: #fff;
    margin: 10px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    border-radius: 50%;
  }
  .yellowIn {
    background: yellow  !important;
  }
  .yellowIn::after {
    content:'入住';
    font-size: 9px !important;
    font-weight: bold;
    width: 20px;
    height: 20px;
  }
  .yellowLive {
    background: yellow  !important;
  }
  .yellowOut {
    background: yellow  !important;
  }
  .yellowOut::after {
    content:'退房';
    font-size: 8px !important;
    font-weight: bold;
    width: 20px;
    height: 20px;
  }
  .before {
    background: #ccc !important;
  }
  .out-of-count {
    background: #ccc !important;
  }
</style>