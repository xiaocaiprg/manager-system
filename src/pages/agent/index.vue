<template>
  <div class="agent-page">
    <h2>代理商管理</h2>
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
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
            type="primary"
            size="small"
          >
            充值积分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
    <el-dialog
      v-if="curAgent && dialogVisible"
      title="提示"
      :visible="true"
      width="30%"
      :before-close="handleClose"
    >
      <div class="add-box">
        <span class="agent-item">代理商Id: {{ curAgent.agentId }}</span>
        <span class="agent-item"> 代理商名称: {{ curAgent.agentName }}</span>
        <div class="agent-item">
          充值：
          <el-input
            clearable
            size="small"
            v-model="intergral"
            :validate-event="true"
            placeholder="请输入充值积分"
            @input="onInput"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/agent";
import { mixins } from "../../lib/mixin";
export default {
  name: "Agent-Page",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      total: 0,
      dialogVisible: false,
      curAgent: null,
      intergral: "",
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
          prop: "agentname",
          width: 100,
        },
        {
          label: "可使用积分",
          prop: "integral",
          width: 100,
        },
        {
          label: "已使用积分",
          prop: "usedIntegral",
          width: 100,
        },
        {
          label: "已获得总积分",
          prop: "totalIntegral",
          width: 110,
        },
        {
          label: "联系方式",
          prop: "phone",
          width: 110,
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
    isValidIntergral() {
      return /^\d+$/.test(this.intergral);
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
        this.total = res?.total;
      });
    },
    addPrice(index, rows) {
      this.dialogVisible = true;
      this.curAgent = rows;
    },
    addIntergral() {
      return this.getAdminInfo().then(res => {
        if (res) {
          const params = {
            superId: res.superId,
            agentId: this.curAgent.agentId,
            integral: this.intergral, //积分
            integralType: 1, //1:管理员到代理 2：代理到用户
          };
          return API.addIntergral(params).then(res => {
            return res;
          });
        }
        return null;
      });
    },
    onInput(value) {
      this.intergral = value;
    },
    onConfirm() {
      if (this.isValidIntergral) {
        this.addIntergral().then(res => {
          if (res) {
            this.$message.success("充值成功");
            this.dialogVisible = false;
            this.getAgentList();
          } else {
            this.dialogVisible = false;
            this.$message.error("充值失败，请联系管理员");
          }
        });
      } else {
        this.$message.error("请输入正确的数值");
      }
    },
    handleClose() {
      this.dialogVisible = false;
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
  .add-box {
    display: flex;
    flex-direction: column;
    .agent-item {
      display: flex;
      margin-top: 10px;
      white-space: nowrap;
    }
  }
}
</style>
