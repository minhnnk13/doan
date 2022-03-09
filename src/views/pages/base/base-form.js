import { ref, onMounted, nextTick } from 'vue'
import defautConfig from './util'
import { useStore } from 'vuex'
import enumeration from '../../../common/enumeration'
const baseForm = (config = defautConfig) => {
  const store = useStore()
  const form = ref(null)
  const container = ref(null)

  const loadData = () => {
    if (config.storeConfig?.entityKey) {
      store.dispatch(`${config.moduleName}/get${config.storeConfig.entityName}`, config.entityKey)
    }
  }
  onMounted(() => {
    nextTick(() => {
      config.autoLoad && loadData()
    })
  })

  const executeMutation = async (params) => {
    if (params?.length) {
      for (let i = 0; i < params.length; i++) {
        await execute(params[i], enumeration.ExecuteStoreType.mutation)
      }
    }
  }

  const execute = async (param, executeType) => {
    let storeConfigName = null
    let method = null
    switch (executeType) {
      case enumeration.ExecuteStoreType.mutation:
        storeConfigName = config.storeConfig.mutation
        method = 'commit'
        break
      case enumeration.ExecuteStoreType.action:
        storeConfigName = config.storeConfig.action
        method = 'dispatch'
        break
    }

    const action = config.storeConfig[storeConfigName][param.name]
    await store[method](action, param.payload)
  }

  const validate = () => {
    if (form.value) {
      form.value.isValid()
    }
  }

  const invalidAction = () => {

  }

  const addModel = async (payload) => {
    await store.dispatch(`${config.moduleName}/add${config.entityName}`, payload)
  }

  const editModel = async (payload) => {
    await store.dispatch(`${config.moduleName}/edit${config.entityName}`, payload)
  }

  const deleteModel = async (id) => {
    await store.dispatch(`${config.moduleName}/delete${config.entityName}`, id)
  }

  const executeAction = async (param, modeType) => {
    let actionMode = config.actionMode
    const resValid = validate()
    if (resValid) {
      return
    }
    if (modeType) {
      actionMode = modeType
    }
    let action = null

    switch (actionMode) {
      case enumeration.ActionMode.add:
        action = addModel
        break
      case enumeration.ActionMode.edit:
        action = editModel
        break
    }
    action(param)
  }
}
