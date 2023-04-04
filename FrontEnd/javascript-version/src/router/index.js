import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token")
  try {
    const user = await axios.get(`http://localhost:5000/api/user`, {
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
    if(to.path == "/" || to.path == "/register" || to.path == "/forgot")
      next({ path : "/dashboard"})
    else
      next()
  } catch (error) {
    if(to.path !== "/" && to.path !== "/register" && to.path !== "/forgot")
      next({ path : "/" })
    else
      next()
  }
})
export default router
