<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
            type="password"
          ></el-input>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="onLogin()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
        <br />
        <!-- 记住密码 -->
        <el-checkbox :checked="loginForm.remember">记住密码</el-checkbox>
      </el-form>
    </div>
  </div>
</template>

<script>
// import func from "../../vue-temp/vue-editor-bridge";
import JSEncrypt from "jsencrypt";
export default {
  name: "Login",
  data() {
    return {
      //公钥：
      publicKey: undefined,
      // 数据绑定对象
      loginForm: {
        username: "",
        password: "",
        remember: false,
      },
      // 验证规则对象
      loginFormRules: {
        //验证用户
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.$cookies.get("userMsgCookies")) {
      var data = JSON.parse(this.$cookies.get("userMsgCookies"));
      if (data.remember) {
        this.loginForm.username = data.name;
        this.loginForm.password = data.password;
        this.loginForm.remember = true;
      }
      console.log(data);
    }
  },
  methods: {
    //加密的方法
    encryptedData(publicKey, data) {
      this.encrypt = new JSEncrypt();
      this.encrypt.setPublicKey(publicKey);
      return this.encrypt.encrypt(data);
    },
    // 请求公钥
    loginFormt() {
      // let jse = new JSEncrypt();
      return new Promise((resolve, reject) => {
        //获取接口号：
        this.$axios
          .get("https://dtc-cdsv-test.zcloud.ac.cn/api/cdsv/publickey")
          .then((res) => {
            //返回判断：
            if (res.data.code == 0) {
              console.log(res.data);
              //调用加密的方法，将密码加密：
              this.loginForm.password = this.encryptedData(
                res.data.data,
                this.loginForm.password
              );
              //获取公钥：
              this.publicKey = res.data.data;
              //输出公钥：
              console.log(this.loginForm);
            }
            //成功之后的回调函数
            resolve();
          })
          .catch((err) => {
            alert(err);
            //失败之后的回调函数：
            reject();
          });
      });
    },
    //确保可以输入账号密码:
    resetLoginForm() {},
    //登陆按钮：
    onLogin() {
      this.loginFormt().then(() => {
        //上传请求:
        this.$axios
          .post("https://dtc-cdsv-test.zcloud.ac.cn/api/cdsv/loginAccountPsw", {
            //分类上传，
            loginAccount: this.loginForm.username,
            loginType: "WEB",
            password: this.loginForm.password,
            publicKey: this.publicKey,
          })
          .then((res) => {
            console.log(res);
            //对返回值进行一个判断
            if (res.status === 200) {
              //强制转换，因为Cookies只能接受字符串：
              var str = JSON.stringify(this.loginForm);
              console.log(str);
              //设置Cookies：
              this.$cookies.set("userMsgCookies", "" + str, {
                //设置Cookies的保存时间：
                expires: 7,
                path: "/",
              });
              //成功登陆，跳转
              if (res.data.code == 0) {
                alert("登陆成功,欢迎" + this.loginForm.username);
                this.$router.push({ path: "/HelloWorld" });
              } else {
                console.log("error");
              }
            }
          })
          .catch((err) => {
            alert(err);
          });
      });
    },
    // //Cookie
    // suitmit(loginFromName){
    //   const self=this;
    //   //判断复选框有没有被选中
    //   if(self.checked==true){
    //     console.log("checked==true");
    //     self.setCookie=(self.loginForm.username,self.loginForm.password,7);
    //   }else{
    //     //清空Cookie
    //     console.log("Cookie被清空");
    //     self.clearCookie();
    //   }
    //   console.log("登陆成功")
    // },
    // //设置Cookie
    // setCookie(c_name,c_pwd,exdays){
    //   var exdate=new Date();//获取时间
    //   exdate,setTime(exdate.getTime()+24*60*60*1000*exdays);//保存天数
    //   //字符串拼接Cookie
    //   window.document.cookie="username"+c_name+";path=/;expires="+exdate.toGMTString();
    //   window.document.cookie="password"+c_pwd+";path=/;expires="+exdate.toGMTString();
    // },
    // //读取cookie
    // getCookie:function(){
    //   if(document.cookie.length>0){
    //     var arr=document.cookie.split(";");
    //     for (var i=0;i<arr.length;i++){
    //       var arr2=arr[i].split('=');
    //       //判断查找相对应的值
    //       if(arr2[0]=='username'){
    //         this.loginForm.username=arrr2[1];//保存到保存数据的地方
    //       }else if(arr2[0]=='password'){
    //         this.loginForm.password=arr2[1];
    //       }
    //     }
    //   }
    // },
    // //清除Cookie
    // clearCookie:function(){
    //   this.setCookie("","",-1);
    // }
  },

  components: {},
};
</script>
<!--加上scoped是将样式应用于此组件，不加是全局-->

<style lang="less" scoped>
</style>


