<template>
  <div class="article-create">
    <el-card>
      <el-input
      class="title-input"
      placeholder="请输入文章标题"
      v-model="title"
      maxlength="20"
      clearable
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Markdown" name="markdown">
          <Markdown :title="title" @onSuccess="onSuccess" />
        </el-tab-pane>

        <el-tab-pane label="富文本" name="editor">
          <Editor :title="title" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
  </div>
</template>

<script setup>
import Editor from '../components/Editor.vue';
import Markdown from '../components/Markdown.vue';
import { ref } from 'vue';

const title = ref('');
const activeName = ref('markdown');
const onSuccess = () => {
  title.value = ''
}
</script>

<style scoped>
.title-input {
  margin-bottom: 10px;
}
</style>