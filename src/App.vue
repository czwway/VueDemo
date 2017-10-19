<template>
  <div id="app">
    <section class="linksection">
      <router-link to="/Me" class="link">View Me</router-link>
      <router-link to="/Input3D" class="link">View Input3D</router-link>
      <router-link to="/Todo" class="link">View Todo</router-link>
      <router-link to="/DataMatrix" class="link">View DataMatrix</router-link>
      <router-link to="/Tally" class="link">View TallyBook</router-link>
      <router-link to="/VuexDome" class="link">View VuexDome</router-link>
    </section>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  //数据
  data(){
    return {
    }
  },
  created(){},
  //计算属性值
  computed:{},
  //注册组件
  // components: { Me,Input3D }
}
</script>

<style>
*{user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}
html,body{
  margin: 0;
  padding: 0;
}
section.linksection{
  background-color: #3a51ee;
  padding: 5px 0;
}
section.linksection a {
  color: #fff;
  text-decoration: none;
}
.link {
    text-align: center;
    font-size: .8rem;
    display: block;
    height: 30px;
    line-height: 30px;
    background-color: #2f077f;
    margin: 10px auto;
    box-sizing: border-box;
    max-width: 200px;
    min-width: 150px;
    border-radius: 25px;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: all .5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(150px);
}
@media screen and (max-width: 640px){
	html,body{
		font-size: 14px;
	}
}
</style>












