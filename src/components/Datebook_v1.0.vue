<template>
  <div class="date">
    <div class="title-wrap">
      <h4 class="title">
        {{date.year}}
        <small>年</small>
        {{date.month}}
        <small>月</small>
      </h4>
    </div>
    <!-- 日期 -->
    <ul class="week-title">
      <li v-for="n of 7" class="week-item">{{n | weekFilter}}</li>
    </ul>
    <ul class="date-book">
      <!-- <li
        v-for="n of 31"
        v-text="n"
        :class="{'day-cur':isReady,'before':n<date.day,'out-of-count':n>date.dayCount,yellowIn:n==day_in,yellowLive:n>day_in&&n<day_out,yellowOut:n==day_out,}"
        @click="choose(n)"
      ></li> -->
      <li v-for="item of dayNum" v-text="item" class="day-cur before"></li>
      <li v-for="n of date.dayCount" v-text="n" 
        :class="{'day-cur':isReady,'before':n<date.day,'out-of-count':n>date.dayCount,yellowIn:n==day_in,yellowLive:n>day_in&&n<day_out,yellowOut:n==day_out,}"
        @click="choose(n)"></li>
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
      date: {},
      /**
       * choose_status 节点,点击时获取选择的节点判断,入住/退房
       * 1. true - 入住
       * 2. false - 退房
       */
      choose_status: true,
      /**
       * day_in 入住日期
       * 当 choose_status为 true 时,点击获取的数值存入
       */
      day_in: undefined,
      /**
       * day_out 入住日期
       * 当 choose_status为 true 时,点击获取的数值存入
       */
      day_out: undefined,
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
      isReady: true,


      /**
       * 带有星期标记的,需要把当月第一天的星期n取出,补充n-1位
       * dayNum
       */
      dayNum:[],

    };
  },
  methods: {
    loadDate() {
      let now = new Date();
      console.log(now);
      let year = now.getFullYear();
      console.log(year);
      let is366 =
        (year % 4 == 0 && year % 100 !== 0) || year % 400 == 0 ? 1 : 0;
      console.log(is366);
      let month = now.getMonth()+1;
      // month = 3;
      
      console.log(month);
      let day = now.getDate();
      console.log(day);
      let dayCount = 0;
      switch (month) {
        case 1:
          dayCount = 31;
          break;
        case 2:
          dayCount = is366 ? 29 : 28;
          break;
        case 3:
          dayCount = 31;
          break;
        case 4:
          dayCount = 30;
          break;
        case 5:
          dayCount = 31;
          break;
        case 6:
          dayCount = 30;
          break;
        case 7:
          dayCount = 31;
          break;
        case 8:
          dayCount = 31;
          break;
        case 9:
          dayCount = 30;
          break;
        case 10:
          dayCount = 31;
          break;
        case 11:
          dayCount = 30;
          break;
        case 12:
          dayCount = 31;
          break;
      }
      console.log(dayCount);
      // 处理月份显示 + "0"
      month = month<10? '0'+month :  month
      let date = {
        year,
        // is366,
        month,
        day,
        dayCount
      };
      this.date = date;
      console.log(this.date);
      // 设置当前时间为本月01日,获取此天的星期标记
      let firstDay = now.setDate(1);
      console.log(now);
      console.log(now.getDay());
      // 实际排列日期,在本月01日(周n)前插入n-1个空,达到实际排列效果
      let count = now.getDay();
      for(let j=0;j<count-1;j++) {
        this.dayNum.unshift('x');
      }
      // this.dayNum = count-1;
      // let currentCount = []
      // for(let i=1;i<=dayCount;i++) {
      //   currentCount.push(i)
      // } 
      // for(let j=0;j<count-1;j++) {
      //   currentCount.unshift('-');
      // }
      // console.log(currentCount);
      // this.dayNum.push(currentCount)
      // let dayNumCurrent = this.dayNum;
     
      // dayNumCurrent.push(dayCount);
      // dayNumCurrent[0].
      
      // console.log(this.dayNum);
    },
    choose(n) {
      let cs = this.choose_status;
      // 点击今日前的日期则返回
      if (n < this.date.day) return;
      // 两次都点同一天入住
      if (n == this.day_in) return;
      // 入住状态 cs-true
      if (cs) {
        this.day_in = undefined;
        this.day_out = undefined;
        this.day_in = n;
      }
      // 退房状态 cs-false
      else {
        // 退房状态点击的日期小于入住日期,修改入住日期
        if (n < this.day_in) {
          this.day_in = n;
          return;
        } else {
          // 
          this.day_out = n;
          // 执行计算入住日期或计费的函数在这里,还没写,那就先空着
          // this.computeSale();
        }
      }
      this.choose_status = !cs;
      console.log(this.day_in, this.day_out);
    }
  },
  created() {
    this.loadDate();
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
.date {
  width: 300px;
}
/* 年月标题 */
.date .title-wrap{}
.date .title-wrap .title{
  font-size: 16px;
  margin: 0;
  text-shadow: 1px 1px 2px #aaa;
}
.date .title-wrap .title small{
  color: #999;
  font-weight: 500;
}

/* 星期标记 */
.week-title {
  display: flex;
  width: 300px;
  /* height: 20px; */
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
  /* font-weight: bold; */
  color: #999;
  text-shadow: 1px 1px 2px #aaa;
}
.week-title .week-item{
  flex:1;
  background: #fff;
  text-align: center;
  height: 20px;
  line-height: 20px;
}
/* 日历主体 */
.date ul.date-book {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background: #f1f1f1; */
  padding: 10px;
  padding-top: 0;
  width: 302px;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
  /* border: 1px solid lightgray; */
}

.date ul.date-book li.day-cur {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  /* background: #f1f1f1; */
  /* margin: 10px; */
  cursor: pointer;
  font-size: 14px;
  line-height: 36px;
  border-radius: 8px;
  border: 1px solid lightgray;
  letter-spacing: .11em;
  box-shadow: 1px 1px 8px 0px lightgray;

}
.date ul.date-book li.day-cur:nth-child(n+7) {
  margin-top: -1px;
}
.date ul.date-book li.day-cur:not(:nth-child(7n)) {
  border-right: 0;
}
.date ul.date-book li.day-cur:nth-child(31) {
  border-right: 1px solid lightgray;
  width: 41px;
}

.yellowIn {
  color: #fff;
  font-weight: 700;
  background: #E64966 !important;
}
.yellowIn::after {
  content: "入住";
  font-size: 6px !important;
  font-weight: bold;
  width: 20px;
  font-weight: 700;
  height: 20px;
  letter-spacing: 0em;
}
.yellowLive {
  color: #fff;
  background: #F16B80 !important;
}
.yellowOut {
  font-weight: 700;
  color: #fff;
  background: #E64966 !important;
}
.yellowOut::after {
  content: "退房";
  font-size: 6px !important;
  font-weight: 700;
  font-weight: bold;
  width: 20px;
  height: 20px;
}
.before {
  color: #999;
  font-weight: 500 !important;
  /* background: #ccc !important; */
}
.out-of-count {
  color: #e1e1e1;
  font-weight: 500 !important;
  /* background: #ccc !important; */
}
</style>