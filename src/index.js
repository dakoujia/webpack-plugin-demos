console.log('hello webpack')

import axios from 'axios'

// 调用接口
axios.get('/api/json/data').then(res => {
    console.log(res.data)
})
axios.get('/api/json/path').then(res => {
    console.log(res.data)
})
axios.get('/api/mockjs/data').then(res => {
    console.log(res.data)
})
