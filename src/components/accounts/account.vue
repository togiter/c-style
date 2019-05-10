<template>
 <div class="account">
   <el-form>
     <el-form-item label="账号操作">
       <el-form-item label="主动地址">
         <el-input v-model="addr" placeholder="主动地址"></el-input>
       </el-form-item>
       <el-form-item label="被动地址">
         <el-input v-model="beAddr" placeholder="被动地址"></el-input>
       </el-form-item>
       <el-form-item label="金额">
         <el-input v-model="amount" placeholder="金额"></el-input>
       </el-form-item>
       <el-button @click="approval">授权</el-button>
       <el-button @click="transfer">授权</el-button>
       <el-button @click="transferFrom">转账</el-button>
       <el-button @click="balanceOf">主地址余额</el-button>
     </el-form-item>
   </el-form>

 </div>
</template>

<script>
  import {web3TokenInfo} from '@/dapp/web3/content'
    export default {
        name: "account",
      data(){
          return {
            addr:"",
            beAddr:"",
            amount:"",
          }
      },
      created(){
        web3TokenInfo((err,result)=>{

        });
      },
      methods:{
        approval(){

        },
        transfer(){

        },
        transferFrom(){

        },
        balanceOf(){

        },

      }


    }
</script>

<style scoped>

</style>
