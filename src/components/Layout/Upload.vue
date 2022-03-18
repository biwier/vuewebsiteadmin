<template>
    <div>
      <el-upload
        :data="dataObj"
        :action="action"
        :multiple="false"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
      name: "Upload",
      props: {
          value: {
            type: String,
            default: ''
          },
        },
        data() {
          return {
            imageUrl: '',
            dataObj: {token: '', key: ''},
            domian: 'https://static.gongyitech.com/',
            action:'http://upload-z2.qiniup.com'
          }
        },
        methods: {
          emitInput(val) {
            this.$emit('input', val);
            this.dataObj = {token: '', key: ''};
          },
          async handleAvatarSuccess(res, file) {
            console.log(file);
            this.imageUrl = this.domian+this.dataObj.key;
            await this.emitInput(this.imageUrl);
          },
          async beforeAvatarUpload(file) {
            console.log(this.dataObj);
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG/PNG 格式!');
            }
            await this.beforeUpload();
            return isJPG;
          },
          async beforeUpload() {
            const _self = this;
            return new Promise((resolve, reject) => {
              Axios.get("/api/getToken").then(response => {
                const key = response.data.key;
                const token = response.data.token;
                _self._data.dataObj.token = token;
                _self._data.dataObj.key = key;
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }
        },
     }


</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: auto;
    display: block;
  }
</style>
