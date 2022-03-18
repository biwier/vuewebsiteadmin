<template>
  <div>
    <Editor id="tinymce" v-model="value" :init="editorInit"></Editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import Axios from 'axios'
  export default {
      watch:{
          value:function (val) {
            this.$emit("getValue",val)
          }
      },
      props: {
        value: {
          type: String,
          default: ''
        },
      },
        data() {
          return {
            editorInit: {
              language_url: '/static/tinymce/zh_CN.js',
              language: 'zh_CN',
              skin_url: '/static/tinymce/skins/lightgray',
              height: 300,
              plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu imageupload',
              toolbar:
                'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
              branding: false,
              images_upload_url:'http://upload-z2.qiniup.com/putb64/-1' ,
              images_upload_handler:(blobInfo, success, failure)=>{
                this.handleImgUpload(blobInfo, success, failure)
              },
            },
            imageObject: {
              token: '',
              key: '',
              file: '',
            },
            action: 'http://upload-z2.qiniup.com',
            domian: 'http://static.gongyitech.com/',
          }
        },
        methods:{
          async handleImgUpload (blobInfo, success, failure) {
            let _this = this;
            _this.imageObject.file = blobInfo;
            console.log(blobInfo);
            let res =  await _this.beforUpload();
            _this.imageObject.token = res.token;
            _this.imageObject.key = res.key;
            let url = _this.editorInit.images_upload_url+'/'+_this.imageObject.key+'/'+blobInfo.filename();
            console.log(_this.imageObject);
            Axios.post(url, blobInfo.base64(),{ headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'UpToken ' + _this.imageObject.token,
              }
            }).then(res => {
              success(_this.domian+res.data.key)
            }).catch(res => {
              failure('error')
            })
          },
          async beforUpload() {
            return new Promise((resolve, reject) => {
              Axios.get("/api/getToken").then(response => {
                resolve(response.data)
              }).catch(() => {
                reject(false)
              })
            })
          }
      },
      components:{
          Editor
      },
      mounted(){
          tinymce.init({})
      },
    }
</script>

<style scoped>

</style>
