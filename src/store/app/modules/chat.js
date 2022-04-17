import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    topics: []
  },
  getters: {
    notDoneTopics: (state) => {
      const topics = state.topics.filter((topic) => !topic.complete)

      return topics
    },

    doneTopics: (state) => {
      const topics = state.topics.filter((topic) => topic.complete)

      return topics
    }
  },
  mutations: {
    setTopics: (state, chats) => {
      state.topics.push(...chats)
    },

    clearData: (state) => {
      debugger
      state.topics = []
    },

    completeChat: (state, id) => {
      const index = state.topics.findIndex(topic => topic.topicId === id)
      state.topics[index].complete = true
    },

    deleteTopic: (state, id) => {
      const index = state.topics.findIndex(topic => topic.topicId === id)
      state.topics.splice(index, 1)
    },

    setComments: (state, comments) => {

    }
  },
  actions: {
    getTopics: ({ commit }, pageConfig) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/topic?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}`)
          .then((res) => {
            debugger
            commit('setTopics', res.data)
            resolve(res.data)
          })
      })
    },

    getTopic: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/topic/${id}`)
          .then((res) => {
            commit('setComments', res.data)
            resolve(res.data)
          })
      })
    },

    addTopic: ({ commit }, param) => {
      return new Promise((resolve, reject) => {
        authAxios.post('/topic', param).then((res) => {
          commit('setTopics', [res.data])
        })
      })
    },

    addComment: ({ commit }, params) => {
      debugger
      return new Promise((resolve, reject) => {
        authAxios.post('/comment', params)
          .then((res) => {
            debugger
            commit('setComments', params)
            resolve(res.data)
          })
        resolve(params)
      })
    },

    completeChat: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        commit('completeChat', id)
        resolve(id)
      })
    },

    deleteTopic: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        authAxios.delete(`/topic/${id}`)
          .then((res) => {
            debugger
            commit('deleteTopic', id)
            resolve(res)
          })
      })
    }
  }
}
