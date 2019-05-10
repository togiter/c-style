import{web3,contract} from './web2eth'
import {hexToHash,hashToHex,strToBytes,bytesToStr,uint8ArrayToStr} from '../../utils/convert'
import {dfsCat} from '../dfs/dfs'
let BN = require('big-number')
const defaultAccount = "";
const querier = {from:defaultAccount};

//++++++私链++++++++//

/*
*查询代币信息
 */
export default function web3TokenInfo() {
   contract.methods.tokenInfo().call(querier).then((err,result)=>{
     console.log("tokenInfo err",err,result)
     if(!err){

     }else {

     }
   });
}


/*
 *授权指定账号及余额
 */
export default  function web3Approval(_to,value,callback) {
    contract.methods.approval(to,value).send(querier).then((err,result)=>{
      console.log("approval err",err,result)
        if(!err){

        }else {

        }
    });
}

/*
*获取代币账号余额
* // 查询以太币余额
web3.eth.getBalance(currentAccount).then(console.log);
 */
export default function web3BalanceOf(_to,callback) {
  contract.methods.balanceOf(_to).call(querier).then((err,result)=>{
    console.log("web3BalanceOf err",err,result)
    if(!err){

    }else {

    }
  });
}

/*
*查看某个账号允许另一个账号可使用的代币数量
*
 */
export default function web3Allowance(_sender,_spender) {
  contract.methods.allowance(_sender,_spender).call(querier).then((err,result)=>{
    console.log("web3Allowance err",err,result)
    if(!err){

    }else {

    }
  });
}


/*

代币转账
// 以太币转账
web3.eth.sendTransaction({
    from: currentAccount,
    to: receiverAccount,
    value: '1000000000000000'
})
.then(function(receipt){
    console.log(receipt);
 }
 */
export default function web3Transfer(_to,value,callback) {
  contract.methods.transfer(_to,value).send(querier).then((err,result)=>{
    console.log("transfer err",err,result)
    if(!err){

    }else {

    }
  });
}

/**
 *授权合约转账，配合approval
 * _from 授权人
 * _to  被授权人
 * value 授权代币数量
 */
export default function web3TransferFrom(_from,_to,value,callback) {
   contract.methods.transferFrom(_from,_to,value).send(querier).then((err,result)=>{
     console.log("transferFrom err",err,result)
     if(!err){

     }else {

     }
   });
}




//+++主链++++//
