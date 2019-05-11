<template>
    <div class="content-details">
        <section class="c-header">
            <!-- 文章标题 -->
            <h3>{{content.title}}</h3>
        </section>
        <section class="c-body">
            <!-- 文章内容 -->
            <div>
                {{content.content}}
            </div>
        </section>
        <section class="c-footer">
            <div>
                <!-- 评论区 -->
                <el-form>
                </el-form>
            </div>
            <div>
                <!-- 评论列表 -->
                <ul>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import {web3GetContentByHash} from "@/dapp/web3/content"
export default {
    name:"contentDetails",
    data(){
        return{
            content:{},
        }
    },
    created(){
        let content = this.$route.query.content;
        if(content){
            this.content = content;
        }
    },
    methods:{
    getContent(){
        let cHash = this.content.cHash;
        web3GetContentByHash(cHash,(err,result)=>{
            console.log('content',err,result);
        });
    }
    }
}
</script>

<style>
.content-details{
    text-align: center;
    vertical-align: middle;
    margin-left: 15%;
    width: 70%;
}
</style>
