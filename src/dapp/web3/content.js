import{web3,contract} from './web2eth'
import {hexToHash,hashToHex,strToBytes,bytesToStr,uint8ArrayToStr} from '../../utils/convert'
import {dfsCat,bs582hash,hash2bs58} from '../dfs/dfs'
let BN = require('big-number')
let defaultAccount;
web3.eth.getAccounts().then((err,values)=>{
    console.log('accounts',err,values);
    if(!err){
        defaultAccount = values[0];
    }
});
console.log('defautAccount:',defaultAccount);
if(defaultAccount === 'undefined' || defaultAccount == null){
    defaultAccount = '0xc7483293f8a38dcceb6339aaf4d1d51bf9664164';
}

const querier = {from:defaultAccount};
/*
*获取区块链上内容的数量
*/
export function web3GetContentsCount(callback){
    contract.methods.getContentsCount().call(querier,(err,result)=>{
        console.log('err',err,'result',result)
        if( typeof callback == 'function'){
            let count = 0;
            if(!err){
                //bigNumber to string to int
                count = Number.parseInt(result.toString(10));
            }
            callback(err,count);
        }
    });
}

/*
*根据hash从ipfs获取内容
*/
export function web3GetContentByHash(hash,callback){
    dfsCat(hash,(err,result)=>{
        console.log(err,'resevor Hash',uint8ArrayToStr(result));
        // callback(err,uint8ArrayToStr(result));
        if(typeof callback === 'function'){
            //uint8ArrayToStr
            callback(err,uint8ArrayToStr(result));
        }
     });
}
/*
*根据id获取内容
*/
export function web3GetContentById(id,callback){
    contract.methods.getContentById(new BigInt(id)).call(querier,(err,result)=>{
        console.log('err',err,'result',result)
        let title = result.title;
        title = web3.utils.hexToBytes(title);
        title = bytesToStr(title);
         console.log('title',title,title.toString());
        let cHash = result.cHash;
        let hash = hexToHash(cHash);
      console.log("hashStr",hash);
      dfsCat(hash,(err,result)=>{
         console.log(err,'resevor Hash',uint8ArrayToStr(result));
         // callback(err,uint8ArrayToStr(result));
         if(typeof callback === 'function'){
             //uint8ArrayToStr
             callback(err,uint8ArrayToStr(result));
         }
      });
    });
}
    /*
    *发布内容到链上
    *
    * */

    export function web3PostContent(title,cHash,cType,callback){
        if(title === 'undefined' || title == null || title.lenght <= 0){
            console.log('请输入内容标题');
            return;
        }
        if(cHash === 'undefined' || cHash == null || cHash.lenght <= 0){
            console.log('miss  chash ',cHash);
            return;
        }
        let bytesTitle;
        //转为32个位数组
        bytesTitle = strToBytes(title,32);
         console.log(title,'str to bytes',bytesTitle);
    
         //hash 先用base58解码，再转为hex，然后转为32位数组
        let hash2Hex = hashToHex(cHash);
        console.log(cHash,'-to-hex',hash2Hex)
        let hex2bytes = web3.utils.hexToBytes(hash2Hex);
        console.log(cHash,'-to bytes-',hex2bytes);
    
        //监听合约事件
        contract.events.PostContentLog((err,event)=>{
            console.log('eventInfo',err,event);
        }).on('data',(result)=>{
    
          //获取返回值
         let returnVals = result.returnValues;
         let cTitle = returnVals.title;
         //解码hex到字符数组
         cTitle = web3.utils.hexToBytes(cTitle);
         //字符数组转字符串
         cTitle = bytesToStr(cTitle);
    
         let hash = hexToHash(returnVals.cHash);
         console.log("orgi Hash",hash);
         dfsCat(hash,(err,resp)=>{
            console.log("hash err resp",err,uint8ArrayToStr(resp));
         });
         console.log(name,'-保存成功-',result);
         dfsCat(hash,(err,result)=>{
            console.log('err',err);
         });
        }).on('changed',(result)=>{
         console.log('changed',result);
        }).on('error',console.error);
        cType = web3.utils.toHex(cType);
        console.log('cType',cType);
        //hash值字符串超过32字节，不能直接转为byte32，要先加入前缀0x转为16进制再转为bytes32
        contract.methods.postContent(bytesTitle,hex2bytes,cType).send({from:defaultAccount}).then((result)=>{
           console.log('--result',result);
            if(callback && typeof callback == 'function'){
                callback(null,result);
            }
        });
    }
