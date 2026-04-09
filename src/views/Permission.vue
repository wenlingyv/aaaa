<template>
  <div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>权限名称</th>
            <th>权限标识</th>
            <th>描述</th>
            <th>父级ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td><code>{{ item.key }}</code></td>
            <td>{{ item.desc }}</td>
            <td>{{ item.parentId || '—' }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="list.length === 0" class="empty"><p>暂无权限数据</p></div>
    </div>

    <div class="toast" :class="{ show: toastShow }">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const list = ref([]);

const toastShow = ref(false);
const toastMsg = ref("");
const toast = (msg) => {
  toastMsg.value = msg;
  toastShow.value = true;
  setTimeout(() => (toastShow.value = false), 1800);
};

const fetchList = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/permission/list");
    const data = await res.json();
    if (data.code === 200) {
      list.value = data.list;
    }
  } catch (err) {
    console.log("获取权限列表失败", err);
  }
};

onMounted(() => {
  fetchList();
});
</script>

<style scoped>
.table-container {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  margin: 0 20px 20px;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th,
.data-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}
.data-table tbody tr:hover {
  background: var(--hover);
}
code {
  background: #f1f1f1;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
.dark code {
  background: #2d2d44;
}
.empty {
  text-align: center;
  padding: 40px;
  color: var(--text-light);
}
.toast {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translate(-50%, -20px);
  background: var(--primary);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  opacity: 0;
  z-index: 9999;
  transition: all 0.3s;
}
.toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>