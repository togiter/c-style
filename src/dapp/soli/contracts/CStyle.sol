pragma solidity  >= 0.4.24 <=0.6;
import "./ERC20Impl.sol"
contract CStyle is ERC20Impl {
    struct Content{
        address owner;  //作者  
        uint256 dateTime; 
        bytes32 title; //标题
        uint8  cType;   //内容类型 0，文章 1.日记，2。xx
        bytes32 cHash;  //内容hash
        
    }

    uint256 contentsCount;
    mapping(uint256=>Content) contents;
    /*
    *发布成功后触发事件
    */
    event PostContent(address indexed owner,bytes32 indexed title,bytes32 indexed cHash,uint8 cType);

    //构造函数
    constructor(string memory name, string memory symbol, uint8 decimals,uint256 total)
     ERC20Impl(name,symbol,decimals,total) public {
    }

    /*
    *发布内容,获取奖励
    */
    function postContent(bytes32 _title,bytes32 _cHash,uint8 _type) public {
        contentsCount++;
        Content storage content = Content({
            owner:msg.sender,
            dateTime:now,
            title:_title,
            cType:_type,
            cHash:_cHash
        });
        contents[contentsCount] = content;
        // transferFrom(address(this), msg.sender, 5);
        emit PostContent(msg.sender,_title,_cHash,_type);

    }

    /*
    *获取发布的内容
    */
    function getContentById(uint256 cId) public view returns(Content memory){
        require(cId > 0 && cId <= contentsCount, "不存在该内容");
        return contents[cId];
    }
}
