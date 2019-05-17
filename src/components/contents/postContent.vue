<template>
    <div class="post-article">
       <el-form ref="form" :model="form">
  <el-form-item label="">
    <el-input v-model="form.title" placeholder="请输入标题(不超过32个字符或16个中文)"></el-input>
  </el-form-item>
  <!-- <el-form-item label="内容类型"> -->
   <el-form-item label="">
    <el-radio-group v-model="form.cType" style="width:100%;">
      <el-radio :label=0>文章/新闻</el-radio>
      <el-radio :label=1>日记(加密)</el-radio>
    </el-radio-group>
  </el-form-item>
  <!-- </el-form-item> -->

  <el-form-item label="">
    <el-input type="textarea" placeholder="请在此输入内容" :rows="15" v-model="form.content" maxlength="500" show-word-limit> </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
import {web3PostContent} from '@/dapp/web3/content'
import {aesEncrypt,aesDecrypt} from "../../utils/crypto";

import {dfsAdd} from '@/dapp/dfs/dfs'
export default {
    data() {
        return {
          form: {
          title: '',
          cType:0,
          content: ''
        }
        }
    },
    methods: {
        onSubmit(){

                let msgJson = JSON.stringify(this.form);
                let key = '111';
                let retf = aesEncrypt(msgJson,key);
                console.log('en',retf);
                let rete = aesDecrypt(retf,key);
                console.log('den',rete);
                console.log('msgjson',msgJson);
                //上传到分布式文件系统获取hash
                dfsAdd(msgJson, (err, value) => {
                    let hash = value;

                    web3PostContent(this.form.title,hash,Number.parseInt(this.form.cType),(error,result)=>{
                     console.log('error-result',error, result);

                });
                });
        },
    },
}
</script>
<style>
.post-article{
  text-align: center;
  vertical-align: middle;
  margin-left:15%;
  width:70%;
}
</style>

