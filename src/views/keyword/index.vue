<template>
  <div class="keyword">
    <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>热门词管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
      <div style="display: inline;float: right;margin-right: 10px">
        <el-button @click="addHotWord" style="border-radius: 24px;">新增热门词</el-button>
        <el-button type="danger" @click="deleteHotWord" style="border-radius: 24px;">删除热门词</el-button>
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="word"
        label="热门词名称"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="更新时间"
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.updateDatetime | FormatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="frequency"
        label="访问频率"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editHotWord(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchDTO.page"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="searchDTO.rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchDTO.total">
    </el-pagination>
    <el-dialog :title="title" width="30%" :visible.sync="hotwowrdVisiable"
               align="center">
      <el-form :model="hotwordData" label-width="20%">
        <el-form-item label="热门词">
          <el-input v-model="hotwordData.word"></el-input>
        </el-form-item>
        <el-form-item label="访问频率">
          <el-input-number v-model="hotwordData.frequency"></el-input-number>
        </el-form-item>
        <el-form-item >
          <template slot-scope="scope">
            <el-button @click="saveHotWord(scope.row)">确认</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import HotWord from '../../api/hotword.js';
  export default {
    methods: {
      handleCurrentChange(val){
        this.searchDTO.page = val;
        this.initData()
      },
      handleSizeChange(val){
        this.searchDTO.rows = val;
        this.initData()
      },
      async deleteHotWord(){
        if (this.multipleSelection.length<1){
          this.$message.warning("至少选择一项进行删除！")
        }else {
          this.$confirm('此操作将删除当前热门词, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async ()=>{
            let deleteIds = [];
            this.multipleSelection.forEach(v=>{
               deleteIds.push(v.id)
            });
            let res = await HotWord.delete(deleteIds);
            if (res.code===0){
              this.$notify.success("删除成功");
              this.initData();
            }else {
              this.$notify.error(res.msg);
            }
          }).catch(()=>{

          })
        }
      },
      async initData(){
        let res = await HotWord.getList(this.searchDTO);
        this.tableData = res.result;
        this.searchDTO.total = res.total;
      },
      async saveHotWord(){
        let res = await HotWord.save(this.hotwordData);
        if (res.code===0){
          this.$notify.success(res.msg);
          this.hotwowrdVisiable = false;
          this.initData();
        } else {
          this.$notify.error(res.msg)
        }
      },
      addHotWord(){
        this.hotwowrdVisiable = true;
        this.title = "新增店铺";
        this.hotwordData= {};
      },
      editHotWord(data){
        this.hotwowrdVisiable = true;
        this.title = "修改店铺";
        this.hotwordData= data;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },

    data() {
      return {
        tableData: [],
        hotwordData:{},
        title:"",
        searchDTO:{
          page:1,
          rows:10,
          total:0
        },
        hotwowrdVisiable:false,
        multipleSelection: []
      }
    },
    mounted(){
      this.initData();
    },
    filters: {
      FormatDate:(date) => {
        return moment(date).format("YYYY年MM月DD日 HH时mm分ss秒")
      }
    }
  }
</script>

<style scoped>

</style>
