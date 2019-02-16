<template>
  <!-- 小容器 -->
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchBox">
      <el-col>
        <el-input
        @clear="getAllUsers()"
         clearable
          class="searchInput"
          placeholder="请输入内容"
          v-model="query"
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="showDiaAddUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="#"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="140"
      >
      <!-- 过滤器fmtdate -->
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="200"
      >
      <template slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
      </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="120"
      >
      <template slot-scope="scope">
         <el-switch
    v-model="scope.row.mg_state"
    active-color="#13ce66"
    inactive-color="#ff4949"
    >
  </el-switch>
      </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
      <template>

  <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
  <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
  <el-button type="info" icon="el-icon-message" circle size="mini" plain></el-button>

      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 对话框 添加用户对话框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleAdd">
 <el-form label-position="left" label-width="80px" :model="formdata">
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formdata.email"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="formdata.mobile"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索关键字
      query: '',
      //   分页功能》接口支持分页
      pagenum: 1,
      pagesize: 2,
      total: -1,
      //   表格数据
      list: [],
      //   对话框数据
      dialogFormVisibleAdd: false,
      // 表单数据
      formdata: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    //   添加用户-显示对话框
    showDiaAddUser(){
        this.dialogFormVisibleAdd = true;
    },
    //   清空时获取所有用户
    getAllUser () {
      this.getTableData()
    },
    //   搜索用户
    searchUser () {
      this.pagenum = 1
      this.getTableData()
    },

    //   分页相关的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      //   根据新页码发送请求
      this.pagenum = val
      this.getTableData()
    },
    async getTableData () {
      // 设置请求头
      const AUTH_TOKEY = localStorage.getItem('token')
      console.log(AUTH_TOKEY)
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEY
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      console.log(res)
      const {
        data,
        meta: { status, msg }
      } = res.data
      if (status === 200) {
        this.total = data.total
        this.list = data.users
      }
    }
  }
}
</script>

<style>
.searchBox {
  margin-top: 20px;
}
.searchInput {
  width: 400px;
}
</style>
