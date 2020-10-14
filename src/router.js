import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/dashboard/components/Login'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      {
        name: 'EmployeeManagement',
        path: 'employee-management',
        component: () => import('@/views/dashboard/tables/empManagement')
      },
      {
        name: 'DepartmentManagement',
        path: 'department-management',
        component: () => import('@/views/dashboard/tables/depManagement')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   next('department-management')
// })
export default router
// export default new Router({
//   mode: 'hash',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       component: () => import('@/views/dashboard/Index'),
//       children: [
//         // Dashboard
//         {
//           name: 'Dashboard',
//           path: '',
//           component: () => import('@/views/dashboard/Dashboard')
//         },
//         {
//           name: 'EmployeeManagement',
//           path: 'employee-management',
//           component: () => import('@/views/dashboard/tables/empManagement')
//         },
//         {
//           name: 'DepartmentManagement',
//           path: 'department-management',
//           component: () => import('@/views/dashboard/tables/depManagement')
//         },
//         // Pages
//         {
//           name: 'User Profile',
//           path: 'pages/user',
//           component: () => import('@/views/dashboard/pages/UserProfile')
//         },
//         {
//           name: 'Notifications',
//           path: 'components/notifications',
//           component: () => import('@/views/dashboard/component/Notifications')
//         },
//         {
//           name: 'Icons',
//           path: 'components/icons',
//           component: () => import('@/views/dashboard/component/Icons')
//         },
//         {
//           name: 'Typography',
//           path: 'components/typography',
//           component: () => import('@/views/dashboard/component/Typography')
//         },
//         // Maps
//         {
//           name: 'Google Maps',
//           path: 'maps/google-maps',
//           component: () => import('@/views/dashboard/maps/GoogleMaps')
//         },
//         // Upgrade
//         {
//           name: 'Upgrade',
//           path: 'upgrade',
//           component: () => import('@/views/dashboard/Upgrade')
//         }
//       ]
//     }
//   ]
// })