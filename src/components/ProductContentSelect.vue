<template>
  <div v-if="this.content.values&& this.content.values.length">
    <div class="type-selection-color">
      <p>{{content.type}}</p>
      <p class="type-selection-color-kind">
        <span
          v-for="item in content.values"
          :key="item.name"
          @click="selectContent(item)"
          :class="current.name === item.name ? 'selected' : ''"
        >{{item.name}}</span>
      </p>
    </div>
    <product-content-select
      :content="current.children || {}"
      :defaultNames="childDefaultNames"
      @change="childChange"
    ></product-content-select>
  </div>
</template>
<script>
export default {
  name: "product-content-select",
  props: ["content", "defaultNames"],
  data() {
    return {
      selected: undefined,
      childName: "",
      childDefaultNames: []
    };
  },
  mounted() {
    this.setDefault();
  },
  computed: {
    current() {
      let content = this.content || {};
      let values = content.values || [];

      let selected = this.selected;

      selected =
        selected &&
        values &&
        values.find(value => value.name === this.selected.name);

      return selected || values[0] || {};
    }
  },
  watch: {
    defaultNames() {
      this.setDefault();
    },
    current() {
      this.emitChange();
    }
  },
  methods: {
    setDefault() {
      if (this.selected) {
        return;
      }

      let defaultNames = JSON.parse(JSON.stringify(this.defaultNames));

      let defaultName = defaultNames.shift();

      if (!defaultName) {
        return;
      }

      this.selected = this.content.values.find(
        item => item.name === defaultName
      );

      this.childDefaultNames = defaultNames;
    },
    selectContent(item) {
      this.selected = item;
    },
    childChange(name) {
      this.childName = name;
      this.emitChange();
    },
    emitChange() {
      let name = this.current.name;

      if (!name) {
        return;
      }

      let childName = this.childName ? `-${this.childName}` : "";

      this.$emit("change", `${name}${childName}`);
    }
  }
};
</script>
<style lang="less" scoped>
.type-selection-color {
  margin: 0.6rem 0;
  .type-selection-color-kind {
    display: flex;
    margin: 0.2rem 0;
    flex-wrap: wrap;
    span {
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 0.2rem;
      color: #666;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
    }
    .selected {
      border: 1px solid #cfad69;
      color: #cfad69;
      background-color: #faf7f0;
    }
  }
}
</style>