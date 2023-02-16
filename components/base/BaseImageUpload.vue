<template>
  <div class="image-upload">

    <div class="image-upload__list">
      <div class="image-upload__item image-upload__label"
           v-for="(image, index) in myValue" :key="index"
           :style="{backgroundImage: `url(${image})`}"
           @click="triggerInput(index)"
      />

      <div class="image-upload__item image-upload__label" v-if="maxCount > myValue.length" @click="triggerInput(myValue.length)">
        <v-icon>mdi-camera</v-icon>
      </div>
    </div>

    <input ref="input" type="file" v-show="false" accept="*/image" @input="inputHandle($event.target.files[0])"/>
  </div>
</template>

<script>
import {fileToBase64, optimizeBase64} from "~/helpers/fileHelper";

export default {
  name: "BaseImageUpload",
  props: {
    value: {
      type: [String, Array]
    },
    optimizeWidth: {
      type: Number,
      default: 200
    },
    optimizeHeight: {
      type: Number,
      default: null
    },
    maxCount: {
      type: Number,
      default: 1,
    }
  },
  data: () => ({
    imageIndexForChange: 0,
  }),
  computed: {
    myValue() {
      if (!this.value) return [];
      return Array.isArray(this.value) ? this.value : [this.value];
    }
  },
  methods: {

    triggerInput(index = 0) {
      this.imageIndexForChange = index;
      this.$refs.input.value = "";
      this.$refs.input.click();
    },

    async inputHandle(file) {
      if (!file) return;
      const rawBase64 = await fileToBase64(file);
      const optimizedBase64 = await optimizeBase64(rawBase64, this.optimizeWidth, this.optimizeHeight);
      this.$emit("input", {
        name: file.name,
        buffer: optimizedBase64.split(",")[1],
        position: this.imageIndexForChange + 1,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$item-size: 80px;
.image-upload {
  margin-top: 16px;

  &__list {
    display: flex;
    flex-direction: row;
  }

  &__item {
    display: inline-block;
    height: $item-size;
    width: $item-size;
    border-radius: 5px;
    background-size: contain;
    background-position: center;
    margin-right: 10px;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid gray;
    cursor: pointer;
  }

}
</style>
