<template>
　　<div id="tally">
		<el-tabs type="border-card">
			<el-tab-pane label="今日账单">
				<List></List>
			</el-tab-pane>
			<el-tab-pane label="全部账单">
				<ListAll></ListAll>
			</el-tab-pane>
			<el-tab-pane label="图表">
				<Chart></Chart>
			</el-tab-pane>
		</el-tabs>
　　</div>
</template>
 
<script type="text/javascript">
import List from './tally-list.vue'
import ListAll from './tally-all-list.vue'
import Chart from './tally-chart.vue'
　　export default {
	  	components: {List,ListAll,Chart},
　　　　data () {
　　　　　　return {
　　　　　　}
　　　　},
　　}
</script>
 
<style>
	#tally {
		width: 80%;
		min-width: 320px;
		margin: 0 auto;
		padding-top: 30px;
		height: 100vh;
	}
</style>