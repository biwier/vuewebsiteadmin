<template>
  <div class="main">
    <div class="header">
      <div class="logo">
        <span class="big">{{siteName}}</span>
        <span class="min">GY</span>
      </div>
      <span class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>
      <div class="right">
        <span class="header-btn" @click="screenfullToggle">
            <i class="el-icon-setting"></i>
        </span>
        <el-dropdown>
          <span class="header-btn">
              恭逸<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePassword"><i style="padding-right: 8px" class="el-icon-share"></i>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="el-icon-star-off"></i>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="app">
      <div class="aside">
        <div class="menu">
          <el-menu
            router
            class="menu"
            text-color="black"
            :unique-opened="uniqueOpened"
            collapse-transition
            :collapse="isCollapse"
            :default-active="$route.path"
            @open="handleOpen"
            @close="handleClose">
            <template v-for="(menu_v,menu_k) in menu">
              <el-submenu v-if="menu_v.children.length>0" :key="menu_k" :index="menu_v.menuUrl">
                <template slot="title">
                  <i :class="menu_v.menuIcon"></i>
                  <span>{{menu_v.menuName}}</span>
                </template>
                <el-menu-item v-for="(menuChildren_v,menuChildren_k) in menu_v.children"
                              :key="menuChildren_k"
                              :index="menuChildren_v.menuUrl">
                  <i :class="menuChildren_v.menuIcon"></i>
                  <span slot="title">{{ menuChildren_v.menuName }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="menu_v.menuUrl" :key="menu_k">
                <i :class="menu_v.menuIcon" ></i>
                <span slot="title">{{menu_v.menuName}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="sidebar-toggle" @click="sidebarToggle">
          <div class="icon-left">
            <i class="el-icon-back"></i>
          </div>
        </div>
      </div>
      <div class="app-body">
        <div style="margin-top: 50px;"></div>
        <div id="mainContainer" class="main-container">
          <!--<transition name="fade">-->
          <router-view></router-view>
          <!--</transition>-->
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="addDialogVisible"
               width="30%">
      <el-form :model="userForm" ref="userForm" style="padding: 60px" :rules="rules" label-width="20%">
        <el-form-item label="用户名">
          <el-input v-model="userForm.loginAccount" placeholder="用户名" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-input type="password" v-model="userForm.loginPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="updateUser(userForm)">确认</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import Screenfull from 'screenfull'
  import User from '../../api/user.js'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.loginPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addDialogVisible:false,
        isCollapse:false,
        menu:{},
        siteName:'网站后台管理',
        userInfo:{},
        uniqueOpened:true,
        rules:{
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        userForm:{
          loginAccount: '',
          loginPassword: '',
          checkPass:''
        }

      }
    },
    methods: {
      NavBarWidth(){
        let navBar = document.getElementById('app');
        if(!navBar)return;
        if(!(this.fixedTabBar && this.switchTabBar)){navBar.style.width = '100%';return;}
        let sidebarClose =  document.body.classList.contains('sidebar-close');
        if(sidebarClose) {navBar.style.width = '100%';return;}
        if(this.isCollapse) navBar.style.width = 'calc(100% - 64px)';
        else navBar.style.width = 'calc(100% - 230px)';
      },
      screenfullToggle(){
        if (!Screenfull.enabled) {
          this.$message({
            message: '你的浏览器不支持全屏！',
            type: 'warning'
          });
          return false
        }
        Screenfull.toggle();
      },
      hiddenSidebar(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-close');
        this.NavBarWidth();
      },
      sidebarToggle(e) {
        e.preventDefault();
        if (this.isCollapse) {
          document.body.classList.remove('sidebar-hidden');
          this.siteName = "网站后台管理";
          this.isCollapse = false;
        } else {
          document.body.classList.add('sidebar-hidden');
          this.isCollapse = true;
        }
        this.NavBarWidth();
      },
      async logout(){
        let res = await User.loginout();
        if (res.code===0) {
          this.$message.success(res.msg);
        }
        this.$router.push("/login");
      },

      handleOpen(){
      },
      handleClose(){},
      updatePassword(){
        let user = JSON.parse(localStorage.getItem("user"));
        this.userForm.id = user.id;
        this.userForm.loginAccount = user.loginAccount;
        this.addDialogVisible = true;
      },
      async updateUser(){
       let res = await User.saveUser(this.userForm);
       if (res.code === 0){
         this.$message.success("修改成功！请重新登录");
         localStorage.clear();
         this.$router.push("login");
       } else {
         this.$message.error(res.msg)
       }
      }
    },
    created(){
      this.menu = JSON.parse(localStorage.getItem("menu"));
      console.log("--------------",this.menu)
    }
  }
