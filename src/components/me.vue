<template>
　　<div id="me" class="me">
		<h1>HELLO,world</h1>
		<h3>vuejs demo project</h3>
		<p> my name is <strong>{{ author }}</strong>,I come form Shantou city, Guangdong province,and born in 1995</p>
		<p>And you?</p>
		<input v-model="parentMsg" placeholder="What's your name">
		<hr/>
		<His :myName='parentMsg'></His>
　　</div>
</template>
 
<script type="text/javascript">

import His from './his.vue'
　　export default {
		name: 'me',
	  	components: {His},
	　　data () {
　　　　　　return {
　　　　　　　　author: "czw",
				parentMsg: ''
　　　　　　}
	　　}
　　}
</script>
 
<style scoped>
.me {
	height: auto;
	text-align: center;
}
.me	h3 {
	color: turquoise;
	font-size: 14px;
}
.me input{
	outline: none;
	border: 1px solid transparent;
	border-bottom-color: turquoise;
	width: 200px;
	height: 30px;
	line-height: 30px;
	text-align: center;
}
.me hr{
	margin: 20px 0;
}
</style>