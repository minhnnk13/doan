import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    chats: []
  },
  getters: {
    notDoneChats: (state) => {
      const chats = state.chats.filter((chat) => !chat.complete)

      return chats
    },

    doneChats: (state) => {
      const chats = state.chats.filter((chat) => chat.complete)

      return chats
    }
  },
  mutations: {
    setChats: (state, chats) => {
      state.chats = chats
    },

    completeChat: (state, id) => {
      const index = state.chats.findIndex(chat => chat.id === id)
      state.chats[index].complete = true
    },

    deleteChat: (state, id) => {
      const index = state.chats.findIndex(chat => chat.id === id)
      state.chats.splice(index, 1)
    }
  },
  actions: {
    getChats: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const data = [
          {
            id: 1,
            title: 'Nhận đơn hàng từ.....',
            date: '03/04/2022',
            assign: 'LHLong',
            complete: true,
            content: [
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },

              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              }
            ]
          },
          {
            id: 2,
            title: 'Nhận đơn hàng từ.....',
            date: '03/04/2022',
            assign: 'LHLong',
            content: [
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },

              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              }
            ]
          },
          {
            id: 3,
            title: 'Nhận đơn hàng từ.....',
            date: '03/04/2022',
            assign: 'LHLong',
            content: [
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },

              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              },
              {
                userName: 'LHLong',
                avatar: null,
                time: '03/04/2021',
                message: 'Hôm nay là thứ mấy'
              }
            ]
          }

        ]

        commit('setChats', data)
        resolve(data)
      })
    },

    addMessage: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        // commit('deleteChat', params)
        resolve(params)
      })
    },

    addNewChat: ({ commit }, message) => {
      return new Promise((resolve, reject) => {
        // commit('deleteChat', message)
        resolve(message)
      })
    },

    completeChat: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        commit('completeChat', id)
        resolve(id)
      })
    },

    deleteChat: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        commit('deleteChat', id)
        resolve(id)
      })
    }
  }
}