</script>
<style lang="less">
  .el-input__inner{
    color: black;
  }
  .el-menu-item.is-active{
    color: black;
    font-weight: 600;
  }
  .sidebar-hidden {
    .header {
      .logo {
        .big {
          display: none;
        }
        .min {
          display: block;
        }
        width: 64px;
      }

    }
    .aside{
      .sidebar-toggle{
        .icon-left{
          transform: rotate(180deg);
        }
      }
    }
    .main {
      .app-body {
        margin-left: 64px;
      }
    }
  }
  .sidebar-close{
    .header {
      .logo {
        width: 0;
        overflow: hidden;
      }
    }
    .aside{
      margin-left: -230px;
    }
    .main {
      .app-body {
        margin-left: 0;
      }
    }
  }
  .sidebar-hidden.sidebar-close{
    .aside{
      margin-left: -64px;
    }
  }


  .main {
    display: flex;
    .el-menu:not(.el-menu--collapse) {
      width: 230px;
    }
    .app {
      width: 100%;
      background-color: #fff;
    }
    .aside {
      position: fixed;
      margin-top: 50px;
      z-index: 10;
      background-color: #6e787e;
      transition: all 0.3s ease-in-out;
      .menu{
        font-size: 20px;
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(~'100vh - 100px');
      }
      .sidebar-toggle{
        position: relative;
        width: 100%;
        height: 50px;
        background-color: #6e787e;
        color: #fff;
        cursor: pointer;
        .icon-left{
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          right: 0;
          width: 64px;
          height: 100%;
          font-size: 20px;
          transition: all 0.3s ease-in-out;
        }
      }
    }
    .app-body {
      margin-left: 230px;
      -webkit-transition: margin-left 0.3s ease-in-out;
      transition: margin-left 0.3s ease-in-out;
    }
    .main-container {
      //margin-top: 50px;
      padding: 6px;
      min-height: calc(~'100vh - 101px') auto;

    }
  }

  .header {
    width: 100%;
    position: fixed;
    display: flex;
    height: 50px;
    background-color: #586068;
    z-index: 10;
    .logo {
      .min {
        display: none;
      }
      width: 230px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      font-weight: 600;
      background-color: #6e787e;
      -webkit-transition: width 0.35s;
      transition: all 0.3s ease-in-out;
    }
    .right {
      position: absolute;
      right: 0;
    }
    .header-btn {
      .el-badge__content {
        top: 14px;
        right: 7px;
        text-align: center;
        font-size: 9px;
        padding: 0 3px;
        background-color: #00a65a;
        color: #fff;
        border: none;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25em;
      }
      overflow: hidden;
      height: 50px;
      display: inline-block;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      padding: 0 14px;
      color: #fff;
      &:hover {
        background-color: #6e787e
      }
    }

  }

  .menu {
    border-right: none;
  }

  .el-menu--vertical {
    min-width: 190px;
  }
  .setting-category{
    padding:10px 0;
    border-bottom: 1px solid #eee;
  }
  ::-webkit-scrollbar
  {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #bdbdbd;
  }
  /*滑块效果*/
  ::-webkit-scrollbar-thumb:hover
  {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.4);
  }
  /*IE滚动条颜色*/
  html {
    scrollbar-face-color:#bfbfbf;/*滚动条颜色*/
    scrollbar-highlight-color:#000;
    scrollbar-3dlight-color:#000;
    scrollbar-darkshadow-color:#000;
    scrollbar-Shadow-color:#adadad;/*滑块边色*/
    scrollbar-arrow-color:rgba(0,0,0,0.4);/*箭头颜色*/
    scrollbar-track-color:#eeeeee;/*背景颜色*/
  }

</style>
