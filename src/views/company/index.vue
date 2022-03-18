<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>关于我们</el-breadcrumb-item>
          <el-breadcrumb-item>公司信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Banner" name="0">
          <el-form :model="companyInfo">
            <el-form-item label="Banner">
              <el-col :span="6">
                <label>PC端</label>
                <upload v-model="companyInfo.pic"></upload>
              </el-col>
              <el-col :span="6">
                <label>移动端</label>
                <upload v-model="companyInfo.mobileBannerPic"></upload>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公司简介" name="1">
          <el-form :model="companyInfo">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.companyName" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="公司简介">
              <el-input type="textarea" :rows="5" v-model="companyInfo.description" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="公司宗旨">
              <el-input type="textarea"  :rows="5" v-model="companyInfo.companyPurpose" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="发展历程" name="2">
          <el-form :model="companyInfo">
            <el-form-item label="发展历程">
              <el-col :span="6">
                <label>PC端</label>
                <upload v-model="companyInfo.devPic"></upload>
              </el-col>
              <el-col :span="6">
                <label>移动端</label>
                <upload v-model="companyInfo.devPhonePic"></upload>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公司业务" name="3">
          <el-form :model="companyInfo">
            <el-form-item label="业务范围">
              <el-input type="textarea" :rows="5" v-model="companyInfo.workingRange" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="业务范围背景图">
              <template>
                <upload v-model="companyInfo.workingRangePic"></upload>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公司规模" name="4">
          <el-form :model="companyInfo">
            <el-form-item label="研发团队">
              <el-input type="textarea"  :rows="5" v-model="companyInfo.team" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="公司领导">
              <el-input type="textarea" :rows="5" v-model="companyInfo.leader" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="业务团队">
              <el-input type="textarea" :rows="5" v-model="companyInfo.workTeam" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公司管理" name="5">
          <el-form :model="companyInfo">
            <el-form-item label="公司管理">
              <el-input type="textarea" :rows="5" v-model="companyInfo.companyManage" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="三大管理程序">
              <el-input type="textarea" :rows="5" v-model="companyInfo.manageInfo" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="企业文化" name="6">
          <el-form :model="companyInfo">
            <el-form-item label="企业文化题目">
              <el-input v-model="companyInfo.companyCultureTitle" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="企业文化">
              <el-input type="textarea" :rows="5" v-model="companyInfo.companyCulture" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Banner公告（招商信息）" name="7">
          <el-form :model="companyInfo">
            <el-form-item label="公告标题">
              <el-input  v-model="companyInfo.attractTitle" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="公告内容">
              <el-input type="textarea" :rows="5" v-model="companyInfo.attractContent" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" :disabled="!isEdit" @click="submitData">确认</el-button>
              <el-button type="info" @click="isEdit=!isEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="联系信息" name="8">
          <el-form :model="linkedInfo">
              <el-form-item label="联系人" label-width="80px">
                <el-input style="width: 200px;margin-top: 5px" v-model="linkedInfo.userName" ></el-input>
              </el-form-item>
              <el-form-item label="电话" label-width="80px">
                <el-input style="width: 200px;margin-top: 5px" v-model="linkedInfo.tel" ></el-input>
              </el-form-item>


              <el-form-item label="手机" label-width="80px">
                <el-input style="width: 200px;margin-top: 5px" v-model="linkedInfo.phone" ></el-input>
              </el-form-item>
              <el-form-item label="地址" label-width="80px">
                <el-input style="width: 200px;margin-top: 5px" v-model="linkedInfo.addr"></el-input>
              </el-form-item>

            <el-form-item>
              <el-button type="success" @click="saveLinkInfo">确认</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import Company from '../../api/company.js'
  import User from '../../api/user.js'
  import Upload from '../../components/Layout/Upload.vue'
  export default {
    name: "index",
    data(){
      return{
        companyInfo:{},
        linkId:undefined,
        linkedInfo:{},
        isEdit:false,
        activeName:'1',
      }
    },
    methods:{
      async getCompanyInfo(){
        let res  = await Company.getCompanyInfo();
        if (res.code===0){
          this.companyInfo = res.msg;
          console.log(this.companyInfo);
          this.linkId = this.companyInfo.linkManId;
          this.getContactInfo();
        } else {
          this.$message.error("获取信息失败")
        }
      },
      async getContactInfo(){
        console.log('------>',this.linkId);
        let res = await User.getUser(this.linkId);
        if (res.code===0){
          this.linkedInfo = res.msg;
        } else {
          this.$message.error("获取联系方式失败")
        }
      },
      async submitData(){
        let res =  await Company.saveCompanyInfo(this.companyInfo);
        if (res.code===0){
          this.$notify.success(res.msg)
        } else {
          this.$notify.error("操作失败")
        }
      },
      async saveLinkInfo(){
        let res =  await User.saveUser(this.linkedInfo);
        if (res.code===0){
          this.$notify.success(res.msg)
        } else {
          this.$notify.error("操作失败")
        }
      },
      handleClick(){
        this.getCompanyInfo();
      }

    },
    mounted(){
      this.getCompanyInfo();
    },
    components:{
      Upload
    }
  }
</script>

<style scoped>

</style>
