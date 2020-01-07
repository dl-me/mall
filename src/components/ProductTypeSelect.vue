<template>
  <div class="type-selection" @click.self.stop="$emit('update:show', false)">
    <div class="type-selection-box">
      <div class="type-selection-detail">
        <div class="type-selection-img">
          <img :src="selectedSpec.specImg" />
        </div>
        <div class="type-selection-price">
          <p>￥{{ selectedSpec.productPrice }}</p>
          <p>请选择类型</p>
        </div>

        <product-content-select
          :content="specContents"
          @change="onSpecNameChange"
          :defaultNames="defaultNames"
        ></product-content-select>

        <div class="type-selection-num">
          <p>购买数量</p>
          <div class="selection-num">
            <van-stepper v-model="size" @change="onSizeChange" />
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ProductContentSelect from "@/components/ProductContentSelect";

export default {
  name: "product-type-select",
  props: ["show", "specList", "selectedSpec", "defaultSize"],
  data() {
    return {
      size: this.defaultSize
    };
  },
  model: {
    prop: "show",
    event: "update:show"
  },
  computed: {
    defaultNames() {
      return this.selectedSpec.specValue.split("-");
    },
    specContents() {
      let { specName = "" } = this.specList[0] || {};

      let specNames = String(specName).split("-");

      if (!specNames.length) {
        return {};
      }

      let specContent = {
        type: specNames[0],
        values: []
      };

      for (let { specValue } of this.specList) {
        let values = String(specValue).split("-");

        values.reduce((content, v, i) => {
          let value = content.values.find(value => value.name === v);

          if (!value) {
            let specName = specNames[i + 1];

            value = {
              name: v,
              ...(specName
                ? {
                    children: {
                      type: specName,
                      values: []
                    }
                  }
                : {})
            };

            content.values.push(value);
          }

          return value.children;
        }, specContent);
      }

      return specContent;
    }
  },
  methods: {
    onSpecNameChange(name) {
      let selectedSpec = this.specList.find(v => v.specValue === name);

      if (!selectedSpec) {
        return;
      }

      this.$emit("change", selectedSpec);
    },
    onSizeChange() {
      this.$emit("sizeChange", this.size);
    }
  },
  components: {
    ProductContentSelect
  }
};
</script>

<style lang="less" scoped>
.type-selection {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  .shareFriends,
  .type-selection-box {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    border-radius: 0.32rem 0.32rem 0 0;
    font-size: 14px;
  }

  // 分享
  .shareFriends {
    height: 172px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: 0.22rem;
    text-align: center;
    img {
      height: 1.1rem;
      width: 1.1rem;
    }
    .friends,
    .weChat {
      margin-top: 15px;
      p {
        margin-top: 0.3rem;
      }
    }
    .cancel {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #e5e5e5;
      font-size: 0.3rem;
    }
  }
  // 选择
  .type-selection-box {
    min-height: 8rem;
    .type-selection-detail {
      box-sizing: border-box;
      padding: 0 0.3rem 1.68rem;
      font-size: 0.28rem;
      .type-selection-img {
        display: flex;
        align-items: center;
        position: relative;
        img {
          height: 1.82rem;
          width: 1.82rem;
          position: absolute;
          bottom: -56px;
        }
      }
      .type-selection-price {
        margin: 0.34rem 0 0 1.8rem;
        p {
          margin: 0.1rem 0.2rem;
        }
        p:first-child {
          color: #cfad69;
          font-size: 0.3rem;
        }
        p:last-child {
          font-size: 0.24rem;
        }
      }

      .type-selection-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        margin-top: 30px;
        .selection-num {
          display: flex;
          align-items: center;
          .selection-num-subtraction,
          .selection-num-addition {
            height: 0.7rem;
            line-height: 0.7rem;
            text-align: center;
            width: 0.7rem;
            border: 1px solid #999;
            color: #999;
          }
          .selection-num-actual {
            width: 20px;
            margin: 0 10px;
            text-align: center;
          }
        }
      }
    }
    .add-type-shoppingCart {
      display: flex;
      position: fixed;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      width: 100%;
      text-align: center;
      font-size: 0.3rem;
      .add-to-shoppingCart {
        width: 50%;
        background: #333;
        color: #fff;
      }
      .buy-now {
        width: 50%;
        background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
        color: #6d4b0e;
      }
    }
  }
}
</style>