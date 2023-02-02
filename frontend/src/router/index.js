import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import journal from '../views/dashboards/analytics/Journals.vue'
import timelines from '../pages/timeline.vue'
import EditJournal from '../pages/editJournal.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    ...setupLayouts(routes),
    //  {
    //    path: '/journal',
    //    name: 'journal',
    //    component: journal
    // },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditJournal
    },
    {
      path: '/timeline/addTimeline',
      name: 'addTimeline',
      component: timelines
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
