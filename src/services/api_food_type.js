import axios from 'axios'
/**
 * 保存数据到服务器
 * @param 需要保存的数据data
 * 请求成功的毁掉函数
 */
export default {
    save(data, callback) {
        axios.post(`${global.ApiUrl}/food_type/create`, data)
            .then(res => {
                callback(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },
    //得到数据
    getData(page, callback) {
        axios.get(`${global.ApiUrl}/food_type?page=${page}`)
            .then(res => {
                callback(res.data)
            })
            .catch(err => { console.log(err) })

    },
    //删除数据
    delete(id, callback) {
        axios.post(`${global.ApiUrl}/food_type/delete/${id}`)
            .then(res => {
                console.log(res.data)
                callback(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getDataById(id,callback){
        axios.get(`${global.ApiUrl}/food_type/${id}`)
            .then(res => {
                delete res.data.data.__v
                delete res.data.data._id
                callback(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    },
    //根据ID修改指定的数据
    //data需要修改的数据
    update(id,data,callback) {
        axios.post(`${global.ApiUrl}/food_type/update/${id}`, data)
            .then(res => {
                callback(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getAllData(callback) {
        axios.get(`${global.ApiUrl}/food_type/all_type`)
            .then(res=>{
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }
}