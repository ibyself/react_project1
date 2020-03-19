import ajax from './ajax'
export const reqLogin=(username,password)=>ajax.post('/login',{username,password})