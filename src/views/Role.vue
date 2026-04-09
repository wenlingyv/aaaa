<template>
  <div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in roleList" :key="item.id">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.desc }}</td>
            <td>
              <button class="btn btn-small btn-blue" @click="openAssignModal(item)">
                分配权限
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="roleList.length === 0" class="empty"><p>暂无角色数据</p></div>
    </div>

    <!-- 分配权限弹窗 -->
    <div class="modal" v-show="assignModal">
      <div class="modal-mask" @click="closeAssignModal"></div>
      <div class="modal-box permission-modal">
        <h3>分配权限</h3>
        <div class="permission-tree">
          <PermissionItem
            v-for="permission in rootPermissions"
            :key="permission.id"
            :permission="permission"
            v-model="selectedPermissionIds"
            :allPermissions="permissionList"
          />
        </div>
        <div class="btns">
          <button class="btn btn-purple" @click="closeAssignModal">取消</button>
          <button class="btn btn-blue" @click="submitAssign">确定</button>
        </div>
      </div>
    </div>

    <div class="toast" :class="{ show: toastShow }">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent, h } from 'vue'

const roleList = ref([])
const permissionList = ref([])
const assignModal = ref(false)
const currentRole = ref(null)
const selectedPermissionIds = ref([])

const toastShow = ref(false)
const toastMsg = ref('')
const toast = (msg) => {
  toastMsg.value = msg
  toastShow.value = true
  setTimeout(() => (toastShow.value = false), 1800)
}

// 递归子组件：权限树（含父子联动）
const PermissionItem = defineComponent({
  props: {
    permission: { type: Object, required: true },
    modelValue: { type: Array, required: true },
    allPermissions: { type: Array, required: true }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {

    // 获取当前权限的子权限
    const children = computed(() => 
      props.allPermissions.filter(p => p.parentId === props.permission.id)
    )

    // 当前权限是否被选中
    const isChecked = computed({
      get: () => props.modelValue.includes(props.permission.id),
      set: (val) => {
        let newIds = [...props.modelValue]

        // 递归获取：自己 + 所有子子孙孙权限ID
        const getAllChildrenAndSelf = (pid) => {
          // 1. 先把【自己】放进数组
          const list = [pid]
          // 2. 从所有权限中，找出【当前ID的直接子权限】
          const childs = props.allPermissions.filter(p => p.parentId === pid)
          // 3. 遍历每一个子权限
          childs.forEach(c => {
          // 4. 递归！把子权限的所有后代也查出来，合并到 list 里
            list.push(...getAllChildrenAndSelf(c.id))
          })
          // 5. 返回最终结果：自己 + 所有子孙
          return list
        }

        const allIds = getAllChildrenAndSelf(props.permission.id)

        if (val) {
          // 勾选：自己 + 所有子权限 全部选中
          allIds.forEach(id => {
            if (!newIds.includes(id)) newIds.push(id)
          })
        } else {
          // 取消勾选：自己 + 所有子权限 全部取消
          newIds = newIds.filter(id => !allIds.includes(id))
        }

        emit('update:modelValue', newIds)
      }
    })

    // 子权限全选时，自动勾选父权限
    const updateParent = () => {
      const checkParent = (pid) => {
        const parent = props.allPermissions.find(p => p.id === pid)
        if (!parent || !parent.parentId) return
        const siblings = props.allPermissions.filter(p => p.parentId === parent.parentId)
        const allChecked = siblings.every(s => props.modelValue.includes(s.id))
        const newIds = [...props.modelValue]
        if (allChecked && !newIds.includes(parent.parentId)) {
          newIds.push(parent.parentId)
          emit('update:modelValue', newIds)
          checkParent(parent.parentId)
        }
      }
      checkParent(props.permission.id)
    }

    const handleChildChange = () => {
      updateParent()
    }

    return {
      children,
      isChecked,
      handleChildChange
    }
  },
  render() {
    return h('div', { class: 'permission-item' }, [
      h('label', [
        h('input', {
          type: 'checkbox',
          checked: this.isChecked,
          onInput: e => {
            this.isChecked = e.target.checked
            this.handleChildChange()
          }
        }),
        this.permission.name
      ]),
      this.children.length > 0 ? h('div', { class: 'children' }, 
        this.children.map(child => 
          h(PermissionItem, {
            key: child.id,
            permission: child,
            modelValue: this.modelValue,
            allPermissions: this.allPermissions,
            'onUpdate:modelValue': val => this.$emit('update:modelValue', val)
          })
        )
      ) : null
    ])
  }
})

// 根权限（parentId 为 null）
const rootPermissions = computed(() => {
  return permissionList.value.filter(p => !p.parentId)
})

// 获取角色列表
const fetchRoleList = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/role/list')
    const data = await res.json()
    if (data.code === 200) roleList.value = data.list
  } catch (err) {
    console.log('获取角色失败', err)
  }
}

// 获取权限列表
const fetchPermissionList = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/permission/list')
    const data = await res.json()
    if (data.code === 200) permissionList.value = data.list
  } catch (err) {
    console.log('获取权限失败', err)
  }
}

// 打开分配弹窗
const openAssignModal = async (role) => {
  currentRole.value = role
  try {
    const res = await fetch(
      `http://localhost:3000/api/role/permissions?roleId=${role.id}`
    )
    const data = await res.json()
    if (data.code === 200) {
      selectedPermissionIds.value = data.permissions.map((p) => p.id)
    }
  } catch (err) {}
  assignModal.value = true
}

const closeAssignModal = () => {
  assignModal.value = false
}

// 提交分配
const submitAssign = async () => {
  if (!currentRole.value) return
  try {
    const res = await fetch('http://localhost:3000/api/role/assignPermission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roleId: currentRole.value.id,
        permissionIds: selectedPermissionIds.value,
      }),
    })
    const data = await res.json()
    if (data.code === 200) {
      toast('分配成功')
      closeAssignModal()
    } else {
      toast(data.msg || '分配失败')
    }
  } catch (err) {
    toast('分配失败')
  }
}

onMounted(() => {
  fetchRoleList()
  fetchPermissionList()
})
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
.empty {
  text-align: center;
  padding: 40px;
  color: var(--text-light);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
.btn-blue {
  background: var(--primary);
}
.btn-purple {
  background: var(--purple);
}
.btn-small {
  padding: 4px 10px;
  font-size: 13px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.modal-box {
  position: relative;
  background: var(--card-bg);
  padding: 30px;
  border-radius: 12px;
}
.permission-modal {
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}
.permission-item {
  margin: 8px 0;
}
.children {
  padding-left: 24px;
  margin: 4px 0 12px;
}
.btns {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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