<template>
  <div class="order-page">
    <h2>订单管理</h2>
    <el-table class="table" :data="orderTableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, index) in orderInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
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
      @current-change="getOrderList()"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import API from "@/api/order";
import { OrderStatus, OrderStatusEnum } from "@/lib/config.ts";
export default {
  name: "Order-Page",
  data() {
    return {
      orderTableData: [],
      total: 0,
      queryData: {
        pageNum: 1,
        pageSize: 10,
      },
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
          label: "商品名称",
          prop: "productName",
        },
        {
          label: "购买用户",
          prop: "userName",
          width: 100,
        },
        {
          label: "用户账户",
          prop: "cardNum",
        },
        {
          label: "用户联系方式",
          prop: "phone",
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
          label: "提货码",
          prop: "cargocode",
          formatter: (row, column, cellValue) => {
            return row.categoryId === 3
              ? row.orderStatus === OrderStatusEnum.DONE
                ? cellValue
                : "取货码待生成"
              : "本商品无取货码";
          },
        },
        {
          label: "订单状态",
          prop: "orderStatus",
          formatter: (row, column, cellValue) => {
            return OrderStatus.find(item => item.value === cellValue)?.label;
          },
        },
        {
          label: "订单备注",
          prop: "notes",
        },
      ];
    },
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      API.getOrderList(this.queryData).then(res => {
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
