<template>
　　<div id="tally_all_list">
		<el-table :data="tableData" stripe style="width: 100%">
		    <el-table-column prop="explain" label="支出说明">
		    </el-table-column>
		    <el-table-column prop="money" label="支出金额">
		    </el-table-column>
		    <el-table-column prop="date" label="日期">
		    </el-table-column>
		    <el-table-column prop="time" label="时间">
		    </el-table-column>
		    <el-table-column fixed="right" label="操作">
		    	<template scope="scope">
			        <el-button size="small"  type="text" @click="remove(scope.row.timestamp)">删除</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		<el-button type="text" @click="more">查看更多</el-button>
　　</div>
</template>
 
<script type="text/javascript">

　　export default {
　　　　data() {
	      return {
	        tableData: this.selectData(),
	        page:0
	      }
	    },
	    methods: {
	    	selectData: function(){
	    		console.log("strat selectData...")
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						"select * from tally order by date DESC limit ?,5"
						,[this.page]
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
	    	open: function() {
	    		console.log("open")
		        this.$message('您已成功删除一条记录');
		    },
	    	more: function(){
	    		console.log("start more....")
	    		this.page = this.page + 1
	    		console.log("more"+this.page)
	    		let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction( (trans) => {
					trans.executeSql(
						"select * from tally order by date DESC limit ?,5"
						,[this.page*5]
						, (trans, data) => {
							for (var word of data.rows) {
								this.tableData.push(word)
							}
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message))
						}
					)
				})
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
							this.open()
						}
						, (trans, message) => {
							console.log("trans:"+trans+"*message:"+JSON.stringify(message))
						}
					)
				})
	    	}
	    },

　　}
</script>
<style>
	#tally_all_list {
	}
</style>