import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://localhost:8081/organization',
        method: 'get',
        params: query
    });
};
export const saveData = query => {
    return request({
        url: 'http://localhost:8081/organization',
        method: 'put',
        data:query
    });
};
export const delData = query => {
    return request({
        url: 'http://localhost:8081/organization/'+query,
        method: 'delete'
    });
};
export const addData = query => {
    return request({
        url: 'http://localhost:8081/organization',
        method: 'post',
        data: query
    });
};
export const getGuid = query => {
    return request({
        url: 'http://localhost:8081/organization/guid',
        method: 'get'
    });
};