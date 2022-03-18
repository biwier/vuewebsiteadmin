<template>
  <div class="category-dialog">
    <el-dialog :title="title" :visible="dialogFormVisible" :show-close="false" width="45%">
      <el-form :model="form">
        <el-form-item label="菜单名称" >
          <el-input v-model="form.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" >
          <el-input v-model="form.menuUrl" placeholder="请输入菜单路由"></el-input>
        </el-form-item>
        <el-form-item label="序列号">
          <el-input-number v-model="form.menuPid"></el-input-number>
        </el-form-item>
        <el-form-item label="菜单图标" >
          <el-select v-model="form.menuIcon" placeholder="请选择">
            <el-option
              v-for="item in elementIcon"
              :key="item"
              :label="item"
              :value="item">
              <span style="float: left">{{ item }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"><i style="font-size: 24px" :class="item"></i></span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="btncancel">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'CategoryEdit',
    props: {
      dialogFormVisible:Boolean,
      data: [Object,Boolean],
      title:String,
    },
    data() {
      return {
        props: {
          value:'id',
          label: 'name',
          children: 'children'
        },
        checkAll: false,
        //   roleList2:this.roleList,
        isIndeterminate: true,
        form: {
          id:null,
          menuName:'',
          menuUrl:'',
          menuIcon:'',
          menuLevel:'',
          menuPid:'',
          parentId:'',
        },
        elementIcon: [
          'iconfont icon-matong3','iconfont icon-caidan','iconfont icon-svg-','iconfont icon-matong2','iconfont icon-yonghu',
          'iconfont icon-jierushipeiqileixing','iconfont icon-xinzeng','iconfont icon-xinwenguanli','iconfont icon-kehuxunpan',
          'iconfont icon-chanpinguanli','iconfont icon-gongsixinxi','iconfont icon-xinzengshangpin','iconfont icon-liebiao',
          'iconfont icon-liebiao','iconfont icon-icon','iconfont icon-chazhaobiaodanliebiao','iconfont icon-peizhiconfiguration15',
          'iconfont icon-woxiangyaodegongnengicon'
        ],
        btnLoading:false,
      }
    },
    watch: {
      'data': {
        handler: function () {
          if(this.data){
            for (let k in this.form){
              this.form[k] = this.data[k];
            }
          }else {
            for (let k in this.form){
              this.form[k] = '';
            }
          }
        },
        deep: true
      }
    },

    methods: {
      btncancel(){
        this.$emit('cancel');
      },
      btnOk(){
        let errorMsg = false;
        let formData = this.form;

        if(formData.name && formData.name.length <=1) errorMsg = '分类名称必须大于1个字符';

        if(errorMsg) {
          this.$message.error(errorMsg);
          return ;
        }
        this.$emit('val-change',this.form);
        this.btnLoading = true;
        setTimeout(()=>{this.btnLoading = false},1000)
      },
    },
    components: {

    }
  }
</script>
<style lang="less">
  .category-dialog{
    .el-cascader{
      width: 100%;
    }
  }
</style>
