<template>
  <div class="page">
    <div class="page-header">
      <h1>员工管理</h1>
      <div class="header-actions">
        <!-- 导入按钮 -->
        <el-button type="primary" @click="showImportDialog = true">
          <el-icon><Upload /></el-icon> 导入Excel
        </el-button>
        <!-- 导出按钮 -->
        <ExcelExport 
          :data="employees" 
          :fileName="'员工数据'" 
          :fields="exportFields"
        />
      </div>
    </div>
    
    <!-- 员工列表 -->
    <el-table :data="employees" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180" />
      <el-table-column prop="phone" label="联系方式" width="180" />
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-image 
            :src="scope.row.avatar" 
            fit="cover" 
            style="width: 40px; height: 40px; border-radius: 50%" 
          />
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色">
        <template #default="scope">
          {{ Array.isArray(scope.row.roles) ? scope.row.roles.join(',') : scope.row.roles }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="createdAt" label="开通时间" width="200" />
    </el-table>
    
    <!-- 导入对话框 -->
    <ExcelUpload 
      v-model:visible="showImportDialog" 
      @import-success="handleImportSuccess" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Upload } from '@element-plus/icons-vue';
import ExcelUpload from '../components/ExcelUpload.vue';
import ExcelExport from '../components/ExcelExport.vue';

// 模拟员工数据
const employees = ref([
  {
    username: '张三',
    phone: '13800138001',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    roles: ['管理员', '员工'],
    status: '启用',
    createdAt: '2026-01-01'
  },
  {
    username: '李四',
    phone: '13900139001',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    roles: ['员工'],
    status: '启用',
    createdAt: '2026-01-02'
  },
  {
    username: '王五',
    phone: '13700137001',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    roles: ['员工'],
    status: '禁用',
    createdAt: '2026-01-03'
  }
]);

// 导出字段映射
const exportFields = {
  '姓名': 'username',
  '联系方式': 'phone',
  '头像': 'avatar',
  '角色': 'roles',
  '状态': 'status',
  '开通时间': 'createdAt'
};

// 导入对话框状态
const showImportDialog = ref(false);

// 处理导入成功
const handleImportSuccess = (importedData) => {
  // 处理导入的数据，这里简单地添加到员工列表中
  importedData.forEach(item => {
    // 转换角色字段为数组
    if (item['角色'] && typeof item['角色'] === 'string') {
      item.roles = item['角色'].split(',');
    }
    // 构建员工对象
    const newEmployee = {
      username: item['姓名'] || '',
      phone: item['联系方式'] || '',
      avatar: item['头像'] || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      roles: item.roles || ['员工'],
      status: item['状态'] || '启用',
      createdAt: item['开通时间'] || new Date().toISOString().split('T')[0]
    };
    employees.value.push(newEmployee);
  });
  ElMessage.success(`成功导入 ${importedData.length} 条员工数据`);
};
</script>

<style scoped>
.page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 22px;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

/* 调整表格样式 */
el-table {
  margin-top: 20px;
}
</style>