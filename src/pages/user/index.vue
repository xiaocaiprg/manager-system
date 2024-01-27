<template>
  <div class="user-page">
    <h2>用户管理</h2>
    <el-table class="table" :data="userTableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in userInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
      >
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/user/index";
export default {
  name: "User-Page",
  data() {
    return {
      userTableData: [],
      total: 0,
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
          label: "名称",
          prop: "userName",
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
          label: "邀请码",
          prop: "inviteCode",
        },
      ];
    },
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      API.getUserList(params).then(res => {
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
