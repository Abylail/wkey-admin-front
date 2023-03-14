<template>
  <div class="image-upload">

    <div class="image-upload__title">
      <span>{{ label }}</span>
      <v-btn v-if="!url" color="primary" outlined @click="uploadHandle()">Загрузить фото</v-btn>
      <v-btn v-else color="primary" outlined small @click="uploadHandle()">Загрузить другое фото</v-btn>
    </div>

    <!-- Если фото есть -->
    <div class="image-upload__view" v-if="url">
      <img :src="imageUrl" alt="image">
    </div>

    <input v-show="false" ref="input" type="file" accept="*/image" @input="uploadFile($event.target.files[0])"/>
  </div>
</template>

<script>
import {fileToBase64, optimizeBase64} from "@/helpers/fileHelper";

export default {
  name: "imageUpload",
  props: {
    url: {
      type: String,
    },
    label: {
      type: String,
    }
  },
  computed: {
    // Ссылка на картинку (полная)
    imageUrl() {
      return process.env.CDN_URL + this.url
    }
  },
  methods: {
    // Загрузить (кнопка)
    uploadHandle() {
      this.$refs.input.click();
    },

    // Загрузить фото
    async uploadFile(file) {
      const rawBase64 = await fileToBase64(file);
      this.$emit("upload", {
        name: file.name,
        buffer: rawBase64.split(",")[1]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  width: 100%;

  &__title {
    font-size: 18px;
    font-weight: 700;
    margin: 15px 0 10px;
  }

  &__view {
    width: 100%;
    background-position: center;
    background-size: contain;
    img {width: 100%}
  }
}
</style>
