<template>
  <div class="merchant-page">
    <h2>商家管理</h2>

    <el-table class="table" :data="merchantTableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, index) in merchantInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="edit(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :page-size.sync="queryData.pageSize"
      :total="total"
      :current-page.sync="queryData.pageNum"
      @current-change="getMerchantList()"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/merchant";
export default {
  name: "Merchant-Page",
  data() {
    return {
      merchantTableData: [],
      total: 0,
      queryData: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    merchantInfo() {
      return [
        {
          label: "服务商名称",
          prop: "merchantname",
          width: 100,
        },
        {
          label: "服务商类型",
          prop: "merchantType",
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
          label: "创建时间",
          prop: "createTime",
          width: 100,
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "联系方式",
          prop: "phone",
        },
        {
          label: "服务商等级",
          prop: "level",
        },
      ];
    },
  },
  created() {
    this.getMerchantList();
  },
  methods: {
    getMerchantList() {
      API.getMerchantList(this.queryData).then(res => {
        this.merchantTableData = res?.records;
        this.total = res?.total;
      });
    },
    edit() {},
  },
};
</script>

<style lang="less" scoped>
.merchant-page {
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
