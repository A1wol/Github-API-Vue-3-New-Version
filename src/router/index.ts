// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/repository-details/:id',
    name: 'Repository-Details',
    component: () => import('@/views/RepositoryDetailsView.vue'),
  },
  {
    path: '/contributor-details/:id',
    name: 'Contributor-Details',
    component: () => import('@/views/ContributorDetailsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
