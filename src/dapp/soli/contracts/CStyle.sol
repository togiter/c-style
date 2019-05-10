pragma solidity  >= 0.4.24 <=0.6;
import "./CStyleCoin.sol";
contract CStyle is CStyleCoin {
    struct Content{
        address owner;  //作者  
        uint256 dateTime; 
        bytes32 title; //标题
        uint8  cType;   //内容类型 0，文章 1.日记，2。xx
        bytes32 cHash;  //ipfs内容hash
        
    }

    uint256 contentsCount;//内容数量
    mapping(uint256=>Content) contents; //内容
    /*
    *发布成功后触发事件
    */
    event PostContentLog(address indexed owner,bytes32 indexed title,bytes32 indexed cHash,uint8 cType);

    //构造函数
    constructor(string memory name, string memory symbol, uint8 decimals,uint256 total) public
     CStyleCoin(name,symbol,decimals,total) {
        
    }

    /*
    *发布内容,获取奖励
    */
    function postContent(bytes32 _title,bytes32 _cHash,uint8 _type) public {
        contentsCount++;
        Content memory content = Content({
            owner:msg.sender,
            dateTime:uint256(now),
            title:_title,
            cType:_type,
            cHash:_cHash
        });
        contents[contentsCount] = content;
        // transferFrom(address(this), msg.sender, 5);
        emit PostContentLog(msg.sender,_title,_cHash,_type);

    }

    

    /*
    *获取发布的内容
    */
    function getContentById(uint256 cId) public view returns(bytes32 title,bytes32 cHash,uint8 cType){
        require(cId > 0 && cId <= contentsCount, "不存在该内容");
        Content storage content = contents[cId];
        title = content.title;
        cHash = content.cHash;
        cType = content.cType;
    }
   /*
   *获取内容总条数
   */
    function getContentsCount() public view returns (uint256){
        return contentsCount;
    }

    /*
    *获取
    */
    function tokenInfo() public view returns(string name,string symbol,uint256 total,uint256 decimals) {
        name = name();
        symbol = symbol();
        total = totalSupply();
        decimals  decimals();
    }
}
