import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import HomeView from '../views/HomeView.vue'
import TeamMembersView from '@/views/TeamMembersView.vue'
import ProjectView from '@/views/ProjectView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import GeneralContentView from '@/views/GeneralContentView.vue'
import ActorContentView from '@/views/ActorContentView.vue'
import IdeaView from '@/views/IdeaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/auth/LogoutConfirmView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/team',
      name: 'team',
      component: TeamMembersView,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView,
      meta: { requiresAuth: true },
    },
    {
      path: '/general',
      name: 'general',
      component: GeneralContentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/actor_content',
      name: 'actorContent',
      component: ActorContentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/idea',
      name: 'idea',
      component: IdeaView,
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const store = useSessionStore()

  store.loadSession()

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
