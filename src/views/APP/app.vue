<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>APP</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="App配置" name="1">
            <div class="el-col-4" style="margin: 10px">
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <div style="width: 100%;height: 300px;overflow: hidden">
                  <img :src="appData.codeImg" class="image" width="100%" height="auto">
                </div>
                <div style="padding: 14px;text-align: center">
                  <span>APP下载二维码</span>
                  <div class="bottom clearfix" style="text-align: center">
                    <el-col :span="12">
                      <el-button type="text" class="button" @click="addDialogVisible=true">编辑</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" class="button">删除</el-button>
                    </el-col>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="el-col-4" style="margin: 10px">
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <div style="width: 100%;height: 300px;overflow: hidden">
                  <img :src="appData.detailImg" class="image" width="100%" height="auto">
                </div>
                <div style="padding: 14px;text-align: center">
                  <span>详情图</span>
                  <div class="bottom clearfix" style="text-align: center">
                    <el-col :span="12">
                      <el-button type="text" class="button"  @click="addDetailDialog=true">编辑</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" class="button">删除</el-button>
                    </el-col>
                  </div>
                </div>
              </el-card>
              <el-dialog
                title="修改二维码图片"
                :visible.sync="addDialogVisible"
                width="30%">
                <el-form ref="form" :model="appData" style="text-align: center">
                  <el-form-item>
                    <template>
                      <upload v-model="appData.codeImg"></upload>
                    </template>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" @click="submitData">确认</el-button>
                    <el-button type="info" @click="addDialogVisible=false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-dialog
                title="修改详情长图"
                :visible.sync="addDetailDialog"
                width="30%">
                <el-form ref="form" :model="appData" style="text-align: center">
                  <el-form-item>
                    <template>
                      <upload v-model="appData.detailImg"></upload>
                    </template>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" @click="submitData">确认</el-button>
                    <el-button type="info" @click="addDetailDialog=false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Banner配置" name="2">
            <el-form :model="appData">
              <el-form-item label="Banner">
                <el-col :span="6">
                  <label>PC端</label>
                  <upload v-model="appData.bannerPic"></upload>
                </el-col>
                <el-col :span="6">
                  <label>移动端</label>
                  <upload v-model="appData.mobileBannerPic"></upload>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitData">确认</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
</template>

<script>
  import Upload from '../../components/Layout/Upload.vue'
  import App from '../../api/app.js'
    export default {
        name: "app",
      data(){
          return{
            activeName:'1',
            appData:{
              codeImg:"",
              detailImg:"",
            },
            addDialogVisible:false,
            addDetailDialog:false
          }
      },
      methods:{
        async submitData(){
          let res = await App.save(this.appData);
          console.log(res);
          if (res.code === 0){
            this.$message.success(res.msg);
            this. addDialogVisible=false;
             this. addDetailDialog=false;
          } else {
            this.$message.error(res.msg)
          }
        },
        async getAppData(){
          let res = await App.getApp();
          if (res.msg!=null)
          this.appData = res.msg;
          else
            this.appData = {
              codeImg:"",
                detailImg:""
            };
        },
        handleClick(){

        }
      },
      components:{
          Upload
      },
      mounted(){
          this.getAppData();
      }
    }
</script>

<style scoped>
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
