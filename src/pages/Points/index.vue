<template>
  <div class="goods-page">
    <h2>积分管理</h2>
    <el-table class="table" :data="goodsTableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="(item, index) in goodsInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template
          slot-scope="scope"
          v-if="scope.row.productStatus === ProductStatusEnum.PENDDING"
        >
          <el-button
            @click.native.prevent="toCheck(scope.$index, scope.row)"
            type="primary"
            size="small"
          >
            去审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :page-size.sync="queryData.pageSize"
      :total="total"
      :current-page.sync="queryData.pageNum"
      @current-change="getGoodsList()"
      class="pagination"
    >
    </el-pagination>
    <el-dialog
      title="审核"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="confirm-wapper" v-if="curPro">
        <div class="confirm-info">
          <span class="info-item">商品Id: {{ curPro.productId }}</span>
          <span class="info-item">商品名称: {{ curPro.productName }}</span>
          <span class="info-item">商品积分: {{ curPro.integral }}</span>
          <span class="info-item" style="font-weight: 600"
            ><i class="el-icon-warning"></i
            >请输入商品分成比例(总公司:代理:商家)</span
          >
          <div class="info-item">
            <el-input
              clearable
              size="small"
              style="width: 100px; margin-right: 3px"
              v-model="rateInfo.rateAll"
              :validate-event="true"
              placeholder="5"
              @input="onRateAllInput"
            ></el-input>
            <span>:</span>
            <el-input
              clearable
              size="small"
              v-model="rateInfo.rateAgent"
              style="width: 80px; margin-right: 3px"
              :validate-event="true"
              placeholder="15"
              @input="onRateAgentInput"
            ></el-input>
            <span>:</span>
            <el-input
              clearable
              size="small"
              v-model="rateInfo.rateMerchant"
              style="width: 80px"
              :validate-event="true"
              placeholder="80"
              @input="onRateMerInput"
            ></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
          <el-button type="danger" @click="onCancel">驳回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ProductStatusEnum, ProductStatus } from "@/lib/config.ts";
import API from "@/api/goods";

export default {
  name: "Points-Page",
  data() {
    return {
      goodsTableData: [],
      total: 0,
      queryData: {
        pageNum: 1,
        pageSize: 10,
      },
      ProductStatusEnum: ProductStatusEnum,
      dialogVisible: false,
      curPro: null,
      rateInfo: {
        rateAll: "",
        rateAgent: "",
        rateMerchant: "",
      },
    };
  },
  computed: {
    goodsInfo() {
      return [
        {
          label: "商家名称",
          prop: "merchantName",
          width: 100,
        },
        {
          label: "商品名称",
          prop: "productName",
          width: 100,
        },
        {
          label: "商品标签",
          prop: "labels",
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
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },

        {
          label: "商品状态",
          prop: "productStatus",
          formatter: (row, column, cellValue) => {
            return ProductStatus[cellValue];
          },
        },
        {
          label: "分佣比例",
          prop: "rate",
          formatter: (row, column, cellValue) => {
            return cellValue ? cellValue : "未设置";
          },
        },
      ];
    },
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      API.getProductList(this.queryData).then(res => {
        this.goodsTableData = res?.records;
        this.total = res?.total;
      });
    },
    toCheck(index, row) {
      this.curPro = row;
      this.dialogVisible = true;
    },
    handleClose() {},
    onRateAllInput(value) {
      this.rateInfo.rateAll = value;
    },
    onRateAgentInput(value) {
      this.rateInfo.rateAgent = value;
    },
    onRateMerInput(value) {
      this.rateInfo.rateMerchant = value;
    },
    updateRate() {
      const params = {
        productId: this.curPro.productId, //商品id
        rate: Object.values(this.rateInfo).join(","), //分成比例 管理员：代理：商家
      };
      return API.updateRate(params)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
    },
    updateStatus(status) {
      const params = {
        productId: this.curPro.productId, //商品id
        productStatus: status, //1:待审核 2：已通过 3：驳回 4：下架
      };
      return API.updateStatus(params)
        .then(res => res)
        .catch(err => err);
    },
    onConfirm() {
      const isValid = Object.values(this.rateInfo).every(item => {
        return item && /^\d+$/.test(item);
      });
      if (!isValid) {
        this.$message.error("请输入完整的数字");
        return;
      }
      Promise.all([this.updateRate(), this.updateStatus(2)])
        .then(res => {
          const success = res.every(item => item === true);
          if (success) {
            this.dialogVisible = false;
            this.$message.success("审核通过");
            this.getGoodsList();
          } else {
            this.$message.error("审核失败，请重试");
          }
        })
        .catch(() => {
          this.$message.error("审核失败，请重试");
        });
    },
    onCancel() {
      this.updateStatus(3)
        .then(res => {
          if (res) {
            this.dialogVisible = false;
            this.$message.success("已驳回");
            this.getGoodsList();
          } else {
            this.$message.error("驳回失败，请重试");
          }
        })
        .catch(() => {
          this.$message.error("驳回失败，请重试");
        });
    },
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
