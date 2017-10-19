<template>
　　<div id="his" class="his">
　　　　<h1>HELLO</h1>
　　　　<a> My name is <strong>{{ author }}</strong></a>
　　</div>
</template>
 
<script type="text/javascript">
　　export default {
		props: ['myName'],
　　　　data () {
　　　　　　return {
　　　　　　　　author: this.myName
　　　　　　}
　　　　},
		watch: {
    		myName: function (val, oldVal) {
    			this.author = val.toUpperCase()
      		// console.log('new: %s, old: %s', val, oldVal)
    		}
    	}
　　}
</script>
 
<style scoped>
.his {
	height: auto;
	text-align: center;
}
</style>