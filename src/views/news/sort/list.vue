<template>
  <div>
    <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item>新闻分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
      <div style="display: inline;float: right;margin-right: 10px">
        <el-button @click="addDialogVisible = true" style="border-radius: 24px;">新增</el-button>
      </div>
    </el-row>
    <el-card style="position: relative">
      <el-dialog
        title="增加新闻类型"
        :visible.sync="addDialogVisible"
        width="30%">
        <el-form ref="form" :model="defaultData" label-width="80px">
          <el-form-item label="新闻类别">
            <el-input v-model="defaultData.newsClassName"></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="defaultData.keywords"></el-input>
          </el-form-item>
          <el-form-item label="功能描述">
            <el-input type="textarea" v-model="defaultData.description"></el-input>
          </el-form-item>
          <el-form-item label="电脑主页图片">
            <template>
              <upload v-model="defaultData.pic"></upload>
            </template>
          </el-form-item>
          <el-form-item label="手机主页图片">
            <template>
              <upload v-model="defaultData.mobilePic"></upload>
            </template>
          </el-form-item>
          <el-form-item label="电脑banner图">
            <template>
              <upload v-model="defaultData.bannerPic"></upload>
            </template>
          </el-form-item>
          <el-form-item label="手机banner图">
            <template>
              <upload v-model="defaultData.mobileBannerPic"></upload>
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
            <img :src="item.pic" class="image" height="200">
            <div style="padding: 14px;">
              <span>{{item.newsClassName}}</span>
              <el-button type="text" @click="deleteFunction(item.id)"><i class="el-icon-delete"></i></el-button>
              <div class="bottom clearfix">
                <time class="time">{{ item.updateDatetime.split('T')[0] }}</time>
                <el-button type="text" class="button" @click="getNewsClassList(item)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <el-dialog
          title="新闻类型详情"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="form" :model="newsClassDesc" label-width="80px">
            <el-form-item label="新闻类别">
              <el-input v-model="newsClassDesc.newsClassName" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="newsClassDesc.keywords" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="newsClassDesc.description" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker v-model="newsClassDesc.updateDatetime" :disabled="!isEdit"></el-date-picker>
            </el-form-item>
            <el-form-item label="电脑主页图片">
              <template>
                <upload v-model="newsClassDesc.pic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="手机主页图片">
              <template>
                <upload v-model="newsClassDesc.mobilePic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="电脑banner图">
              <template>
                <upload v-model="newsClassDesc.bannerPic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="手机banner图">
              <template>
                <upload v-model="newsClassDesc.mobileBannerPic"></upload>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="isEdit=!isEdit">编辑</el-button>
              <el-button type="success" :disabled="!isEdit" @click="submitData(newsClassDesc)">确认</el-button>
              <el-button type="info" @click="dialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

    </el-card>
  </div>

</template>

<script>
  import Upload from '../../../components/Layout/Upload.vue'
  import NewsSort from '../../../api/newsClass.js'
  export default {
    name: "FunctionList",
    data(){
      return{
        addDialogVisible:false,
        isEdit:false,
        total:undefined,
        dialogVisible:false,
        searchDTO:{
          page:1,
          rows:10
        } ,
        tableList:[],
        newsClassDesc:{},
        defaultData:{
          functionClassName:'',
          englishName:'',
          pic:'',
          mobilePic:'',
          description:'',
          bannerPic:'',
          mobileBannerPic:''
        },
        deleteIds:[]
      }
    },
    methods:{
      async getList(){
        this.tableList = await NewsSort.getList(this.searchDTO);
      },
      getNewsClassList(data){
        this.dialogVisible = true;
        this.newsClassDesc = data;
      },
      async submitData(data){
        let res = await NewsSort.save(data);
        if (res.code===0){
          this.$notify.success("操作成功");
          this.dialogVisible = false;
          this.addDialogVisible = false;
          this.getList();
        } else {
          this.$notify.error(res.msg)
        }
      },
      handleCurrentChange(val){
        this.searchDTO.page = val;
        this.getList();
      },
      deleteFunction(data){
        this.deleteIds.push(data);
        this.$confirm('此操作将删除该新闻类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await NewsSort.delete(this.deleteIds);
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
