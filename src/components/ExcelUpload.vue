<template>
  <el-dialog
    v-model="dialogVisible"
    title="Excel导入"
    width="500px"
    @close="handleClose"
  >
    <!-- 拖拽上传区域 -->
     <!--@dragover="handleDragOver"   // 拖拽悬停
    @dragleave="handleDragLeave" // 离开拖拽区域
    @drop="handleDrop"           // 放下文件  -->
    <div 
      class="excel-upload-area"
      :class="{ 'drag-active': dragActive }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
    <!-- 属性 作用 action="#" 不自动上传到服务器
      :auto-upload="false" 禁用自动上传，手动处理文件 
      accept=".xlsx,.xls" 只接受 Excel 文件格式 -->
      <el-upload
        class="excel-upload"
        action="#" 
        :auto-upload="false"
        :on-change="(file) => handleFileUpload(file.raw)"
        :show-file-list="false"
        accept=".xlsx,.xls"
      >
        <div class="upload-content">
          <el-icon class="upload-icon"><Upload /></el-icon>
          <div class="upload-text">
            <p>{{ t('employee.importExcel') }}</p>
            <p class="upload-hint">点击或拖拽Excel文件到此处上传</p>
            <p class="file-name" v-if="uploadedFileName">{{ uploadedFileName }}</p>
          </div>
        </div>
      </el-upload>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ t('employee.cancel') }}</el-button>
        <el-button type="primary" @click="confirmImport">{{ t('employee.importExcel') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { ElMessage } from 'element-plus';
import { Upload } from '@element-plus/icons-vue';
import '../styles/yang/excel-upload.css';

const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'import-success']);

const dialogVisible = ref(props.visible);
const excelData = ref([]);
const excelHeaders = ref([]);
const dragActive = ref(false);
const uploadedFileName = ref('');

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal) {// 重置状态
    resetState();
  }
});
// 监听dialogVisible变化
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});
// 重置状态
const resetState = () => {
  excelData.value = [];
  excelHeaders.value = [];
  uploadedFileName.value = '';
  dragActive.value = false;
};
// 处理关闭
const handleClose = () => {
  resetState();
  emit('update:visible', false);
};
// 处理文件上传
const handleFileUpload = (file) => {
  if (!file) return;
    // ② 文件类型校验
  const isValidType = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
  if (!isValidType) {
    ElMessage.error('请上传Excel文件(.xlsx或.xls)');
    return;
  }
    // ③ 记录文件名，开始解析
  uploadedFileName.value = file.name;
  parseExcel(file);
};

// 解析Excel文件
const parseExcel = (file) => {
  const reader = new FileReader();
  // 创建文件读取器
  reader.onload = (e) => {
    // 读取成功后的回调
    // e.target.result 就是文件内容
    try {
      // ① 获取文件二进制数据
      const arrayBuffer = e.target.result;
      // ② 读取工作簿
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
       // ③ 获取第一个工作表
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        // ④ 转换为二维数组
      const allRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      
      if (allRows.length === 0) {
        ElMessage.warning('Excel文件为空');
        return;
      }
         // ⑤ 分离表头和数据
      excelHeaders.value = allRows[0];
      excelData.value = allRows.slice(1).filter(row => row.length > 0);
      ElMessage.success(`解析成功，共${excelData.value.length}条数据`);// 其余是数据
      
    } catch (error) {
      console.error('解析失败:', error);
      ElMessage.error('解析Excel失败，请检查文件格式');
    }
  };
  // 以 ArrayBuffer 格式读取
  reader.readAsArrayBuffer(file);
};

// 1. 文件拖入区域时触发
const handleDragOver = (e) => {
  e.preventDefault();
  // 阻止浏览器默认打开文件行为
  dragActive.value = true;
  // 添加高亮样式
};
// 2. 文件离开区域时触发
const handleDragLeave = () => {
  dragActive.value = false;
  // 移除高亮样式
};
// 3. 文件放下时触发
const handleDrop = (e) => {
  e.preventDefault();
  // 阻止浏览器默认打开文件行为
  dragActive.value = false;
   // 移除高亮样式
  const files = e.dataTransfer.files;
  //获取拖拽的文件列表
  if (files.length > 0) {
    handleFileUpload(files[0]);
    // 处理第一个文件
  }
};
// 确认导入
const confirmImport = () => {
  if (excelData.value.length === 0) {
    ElMessage.warning('没有可导入的数据');
    return;
  }
  
  const usersToImport = excelData.value.map(row => {
    const user = {};
    excelHeaders.value.forEach((header, index) => {
      user[header] = row[index];
    });
    return user;
  });
  
  emit('import-success', usersToImport);
  dialogVisible.value = false;
};
</script>