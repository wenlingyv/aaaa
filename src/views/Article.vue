
<template>
  <div class="article-management">
    
    <div class="page-header">
      <h2>文章排名</h2>
    </div>
    
    <!-- 动态展示区域 -->
    <div class="dynamic-display">
      <el-checkbox-group v-model="selectedColumns">
        <el-checkbox label="rank" value="rank">排名</el-checkbox>
        <el-checkbox label="title" value="title">标题</el-checkbox>
        <el-checkbox label="author" value="author">作者</el-checkbox>
        <el-checkbox label="publishTime" value="publishTime">发布时间</el-checkbox>
        <el-checkbox label="content" value="content">内容简介</el-checkbox>
        <el-checkbox label="operation" value="operation">操作</el-checkbox>
      </el-checkbox-group>
    </div>
    
    <!-- 文章列表表格 -->
    <el-table :data="articles" style="width: 100%" border>
      <el-table-column prop="rank" label="排名" width="80" v-if="selectedColumns.includes('rank')" />
      <el-table-column prop="title" label="标题" min-width="200" v-if="selectedColumns.includes('title')" />
      <el-table-column prop="author" label="作者" width="120" v-if="selectedColumns.includes('author')" />
      <el-table-column prop="publishTime" label="发布时间" width="150" v-if="selectedColumns.includes('publishTime')" />
      <el-table-column label="内容简介" min-width="300" v-if="selectedColumns.includes('content')" >
        <template #default="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" v-if="selectedColumns.includes('operation')">
        <template #default="scope">
          <div class="operation-buttons">
            <el-button size="small" type="primary" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination">
      <div class="total-info">
        Total {{ total }} / {{ Math.ceil(total / pageSize) }}page
      </div>
      <el-pagination
        layout="prev, pager, next, jumper, sizes"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import Sortable from 'sortablejs';
import axios from 'axios';

// 语言store

// 模拟文章数据
const mockArticles = ref([]);

// 文章数据
const articles = ref([]);

// 分页数据
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);

// 动态展示列
const selectedColumns = ref(['rank', 'title', 'author', 'publishTime', 'content', 'operation']);

// 加载文章列表
const loadArticles = async() => {
  // 模拟分页
  let res=await axios.get('http://localhost:3000/mockArticlesList?currentPage='+currentPage.value+'&pageSize='+pageSize.value);
  articles.value=res.data.rows;
  total.value=res.data.count;
};

// 组件挂载时加载文章列表
onMounted(() => {
  loadArticles();
  
  // 初始化拖拽排序
  nextTick(() => {
    initSortable();
  });
});

const initSortable = () => {
  const tableBody = document.querySelector('.el-table__body-wrapper tbody');
  if (!tableBody) return;

  Sortable.create(tableBody, {
    animation: 150,
    handle: '.el-table__row',
    ghostClass: 'sortable-ghost',
    onEnd: async (evt) => {
      const { oldIndex, newIndex } = evt;
      // 1. 位置未变，直接返回
      if (oldIndex === newIndex) return;
      // 2. 前端先更新数组顺序（保证页面即时响应）
      const movedItem = articles.value.splice(oldIndex, 1)[0];
      articles.value.splice(newIndex, 0, movedItem);
      // 3. 重新计算所有文章的 rank（全局唯一，保证跨页排序正确）
      // 注意：如果是单页排序，用 index + 1；如果是全局排序，需计算全局 rank
      articles.value.forEach((article, index) => {
        // 全局 rank 计算方式（推荐）：当前页偏移量 + 索引 + 1
        article.rank = (currentPage.value - 1) * pageSize.value + index + 1;
        // 单页排序：article.rank = index + 1
      });
      // 4. 调用后端接口，批量更新排序（核心！持久化）
        await axios.patch('http://localhost:3000/updateArticleRank', {
          articles: articles.value.map(item => ({
            id: item.id,
            rank: item.rank
          }))
        });
        ElMessage.success('排序保存成功');
        //重中之重
        articles.value=[]
        // 重新加载文章列表
        loadArticles();
    }
  });
};



const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
  loadArticles();
  
  // 重新初始化拖拽排序
  nextTick(() => {
    initSortable();
  });
};

const handleCurrentChange = (current) => {
  currentPage.value = current;
  loadArticles();
  
  // 重新初始化拖拽排序
  nextTick(() => {
    initSortable();
  });
};

// 处理查看
const handleView = (row) => {
  ElMessage.info(`查看文章: ${row.title}`);
};

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除文章 "${row.title}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = mockArticles.value.findIndex(article => article.id === row.id);
    if (index !== -1) {
      mockArticles.value.splice(index, 1);
      loadArticles();
      ElMessage.success('删除成功');
    }
  }).catch(() => {
    // 取消删除
  });
};
</script>

<style scoped>
.article-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.el-breadcrumb {
  margin-bottom: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.dynamic-display {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.dynamic-display .el-checkbox-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.dynamic-display .el-checkbox {
  margin-right: 0;
}

.el-table {
  margin-bottom: 20px;
}

.el-table__row {
  cursor: move;
}

.operation-buttons {
  display: flex;
  gap: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-info {
  font-size: 14px;
  color: #606266;
}

/* 拖拽排序样式 */
:deep(.el-table__row:hover) {
  background-color: #f5f7fa;
}

:deep(.sortable-ghost) {
  opacity: 0.5;
  background: #f0f9eb;
}

:deep(.sortable-chosen) {
  background: #ecf5ff;
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff;
  background: #304156;
}
</style>
