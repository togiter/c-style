import{web3,contract} from './web2eth'
import {hexToHash,hashToHex,strToBytes,bytesToStr,uint8ArrayToStr} from '../../utils/convert'
import {dfsCat} from '../dfs/dfs'
let BN = require('big-number')
const EthTX = require('ethereumjs-tx')

const defaultAccount = "0xc7483293f8a38dcceb6339aaf4d1d51bf9664164";
const querier = {from:defaultAccount};

//++++++私链++++++++//

/*
*查询代币信息
*返回 
*na —— 代币名称 sym -- 代币符号
*deci --代币精度 total -- 总代币数量
 */
export function web3TokenInfo(callback) {
  console.log("cc",contract)
  contract.methods.tokenInfo().call(querier).then((result)=>{
     console.log("tokenInfo",result)
     if(result){
        let name = result.na.toString();
        let decimals = result.deci.toString(10);
        let total = result.total.toString(10);
        let symbol = result.sym;
        let item = {
          name:name,
          decimals:decimals,
          total:total,
          symbol:symbol,
        };
        callback(item);

     }
   });
}


/*
 *授权指定账号及余额
 */
export  function web3Approval(_from,_to,value,callback) {
    contract.methods.approve(_to,value).send({from:_from}).then((err,result)=>{
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
export function web3BalanceOf(_to,callback) {
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
export function web3Allowance(_sender,_spender) {
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
export function web3Transfer(_to,value,callback) {
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
export function web3TransferFrom(_from,_to,value,callback) {
   contract.methods.transferFrom(_from,_to,value).send(querier).then((err,result)=>{
     console.log("transferFrom err",err,result)
     if(!err){

     }else {

     }
   });
}




//+++主链++++//

/*
 *以太坊主链转账
 */
export function web3EthTransfer(_to,value,callback) {
  //获取当前账号交易的nonce
  web3.eth.getTransactionCount(defaultAccount,web3.eth.defaultBlock.pending).then(nonce=>{
    //交易数据
    let txData = {
      //nonce++防止覆盖之前pending的交易
      nonce:web3.utils.toHex(nonce++),
      gasLimit:web3.utils.toHex(90000),
      gasPrice:web3.utils.toHex(9000000),
      to:_to,
      from: defaultAccount,
      value:web3.utils.toHex(value),
      data:''
    };

    let tx = new  EthTX(txData);
    //私钥
    let priKey = '';
    const  pk = new  Buffer(priKey,'hex')

    //私钥签名
    tx.sign(pk);

    //序列化
    let serialTx = tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction('0x'+serialTx.toString('hex')).then((err,result)=>{
      console.log("transferFrom err",err,result)
      if(!err){

      }else {

      }
    });

  })
}
