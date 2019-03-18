<template>
   <el-card class="box">
       <cus-bread level1="数据统计" level2="数据报表"></cus-bread>

       <div id="main" style="width: 600px;height:400px;"></div>

   </el-card>
</template>
<script>

import MyEcharts from 'echarts';
export default {
    data (){
       return{

       } 
    },
    mounted(){
         this.initEcharts()
    },
    methods:{
        initEcharts(){
        const myChart = MyEcharts.init(document.getElementById('main'));
        myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
myChart.setOption(option);

        }
    }
}
</script>
<style>
.box{
    height: 100%;
}
</style>