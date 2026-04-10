<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
     <div id="markdown-box">

     </div>
    <!-- 按钮 -->
     <div class="bottom">
      <el-button type="primary"
      @click="onSubmitClick"
      >发布</el-button>
     </div>
  </div>
</template>

<script setup>
import {onMounted, ref, defineProps, defineEmits} from 'vue'
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import axios from 'axios'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['onSuccess'])

let mkEditor
let el
onMounted(() => {
  el = document.getElementById('markdown-box')
  initEditor()
})
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    initialEditType: 'markdown',
    initialPreviewType: 'default',
    previewStyle: 'vertical',
    height: '500px',
    i18n: 'zh-cn',
  })
  mkEditor.getMarkdown()
}
const onSubmitClick = async() => {
  await axios.post('http://localhost:3000/add', {
    title: props.title,
    content: mkEditor.getHTML(),
  })
  mkEditor.reset()
  alert('发布成功')
  emit('onSuccess')
}



</script>

<style scoped>
.markdown-container .bottom{
    margin-top:20px;
    text-align: right;
}
</style>