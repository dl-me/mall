<template>
  <div class="addressEdit">
    <Header theme="white">
      <template slot="mid">{{editId?"编辑地址":"新增地址"}}</template>
    </Header>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!editId"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="address"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import areas from "@/api/area.js";

export default {
  name: "AddressEdit",
  data() {
    return {
      areaList: areas,
      address: {
        addressDetail: "",
        city: "",
        county: "",
        id: undefined,
        isDefault: true,
        name: "",
        postalCode: "",
        province: "",
        tel: ""
      },
      data: {},
      editId: undefined
    };
  },
  mounted() {
    let editId = this.$route.query.id;

    if (editId) {
      this.$api.getAddress({}, editId).then(data => {
        if (!data) {
          return;
        }

        let {
          city,
          defaultStatus,
          detailAddress,
          id,
          memberId,
          name,
          phoneNumber,
          postCode,
          province,
          region
        } = data;

        let code;

        if (province) {
          let pinfo = Object.entries(areas.province_list).find(
            ([c, p]) => p === province
          );

          if (pinfo) {
            code = pinfo[0];

            if (city) {
              let cinfo = Object.entries(areas.city_list).find(
                ([c, p]) => p === city && c.startsWith(code.slice(0, 2))
              );

              if (cinfo) {
                code = cinfo[0];

                if (region) {
                  let rinfo = Object.entries(areas.county_list).find(
                    ([c, p]) => p === region && c.startsWith(code.slice(0, 4))
                  );

                  if (rinfo) {
                    code = rinfo[0];
                  }
                }
              }
            }
          }
        }

        this.address = {
          id,
          name,
          tel: phoneNumber,
          province,
          city,
          county: region,
          addressDetail: detailAddress,
          postalCode: postCode,
          isDefault: !!defaultStatus,
          areaCode: code
        };

        this.editId = editId;
        this.data = data;
      });
    }
  },
  methods: {
    onSave({
      id,
      name,
      tel: phoneNumber,
      province,
      city,
      county: region,
      addressDetail: detailAddress,
      postalCode: postCode,
      isDefault: defaultStatus
    }) {
      let address = {
        ...this.data,
        city,
        defaultStatus: Number(defaultStatus),
        detailAddress,
        name,
        phoneNumber,
        postCode,
        province,
        region
      };

      (this.editId
        ? this.$api.updateAddress(address, this.editId, true)
        : this.$api.addAddress(address, undefined, true)
      ).then(() => {
        this.$router.go(-1);
      });
    },
    onDelete() {
      this.$api.deleteAddress({}, this.editId).then(() => {
        this.$router.go(-1);
      });
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.addressEdit {
  font-family: PingFangSC-Regular, PingFang SC;
  .select-add {
    height: 53px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 16px;
    p:nth-child(2) {
      color: #999;
      font-weight: 200;
      margin-left: -58px;
    }
  }
}
</style>
<style lang="less">
.addressEdit {
  color: #333;
  height: 100%;
  background-color: #f1f1f1;
  .van-picker__cancel,
  .van-picker__confirm {
    color: #cfad69;
  }
  .van-switch--on {
    background-color: #cfad69;
  }
  .van-button--danger {
    background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
    border-color: #cfad69;
  }
  .van-field--error .van-field__control,
  .van-field--error .van-field__control::placeholder {
    color: #6d4b0e;
    -webkit-text-fill-color: #6d4b0e;
  }
  .mint-cell {
    background-image: unset;
    min-height: 53px;
    .mint-cell-wrapper {
      background-image: unset;
      padding: 0 15px;
    }
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #cfad69;
    border-color: #cfad69;
  }
  .save-address {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
    color: #6d4b0e;
  }
}
</style>
<style>
.van-picker__cancel,
.van-picker__confirm {
  color: #cfad69;
}
</style>