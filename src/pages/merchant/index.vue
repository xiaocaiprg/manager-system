<template>
  <div class="merchant-page">
    <h2>商家管理</h2>

    <el-table class="table" :data="merchantTableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in merchantInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
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
    <el-pagination layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/merchant/index";
export default {
  name: "Merchant-Page",
  data() {
    return {
      merchantTableData: [],
      total: 0,
    };
  },
  computed: {
    merchantInfo() {
      return [
        {
          label: "服务商ID",
          prop: "merchantId",
        },
        {
          label: "服务商名称",
          prop: "merchantName",
          width: 100,
        },
        {
          label: "服务商类型",
          prop: "merchantType",
          width: 100,
        },
        {
          label: "所获积分",
          prop: "integral",
          width: 100,
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
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      API.getMerchantList(params).then(res => {
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
