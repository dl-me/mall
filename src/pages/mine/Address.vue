<template>
  <div class="address">
    <Header theme="white">
      <template slot="mid">地址选择</template>
    </Header>
    <div class="address-select">
      <van-address-list
        v-model="selected"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

export default {
  name: "Address",
  data() {
    return {
      selected: undefined,
      data: []
    };
  },
  mounted() {
    let sendTo = this.$store.getters.sendTo;

    this.selected = sendTo && sendTo.id;

    this.$api.getAddressList().then(res => {
      this.data = res;
    });
  },
  watch: {
    selected(id) {
      if (!id) {
        return;
      }

      this.$store.commit("setSelectedAddress", id);
    }
  },
  computed: {
    list() {
      return this.data.map(
        ({
          id,
          name,
          phoneNumber,
          defaultStatus,
          province,
          city,
          region,
          detailAddress
        }) => ({
          id,
          name,
          tel: phoneNumber,
          address: `${province} ${city} ${region} ${detailAddress}`,
          isDefault: !!defaultStatus
        })
      );
    }
  },
  methods: {
    onAdd() {
      this.$router.push("/AddressEdit");
    },
    onEdit(item) {
      this.$router.push(`/AddressEdit?id=${item.id}`);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.address {
  box-sizing: border-box;
  padding-bottom: 30%;
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="less">
.address {
  .van-address-item .van-radio__icon:not(.van-radio__icon--checked) {
    visibility: unset;
}
  .address-select {
    height: 100%;
    overflow: auto;
    .van-address-item .van-radio__icon--checked .van-icon {
      background-color: #cfad69;
      border-color: #cfad69;
      border: 1px solid #c8c9cc;
    }
    .van-button--danger {
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      width: 90%;
      margin: 0 5% 2%;
    }
    .mint-checklist:last-child {
      margin-bottom: 70px;
    }
    .mint-checklist-title {
      margin: 0;
    }
    .mint-cell {
      display: unset;
      .mint-cell-wrapper {
        height: 70px;
        background-image: unset;
        padding: 0 15px;
        .mint-cell-title {
          .mint-checklist-label {
            padding: 0px;
            .mint-checkbox-input:checked + .mint-checkbox-core {
              background-color: #cfad69;
              border-color: #cfad69;
            }
          }
        }
      }
    }
  }
  .add-bg {
    width: 100%;
    height: 73px;
    background: #fff;
    position: fixed;
    bottom: 0;
    .add-address {
      width: 90%;
      box-sizing: border-box;
      border: 1px solid #ccc;
      text-align: center;
      margin: 0.34rem 5%;
      padding: 15px;
      font-size: 0.3rem;
    }
  }
}
</style>
