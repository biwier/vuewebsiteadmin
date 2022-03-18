<template >
  <div id="login"  v-loading="fullscreenLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div style="width: 500px;height: 520px;margin: 0;text-align: center">
      <div>
        <div style="width:100%;height:150px">
          <img src="@/assets/logo.png" style="height:100%;width:auto"/>
        </div>
        <span style="display:block;font-size:23px;color:white;margin-top:-25px">后台管理系统</span>
      </div>
      <div style="height: 30px;width: 400px;margin-left: 10%">
        <el-form :model="loginForm" style="padding: 50px" :rules="rules" ref="loginForm">
        <el-form-item  prop="username">
        <el-input  v-model="loginForm.loginAccount" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
        <el-input v-model="loginForm.loginPassword" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
           <el-checkbox v-model="loginForm.rememberMe"><span style="color: white;">记住密码</span></el-checkbox>
        </el-form-item>
        <el-form-item>
          <div class="button1" @click="submitForm" >登录</div>
        </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import SysMenu from '../api/sysMenu.js'
  import User from '../api/user.js'
    export default {
        name: "Login",
      data() {
        return {
          fullscreenLoading:false,
          loading:false,
          labelPosition: 'right',
          loginForm: {
            loginAccount: '',
            loginPassword: '',
            rememberMe:false
          },
          addForm:{
            loginAccount: '',
            loginPassword: '',
            email:''
          },
          rules: {
            loginAccount:[{required:true,message:'请输入用户名',trigger:'blur'}],
            loginPassword:[{required:true,message:'请输入用户名',trigger:'blur'}],
          },
        };
      },
      methods:{
        async submitForm() {
          //读取菜单信息
          localStorage.clear();
          let self = this;
          self.fullscreenLoading = true;
          let res = await User.login(self.loginForm);
          if (res.code===0){
            localStorage.setItem("user",JSON.stringify(res.msg));
            let menuList = await SysMenu.getMenuList();
            console.log(menuList);
            if(menuList.status){
              localStorage.setItem("menu",JSON.stringify(menuList.detail));
              self.fullscreenLoading = false;
              self.$message.success("登录成功!");
              self.$router.push("/index");
            }else{
              self.fullscreenLoading = false;
              self.$message.error(menuList.reason);
              self.fullscreenLoading = false;
            }
          } else {
            this.$message.error(res.msg);
            self.fullscreenLoading = false;
          }

        },
        async registerForm(){
          //读取菜单信息
          let self = this;
          let res = await User.saveUser(self.loginForm);
          console.log(res)
        },
        async passLogin(){
          let self = this;
          localStorage.clear();
          let res = await User.passLogin();
          if (res.code===0){
            localStorage.setItem("user",JSON.stringify(res.msg));
            let menuList = await SysMenu.getMenuList();
            console.log(menuList);
            if(menuList.status){
              localStorage.setItem("menu",JSON.stringify(menuList.detail));
              self.$router.push("/index");
            }
          }
        }
      },
      created() {
        this.passLogin();
      }

    }
</script>

<style scoped>
  #login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:  center;
    align-items:  center;
    background: url("http://static.gongyitech.com/537be03627914a8b84dd31fee35fc561")no-repeat 0 0;
    background-size: cover;
    text-align: center;
  }
  .form{
    height: 500px;
    width: 400px;

  }
  .el-input__inner{
    text-align: center;
  }
  .button1 {
    border-radius: 50px;
    background-color: #386cea;
    width: 45%;
    display: block;
    height: 35px;
    color: white;
    font-size: 22px;
    border: none;
    margin: 30px auto;

  }
  .button1:hover{
    box-shadow: 0px 3px  0 #407cb0;
  }
  input:-webkit-autofill{
    color: #fff !important;
  }
</style>
