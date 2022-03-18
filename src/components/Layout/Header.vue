<template>
  <div class="header">
    <div class="logo">
      <span class="big">{{siteName}}</span>
      <span class="min">{{egName}}</span>
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
              {{userInfo.account}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/userinfo')"><i style="padding-right: 8px" class="el-icon-check"></i>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="el-icon-arrow-up"></i>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default  {
    data(){
      return {
        siteName:'网站后台管理系统',
        egName:'WEBSITE'
      }
    },
    methods: {
      hiddenSidebar(){

      },
      screenfullToggle(){

      },
      logout(){

      }
    }
  }
</script>

