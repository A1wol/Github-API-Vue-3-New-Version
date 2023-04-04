import { defineStore } from 'pinia'

export const useGithubDataStore = defineStore('githubData', {
  state: () => ({
    name: '',
    page: 1,
    perPage: 5,
    order: 'asc',
    sort: 'fork'
  }),
  getters: {
    getSearchingData: (state) => { return state.searchingData }
  },
  actions: {
    setSearchingData(newName, newPage, newPerPage, newOrder, newSort) {
      this.name = newName,
        this.page = newPage,
        this.perPage = newPerPage,
        this.order = newOrder,
        this.sort = newSort
    }
  },
  persist: true
})
