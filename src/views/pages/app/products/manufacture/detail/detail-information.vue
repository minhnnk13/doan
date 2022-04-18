<template>
  <div class="information">
    <div class="information__tabs">
      <el-tabs
        v-model="tabActive"
        class="tabs"
      >
        <el-tab-pane
          v-for="tab in tabConfigs"
          :key="tab.value"
          :label="tab.label"
          :name="tab.value"
        >
          <el-table
            table-layout="auto"
            :data="tableData"
            ref="tableRef"
            v-if="tableActive"
          >
            <el-table-column
              v-for="(column, index) in tableActive.columns"
              :key="index"
              :label="column.name"
              prop=""
            />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tabs from './ultil/tabs'
import table from './ultil/table'
export default {
  setup () {
    const tableData = [
      1
    ]
    return {
      tableData,

      ...tabs(),
      ...table()

    }
  }
}
</script>

<style lang="scss" scoped>
.information {
    background: #fff;
    padding: 24px;
    padding-top: 0;
    &__tabs {
        :deep(.el-tabs__item) {
            &.is-active {
                color: $color--primary !important;
                font-weight: bold;
            }

            &:hover {
                color: $color--primary !important;
                font-weight: bold;
            }
        }
    }
}
</style>
