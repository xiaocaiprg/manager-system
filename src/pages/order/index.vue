<template>
  <div class="order-page">
    <h2>订单管理</h2>
    <el-table class="table" :data="orderTableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in orderInfo"
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
import API from "@/api/order/index";
export default {
  name: "Order-Page",
  data() {
    return {
      orderTableData: [],
      total: 0,
    };
  },
  computed: {
    orderInfo() {
      return [
        {
          label: "订单ID",
          prop: "orderId",
        },
        {
          label: "商品ID",
          prop: "productId",
          width: 100,
        },
        {
          label: "购买用户",
          prop: "userId",
          width: 100,
        },
        {
          label: "积分",
          prop: "integral",
          width: 100,
        },
        {
          label: "购买时间",
          prop: "createTime",
        },
        {
          label: "订单状态",
          prop: "status",
        },
      ];
    },
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      API.getOrderList(params).then(res => {
        this.orderTableData = res?.records;
        this.total = res?.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.order-page {
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
