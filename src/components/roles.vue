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
     <el-table-column type="expand">
         <template slot-scope="scope">
            <!-- 行列 -->
            <el-row class="level1" v-for="item1 in scope.row.children" :key="item1.id">
                <el-col :span="4">
                    <el-tag @close="deleRights(scope.row,item1)" closable type="danger">
                        {{item1.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                </el-col>
                 <el-col :span="20">
                     <el-row class="level2" v-for="item2 in item1.children" :key="item2.id">
                         <el-col :span="4">
                             <el-tag @close="deleRights(scope.row,item2)" closable type="info">
                        {{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                         </el-col>
                         <el-col :span="20">
                              <el-tag @close="deleRights(scope.row,item3)" closable v-for="item3 in item2.children" :key="item3.id" type="warning">
                        {{item3.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                         </el-col>
                     </el-row>
                 </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length===0">
                <el-col>
                   <span>未分配权限</span> 
                </el-col>
            </el-row>
              </template>
          </el-table-column>
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
  data () {
    return {
      roles: []
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
        // 取消权限
        async deleRights(role,rights){
// 
const res = await this.$http.delete(`roles/${role.id}/rights/${rights.id}`)
const {meta:{msg,status},data} = res.data
if (status===200) {
// 提示哦
this.$message.success(msg)
// 更新
// this.getRoles()
// 只更新当前角色权限
role.children = data
}
        },
      showDiaSetRights() {},
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
.leveol1,level2{
    margin-bottom: 10px;
}
</style>
