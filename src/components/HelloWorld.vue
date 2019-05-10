<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="gotoContent"> 发布内容</button>
    <button @click="gotoList"> 内容列表</button>
    <button @click="gotoAccount"> 账号操作</button>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    gotoContent(){
      this.$router.push({
        path:"/postContent",
        query:{}
      });

    },
    gotoAccount(){
      this.$router.push({
        path:"/account",
        query:{}
      });
    },
    gotoList(){
      this.$router.push({
        path:"/contentsList",
        query:{}
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
