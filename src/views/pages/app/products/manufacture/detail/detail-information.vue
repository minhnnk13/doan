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
            :data="getImportsBySupplierId"
            ref="tableRef"
            v-if="tableActive"
          >
            <el-table-column
              v-for="(column, index) in tableActive.columns"
              :key="index"
              :label="column.name"
              prop=""
            />
            <template #append>
              <div class="paging-container">
                <div style="margin-right: 12px; margin-top: 6px">
                  {{ "Hiển thị" }}
                </div>
                <el-select
                  v-model="pageSize"
                  @change="handleChangePageSize"
                  size="small"
                >
                  <el-option
                    v-for="(pageSizeIndex, index) in pageSizes"
                    :key="index"
                    :label="pageSizeIndex"
                    :value="pageSizeIndex"
                  />
                </el-select>
                <div
                  style="margin-right: 12px; margin-left: 12px; margin-top: 6px"
                >
                  {{ "Kết quả" }}
                </div>
              </div>
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tabs from './ultil/tabs'
import table from './ultil/table'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const pageSizes = reactive([5, 25, 50, 75, 100])
    const pageSize = ref(5)
    const params = computed(() => {
      return {
        pageSize: pageSize.value,
        pageIndex: 0,
        supplierId: route.params.id
      }
    })

    const getImportsBySupplierId = computed(() => {
      return store.state.import.getImportsBySupplierId
    })
    store.dispatch('import/getImportsBySupplierId', params.value)

    const handleChangePageSize = () => {
      store.dispatch('import/getImportsBySupplierId', params.value)
    }

    return {
      getImportsBySupplierId,
      ...tabs(),
      ...table(),
      pageSizes,
      handleChangePageSize,
      pageSize
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

  :deep(.el-table__inner-wrapper) {
    .el-table__append-wrapper {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 0px;
      bottom: 0px;
      .paging-container {
        display: flex;
        .el-input {
          width: 50px;
        }
      }
    }
  }
}
</style>
