<template>

  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent="handlelogin()"
        class="login-btn"
        type="primary"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    async handlelogin () {
      const res = await this.$http.post(`login`, this.formdata)
      // console.log(res)
      const {
        data: {
          data: {token},
          meta: { msg, status }
        }
      } = res

      if (status === 200) {
        localStorage.setItem('token', token)
        this.$router.push({
          name: 'home'
        })
      } else {
        // 用户名、密码错误
        this.$message.error(msg)
      }
      // .then(res => {
      //   console.log(res)
      //   const {
      //     data: {
      //       data,
      //       meta: { msg, status }
      //     }
      //   } = res
      // if (status === 200) {
      //   this.$router.push({
      //     name: 'home'
      //   })
      // } else {
      //   // 用户名、密码错误
      //    this.$message.error(msg)
      // }

      // eg
      // const {per} = {per:"abc"}
      // console.log(per)
      // const {name:newname} = {name:'abc'}
      // console.log(newname);
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  width: 400px;
  background-repeat: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>
