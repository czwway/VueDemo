<template>
　　<div id="vuex" class="vuex">
		<p>VUEX demo</p>
　　　　<p>{{ count }}</p>
		<p>
		    <button @click="increment">+</button>
		</p>
　　</div>
</template>
 
<script type="text/javascript">
	
　　export default {
	//计算属性
		computed: {
		    count () {
		      // return this.$store.state.count
		      return this.$store.getters.doneTodos
		    }
		},
	//事件
		methods: {
		    increment () {
		    	// this.$store.commit('increment')
		    	this.$store.dispatch('increment')
		    },
		}
　　}
</script>
 
<style scoped>
.vuex {
	width:80%;
	margin:20px auto;
}
.vuex p{
	text-align: center;
}
</style>