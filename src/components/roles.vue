<template>
    <el-card class="box">
        <!-- 面包屑 -->
<cus-bread level1="权限管理" level2="角色列表"></cus-bread>
<el-button class="btn" type="primary">添加角色</el-button>
<!-- 表格 -->
<el-table
      :data="roles"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="roleDese"
        label="角色描述"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="360"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button
            @click="showDiaSetRights(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>
<script>
export default {
    data(){
        return{
            roles: []
        }
    },
  created () {
    this.getRoles()
  },
  methods: {

    async getRoles () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.roles = res.data.data
    }
  }
}
</script>
<style>
.box{
    height: 100%;
}
.btn{
   margin-top: 20px;
}
</style>
