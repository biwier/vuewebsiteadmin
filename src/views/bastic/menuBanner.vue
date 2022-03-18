<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>BANNER</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card>
        <el-table
          :data="bannerData"
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
          <el-table-column label="电脑端图片">
            <template slot-scope="scope">
              <img :src="scope.row.pic" height="200px"/>
            </template>
          </el-table-column>
          <el-table-column label="移动端图片">
            <template slot-scope="scope">
              <img :src="scope.row.mobilePic" height="200px"/>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="180">
            <template slot-scope="scope">
              <el-button type="normal" circle @click="editBanner(scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button type="normal" circle @click="deleteBanner(scope.row.id)"><i class="el-icon-delete"></i></el-button>
              <el-button type="normal" circle @click="editBanner"><i class="el-icon-plus"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="编辑Banner"
          :visible.sync="bannerVisible"
          width="50%"
          align="center">
          <el-form :model="defaultData">
            <el-form-item label="电脑端图片" label-width="20%">
              <template>
                <upload v-model="defaultData.pic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="移动端图片" label-width="20%">
              <template>
                <upload v-model="defaultData.mobilePic"></upload>
              </template>
            </el-form-item>
            <el-form-item style="text-align: center" >
              <template>
                <el-button type="success" @click="submitBanner">确认</el-button>
                <el-button type="info"  @click="bannerVisible=false">取消</el-button>
              </template>
            </el-form-item>
          </el-form>

        </el-dialog>
      </el-card>
    </div>
</template>

<script>
  import Banner from '../../api/banner.js'
  import Upload from '../../components/Layout/Upload.vue'
  export default {
    data() {
      return {
        bannerVisible:false,
        bannerData:[],
        multipleSelection: [],
        defaultData:[],
      }
    },
    methods:{
      handleClick(){

      },
      async getList(){
        this.bannerData = await Banner.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editBanner(data){
        this.bannerVisible = true;
        this.defaultData = data;
      },
      async submitBanner(){
        let res = await Banner.save(this.defaultData);
        if (res.code===0){
          this.$notify.success("操作成功");
          this.bannerVisible = false;
          this.getList();
          this.activeName = "first";
        } else{
          this.$notify.error("操作失败");
        }
      },
      deleteBanner(data){
        let self = this;
        let deleteIds = [];
        deleteIds.push(data);
        self.$confirm('此操作将删除该Banner, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Banner.delete(deleteIds).then(function (res) {
            if (res.code === 0) {
              self.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              self.getList();
              self.activeName = "first";
            }
          })
        })
      },
    },
    mounted(){
      this.getList();
    },
    components:{
      Upload
    }
  }
</script>

<style scoped>

</style>
