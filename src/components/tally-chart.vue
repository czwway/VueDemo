<template>
　　<div id="tally_chart">
		<el-button-group>
		    <el-button type="primary" @click="Today_Pie">今日“饼图”</el-button>
		    <el-button type="primary" @click="Month_Trend">本月走势</el-button>
		</el-button-group>
		<div id="myChart" :style="{width: '80%', height: '340px'}"></div>
　　</div>
</template>
 
<script type="text/javascript">
import echarts from 'echarts'
　　export default {
　　　　data() {
	      return {
	      }
	    },
	    mounted(){
		},
	    methods: {
	    	Today_Pie(){
		        let myChart = this.$echarts.init(document.getElementById('myChart'))
				var dataarray = []
	    		let today = new Date()
	    		today = today.getFullYear() + "-" + (today.getMonth()+1) + "-" +today.getDate()
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						"select * from tally WHERE date = ?"
						,[today]
						, (trans, data) => {
							
							for (var word of data.rows) {
								let obj = {}
								obj = {value:word.money, name:word.explain}
								dataarray.push(obj)
							}
							myChart.clear()
							myChart.setOption({
							    tooltip : {
							        trigger: 'item',
							        formatter: "{a} <br/>{b} : {c} ({d}%)"
							    },
								xAxis : [{
									axisLine : {
							    		lineStyle: {
							    			color: '#fff',
										    width: 2,
										    type: 'solid'
							    		}
							    	}
							    }],
							    yAxis : [{
							    	axisLine : {
							    		lineStyle: {
							    			color: '#fff',
										    width: 2,
										    type: 'solid'
							    		}
							    	}
							    }],
							    series : [
							        {
							            name: '访问来源',
							            type: 'pie',
							            data:dataarray
							        }
							    ]
							})
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message))
						}
					)
				})
	    	},
	    	Month_Trend(){
	    		let myChart = this.$echarts.init(document.getElementById('myChart'))
	    		let month = new Date()
	    		month = month.getFullYear() + "-" + (month.getMonth()+1)
	    		console.log(typeof month)
	    		var Month_Trend_date = []
	    		var Month_Trend_data = []
	    		let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						'select *,SUM(money) from tally where date like "'+month+'%" GROUP BY date '
						,[]
						, (trans, data) => {
							for (var word of data.rows) {
								Month_Trend_date.push(word.date)
								Month_Trend_data.push(word.money)
							}
							myChart.clear()
							myChart.setOption({
								tooltip : {trigger: 'axis'},
							    calculable : true,
							    xAxis : [{
						            type : 'category',
						            boundaryGap : false,
						            data : Month_Trend_date,
						            axisLine : {
							    		lineStyle: {
							    			color: '#000',
										    width: 2,
										    type: 'solid'
							    		}
							    	}
							    }],
							    yAxis : [{
						            type : 'value',
						            axisLabel : {formatter: '￥{value}'},
						            axisLine : {
							    		lineStyle: {
							    			color: '#000',
										    width: 2,
										    type: 'solid'
							    		}
							    	}
							    }],
							    series : [{
						            type:'line',
						            data:Month_Trend_data,
							    }]
							})
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message.message))
						}
					)
				})
	    	}
	    }
　　}
</script>
<style>
	#tally_chart {
	}
</style>





