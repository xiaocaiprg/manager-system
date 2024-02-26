<template>
  <div class="user-page">
    <h2>用户管理</h2>
    <el-table class="table" :data="userTableData" style="width: 100%">
      <el-table-column type="index" width="40"> </el-table-column>
      <el-table-column
        v-for="(item, index) in userInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :page-size.sync="queryData.pageSize"
      :total="total"
      :current-page.sync="queryData.pageNum"
      @current-change="getUserList()"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/user";
export default {
  name: "User-Page",
  data() {
    return {
      userTableData: [],
      total: 0,
      queryData: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    userInfo() {
      return [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "用户名",
          prop: "username",
          width: 100,
        },
        {
          label: "待使用积分",
          prop: "integral",
          width: 100,
        },
        {
          label: "已使用积分",
          prop: "usedIntegral",
          width: 100,
        },
        {
          label: "联系方式",
          prop: "phone",
        },
        {
          label: "加入时间",
          prop: "createTime",
        },
        {
          label: "用户来源",
          prop: "agentName",
        },
      ];
    },
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      API.getUserList(this.queryData).then(res => {
        this.userTableData = res.records;
        this.total = res?.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-page {
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
