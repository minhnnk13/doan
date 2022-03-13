import { ref, onMounted, nextTick } from 'vue'
import defautConfig from './util'
import { useStore } from 'vuex'
import enumeration from '../../../common/enumeration'
import commonFn from '../../../common/common-fn'
const baseForm = (config = defautConfig) => {
  const store = useStore()
  const form = ref(null)
  const container = ref(null)

  /**
   * Show Mask
   */
  const showMask = () => {
    commonFn.showMask(container.value)
  }

  /**
   * HideMask
   */
  const hideMask = () => {
    commonFn.hideMask()
  }

  /**
   * Load data theo id config
   */
  const loadData = async () => {
    let data = []

    if (config.storeConfig?.entityKey) {
      await store.dispatch(`${config.storeConfig.moduleName}/get${config.storeConfig.entityName}`, config.entityKey).then((res) => {
        if (res) {
          data = res
        }
      })
    }

    return data
  }

  /**
   * Thực thi các mutation truyền vào
   * @param {Array} params
   */
  const executeMutation = async (params) => {
    if (params?.length) {
      for (let i = 0; i < params.length; i++) {
        await execute(params[i], enumeration.ExecuteStoreType.mutation)
      }
    }
  }

  /**
   * Thực thi mutation
   * @param {Object} param //object: {name, payload}
   * @param {*} executeType
   */
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

  /**
   * Validate các control
   * @returns
   */
  const validate = () => {
    let isValid = false
    const formEL = container.value.querySelector('.base-form')

    if (formEL) {
      isValid = formEL.__vue__.isValid()
    }

    return isValid
  }

  // const validateComponent = () => {
  //   const intance = container.value.querySelector('.base-form')
  //   let isValid = false

  //   if (intance) {
  //     isValid = intance.isValid()
  //   }

  //   return isValid
  // }

  /**
   * Thêm
   * @param {*} payload
   */
  const addModel = async (payload) => {
    await store.dispatch(`${config.moduleName}/add${config.entityName}`, payload)
  }

  /**
   * Sửa
   * @param {} payload
   */
  const editModel = async (payload) => {
    await store.dispatch(`${config.moduleName}/edit${config.entityName}`, payload)
  }

  /**
   * Xóa
   * @param {*} id
   */
  const deleteModel = async (id) => {
    await store.dispatch(`${config.moduleName}/delete${config.entityName}`, id)
  }

  /**
   * Thực thi action
   * @param {*} param
   * @param {*} modeType
   * @returns
   */
  const executeAction = async (param, modeType) => {
    let actionMode = config.actionMode
    showMask()
    const isValid = await validate()
    if (!isValid) {
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
    await action(param)
      .then((isSuccess) => {
        if (isSuccess) {
          doAfterSave()
        }
      })
      .catch(err => {
        alert(err)
      })
      .catch(() => {
        hideMask()
      })
    hideMask()
  }

  /**
   * Làm gì đó sau khi gọi api
   * @param {*} callBack
   */
  const doAfterSave = (callBack) => {
    if (callBack) {
      callBack()
    }
  }

  return {
    store,
    container,
    showMask,
    hideMask,
    loadData,
    executeMutation,
    execute,
    validate,
    addModel,
    editModel,
    deleteModel,
    executeAction
  }
}

export default baseForm
