import axios from 'axios'
export default {
    getData (page,callback){
       axios.get(`${global.ApiUrl}/food?page=${page}`)
        .then(res=>{
            callback(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    save (data,callback){
        axios.post(`${global.ApiUrl}/food/create`,data)
            .then(res=>{
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    delete (id,callback){
        axios.post(`${global.ApiUrl}/food/delete/${id}`)
            .then(res=>{
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    update (id,data,callback){
        axios.post(`${global.ApiUrl}/food/update/${id}`,data)
            .then(res=>{
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },
    getDataById(id,callback){
        axios.get(`${global.ApiUrl}/food/${id}`)
            .then(res=>{
                delete res.data.data.__v
                delete res.data.data._id
                callback(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }
}