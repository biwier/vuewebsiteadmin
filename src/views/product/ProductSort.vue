<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/product/list'}">产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">

        <div style="display: inline;float: right;margin-right: 10px">
          <el-button @click="addDialogVisible = true" style="border-radius: 24px;">添加类型</el-button>
        </div>
      </el-row>
      <el-card style="position: relative">
        <el-dialog
          title="新增产品类别"
          :visible.sync="addDialogVisible"
          width="30%">
          <el-form ref="form" :model="defaultData" label-width="80px">
            <el-form-item label="类别名称">
              <el-input v-model="defaultData.name"></el-input>
            </el-form-item>
            <el-form-item label="类别描述">
              <el-input type="textarea" v-model="defaultData.description" ></el-input>
            </el-form-item>
            <el-form-item label="电脑Banner图片">
              <template>
                <upload v-model="defaultData.pic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="手机Banner图片">
              <template>
                <upload v-model="defaultData.mobileBannerPic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="手机主页背景图">
              <template>
                <upload v-model="defaultData.mobilePic"></upload>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitData(defaultData)">确认</el-button>
              <el-button type="info" @click="addDialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div v-for="item in tableList">
          <div class="el-col-4" style="margin: 10px">
            <el-card :body-style="{ padding: '0px'}">
              <img :src="item.pic" class="image" height="200" alt="默认显示电脑背景图">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <el-button type="text" @click="deleteFunction(item.id)"><i class="el-icon-delete"></i></el-button>
                <div class="bottom clearfix">
                  <time class="time">{{ item.updateDatetime.split('T')[0] }}</time>
                  <el-button type="text" class="button" @click="getProductClass(item)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </div>
          <el-dialog
            title="类别详情"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" :model="ProductClass" label-width="80px">
              <el-form-item label="类别名称">
                <el-input v-model="ProductClass.name" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item label="类别描述">
                <el-input type="textarea" v-model="ProductClass.description" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item label="电脑Banner图片">
                <template>
                  <upload v-model="ProductClass.pic"></upload>
                </template>
              </el-form-item>
              <el-form-item label="手机Banner图片">
                <template>
                  <upload v-model="ProductClass.mobileBannerPic"></upload>
                </template>
              </el-form-item>
              <el-form-item label="手机主页背景图">
                <template>
                  <upload v-model="ProductClass.mobilePic"></upload>
                </template>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="isEdit=!isEdit">编辑</el-button>
                <el-button type="success" :disabled="!isEdit" @click="submitData(ProductClass)">确认</el-button>
                <el-button type="info" @click="dialogVisible=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

      </el-card>
    </div>

</template>

<script>
    import ProductClass from '../../api/productClass.js'
    import Upload from '../../components/Layout/Upload.vue'
    export default {
      name: "FunctionList",
      data(){
          return{
            addDialogVisible:false,
            isEdit:false,
            dialogVisible:false,
            tableList:[],
            ProductClass:{},
            defaultData:{},
            deleteIds:[]
          }
      },
      methods:{
        async getList(){
          this.tableList  = await ProductClass.getList();

        },
        getProductClass(data){
          this.dialogVisible = true;
          this.ProductClass = data;
        },
        async submitData(data){
          let res = await ProductClass.save(data);
          if (res.code===0){
            this.$notify.success("操作成功");
            this.dialogVisible = false;
            this.addDialogVisible = false;
            this.getList();
          } else {
            this.$notify.error(res.msg)
          }
        },
        deleteFunction(data){
           this.deleteIds.push(data);
           this.$confirm('此操作将删除该类别类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
           }).then(async ()=>{
             let res = await ProductClass.delete(this.deleteIds);
             if (res.code===0){
               this.$notify.success("删除成功");
               this.getList();
             } else {
               this.$notify.error(res.msg);
             }
           }).catch(()=>{

           });
        }
      },
      created(){
          this.getList();
      },
      components:{
          Upload
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .page{
    text-align: center;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
