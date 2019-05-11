pragma solidity  >= 0.4.24 <=0.6;
import "./CStyleCoin.sol";
contract CStyle is CStyleCoin {
    
    struct Content{
        address owner;
        uint256 dateTime;
        bytes32 title; //标题
        uint8  cType;   //内容类型 0，文章 1.日记，2。xx
        bytes32 cHash;  //ipfs内容hash
        uint256 commentsCount;
        mapping(uint256=>bytes32) comments; //评论内容 contentId=>comments
    }

    uint256 contentsCount;//内容数量
    mapping(uint256=>Content) contents; //内容
    /*
    *发布成功后触发事件
    */
    event PostContentLog(address indexed owner,bytes32 indexed title,bytes32 indexed cHash,uint8 cType);
    /*
    *发布评论后触发
    *
    */
    event PostCommentLog(uint256 indexed contentId,uint256 indexed commentId,bytes32 indexed commentHash);

    //构造函数
    constructor(string memory name, string memory symbol, uint8 decimals,uint256 total) public
     CStyleCoin(name,symbol,decimals,total) {
        
    }

    /*
    *发布内容,获取奖励
    */
    function postContent(bytes32 _title,bytes32 _cHash,uint8 _type) public {
        require(msg.sender != address(0),"地址不能为0");
        contentsCount++;
         //Content(msg.sender,now,_title,_type,_cHash);
        contents[contentsCount] = Content(
            {
            owner:msg.sender,
            dateTime:now,
            title:_title,
            cType:_type,
            cHash:_cHash,
            commentsCount:0
        });
        // transferFrom(address(this), msg.sender, 5);
        emit PostContentLog(msg.sender,_title,_cHash,_type);

    }


    modifier outId(uint256 cId){
        require(cId > 0 && cId <= contentsCount, "该文章id不存在");
        _;
    }
    /*
    *评论文章
    *cId  文章Id
    *从cHash 评论内容Hash
    */
    function postComment(uint256 cId,bytes32 cHash) public outId(cId){
         Content storage c = contents[cId];
         c.commentsCount++;
         c.comments[c.commentsCount] = cHash;
        emit PostCommentLog(cId, c.commentsCount,cHash);
    }

    /*
    *获取评论内容
    */
    function getCommentById(uint256 contentId,uint256 commentId) public view outId(contentId) returns(bytes32 commentHash){
            commentHash = contents[contentId].comments[commentId];
    }

    /*
    *获取评论条数
    *
    */
    function getComentsCountById(uint256 contentId) public view outId(contentId) returns(uint256 commentsCount){
        commentsCount = contents[contentId].commentsCount;
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
    function tokenInfo() public view returns(string memory na,string memory sym,uint256 total,uint256 deci) {
        na = name();
        sym = symbol();
        total = totalSupply();
        deci = decimals();
    }
}
