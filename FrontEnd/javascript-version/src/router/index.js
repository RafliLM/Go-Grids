import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import EditJournal from '../pages/EditJournal.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    {
      path: '/editjournal/:id',
      name: 'EditJournal',
      component: EditJournal
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
