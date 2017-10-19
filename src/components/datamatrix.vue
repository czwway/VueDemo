<template>
　　<div id="datamatrix">
　　　　<h1>HELLO DataMatrix</h1>
		<section class="explain">
			<i class="el-icon-caret-bottom" @click="isShow = !isShow"></i>
			<div class="explaintext" v-show="isShow">
				<p>数据阵 说明：</p>
				<ul>
					<li>输入框:输入想展示的数据个数</li>
					<li>滑块:设置每项时间(s)</li>
					<li>start run:开始生成数据阵</li>
					<li>remove one:随机删除一个数据</li>
					<li>remove all:删除全部数据</li>
					<li>stop:暂停生成或删除</li>
				</ul>
			</div>
		</section>
		<section id="list-demo" class="demo">
			<el-input v-model="number" placeholder="请输入数据个数" change="go"></el-input>
			<div class="block">
			    <el-slider v-model="value" :format-tooltip="formatTooltip"></el-slider>
			</div>
			<el-button-group>
				<el-button type="info" size="small" @click="go">start run</el-button>
				<el-button  type="info" size="small" @click="remove">remove one</el-button>
				<el-button  type="info" size="small" @click="removeall">remove all</el-button>
				<el-button  type="info" size="small" @click="stop">stop</el-button>
			</el-button-group>
			<transition-group name="list" tag="p">
				<span v-for="item in items" v-bind:key="item" class="list-item">
		      		{{ item }}
		    	</span>
		  	</transition-group>
		</section>
　　</div>
</template>
 
<script type="text/javascript">
　　export default {
　　　　data () {
　　　　　　return {
				isShow:false,
				number: '',
				value: 50,
　　　　　　　　items: [],
    			nextNum: 1,
    			StopId: null
　　　　　　}
　　　　},
		methods: {
		    randomIndex: function () {
		      return Math.floor(Math.random() * this.items.length)
		    },
		    go: function(){
		    	if(this.number<1 || this.number>60){return}
		    	this.items = []
		    	this.StopId = setInterval(this.add, this.value*10)
		    },
		    removeall: function(){
		    	this.StopId = setInterval(this.remove, this.value*10)
		    },
		    stop: function () {
		    	clearInterval(this.StopId)
		    },
		    add: function () {
		    	if(this.nextNum > this.number){
		    		this.number = ''
		    		this.nextNum = 1
		    		clearInterval(this.StopId)
		    		return
		    	}
		      	this.items.splice(this.randomIndex(), 0, this.nextNum++)
		    },
		    remove: function () {
		    	if(this.items.length <= 1){
		    		this.items = []
		    		this.number = ''
		    		this.nextNum = 1
		    		clearInterval(this.StopId)
		    		return
		    	}
		      	this.items.splice(this.randomIndex(), 1)
		    },
		    formatTooltip: function(val) {
		        return val / 100;
		    }
		},
　　}
</script>
 
<style>
#datamatrix {
    background-color: #eeeaea;
    height: auto;
    text-align: center;
    padding: 30px 0;
    min-height: 300px;
	}
#datamatrix .explain {
	width: 320px;
    margin: 0 auto 20px;
    font-size: 12px;
    color: #555;
}
#datamatrix .explaintext{
	text-align: left;
    word-break: break-all;
}
#datamatrix .demo{
	width: 320px;
	margin: 0 auto;
}
#datamatrix .el-button-group {
	display: flex;
    justify-content: center;
    margin: 10px 0;
}
#datamatrix .list-item {
    display: inline-block;
    width: 10%;
    text-align: center;
}
#datamatrix .list-enter-active, .list-leave-active {
  transition: all 2s;
}
#datamatrix .list-enter, .list-leave-to  {
  opacity: 0;
  transform: translateY(30px) rotate(90deg);
}
</style>