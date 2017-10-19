<template>
　　<div id="todo">
　　　　<h1>HELLO Todo</h1>
		<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
		<div class="todobox">
			<div class="input">
				<span class="perch" v-bind:class="{isall: isAll}"><i class="el-icon-arrow-down" @click="setAll(isAll)"></i></span>
				<div class="inputdiv">
					<input type="text" id="input" name="input"  v-model="input" placeholder="what need to done?" @keyup.enter="addItem">
				</div>
			</div>
			<div class="list">
				<ul>
					<li v-for="(item,index) in filteredTodos">
						<span class="perch">
							<el-checkbox v-model="item.isFinish"></el-checkbox>
						</span>
						<span class="text"  v-bind:class="{finish: item.isFinish}" >{{item.text}}</span>
						<el-button type="primary" icon="delete" size="mini" @click="removeItem(index)"></el-button>
					</li>
				</ul>
			</div>
			<div class="option" v-if="isShow">
				<span class="count"><strong>{{remain}}</strong> item left</span>
				<div class="route">
					<a href="#/todo/#/all" @click="hashchange('all')" :class="{select:hashName == 'all'}">all</a>
					<a href="#/todo/#/active"  @click="hashchange('active')"  :class="{select:hashName == 'active'}">active</a>
					<a href="#/todo/#/finish"  @click="hashchange('completed')"  :class="{select:hashName == 'completed'}">completed</a>
				</div>
				<span class="clear" @click="clear">clear finish</span>	
			</div>
		</div>
		
　　</div>
</template>
 
<script type="text/javascript">
import Store from '../store'
	//状态过滤器
	var filters = {
		all(items){
			return items
		},
		active(items){
			return items.filter((item)=>{
				return !item.isFinish
			})
		},
		completed(items){
			return items.filter((item)=>{
				return item.isFinish
			})
		}
	}

　　export default {
　　　　data () {
　　　　　　return {
				input: '',
				items: Store.fetch(),
				hashName: 'all',
				percentage: 0
			}
　　　　},
		//钩子
		beforeCreate (){
			if(Store.fetch() === null){
				Store.init()
			}
		},
		//数据监听
		watch: {
			items: {
				handler: function(items){
					if(this.items.length){
						let percentage = filters.completed(this.items).length/filters.all(this.items).length * 100
						this.percentage = parseInt(percentage)
					}else{
						this.percentage = 0
					}
					
					Store.save(items)
				},
				deep:true
			}
		},
		//事件方法
		methods: {
			addItem:function(){
				if(!this.input.trim()){return}
				this.items.push({
					text: this.input,
					isFinish:false
				})
				this.input = ''
			},
			removeItem: function(index){
				this.items.splice(index,1)
			},
			setAll: function(value){
				this.items.forEach((item)=>{
					item.isFinish = !value
				})
			},
			clear(){
				return this.items = filters.active(this.items)
			},
			hashchange(route){
				if(filters[route]){
					this.hashName = route
				}
			}
		},
		//计算属性
		computed:{
			isShow(){
				return this.items.length
			},
			remain(){
				return filters.active(this.items).length
			},
			isAll:{
				get(){
					return this.remain === 0
				}
			},
			filteredTodos(){
				return filters[this.hashName](this.items)
			},
		},
		//生命周期  --- 挂载完毕
		mounted: function () {
			if(!this.items.length){
				this.percentage = 0;
			}else{
				this.percentage  = parseInt(filters.completed(this.items).length/filters.all(this.items).length * 100)
			}
			
		}


　　}

</script>
<style>
#todo {
	display: flex;
    flex-direction: column;
    /*background-color: #eeeaea;*/
    color: #777;
}
#todo h1 {
	justify-content: center;
    display: flex;
    align-items: center;
    height: 80px;
    color: #ec6639;
}
#todo .todobox {
	width: 90%;
	max-width: 400px;
	margin: 20px auto;
	border-left: 1px solid #b2afaf;
	border-right: 1px solid #b2afaf;
	background-color: #fff;
	box-shadow: 0px 5px 11px 1px #aaa;
}
#todo .perch {
	width: 50px;
	height: 50px;
	text-align: center;
	display: inline-block;
	position:absolute;
	line-height: 50px;
    font-size: 12px;
    color: #bbb;
}
#todo .inputdiv {
	margin-left: 50px;
}
#todo .input{
	height: 50px;
    border-bottom: 1px solid #e5e3e3;
}
#todo #input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    border: transparent;
    font-size: 20px;
    color: #888;
    outline: none;
}
#todo .list ul{
	list-style: none;
	padding: 0;
	margin: 0;
}
#todo .list li {
	position: relative;
    min-height: 50px;
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 5px 0;
}
#todo .list li:hover .el-button {
	display: inline-block;
}
#todo .text{
	padding-left: 50px;
	padding-right:35px;
    width: 100%;
    word-break: break-all;
    align-items: center;
    display: inline-flex;
    line-height: initial;
}
#todo .finish{
	text-decoration: line-through;
    opacity: 0.4;
}
#todo .el-button {
	position: absolute;
    height: 30px;
    margin: 10px;
    right: 5px;
    display: none;
}
#todo .option{
	height: 40px;
    line-height: 40px;
    font-size: .8rem;
    color: #888;
    padding: 0 10px;
    position: relative;
    display: flex;
    justify-content: space-around;
}
#todo .isall{
	color: #333;
}
#todo .route{
	display: inline-block;
	width: 155px;
	text-align: center;
}
#todo .route a{
    display: inline-block;
    text-decoration: none;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    color: #555;
}
#todo .route .select{
    border-radius: 4px;
    border: 1px solid #aaa;
}
#todo .clear {
	right: 10px;
	cursor: pointer;
}
#todo .el-progress{
	width: 300px;
    position: fixed;
    transform: rotate(90deg);
    top: 0;
    margin-top: 401px;
    margin-right: -138px;
    right: 0;
}
#todo .el-progress:before{
	content: "进度";
    color: #1d90e6;
    display: inline-block;
    position: absolute;
    width: 16px;
    top: -5px;
    left: -25px;
    transform: rotate(-90deg);
}
</style>