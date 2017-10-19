<template>
　　<div id="tally_form">
<el-form  :inline="true" :model="form" class="demo-form-inline">
		    <el-form-item>
		    <el-input v-model="form.explain" placeholder="支出说明"></el-input>
		    </el-form-item>
		    <el-form-item>
		    <el-input v-model="form.money" placeholder="支出金额"></el-input>
		    </el-form-item>
		    <el-form-item>
		    <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
		    </el-form-item>
		    <el-form-item>
		    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time"></el-time-picker>
		    </el-form-item>
		    <el-button type="primary" @click="addOne">记上一笔</el-button>
</el-form>
　　</div>
</template>
 
<script type="text/javascript">
　　export default {
　　　　data () {
　　　　　　return {
				form: {
					explain: '',
			        money: '',
			        date: '',
			        time: ''
				}
　　　　　　}
　　　　},
		methods: {
			// initBase: function(){
			// 	console.log("strat initBase...")
			// 	let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
			// 	dataBase.transaction(function (trans){
			// 		trans.executeSql(
			// 			"create table if not exists tally( timestamp text null,explain text null,money text null,date text null,time text null)"
			// 			,[]
			// 			,function (trans, result) {console.log("trans:"+trans+"*result:"+result)}
			// 			,function (trans, error){console.log("trans:"+trans+"*message:"+error.message)}
			// 		)
			// 	})
			// },
			// showBase: function(){
			// 	console.log("strat showBase...")
			// 	let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
			// 	dataBase.transaction( (trans) => {
			// 		trans.executeSql(
			// 			"select * from tally"
			// 			,[]
			// 			, (trans, data) => {
			// 				console.log("trans:"+trans+"*data:"+(data.rows))
			// 				// for (var word of data.rows) {
			// 				//    console.log(word);
			// 				// }
			// 			}
			// 			, (trans, message) => {console.log("trans:"+trans+"*message:"+message)}
			// 		)
			// 	})
			// },
			addOne: function(){
				console.log("strat addOne...")
				//转化时间格式
				let change_date = this.form.date
				change_date = change_date.getFullYear() + "-" + (change_date.getMonth()+1) + "-" +change_date.getDate()
				let change_time = this.form.time
				change_time = change_time.getHours() + ":" + change_time.getMinutes() + ":" +change_time.getSeconds()
				//数据库操作
				let dataBase = openDatabase("tally", "1.0", "本地记账本", 1024 * 1024);
				dataBase.transaction((trans) => {
					trans.executeSql(
						"insert into tally(timestamp,explain,money,date,time) values(?,?,?,?,?) "
						,[new Date().getTime(),this.form.explain,this.form.money,change_date,change_time]
						, (trans, result) => {
							console.log("trans:"+trans+"*result:"+result)
							this.$emit('refreshbizlines');
							this.form.explain = ""
							this.form.money = ""
							this.form.date = ""
							this.form.time = ""
						}
						, (trans, message) => {console.log("trans:"+trans+"*message:"+message)}
					)
				})
			}
		}
　　}
</script>
 
<style>
	#tally_form {
		margin: 20px 0;
	}
</style>