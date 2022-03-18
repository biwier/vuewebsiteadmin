<template>
  <div>
    <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        <el-breadcrumb-item>证书管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126) ;height: 80px;line-height: 80px">
      <div style="display: inline;float: right;margin-right: 10px">
        <el-button @click="addDialogVisible = true" style="border-radius: 24px;">新增证书</el-button>
      </div>
    </el-row>
    <el-card style="position: relative">
      <el-dialog
        title="新增专利信息"
        :visible.sync="addDialogVisible"
        width="30%">
        <el-form ref="form" :model="defaultData" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="defaultData.title"></el-input>
          </el-form-item>
          <el-form-item label="设计名称">
            <el-input v-model="defaultData.patentName"></el-input>
          </el-form-item>
          <el-form-item label="专利号">
            <el-input v-model="defaultData.patentCode"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <template>
              <upload v-model="defaultData.pic"></upload>
            </template>
          </el-form-item>
          <el-form-item label="申请日">
            <el-date-picker  v-model="defaultData.applyDate" ></el-date-picker>
          </el-form-item>
          <el-form-item label="专利权人">
            <el-input  v-model="defaultData.patentee" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitData(defaultData)">确认</el-button>
            <el-button type="info" @click="addDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div v-loading="loading" v-for="item in tableList">
        <div class="el-col-4" style="margin: 10px">
          <el-card :body-style="{ padding: '0px'}" shadow="hover">
            <img :src="item.pic" class="image" width="100" height="auto">
            <div style="padding: 14px;">
              <span>{{item.patentName}}</span>
              <el-button type="text" @click="deleteFunction(item.id)"><i class="el-icon-delete"></i></el-button>
              <div class="bottom clearfix">
                <time class="time">{{ item.applyDate.split('T')[0] }}</time>
                <el-button type="text" class="button" @click="getpatentInfo(item)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <el-dialog
          title="专利详情"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="form" :model="patentInfo" label-width="80px">
              <el-form-item label="标题">
                <el-input v-model="patentInfo.title"></el-input>
              </el-form-item>
              <el-form-item label="设计名称">
                <el-input v-model="patentInfo.patentName"></el-input>
              </el-form-item>
              <el-form-item label="专利号">
                <el-input v-model="patentInfo.patentCode"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <template>
                  <upload v-model="patentInfo.pic"></upload>
                </template>
              </el-form-item>
              <el-form-item label="申请日">
                <el-date-picker  v-model="patentInfo.applyDate" ></el-date-picker>
              </el-form-item>
              <el-form-item label="专利权人">
                <el-input  v-model="patentInfo.patentee" ></el-input>
              </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="isEdit=!isEdit">编辑</el-button>
              <el-button type="success" :disabled="!isEdit" @click="submitData(patentInfo)">确认</el-button>
              <el-button type="info" @click="dialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

    </el-card>
  </div>

</template>

<script>
  import PatentInfo from '../../api/patentInfo.js'
  import Upload from '../../components/Layout/Upload.vue'
  export default {
    data(){
      return{
        loading:false,
        addDialogVisible:false,
        isEdit:false,
        dialogVisible:false,
        tableList:[],
        patentInfo:{},
        defaultData:{
          title:'',
          patentName:'',
          pic:'',
          applyDate:'',
          patentee:""
        },
        deleteIds:[],
      }
    },
    methods:{
      async getList(){
        this.tableList = await PatentInfo.getList();
        console.log(this.tableList);
        this.loading = false;
      },
      getpatentInfo(data){
        this.dialogVisible = true;
        this.patentInfo = data;
      },
      async submitData(data){
        let res = await PatentInfo.save(data);
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
        this.$confirm('此操作将删除该功能类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          this.loading = true;
          let res = await PatentInfo.delete(data);
          if (res.code===0){
            this.getList();
            this.$notify.success("删除成功");
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
