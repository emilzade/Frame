import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import AdminLayout from '@/layouts/AdminLayout'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/index',
    meta: {
      authRequired: 'false',
      adminRequired: 'false',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/main/Gallery.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/main/Gallery.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/main/Checkout.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/favourites',
        name: 'Favourites',
        component: () => import('../views/main/Favourites.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/TermsAndConditions',
        name: 'TermsAndConditions',
        component: () => import('../views/main/TermsAndConditions.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/gallery/item/:id',
        name: 'GalleryItem',
        component: () => import('../views/main/GalleryItem.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/collections',
        name: 'Collections',
        component: () => import('../views/main/Collections.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'false',
        },
      },
      {
        path: '/collections/collection/:id',
        name: 'Collection',
        component: () => import('../views/main/Collection.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/main/Contact.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/career',
        name: 'Career',
        component: () => import('../views/main/Career.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/partnership',
        name: 'Partnership',
        component: () => import('../views/main/Partnership.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/main/About.vue'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    redirect: '/admin/index',
    meta: {
      authRequired: 'true',
      adminRequired: 'true',
    },
    children: [
      {
        path: '/admin/index',
        name: 'AdminIndex',
        component: () => import('@/views/admin/Index.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/items',
        name: 'Items',
        component: () => import('@/views/admin/Items.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/items/item/:id',
        name: 'Item',
        component: () => import('@/views/admin/Item.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/orders',
        name: 'Orders',
        component: () => import('@/views/admin/Orders.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/orders/order/:id',
        name: 'Order',
        component: () => import('@/views/admin/Order.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/messages',
        name: 'Messages',
        component: () => import('@/views/admin/Messages.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/sizes',
        name: 'Sizes',
        component: () => import('@/views/admin/Sizes.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/size/:id',
        name: 'Size',
        component: () => import('@/views/admin/Size.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/message/:id',
        name: 'Message',
        component: () => import('@/views/admin/Message.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/notifications',
        name: 'Notifications',
        component: () => import('@/views/admin/Notifications.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/admin/notification/:id',
        name: 'Notification',
        component: () => import('@/views/admin/Notification.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    meta: {
      authRequired: 'false',
      adminRequired: 'false',
    },
    children: [
      {
        path: '/404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  // console.log('authRequired', to.meta.authRequired)
  // console.log('adminRequired', to.meta.adminRequired)
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const user = localStorage.getItem('user')
  var role = ''
  if (user.length > 0) {
    role = JSON.parse(user).roleName
  }
  if (to.meta.authRequired == 'true') {
    if (isAuthenticated == 'true') {
      if (to.meta.adminRequired == 'true') {
        if (role == 'admin') {
          return next()
        } else {
          alert('Only admins')
          router.push({
            name: 'Index',
          })
        }
      } else {
        return next()
      }
    } else {
      alert('Only users')
      router.push({
        name: 'Index',
      })
    }
  } else {
    return next()
  }
})
export default router
