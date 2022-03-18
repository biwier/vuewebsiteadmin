<template>
    <div class="shop">
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
        <div style="display: inline;float: right;margin-right: 10px">
          <el-button @click="addShop" style="border-radius: 24px;">新增店铺</el-button>
        </div>
      </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="name"
            label="店铺名称"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="url"
            label="店铺地址"
            min-width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="editShop(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteShop(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <el-dialog :title="title" width="30%" :visible.sync="shopVisible"
                 align="center">
        <el-form :model="shopData" label-width="10%">
          <el-form-item label="店铺名称">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址">
            <el-input v-model="shopData.url"></el-input>
          </el-form-item>
          <el-form-item >
            <template slot-scope="scope">
              <el-button @click="saveShop(scope.row)">确认</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-dialog>
      </div>
</template>

<script>
  import Shop from '../../api/shop.js';
  export default {
    methods: {
      async deleteShop(data){
        this.$confirm('此操作将删除当前店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await Shop.delete(data.id);
          if (res.code===0){
            this.$notify.success("删除成功");
            this.initData();
          }else {
            this.$notify.error(res.msg);
          }
        }).catch(()=>{

        })
      },
      async initData(){
        this.tableData = await Shop.getList();
      },
      async saveShop(){
        let res = await Shop.save(this.shopData);
        if (res.code===0){
          this.$notify.success(res.msg);
          this.shopVisible = false;
          this.initData();
        } else {
          this.$notify.error(res.msg)
        }
      },
      addShop(){
        this.shopVisible = true;
        this.title = "新增店铺";
        this.shopData= {};
      },
      editShop(data){
        this.shopVisible = true;
        this.title = "修改店铺";
        this.shopData= data;
      }
    },

    data() {
      return {
        tableData: [],
        shopData:{},
        title:"",
        shopVisible:false
      }
    },
    mounted(){
      this.initData();
    }
  }
</script>

<style scoped>

</style>
