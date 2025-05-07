import api from "./apiInterceptor";

// admin api
export const adminAddOrCreateProductApi = (paylod)=>{
    return api.post('/api/admin/addOrCreateProduct',paylod)
}

export const adminGetAllProductApi = (page="",limit="",search="")=>{
    return api.get(`/api/admin/getAllProducts?search=${search}&page=${page}&limit=${limit}`)
}

export const adminGetProductByIdApi = (id)=>{
    return api.get(`/api/admin/getProductById?id=${id}`)
}

export const adminDeleteProductByIdApi = (id)=>{
    return api.delete(`/api/admin/deleteProduct?id=${id}`)
}


// user api end-points
export const userGetProductByIdApi = (id)=>{
    return api.get(`/products/${id}`)
}