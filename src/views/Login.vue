<template>
  <!-- 登录页面 -->
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">用户登录</h2>

      <van-field v-model="name" placeholder="请输入用户名" class="input" />
      <van-field v-model="password" type="password" placeholder="请输入密码" class="input" />

      <div class="forget-text" @click="showStep1 = true">
        忘记密码？
      </div>

      <el-button type="primary" class="login-btn" @click="login">
        登录
      </el-button>
    </div>
  </div>

  <!-- 第一步：验证手机号 + 验证码 -->
  <el-dialog v-model="showStep1" title="找回密码（验证身份）" width="420px" center class="custom-dialog">
    <div class="forget-box">
      <van-field v-model="phone" type="tel" placeholder="请输入手机号" class="input" />
      
      <div class="code-row">
        <van-field v-model="yzm" type="tel" placeholder="请输入验证码" class="code-input" />
        <van-button size="small" type="primary" @click="sendCode" v-if="isyzm == 0" class="code-btn">
          发送验证码
        </van-button>
        <span v-else class="code-tip">{{ time }}秒后重新发送</span>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeStep1">取消</el-button>
        <el-button type="primary" @click="checkCode">下一步</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 第二步：设置新密码 -->
  <el-dialog v-model="showStep2" title="重置新密码" width="420px" center class="custom-dialog">
    <div class="forget-box">
      <van-field v-model="newPwd" type="password" placeholder="请输入新密码" class="input" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeStep2">取消</el-button>
        <el-button type="primary" @click="resetPwd">确认重置</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { showNotify } from 'vant';
const router = useRouter();

// 登录
const name = ref("");
const password = ref("");

// 第一步：验证手机验证码
const showStep1 = ref(false);
const phone = ref("");
const yzm = ref("");
const isyzm = ref(0);
const time = ref(60);
let timer = null;

// 第二步：重置新密码
const showStep2 = ref(false);
const newPwd = ref("");

// 发送验证码
const sendCode = async () => {
  if (!/^1[3456789]\d{9}$/.test(phone.value)) {
    showNotify({ type: "danger", message: "手机号格式错误" });
    return;
  }

  try {
    let res = await axios.post("http://localhost:3000/sendSms", {
      phone: phone.value
    });

    if (res.data.code === 200) {
      showNotify({ type: "success", message: "验证码发送成功！" });
      isyzm.value = 1;
      timer = setInterval(() => {
        time.value--;
        if (time.value <= 0) {
          clearInterval(timer);
          time.value = 60;
          isyzm.value = 0;
        }
      }, 1000);
    } else {
      showNotify({ type: "danger", message: res.data.msg });
    }
  } catch (err) {
    showNotify({ type: "danger", message: "发送失败" });
  }
};

// 验证验证码（下一步）
const checkCode = async () => {
  if (!phone.value || !yzm.value) {
    alert("请输入手机号和验证码");
    return;
  }
  try {
    let res = await axios.post("http://localhost:3000/checkCode", {
      phone: phone.value,
      code: yzm.value
    });
    if (res.data.code === 200) {
      showStep1.value = false;
      setTimeout(() => {
        showStep2.value = true;
      }, 300);
    } else {
      alert(res.data.msg);
    }
  } catch (err) {
    alert("验证失败");
  }
};

// 重置密码
const resetPwd = async () => {
  if (!newPwd.value) {
    alert("请输入新密码");
    return;
  }
  try {
    let res = await axios.post("http://localhost:3000/resetPwd", {
      phone: phone.value,
      newPwd: newPwd.value
    });
    if (res.data.code === 200) {
      alert("重置成功！");
      showStep2.value = false;
      phone.value = "";
      yzm.value = "";
      newPwd.value = "";
    } else {
      alert(res.data.msg);
    }
  } catch (err) {
    alert("重置失败");
  }
};

// 关闭第一步
const closeStep1 = () => {
  showStep1.value = false;
  phone.value = "";
  yzm.value = "";
};

// 关闭第二步
const closeStep2 = () => {
  showStep2.value = false;
  newPwd.value = "";
};

// 登录
const login = async () => {
  if (!name.value || !password.value) {
    alert("请输入用户名和密码");
    return;
  }

  try {
    let res = await axios.post("http://localhost:3000/login", {
      username: name.value,
      password: password.value,
    });

    if (res.data.code == 200) {
      alert("登录成功");
      localStorage.setItem("token", res.data.token);
      router.push("/home");
    } else {
      alert(res.data.msg);
    }
  } catch (error) {
    alert("服务器连接失败");
  }
};
</script>

<style scoped>
/* 动态渐变背景 */
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1e2a3a 0%, #2c3e50 40%, #3a70f5 150%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: bgMove 15s linear infinite alternate;
}

/* 背景缓慢动效 */
@keyframes bgMove {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}

/* 高级卡片 */
.login-card {
  width: 420px;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  animation: cardFade 0.8s ease forwards;
}

@keyframes cardFade {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  color: #fff;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
}

/* 输入框美化 */
.input {
  --van-field-background-color: rgba(255, 255, 255, 0.1);
  --van-field-text-color: #fff;
  --van-field-placeholder-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  height: 50px;
  transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.1);
}

.input:focus-within {
  border-color: #3a70f5;
  box-shadow: 0 0 12px #3a70f566;
}

/* 忘记密码 */
.forget-text {
  color: #6ba6ff;
  font-size: 14px;
  text-align: right;
  cursor: pointer;
  transition: color 0.2s;
}

.forget-text:hover {
  color: #fff;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(90deg, #3a70f5, #4d8cff) !important;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(58, 112, 245, 0.4);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(58, 112, 245, 0.6);
}

/* 弹窗样式 */
:deep(.custom-dialog .el-dialog__header) {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.forget-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.code-btn {
  height: 44px;
  border-radius: 8px;
}

.code-tip {
  color: #888;
  font-size: 14px;
}

.dialog-footer {
  text-align: right;
  padding-top: 10px;
}
</style>