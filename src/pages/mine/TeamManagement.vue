<template>
  <div class="teamManagement">
    <Header theme="white">
      <template slot="mid">团队管理</template>
    </Header>
    <div class="team-content-wrapper">
      <div class="team-content">
        <h2>
          <span>团队人数(人)</span>
          {{totalMember}}
        </h2>
        <div class="tm">
          <div class="team-item" v-for="(item,index) in data" :key="index">
            <div class="team-num">
              <div class="team-item-img">
                <img
                  :src="item.icon"
                  alt
                />
              </div>
              <div class="team-item-desc">
                <div class="team-item-name">{{item.nickname}}</div>
                <div class="team-item-phone">{{item.uid}}</div>
              </div>
            </div>
            <div class="team-item-date">{{item.createTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "TeamManagement",
  data() {
    return {
      data: {},
      totalMember: 0
    };
  },
  mounted() {
    this.listMember();
    this.distributorInfo();
  },
  methods: {
    async listMember() {
      this.data = await this.$api.listMember();
    },

    // 团队人数接口
    async distributorInfo() {
      let teamNum = await this.$api.distributorInfo();
      this.totalMember = teamNum.totalMember;  //团队人数
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.teamManagement {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .team-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(241, 241, 241, 1);
    overflow: hidden;
  }

  .team-content {
    flex: 1;
    margin: 30px;
    background-color: #fff;
    border-radius: 16px;
    overflow: auto;
    min-height: 0;
    h2 {
      display: flex;
      justify-content: center;
      height: 90px;
      background: #222;
      align-items: center;
      flex-direction: column;
      color: #d8bc85;
      font-size: 24px;
      line-height: 24px;
      span {
        font-size: 14px;
        margin-bottom: 4px;
      }
    }
    .tm {
      // height: 100%;
      overflow: auto;
      .team-item {
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.2rem 0.3rem;
        .team-num {
          display: flex;
          .team-item-img {
            img {
              height: 0.8rem;
              width: 0.8rem;
              margin-right: 0.22rem;
              border-radius: 50%;
            }
          }
          .team-item-desc {
            display: flex;
            align-items: self-start;
            flex-direction: column;
            justify-content: space-around;
            // .team-item-name {
            //   text-align: center;
            // }
            .team-item-name {
              color: #333;
              font-size: 17px;
            }
            .team-item-phone {
              color: #999;
              font-size: 13px;
            }
          }
        }
        .team-item-date {
        }
      }
    }
  }
}
</style>
