<template>
    <div class="list">
        <ul v-for="(item,i) in list" :key=i>
            <div @click="gotoDetails(item)">
                <p> {{item.name}}</p>
                <p><span>{{item.dateTime}}</span><span>{{item.owner}}</span></p>
            </div>
        </ul>
    </div>
</template>

<script>
import {web3GetContentById,web3GetContentsCount} from '@/dapp/web3/content'
export default {
    data() {
        return {
            index:1,
            pageSize:30,
            total:0,
            list:[],

        }
    },
    created() {
        this.getTotal();
    },
    methods: {
        gotoDetails(item){
            this.$router.push({
                path:"/contentDetails",
                query:{
                    content:item,
                }
            });
        },
        getTotal(){
            web3GetContentsCount((err,count)=>{
                if(!err && count > 0){
                    this.total = count;
                    this.getList();
                }
            });
        },
        getList(){
            for(let i = this.index;i <= Math.min(this.index + this.pageSize,this.total);++i){
                web3GetContentById(i,(err,result)=>{
                    if(!err){
                        this.list.push(JSON.parse(result));
                    }
                })
            }
            this.index = this.index + this.pageSize; //下一页
        }
    },
}
</script>
<style scoped>
 .list{
    vertical-align: middle;
    text-align: center;
    margin-left: 15%;
    width: 70%;
}
</style>

