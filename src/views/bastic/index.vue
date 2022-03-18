<template>
  <div>
  <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>其他信息</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="公告活动管理" name="second">
      <el-table
        :data="activityData"
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
          prop="reportTitle"
          label="公告标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="report"
          label="公告内容"
          width="280">
        </el-table-column>
        <el-table-column
          prop="activityTitle"
          label="活动标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="activity"
          label="活动内容"
          width="280">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <el-button type="normal" circle @click="editActivity(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="normal" circle @click="deleteActivity(scope.row.id)"><i class="el-icon-delete"></i></el-button>
            <el-button type="normal" circle @click="editActivity"><i class="el-icon-plus"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑公告活动"
        :visible.sync="activityVisible"
        >
        <el-form :model="defaultData">
          <el-form-item label="公告标题" label-width="20%">
            <el-input v-model="defaultData.reportTitle"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" label-width="20%">
            <el-input type="textarea" v-model="defaultData.report"></el-input>
          </el-form-item>
          <el-form-item label="活动标题" label-width="20%">
            <el-input v-model="defaultData.activityTitle"></el-input>
          </el-form-item>
          <el-form-item label="活动内容" label-width="20%">
            <el-input type="textarea" v-model="defaultData.activity"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="success" @click="submitActivity">确认</el-button>
            <el-button type="info"  @click="activityVisible=false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="友情链接管理" name="forth">
      <el-table
        :data="linkData"
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
          prop="name"
          label="名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button type="normal" circle @click="editLink(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="normal" circle @click="deleteLink(scope.row.id)"><i class="el-icon-delete"></i></el-button>
            <el-button type="normal" circle @click="editLink"><i class="el-icon-plus"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑链接"
        :visible.sync="linkVisible"
        width="50%">
        <el-form :model="defaultData">
            <el-form-item label-width="链接名称">
              <el-input v-model="defaultData.name"></el-input>
            </el-form-item>
          <el-form-item label-width="URL">
            <el-input v-model="defaultData.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitLink">确认</el-button>
            <el-button type="info"  @click="linkVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="底部二维码配置" name="five">
      <el-form :model="appData">
        <el-form-item label="底部二维码配置">
          <el-col :span="6">
            <label>APP下载</label>
            <upload v-model="appData.codeImg"></upload>
          </el-col>
          <el-col :span="6">
            <label>微信公众号</label>
            <upload v-model="appData.wechatImg"></upload>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="success"  @click="submitAppData">确认</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

  import Link from '../../api/link.js'

  import BannerInfo from '../../api/bannerInfo.js'
  import Upload from '../../components/Layout/Upload.vue'
  import App from '../../api/app.js'
  export default {
    data() {
      return {
        linkVisible:false,
        activityVisible:false,
        activeName:'second',

        linkData:[],
        activityData:[],
        codeData:[],
        multipleSelection: [],
        defaultData:[],
        appData:{
          codeImg:"",
          wechatImg:""
        }
      }
    },
    methods:{
      handleClick(){

      },
      async getList(){
        this.linkData = await Link.getList();
        this.activityData = await BannerInfo.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      async submitLink(){
        let res = await Link.save(this.defaultData);
        if (res.code===0){
          this.$notify.success("操作成功");
          this.linkVisible = false;
          this.getList();
          this.activeName = "forth";
        } else{
          this.$notify.error("操作失败");
        }
      },
      editLink(data){
        this.linkVisible = true;
        this.defaultData = data;
      },
      deleteLink(data){
        let self = this;
        let deleteIds = [];
        deleteIds.push(data);
        self.$confirm('此操作将删除该链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Link.delete(deleteIds).then(function (res) {
            if (res.code === 0) {
              self.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              self.getList();
              self.activeName = "third";
            }
          })
        })
      },

      editActivity(data){
        this.activityVisible = true;
        this.defaultData = data;
      },
      async submitActivity(){
        let res = await BannerInfo.save(this.defaultData);
        if (res.code===0){
          this.$notify.success("操作成功");
          this.activityVisible = false;
          this.getList();
          this.activeName = "second";
        } else{
          this.$notify.error("操作失败");
        }
      },
      deleteActivity(data){
        let self = this;
        let deleteIds = [];
        deleteIds.push(data);
        self.$confirm('此操作将删除该公告/活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          BannerInfo.delete(deleteIds).then(function (res) {
            if (res.code === 0) {
              self.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              self.getList();
              self.activeName = "second";
            }
          })
        })
      },
      async submitAppData(){
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
            wechatImg:""
          };
      },
    },
    mounted(){
      this.getList();
      this.getAppData();
    },
    components:{
      Upload
    }
  }
</script>

<style scoped>

</style>
