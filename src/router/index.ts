// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/Github-API-Vue-3-New-Version/',
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/Github-API-Vue-3-New-Version/repository-details/:id',
    name: 'Repository-Details',
    component: () => import('@/views/RepositoryDetailsView.vue'),
  },
  {
    path: '/Github-API-Vue-3-New-Version/contributor-details/:id',
    name: 'Contributor-Details',
    component: () => import('@/views/ContributorDetailsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
