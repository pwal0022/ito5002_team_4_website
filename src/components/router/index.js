import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { getAuth } from "firebase/auth";
// import { getDoc, doc } from 'firebase/firestore'
// import db from '../firebase/init'

// admin path
// const requireAdmin = async (to, from, next) => {
//   const auth = getAuth()
//   const user = auth.currentUser

//   if (!user) return next('/signin')

//   const docSnap = await getDoc(doc(db, 'users', user.uid))
//   const userData = docSnap.data()

//   if (userData && userData.role === 'admin') {
//     next()
//   } else {
//     next('/')
//   }
// }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/admin',
    //   component: () => import('../views/AdminView.vue'),
    //   beforeEnter: requireAdmin,
    // },
    { path: '/', component: () => import('../views/Home.vue') },
    // { path: '/team', component: () => import('../views/Team.vue') },
    // { path: '/register', component: () => import('../views/Register.vue') },
    // { path: '/signin', component: () => import('../views/SignIn.vue') },

    // {
    //   path: '/about',
    //   component: () => import('../views/About.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // // info
    // {
    //   path: '/info',
    //   component: () => import('../views/Info.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/earlyYears',
    //   component: () => import('../views/EarlyYears.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/schoolYears',
    //   component: () => import('../views/SchoolYears.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/adult',
    //   component: () => import('../views/Adult.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // // Diagnosis

    // {
    //   path: '/talia',
    //   component: () => import('../views/Talia.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/malia',
    //   component: () => import('../views/Malia.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/rowan',
    //   component: () => import('../views/Rowan.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/javier',
    //   component: () => import('../views/Javier.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },
    // {
    //   path: '/getdiagnosis',
    //   component: () => import('../views/GetDiagnosis.vue'),
    //   meta: {
    //     requiresAuth: true, // This route requires authentication
    //   },
    // },

    // { path: '/faq', component: () => import('../views/FAQ.vue') },
    // { path: '/donate', component: () => import('../views/Donate.vue') },
    // { path: '/contact', component: () => import('../views/Contact.vue') },
    // { path: '/trains', component: () => import('../views/Trains.vue') },
    // { path: '/weather', component: () => import('../views/Weather.vue') },
    // // {path: '/footer', component:() => import("src\components\Footer.vue")},
  ],
})

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener() // Clean up the listener after getting the user
//         resolve(user)
//       },
//       reject,
//     )
//   })
// }

// //  Authentication check
// router.beforeEach(async (to, from, next) => {
//   // Check if the route requires authentication
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Here you would typically check if the user is authenticated
//     if (await getCurrentUser()) {
//       next() // Proceed to the route if authenticated
//     } else {
//       alert('Sign in or create an account to access this page.')
//       console.log('Sign in or create an account to access this page.')
//       next('/signin') // Redirect to sign-in page if not authenticated
//     }
//   } else {
//     next() // Proceed to the route if it doesn't require authentication
//   }
// })
export default router
