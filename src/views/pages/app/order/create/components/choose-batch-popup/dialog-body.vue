<template>
  <div
    class="dialog-body"
    ref="container"
  >
    <text-field
      v-model="inputSearch"
      class="w-50 m-2"
      size="large"
      placeholder="Tìm kiếm lô"
      :prefix-icon="Search"
      @keyup="handleSearch"
    />

    <el-table
      table-layout="auto"
      :data="batchs"
      ref="tableRef"
    >
      <el-table-column
        label="Mã lô"
      >
        <template #default="prop">
          <el-tag>{{ prop.row.productBatchId }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Hạn sử dụng"
        prop="expiredDate"
      />

      <el-table-column
        label="Tổn kho"
      />

      <el-table-column
        label="Có thể bán"
        prop="quantity"
      />

      <el-table-column
        width="150"
        align="center"
      >
        <template #default="prop">
          <el-button
            type="text"
            @click="choseBatch(prop.row)"
          >
            Chọn
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const MODULE_NAME = 'order'

const store = useStore()
const batchs = computed(() => store.state[MODULE_NAME].batchs)
const choseBatch = (batch) => {
  store.commit(`${MODULE_NAME}/setBatch`, batch)
  store.commit(`${MODULE_NAME}/setToggleBatchQuantityPopup`)
}
</script>

<style lang="scss" scoped>
.dialog-body {

}
</style>
