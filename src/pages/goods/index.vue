<template>
  <div class="goods-page">
    <h2>商品管理</h2>
    <el-table class="table" :data="goodsTableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in goodsInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        :formatter="item.formatter"
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
import API from "@/api/goods/index";
const STATUS = {
  0: "待审核",
  1: "已通过",
  2: "驳回",
  3: "下架",
};
export default {
  name: "Goods-Page",
  data() {
    return {
      goodsTableData: [],
      total: 0,
    };
  },
  computed: {
    goodsInfo() {
      return [
        {
          label: "商品ID",
          prop: "productId",
        },
        {
          label: "商品名称",
          prop: "productName",
          width: 100,
        },
        {
          label: "商品标签",
          prop: "lables",
          width: 100,
        },
        {
          label: "积分",
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
          label: "提供商家ID",
          prop: "merchantId",
        },
        {
          label: "商品状态",
          prop: "status",
          formatter: (row, column, cellValue) => {
            return STATUS[cellValue];
          },
        },
        {
          label: "分佣比例",
          prop: "rate",
        },
      ];
    },
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      API.getProductList(params).then(res => {
        this.goodsTableData = res?.records;
        this.total = res?.total;
      });
    },
    edit() {},
  },
};
</script>

<style lang="less" scoped>
.goods-page {
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
