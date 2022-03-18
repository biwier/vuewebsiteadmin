<template>
  <div>
  <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <el-card>
      <el-table
        :data="userData"
        stripe
        style="width: 100%"
        tooltip-effect="dark"
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="updateDatetime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="loginAccount"
          label="账号名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机"
          width="180">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址"
          min-width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="120"
          fixed="right"
          >
          <template slot-scope="scope">
            <el-button type="normal" circle @click="editUser(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="normal" circle><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改用户"
                 :visible.sync="userVisible"
                 width="50%"
                 align="center">
        <el-form :model="userForm" label-width="10%">
          <el-form-item label="账户号">
            <el-input v-model="userForm.loginAccount"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电 话">
            <el-input v-model="userForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label="地 址">
            <el-input v-model="userForm.addr"></el-input>
          </el-form-item>
          <template>
            <el-button type="info" @click="edit">确认</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </template>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import User from '../../api/user.js'
    export default {
      name: "user",
      data(){
          return{
            userData:[],
            searchDTO:{
              page:1,
              rows:10
            },
            userVisible:false,
            userForm:{}
          }
      },
      methods:{
          async getList(){
           let res =await User.getList(this.searchDTO);
            this.userData = res.result;
          },
        editUser(data){
          this.userForm = data;
          this.userVisible = true;
        },
        cancelEdit(){
            this.userForm = {};
            this.userVisible = false;
        },
        async edit(){
            if (this.userForm!=null){
              let res = await User.saveUser(this.userForm);
              if (res.status){
                this.$message.success("修改成功");
              } else {
                this.$message.warning(res.msg);
              }
            }
        }
      },
      mounted(){
          this.getList();
      }
    }
</script>

<style scoped>

</style>
