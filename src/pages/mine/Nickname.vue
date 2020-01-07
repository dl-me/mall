<template>
  <div class="nickname">
    <Header theme="white">
      <template slot="mid">修改昵称</template>
    </Header>
    <input v-model="value" type="text" placeholder="请输入昵称" />
    <button @click="nickname">保存</button>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "Nickname",
  data() {
    return {
      value: ""
    };
  },
  mounted(){
    this.nickname;
  },
  methods: {
    nickname(){
      console.log(this.value);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.nickname {
  height: 100vh;
  background: #f1f1f1;
  input {
    height: 1.06rem;
    width: 100%;
    padding: 0 0.34rem;
    margin-top: 0.2rem;
  }
  button{
    height: 1.06rem;
    width: 90%;
    margin: 0.34rem 5%;   
    color: #6D4B0E;
    background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%); 
  }
}
</style>
