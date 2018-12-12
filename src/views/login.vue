<template>
  <div class="login-wrap">
    <mt-field
      placeholder="请输入用户名"
      v-model="username"
    ></mt-field>
    <mt-field
      placeholder="请输入密码"
      type="password"
      v-model="password"
    ></mt-field>
    <mt-field
      placeholder="请输入手机号"
      type="tel"
      v-model="phoneNum"
    ></mt-field>
    <p class="tips">Tip : 请填写11位手机号码，密码不得低于6位</p>
    <mt-button type="primary" size="large" @click="login($event)">登录</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "login",
  data() {
    return {
      username:"",
      password:"",
      phoneNum:""
    };
  },
  methods:{
    login(){
      if(this.userName =='' || this.phoneNumber == '' || this.password == ''){
					Toast({
					  message: '用户名 / 手机号 / 密码不能为空',
					  duration: 3000
					});
				}else if(!!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
					Toast({
					  message: '请检查手机号是否填写正确',
					  duration: 3000
					});
				}else if(this.password.length < 6 ){
					Toast({
					  message: '密码需要6位或6位以上',
					  duration: 3000
					})
				}else{
					//将用户名，手机号本地存储
          let newUser = {username: this.username ,phoneNum:this.phoneNum,password:this.password};
          this.$axios.post("/login",{newUser}).then(res=>{
            this.$store.commit("getUserName",this.username);
            this.$store.commit("setToken",res.data.token);
            if(this.$store.state.user.token) {
              this.$router.push('/my');
            }else{
              this.$router.replace('/login');
            }
          })
					
				}
    }
  }
};
</script>
<style lang="less" scoped>
.login-wrap{
  .tips{
			padding-left: 18vw;
			font-size: 12px;
      color: #999;
      line-height: 20px;
		}
}
</style>
