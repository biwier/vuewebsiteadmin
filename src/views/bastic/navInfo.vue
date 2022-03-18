<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>栏目信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card>
        <el-table
          :data="navData"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="updateDatetime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="navName"
            label="栏目名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="navLevel"
            label="排序"
            width="300">
          </el-table-column>
          <el-table-column
            prop="navDesc"
            label="描述"
            min-width="200">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button type="normal" circle @click="editNav(scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button type="normal" circle @click="deleteNav(scope.row.id)"><i class="el-icon-delete"></i></el-button>
              <el-button type="normal" circle @click="editNav"><i class="el-icon-plus"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="编辑栏目"
          :visible.sync="navVisible"
          width="50%">
          <el-form :model="defaultData">
            <el-form-item label="栏目名称" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.navName"></el-input>
            </el-form-item>
            <el-form-item label="标题" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.navTitle"></el-input>
            </el-form-item>
            <el-form-item label="关键词" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.navKeywords"></el-input>
            </el-form-item>
            <el-form-item label="描述" label-width="20%">
              <el-input type="textarea" style="width:80%;" v-model="defaultData.navDesc" ></el-input>
            </el-form-item>
            <el-form-item v-show="defaultData.id === 1" label="分站标题模板" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.divName"></el-input>
            </el-form-item>
            <el-form-item v-show="defaultData.id === 1" label="分站描述模板" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.divDesc"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="20%">
              <el-input-number v-model="defaultData.navLevel" :min="1" ></el-input-number>
            </el-form-item>
            <el-form-item label="路由地址" label-width="20%">
              <el-input style="width:80%" v-model="defaultData.navUrl" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="success" @click="submitNav">确认</el-button>
              <el-button type="info"  @click="navVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </div>
</template>

<script>
  import Nav from '../../api/nav.js'
  import Upload from '../../components/Layout/Upload.vue'
  export default {
    data() {
      return {
        navVisible:false,
        navData:[],
        multipleSelection: [],
        defaultData:[],
      }
    },
    methods: {
      handleClick() {
      },
      async getList() {
        this.navData = await Nav.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editNav(data) {
        this.navVisible = true;
        this.defaultData = data;
      },
      async submitNav() {
        let res = await Nav.save(this.defaultData);
        if (res.code === 0) {
          this.$notify.success("操作成功");
          this.navVisible = false;
          this.getList();
          this.activeName = "third";
        } else {
          this.$notify.error("操作失败")
        }
      },
      deleteNav(data) {
        let self = this;
        self.$confirm('此操作将删除该栏目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Nav.delete(data).then(function (res) {
            if (res.code === 0) {
              self.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.getList();
              this.activeName = "second";
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
