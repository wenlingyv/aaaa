<template>
  <el-button 
    :type="type" 
    :size="size"
    @click="handleExport" 
    :loading="loading"
  >
  <!-- :loading="loading" 导出时显示加载状态 -->
    <el-icon v-if="icon"><Download /></el-icon> {{ text }}
  </el-button>
  <!-- <Download /> 图标是一个视觉元素，用于增强导出按钮的可识别性，让用户一眼就能知道这是一个下载/导出功能的按钮。 -->
</template>

<script setup>
import { ref, defineProps } from 'vue';
import * as XLSX from 'xlsx';
import { ElMessage } from 'element-plus';
import { Download } from '@element-plus/icons-vue';

const props = defineProps({
  // 要导出的数据
  data: {
    type: Array,
    required: true
  },
  // 导出的文件名前缀
  fileName: {
    type: String,
    default: '导出数据'
  },
  // 工作表名称
  sheetName: {
    type: String,
    default: '数据'
  },
  // 按钮类型
  type: {
    type: String,
    default: 'warning'
  },
  // 按钮大小
  size: {
    type: String,
    default: 'small'
  },
  // 按钮文本
  text: {
    type: String,
    default: '导出Excel'
  },
  // 是否显示图标
  icon: {
    type: Boolean,
    default: true
  },
  // 导出字段映射
  fields: {   //它是一个「中英文对照映射表」，作用是：把后端返回的英文字段 → 转换成 Excel 里的中文表头。
    type: Object,
    default: () => ({
      '姓名': 'username',
      '联系方式': 'phone',
      '头像': 'avatar',
      '角色': 'roles',
      '状态': 'status',
      '开通时间': 'createdAt'
    })
  }
});
const loading = ref(false);
// 处理导出
const handleExport = async () => {
  loading.value = true;
  try {
    // 准备导出数据
    const exportData = props.data.map(item => {
      const row = {};//用来存放一行 Excel 数据
      Object.entries(props.fields).forEach(([key, value]) => {//key → Excel 中文表头（姓名、联系方式…） value → 后端英文字段（username、phone…）
        let fieldValue = item[value];//根据英文字段，从数据里拿出对应的值，例子：value = 'username' item[value] = 张三
        // 处理特殊字段
        if (Array.isArray(fieldValue)) { //判断如果值是数组（把数组转成逗号分隔的字符串） ['管理员', '会员'] → "管理员,会员"
          fieldValue = fieldValue.join(',');
        }
        row[key] = fieldValue;//把值赋给中文表头
      });
      return row;//，生成 Excel 可以直接导出的规范数据。
    });

    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 创建工作表
    const ws = XLSX.utils.json_to_sheet(exportData);
    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, props.sheetName);
    // 生成Excel文件并下载
                      //文件名前缀        //当前日期事件，T分割字符串，取第3项，日期部分，如2026-04-03 
    const fileName = `${props.fileName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    //XLSX.writeFile 是 xlsx 库的核心方法，作用是将生成的 Excel 工作簿（wb）写入为文件，并触发浏览器自动下载
    ElMessage.success('Excel导出成功');
  } catch (error) {
    console.error('导出Excel失败:', error);
    ElMessage.error('导出Excel失败');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* 组件样式 */
</style>