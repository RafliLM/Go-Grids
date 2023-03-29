import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
