import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import home from '@/pages/home/home'
import order from '@/pages/order/order'
import notice from '@/pages/notice/notice'
import report from '@/pages/report/report'
import password from '@/pages/setting/password'
import person from '@/pages/setting/person'
import admin from '@/pages/user/admin'
import common from '@/pages/user/common'

Vue.use(Router)


const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                showNoSideBar: true
            }
        },
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/notice',
            name: 'notice',
            component: notice
        },
        {
            path: '/report',
            name: 'report',
            component: report
        },
        {
            path: '/password',
            name: 'password',
            component: password
        },
        {
            path: '/person',
            name: 'person',
            component: person
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin
        },
        {
            path: '/common',
            name: 'common',
            component: common
        }
    ]
})

router.beforeEach(function (to, from, next) {
    // to: 表示要跳转的页面。from:表示从哪个页面来
    
    next()
    // let login_in = localStorage.login                  // 是否已登录
    // let require = to.matched.some(function(item){      // 是否需要登录
    //   return item.meta.isLogin
    // })
    // if( !login_in && require ){       // 当未登录，且跳转的页面需要登录后才能操作时，进行路由拦截
    //   next({                          // 跳转登录页
    //     name: "login",
    //     params: { redirect: to }      // 将 要跳转（即被拦截） 的路由对象，作为参数，传递到登录页面
    //   });
    // }else{                            // 已登录就正常跳转，不做任何拦截
    //   next()                          // 正常跳转到下一页
    // }
})
//导航后守卫(跳转后)
router.afterEach(function (to, from) {
    //    document.title = to.meta.title     //跳转后设置页面的title
})
export default router