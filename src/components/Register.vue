<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登陆页面</span>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="账号" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >登陆</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    return {
      registerUser: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          {
            //检验用户
            required: true,
            message: "用户不能为空",
            trigger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "长度要在6-30之间",
            trigger: true,
          },
          {
            min: 6,
            max: 30,
            message: "长度要在6-30之间",
            trigger: true,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.submit_btn {
  width: 100%;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
</style>