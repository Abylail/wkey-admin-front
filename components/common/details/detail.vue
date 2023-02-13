<template>
  <div class="detail" :class="{'detail--block': block}">
    <div class="detail__title">{{ title }}</div>
    <div class="detail__value"><slot/></div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
    title: {
      type: String,
      default: ""
    },
    block: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  display: inline-block;
  margin: 16px 16px 0 0;

  &--block {
    display: block;
  }

  &__title {
    color: #575757;
    font-size: 14px;
  }
}
</style>
