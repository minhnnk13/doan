<template>
  <div class="left">
    <div class="manufacture">
      <div class="label">
        Thông tin nhà cung cấp
      </div>
      <div
        class="search"
        v-if="
          importSupplier &&
            Object.keys(importSupplier).length === 0 &&
            Object.getPrototypeOf(importSupplier) === Object.prototype
        "
      >
        <el-autocomplete
          placeholder="Tìm kiếm nhà cung câp theo SĐT, tên, mã nhà cung cấp"
          v-model="supplierInputSearch"
          :fetch-suggestions="suppliersQuerySearch"
          clearable
          @select="handleSupplierSelect"
        >
          <template #default="{ item }">
            <div class="item-container">
              <div class="value">
                {{ item.supplierName }}
              </div>
            </div>

            <!-- <span class="link">{{ item.link }}</span> -->
          </template>
        </el-autocomplete>
      </div>

      <result-manufacture v-else />
    </div>

    <div class="products">
      <div class="search">
        <div class="label">
          Thông tin sản phẩm
        </div>

        <el-autocomplete
          v-model="inputSearch"
          placeholder="Tìm kiếm sản phẩm theo SĐT, tên, mã sản phẩm"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div class="item-container">
              <div class="img-container">
                <img
                  class="item-img"
                  :src="item.image"
                >
                <div class="value">
                  {{ item.productName }}
                </div>
              </div>
            </div>

            <!-- <span class="link">{{ item.link }}</span> -->
          </template>
        </el-autocomplete>
      </div>

      <div class="list">
        <products-table />
      </div>

      <result-product />
    </div>

    <div class="ware-house">
      <div class="text">
        Nhập kho
      </div>
      <el-checkbox label="Nhập hàng vào kho" />
    </div>
  </div>
</template>

<script>
import ProductsTable from '../../components/products-table.vue'
import ResultManufacture from '../../components/result-manufacture.vue'
import { useStore } from 'vuex'
import { ref, reactive, computed } from 'vue'

export default {
  components: {
    ResultManufacture,
    ProductsTable
  },
  setup () {
    const store = useStore()
    const products = computed(() => {
      return store.state.product.productsToImport
    })

    const suppliers = computed(() => {
      return store.state.supplier.suppliers
    })

    const importSupplier = computed(() => {
      return store.state.import.importSupplier
    })

    const inputSearch = ref('')
    const supplierInputSearch = ref('')
    const querySearch = (queryString, cb) => {
      const results = queryString
        ? products.value.filter(createFilter(queryString))
        : products.value
      // call callback function to return suggestions
      cb(results)
    }

    const createFilter = (queryString) => {
      return (product) => {
        return (
          product.productName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const createSuppliersFilter = (queryString) => {
      return (supplier) => {
        return (
          supplier.supplierName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const suppliersQuerySearch = (queryString, cb) => {
      const results = queryString
        ? suppliers.value.filter(createSuppliersFilter(queryString))
        : suppliers.value
      // call callback function to return suggestions
      cb(results)
    }

    const handleSelect = (product) => {
      store.commit('import/setProductsToImport', product)
    }

    const handleSupplierSelect = (supplier) => {
      store.commit('import/setImportSupplier', supplier)
    }

    return {
      querySearch,
      inputSearch,
      handleSelect,
      suppliers,
      suppliersQuerySearch,
      supplierInputSearch,
      handleSupplierSelect,
      importSupplier
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;

  .manufacture {
    background: #fff;
    padding: 24px;
    .label {
      margin-bottom: 16px;
    }

    .search {
      :deep(.el-autocomplete) {
        width: 100%;
      }
    }
  }

  .products {
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .search {
      :deep(.el-autocomplete) {
        margin-top: 8px;
        width: 100%;
      }
    }
  }

  .ware-house {
    padding: 24px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

:deep(.img-container) {
  display: flex !important;
  height: 200px;
  justify-content: space-between;
  margin-bottom: 12px;

  img {
    border-radius: 15px;
  }
}
</style>
