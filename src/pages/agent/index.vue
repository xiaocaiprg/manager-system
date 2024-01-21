<template>
  <div class="agent-page">
    <h2>代理商管理</h2>
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in agentInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="addPrice(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            充值积分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/agent/index";
export default {
  name: "Agent-Page",
  data() {
    return {
      tableData: [],
      total: 0,
    };
  },
  computed: {
    agentInfo() {
      return [
        {
          label: "代理商ID",
          prop: "agentId",
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
    this.getAgentList();
  },
  methods: {
    getAgentList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      API.getAgentList(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    addPrice(index, rows) {
      console.log(index, rows);
    },
  },
};
</script>

<style lang="less" scoped>
.agent-page {
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
