/** 
* //utils目录用于存放工具类的方法
* //query-api (基于fetch请求) 向下兼容
* //基于fetch封装的请求方法 支持get和post
* //同源策略：1.协议相同 2.域名相同 3.端口号相同
*/
//本地测试服务器的域名
let domin
if(process.env=="development"){ //process.env开发环境 == development开发模式
    domin = "http://localhost:8088"
}
if(process.env=="production"){
    domin = "http://www.lb717.com"
}

let $http={
    //封装get请求
    get(url,data){
        //如果请求类型不是对象的话
        if(Object.prototype.toString.call(data)!="[object Object]"){
            return {
                //回调函数 嵌套
                then(callback){
                    callback('get请求入参格式不正确,需要传对象形式')
                    return {
                        catch(err){
                            err(new Error('入参格式不正确'))
                        }
                    }
                }
            }
        }
        let queryString='?'
        for(let i in data){
            queryString+=(i+'='+data[i]+'&')//id=1&name=luck&
        }
        //encodeURIComponent 中文编码 整个进行编码
        //queryString.slice(0,-1) 去掉末位&
        url = encodeURI(url+queryString.slice(0,-1))
        return fetch(domin+url,{
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            }
        }).then(res=>res.json())
    },
    //封装post请求
    post(url,data){
        if(Object.prototype.toString.call(data)!="[object Object]"){
            return {
                //回调函数 嵌套
                then(callback){
                    callback('GET请求入参格式不正确,需要传OBJECT')
                    return {
                        catch(err){
                            err(new Error('Error:入参格式不正确'))
                        }
                    }
                }
            }
        }
        return fetch(domin+url,{
             'body':JSON.stringify(data),//字符串
             headers:{
               "Content-Type":"application/json;charset=utf-8",
               "Token":"123213"
            },
            method:"POST"
        }).then(res=>res.json())
    }
}
export default $http