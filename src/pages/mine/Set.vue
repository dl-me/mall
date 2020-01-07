<template>
  <div class="set">
    <Header theme="white">
      <template slot="mid">设置</template>
    </Header>
    <ul>
      <li>
        <p>头像</p>
        <div class="set-desc">
          <p class="avatar">
            <img :src="info.icon" alt />
          </p>
          <!-- <span class="iconfont">&#xe62c;</span> -->
        </div>
      </li>
      <li>
        <p>昵称</p>
        <div class="set-desc">
          <p>{{info.nickname}}</p>
          <!-- <span class="iconfont">&#xe62c;</span> -->
        </div>
      </li>
      <li>
        <p>真实姓名</p>
        <div class="set-desc">
          <p>{{info.username}}</p>
          <!-- <span class="iconfont">&#xe62c;</span> -->
        </div>
      </li>
    </ul>
    <div class="sign-out" @click="logout">退出登录</div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "Set",
  computed: {
    info() {
      return this.$store.state.userInfo || {};
    }
  },
  methods: {
    logout() {
      this.$api.getLogout();
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.set {
  height: 100vh;
  background: #f1f1f1;
  position: relative;
  .iconfont {
    color: #999999;
    font-size: 0.28rem;
    margin-left: 0.1rem;
  }
  ul {
    padding: 0 15px;
    background: #fff;
    margin-top: 0.2rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.96rem;
      border-bottom: 1px solid #e6e6e6;
      p {
        font-size: 0.3rem;
      }
      .set-desc {
        display: flex;
        align-items: center;
        .avatar {
          img {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
          }
        }
        p {
          font-size: 0.28rem;
          color: #999999;
        }
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
  .sign-out {
    width: 100%;
    height: 0.96rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    //   margin-bottom: 0;
    position: absolute;
    bottom: 0;
  }
}
</style>
