<template>
  <div class="QRCode">
    <div class="arcode-content">
      <span class="back-icon iconfont" @click="goBack">&#xe60a;</span>
      <div class="qrcode-title">
        <p class="qrcode-header">引荐用户得佣金</p>
        <p class="qrcode-desc">邀请越多，佣金越多</p>
      </div>
      <div class="qrcodebg-content">
        <div class="qrcodebg-name">
          <span>
            <img :src="info.icon" alt />
          </span>
          <div class="qrcodebg-desc">
            <p>
              我是
              <span class="mine-name">{{info.nickname}}</span>
            </p>
            <p>快来和我一起赚钱~</p>
          </div>
        </div>
        <div class="qrcode-text">
          <div class="qrcode-img">
            <img :src="this.QRCode" alt />
          </div>
          <p>长按保存图片至手机相册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QRCode",
  computed: {
    info() {
      return this.$store.state.userInfo || {};
    }
  },
  data() {
    return {
      QRCode: {}
    };
  },
  mounted() {
    this.makeDistributorShareQrcode();
  },
  methods: {
    async makeDistributorShareQrcode() {
      let data = await this.$api.makeDistributorShareQrcode();
      this.QRCode = `data:image/jpg;base64,${data}`;
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.QRCode {
  .arcode-content {
    height: 100vh;
    width: 100%;
    background-image: url("../../assets/qrcode.png");
    background-size: 100% 100%;
    position: relative;
    .back-icon {
      color: #fff;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
    }
    .qrcode-title {
      height: 2.5rem;
      color: #e8c783;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .qrcode-header {
        font-size: 0.56rem;
      }
      .qrcode-desc {
        font-size: 0.24rem;
        margin-top: 0.25rem;
        color: #cfad69;
        letter-spacing: 2px;
      }
      //   .qrcode-desc:before {
      //     content: "111";
      //     height: 1px;
      //     background: linear-gradient(135deg, #fff 10%, #fff 100%);
      //     width: 40px;
      //     margin-right: 10px;
      //     z-index: 999;
      //   }
      //   .qrcode-desc:after {
      //     content: "222";
      //     height: 1px;
      //     background: linear-gradient(135deg, #fff 10%, #fff 100%);
      //     width: 40px;
      //     margin-left: 10px;
      //     z-index: 999;
      //   }
    }
    .qrcodebg-content {
      width: 82%;
      height: 7.67rem;
      background-image: url("../../assets/qrcodebg.png");
      position: absolute;
      top: 30%;
      left: 10%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .qrcodebg-name {
        height: 2.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          flex: 1;
          text-align: center;
          img {
            height: 55px;
            width: 55px;
            border-radius: 50%;
          }
        }
        .qrcodebg-desc {
          flex: 2;
          p {
            line-height: 20px;
            .mine-name {
              color: #e8c783;
            }
          }
        }
      }
      .qrcode-text {
        height: 260px;
        text-align: center;
        color: #666;
        .qrcode-img {
          margin-bottom: 10px;
          img {
            height: 190px;
            width: 190px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
