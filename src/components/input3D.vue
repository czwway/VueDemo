<template>
  <div id="input3D">
    <div v-html="styleCode"></div>
    <section class="section">
        <div class="container" id="container" >
            <div class="qian">前</div>
            <div class="zuo">左</div>
            <div class="hou">后</div>
            <div class="yuo">右</div>
            <div class="shang">上</div>
            <div class="xia">下</div>
            <div class="Y" :class="{showassist:isShowAssist}"></div>
            <div class="X" :class="{showassist:isShowAssist}"></div>
            <div class="Z" :class="{showassist:isShowAssist}"></div>
        </div>
    </section>
    <section class="input">
        <div>
            <label for="rotateX">rotateX</label>
            <input id="rotateX" type="range" name="points" min="0" max="360" v-model="rotateX" />
            <!-- <el-slider min="0" max="360" v-model="rotateX"></el-slider> -->
            {{ rotateX }}
        </div>
        <div>
            <label for="rotateY">rotateY</label>
            <input id="rotateY" type="range" name="points" min="0" max="360" v-model="rotateY" />
            {{ rotateY }}
        </div>
        <div>
            <label for="rotateZ">rotateZ</label>
            <input id="rotateZ" type="range" name="points" min="0" max="360" v-model="rotateZ" />
            {{ rotateZ }}
        </div>
        <div>
          <el-button type="info" @click="isShowAssist = !isShowAssist">show/hide</el-button>
          <el-button type="success" @click="startrotation">start rotating</el-button>
          <el-button type="danger"  @click="stoprotation">top rotating</el-button>
        </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'input3D',
  components: {},
  //数据
  data(){
    return {
      rotateX:0,
      rotateY:0,
      rotateZ:0,
      isShowAssist:false,
      RotationId: null
    }
  },
  created(){},
  methods: {
    startrotation: function(){
      if(this.RotationId !== null){return}
      this.RotationId = setInterval(()=>{
        if(this.rotateX >= 360){
          this.rotateX = 0
          this.rotateY = parseInt(this.rotateY) + 5
        }
        if(this.rotateY >= 360){
            this.rotateY = 0
        }
        this.rotateX = parseInt(this.rotateX) + 5
      }, 20)
    },
    stoprotation: function(){
      clearInterval(this.RotationId)
      this.RotationId = null
    }
  },
  //计算属性值
  computed:{
    styleCode(){
      return '<style>#input3D .container{transform: rotateX(' + this.rotateX + 'deg) rotateY(' + this.rotateY + 'deg) rotateZ(' + this.rotateZ + 'deg) }</style>'
    }
  },
}
</script>

<style>
html,body{margin: 0;padding: 0}
#input3D .section {
    margin: 60px auto 20px;
    width: 140px;
    height: 150px;
}
#input3D .section div{
    position: absolute;
    width: 100px;
    height: 100px;
    font-size: 36px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}
#input3D .container {
    transform-style: preserve-3d;
}
#input3D .qian{
    background-color: blue;
    transform: translateZ(50px);
}
#input3D .zuo{
    background-color: #969ced;
    transform: rotateY(-90deg) translateZ(50px);
}
#input3D .hou{
    background-color: #3a3f54;
    transform: translateZ(-50px);
}
#input3D .yuo{
    background-color: #3ed0b3;
    transform: rotateY(-90deg) translateZ(-50px);
}
#input3D .shang{
    background-color: #e04f57;
    transform: rotateX(-90deg) translateZ(-50px);
}
#input3D .xia{
    background-color: #e07f1d;
    transform: rotateX(90deg) translateZ(-50px);
}
#input3D .section .Y {
    display: none;
    width: 0;
    height: 150px;
    margin-top: -25px;
    border: 1px solid #000;
    transform: translateX(50px);
}
#input3D .section .Y:before{
    content: "Y";
    color: #0d0d0d;
    position: absolute;
    display: inline-block;
    top: -58px;
    left: -5px;
    font-size: 14px;
    font-weight: bold;
}
#input3D .section .X {
    display: none;
    height: 0;
    width: 150px;
    border: 1px solid #000;
    margin-left: -25px;
    transform: translateY(50px);
}
#input3D .section .X:before{
    content: "X";
    color: #0d0d0d;
    position: absolute;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    left: 152px;
    top: -49px;
}
#input3D .section .Z {
    display: none;
    height: 0;
    width: 150px;
    border: 1px solid #000;
    margin-left: -25px;
    -webkit-transform: translateY(50px);
    transform: rotateY(-90deg) translateZ(0px) translateY(50px);
}
#input3D .section .Z:before{
    content: "Z";
    color: #0d0d0d;
    position: absolute;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    left: 152px;
    top: -49px;
}
#input3D .input{
    margin-top: 20px;
    padding: 20px 0;
    border-top: 1px solid #555;
    display: flex;
    flex-direction: column;
    
}
#input3D .input>div{
    display: flex;
    justify-content: center;
    margin: 10px 0;
}
#input3D .input>div input {
    width: 50%;
    margin-left: 20px;
}
#input3D .section .showassist {
  display: block;
}
</style>