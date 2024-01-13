// API接口汇总
import instance from './request.js';
// export let user = {
//   userGet(params = {}){ // params为查询参数 page, name 等等
// 	return instance.get(`/user/`, { params })
//  },
//   userAdd(data){
//     return instance.post('/user/',data)
//   },
// }
const user = {
    login (data) {
        return instance.post('/api1/admin/login', data)
    },
    getCommonUserData (data) {
        return instance.post('/admin/get/commonUser', data)
    },
    getAdminUserData (data) {
        return instance.post('/admin/get/adminUser', data)
    },
    banUser (data) {
        return instance.post('/admin/ban', data)
    },
    addAdmin (data) {
        return instance.post('/admin/add/admin', data)
    },
    editAdmin (data) {
        return instance.post('/admin/edit/admin', data)
    },
    deleteAdmin (data) {
        return instance.post('/admin/delete/admin', data)
    }
}
const commodity = {
    getCommodity (data) {
        return instance.post('/admin/get/commodity', data)
    },
    deleteCommodity (data) {
        return instance.post('/api/delete/goods', data)
    }
}
const order = {
    getOrderData (data) {
        return instance.post('/admin/get/order', data)
    },
    deleteOrder (data) {
        return instance.post('/admin/delete/order', data)
    }
}
const notice = {
    getNoticeData (data) {
        return instance.post('/admin/get/notice', data)
    },
    addNotice (data) {
        return instance.post('/admin/add/notice', data)
    },
    editNotice (data) {
        return instance.post('/admin/edit/notice', data)
    },
    deleteNotice (data) {
        return instance.post('/admin/delete/notice', data)
    }
}
const report = {
    getReportData (data) {
        return instance.post('/admin/get/report', data)
    },
    editReportData (data) {
        return instance.post('/admin/edit/report', data)
    }
}

export {
    user,
    commodity,
    order,
    notice,
    report
}
