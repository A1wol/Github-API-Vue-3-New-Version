import { GithubData } from '@/helpers/interfaces'
import { defineStore } from 'pinia'
export const useGithubDataStore = defineStore('githubData', {
  state: (): GithubData => ({
    name: '',
    page: 1,
    perPage: 5,
    order: 'asc',
    sort: 'fork'
  }),
  actions: {
    setSearchingData(newName: string, newPage: number, newPerPage: number, newOrder: string, newSort: string) {
      this.name = newName,
        this.page = newPage,
        this.perPage = newPerPage,
        this.order = newOrder,
        this.sort = newSort
    }
  },
  persist: true
})
