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
    <!-- 对话框-分配权限 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
        <!-- 每个节点唯一标识，值来源于 -->
  <el-tree
  ref="treeDom"
  :data="treedata"
  show-checkbox
  node-key="id"
  default-expanded-all
  :default-checked-keys="arrCheck"
  :props="defaultProps">
</el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRights()">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</template>
<script>

export default {
  data () {
    return {
      roles: [],
      dialogFormVisible: false,
      //   树形结构绑定的数据
      treedata: [],
      //   默认展开的数据【被展开的节点的id】
      //   arrExpand: [],
      //   默认选中的数据【被选中的节点的id】
      arrCheck: [],
      //  配置选项
      defaultProps: {
        //   lable和children值来源于树形结构绑定的数据treedata中的key名，
        label: 'authName',
        children: 'children'
      },
      currRoleId: -1
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    // 分配权限
    async setRights () {
      const arr1 = this.$refs.treeDom.getCheckedKeys()
      // 获取树形结构中半选id
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys()
      // console.log(arr2);
      // ES6 展开操作运算符
      const arr = [...arr1, ...arr2]
      // 发送请求
      // roles/:roleId/rights
      // roleId当前角色id
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(',')
      })
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.dialogFormVisible = false
        this.getRoles()
      }
    },
    // 取消权限
    async deleRights (role, rights) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rights.id}`)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        // 提示哦
        this.$message.success(msg)
        // 更新
        // this.getRoles()
        // 只更新当前角色权限
        role.children = data
      }
    },
    async showDiaSetRights (role) {
      this.currRoleId = role.id
      // 获取所有权
      const res = await this.$http.get(`rights/tree`)

      //   console.log(res)
      const {meta: {status}, data} = res.data
      if (status === 200) {
        this.treedata = data
      }
      //   获取当前角色有的权限
      const temp = []
      role.children.forEach(item1 => {
        // temp.push(item1.id)
        item1.children.forEach(item2 => {
          // temp.push(item2.id)
          item2.children.forEach(item3 => {
            temp.push(item3.id)
          })
        })
      })
      this.arrCheck = temp
      this.dialogFormVisible = true
    },
    async getRoles () {
      const res = await this.$http.get(`roles`)
      this.roles = res.data.data
    //   console.log(this.roles)
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
