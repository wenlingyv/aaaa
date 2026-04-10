<template>
  <div>
    <div class="editor-container">
    <!-- 渲染区 -->
     <div id="editor-box">

     </div>
    <!-- 按钮 -->
     <div class="bottom">
      <el-button type="primary"
      @click="onSubmitClick"
      >发布</el-button>
     </div>
  </div>
  </div>
</template>

<script setup>
import {ref,onMounted,defineProps,defineEmits} from 'vue'
import E from 'wangeditor'
import axios from 'axios'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['onSuccess'])

onMounted(()=>{
    el = document.getElementById('editor-box')
    initEditor()
})

//初始化 Editor 实例
let editor
let el
const initEditor = () => {
    editor = new E(el)
    editor.config.zIndex=1
    // 显示菜单提示
    editor.config.showMenuTooltips=true
    editor.config.menuTooltipPosition='down'
    editor.create()
}
const onSubmitClick = async() => {
  await axios.post('http://localhost:3000/add', {
    title: props.title,
    content: editor.txt.html(),
  })
  editor.txt.html('')
  alert('发布成功')
  emit('onSuccess')
}

</script>

<style scoped>
.editor-container .bottom{
    margin-top:20px;
    text-align: right;
}
</style>