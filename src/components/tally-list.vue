<template>
　　<div id="tally_list">
		<el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'time', order: 'descending'}">
		    <el-table-column prop="explain" label="支出说明">
		    </el-table-column>
		    <el-table-column prop="money" label="支出金额">
		    </el-table-column>
		    <el-table-column prop="date" label="日期">
		    </el-table-column>
		    <el-table-column prop="time" label="时间" sortable>
		    </el-table-column>
		    <el-table-column fixed="right" label="操作">
		    	<template scope="scope">
			        <el-button size="small"  type="text" @click="remove(scope.row.timestamp)">删除</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		<TallyForm  v-on:refreshbizlines="selectData"></TallyForm>
　　</div>
</template>
 
<script type="text/javascript">
import TallyForm from './tallly-form.vue'
　　export default {
	  	components: {TallyForm},
　　　　data() {
	      return {
	        tableData: null
	      }
	    },
	    methods: {
	    	selectData: function(){
	    		console.log("strat selectData...")
	    		let today = new Date()
	    		today = today.getFullYear() + "-" + (today.getMonth()+1) + "-" +today.getDate()
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						"select * from tally WHERE date = ?"
						,[today]
						, (trans, data) => {
							var dataarray = []
							for (var word of data.rows) {
								dataarray.push(word)
							}
							this.tableData = dataarray
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message))
						}
					)
				})
	    	},
	    	open:function(message) {
		        this.$message(message);
		    },
	    	editor: function(obj){
	    		console.log(obj)
	    	},
	    	remove: function(obj){
	    		console.log("strat remove...")
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						"DELETE FROM tally WHERE timestamp = ?"
						,[obj]
						, (trans, data) => {
							this.selectData()
							this.open('您已成功删除一条记录')
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message))
						}
					)
				})
	    	},
	    	initBase: function(){
				console.log("strat initBase...")
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction(function (trans){
					trans.executeSql(
						"create table if not exists tally( timestamp text null,explain text null,money text null,date text null,time text null)"
						,[]
						,function (trans, result) {console.log("trans:"+trans+"*result:"+result)}
						,function (trans, error){console.log("trans:"+trans+"*message:"+error.message)}
					)
				})
			}
	    },
	    mounted: function(){
	    	if(!window.openDatabase){
	    		console.log("浏览器不支持")
	    	}
	    	else{
	    		this.initBase()
	    		this.selectData()
	    	}
	    	
	    }

　　}
</script>
<style>
	#tally_list {
	}
</style>