<template>
    <el-card class="box">
  <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
   <el-alert class="alert" title="注意：只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
   <el-form class="form" label-position="left" lable-width="160px" :model="form">
       <el-form-item label="请选择商品分类">
            {{selectedOptions}}
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              :props="defaultProp"
            ></el-cascader>
          </el-form-item>
    </el-form>
    <el-tabs type="border-card" v-model="active">
  <el-tab-pane name="1" label="动态参数">
      <el-button disabled>设置动态参数</el-button>
     <el-table height="450px" border stripe :data="arrDy" style="width: 100%">
     <el-table-column type="expand" width="140">
         <template slot-scope="scope">
           <el-tag
  :key="i"
  v-for="(attr,i) in scope.row.attr_vals"
  closable
  :disable-transitions="false"
  @close="handleClose(scope.row,attr)">
  {{attr}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm(scope.row)"
  @blur="handleInputConfirm(scope.row)"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

             </template>
    </el-table-column>
      <el-table-column type="index" label="#" width="120"></el-table-column>

      <el-table-column prop="attr_name" label="属性名称" width="240"></el-table-column>

      <el-table-column label="操作" width="200">
        <template>
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
      </el-tab-pane>
   <el-tab-pane name="2" label="静态参数">
        <el-button disabled>设置静态参数</el-button>

        <el-table height="350px" border stripe :data="arrStatic" style="width: 100%">
          <el-table-column type="index" label="#" width="120"></el-table-column>

          <el-table-column prop="attr_name" label="属性名称" width="240"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="240"></el-table-column>

          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
    </el-table>
    </el-tab-pane>
</el-tabs>
    </el-card>
</template>
<script>
export default {
  data () {
    return {
      active: '1',
      form: {},
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id'

      },
      arrDy: [],
      arrStatic: [],
      // 动态tag编辑用的数据
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.getGoodsCate()
  },
  methods: {
    fn (row, expandedRows) {
      if (expandedRows.length > 1) {
        expandedRows.shift()
        // console.log(expandedRows);
      }
    },
    // 删除attr_Vals中的值
    async handleClose (item, attr) {
      item.attr_vals.splice(item.attr_vals.indexOf(attr), 1)

      const res = await this.$http.put(
        // 参数 attr_sel 类型必须为 only 或 many"  -> 接口文档更新了!->接口文档->不对X
        `categories/${this.selectedOptions[2]}/attributes/${item.attr_id}`,
        {
          attr_name: item.attr_name,
          attr_sel: 'many',
          attr_vals: item.attr_vals.join(',')
        }
      )
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加attr_vals的值
    async handleInputConfirm (item) {
      let inputValue = this.inputValue
      if (inputValue) {
        item.attr_vals.push(inputValue)
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${item.attr_id}`,
          {
            attr_name: item.attr_name,
            attr_sel: 'many',
            attr_vals: item.attr_vals.join(',')
          }
        )
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 级联选择器选中时
    handleChange () {
      this.getDyOrStatic()
    },
    changeTab () {
      this.getDyOrStatic()
    },
    // 获取动态/静态数据
    async getDyOrStatic () {
      // console.log("级联label改变----");
      if (this.selectedOptions.length !== 3) {
        this.$message.warning('请先选三级分类!')
        if (this.active === '1') {
          this.arrDy = []
        }
        if (this.active === '2') {
          this.arrStatic = []
        }
        return
      }
      if (this.active === '1') {
        // 获取动态数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        )
        // console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data
        if (status === 200) {
          this.arrDy = data
          // console.log("动态数据----");
          this.arrDy.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(',')
          })
        }
      }
      if (this.active === '2') {
        // 获取静态数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        )
        // console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data
        if (status === 200) {
          this.arrStatic = data
          // console.log("静态数据----");
          // console.log(this.arrStatic);
        }
      }
    },
    // 获取三级分类的数据
    async getGoodsCate () {
      // type的值[1,2,3]
      const res = await this.$http.get(`categories?type=3`)
      const {
        meta: { msg, status },
        data
      } = res.data
      if (status === 200) {
        this.options = data
        // console.log(this.options);
      }
    }
  }
}

</script>
<style>
.bopx {
    height: 100%;
}
.alert {
    margin-top: 20px;
}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
