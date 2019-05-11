<template>
 <div class="account">
   <p><span>代币名称:{{tokenInfo.name}}</span></p>
   <p><span>代币总量:{{tokenInfo.total}}</span></p>
   <p><span>代币符号:{{tokenInfo.symbol}}</span></p>
   <p><span>代币精度:{{tokenInfo.decimals}}</span></p>
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
       <el-button @click="approval">approv</el-button>
       <el-button @click="transfer">transfer</el-button>
       <el-button @click="transferFrom">transferFrom</el-button>
       <el-button @click="allowance">allowance</el-button>
       <el-button @click="balanceOf">balanceOf</el-button>
     </el-form-item>
   </el-form>

 </div>
</template>

<script>
  import {web3TokenInfo,web3Allowance,web3Transfer,web3TransferFrom,web3BalanceOf,web3Approval} from '@/dapp/web3/account'
    export default {
        name: "account",
      data(){
          return {
            addr:"",
            beAddr:"",
            amount:"",
            tokenInfo:{
              name:"",
              total:"",
              symbol:"",
              decimals:"",

            },
          }
      },
      created(){
        web3TokenInfo((result)=>{
          this.tokenInfo = result;
        });
      },
      methods:{
        approval(){
          web3Approval(this.addr,this.beAddr,this.amount,(err,result)=>{

          });
        },
        transfer(){
          console.log('transfer')
         web3Transfer(this.beAddr,this.amount,(err,result)=>{

          })
        },
        transferFrom(){
          web3TransferFrom(this.addr,this.beAddr,this.amount,(err,result)=>{

          });
        },
        balanceOf(){
          web3BalanceOf(this.addr,(err,result)=>{

          });
        },
        allowance(){
          web3Allowance(this.addr,this.beAddr,(err,result)=>{

          });
        }

      }


    }
</script>

<style scoped>

</style>
