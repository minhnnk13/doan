import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'
import { getUserInfo } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    topics: [],
    totalTopic: 0
  },
  getters: {
    notDoneTopics: (state) => {
      const topics = state.topics.filter((topic) => !topic.complete)

      return topics
    },

    doneTopics: (state) => {
      const topics = state.topics.filter((topic) => topic.complete)

      return topics
    },

    isLastPage: (state) => {
      return state.topics.length === state.totalTopic
    }
  },
  mutations: {
    setTopics: (state, chats) => {
      state.topics.push(...chats)
    },

    setTotalTopic: (state, totalTopic) => {
      state.totalTopic = totalTopic
    },

    clearData: (state) => {
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

    setComments: (state, param) => {
      const topicIndex = state.topics.findIndex(topic => topic.topicId === param.topicId)
      state.topics[topicIndex].totalComment = param.total
      if (!state.topics[topicIndex].comments?.length) {
        state.topics[topicIndex].comments = param.comments
      } else {
        state.topics[topicIndex].comments.push(...param.comments)
      }
    },

    setNewComment: (state, param) => {
      const topicIndex = state.topics.findIndex(topic => topic.topicId === param.topicId)

      state.topics[topicIndex].comments.splice(0, 0, param.content)
    },

    editTopic: (state, topic) => {
      const index = state.topics.findIndex(element => element.topicId === topic.topicId)

      state.topics[index] = topic
    }
  },
  actions: {
    getTopics: ({ commit }, pageConfig) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/topic?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}`)
          .then((res) => {
            commit('setTopics', res.data.topics)
            commit('setTotalTopic', res.data.total)
            resolve(res.topics)
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

    editTopic: ({ commit }, param) => {
      return new Promise((resolve, reject) => {
        authAxios.post('/topic', param).then((res) => {
          commit('editTopic', res.data)
          resolve(res.data)
        })
      })
    },

    getComments: ({ commit }, param) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/comment?topicId=${param.topicId}&pageIndex=${param.pageIndex}&pageSize=5`)
          .then((res) => {
            const comment = {
              topicId: param.topicId,
              comments: res.data.comments,
              total: res.data.total
            }
            commit('setComments', comment)
            resolve(true)
          })
      })
    },

    addComment: ({ commit }, comment) => {
      return new Promise((resolve, reject) => {
        authAxios.post('/comment', comment)
          .then((res) => {
            const username = getUserInfo().username
            const content = res.data
            content.createBy = username
            const param = {
              topicId: res.data.topicId,
              content: content
            }

            commit('setNewComment', param)
            resolve(res.data)
          })
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
            commit('deleteTopic', id)
            resolve(res)
          })
      })
    }
  }
}
