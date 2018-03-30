const jwt = require('jsonwebtoken')
const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const _=require('lodash')
//const Mock=require('mockjs')

function queryApi(url, methods, params) {
    return new Promise((resolve, reject) => {
        let data = "";
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                //console.log(`响应主体: ${chunk}`);
                data += chunk
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if (methods.toLowerCase() == "post") {
            request.write(querystring.stringify(params))
        }
        request.end()
    })
}

module.exports = function (app) {
    //商品列表的接口
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryApi('/mall/index/getGoodsChannel', 'post', req.body)
            .then((data) => {
                res.end(data)
            })
    })

    //注册接口
    app.post('/user/register', function (req, res) {
        //读取json文件
        let user = fs.readFileSync(__dirname +'/user.json', { encoding: "utf-8" })
        //转成对象格式
        user = JSON.parse(user);
        //将返回的数据添加进读取的json里
        user.push(req.body)
        //将数据写入user.json 并返回注册成功的信息
        fs.writeFile('user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "注册成功"
            }))
        })
    })

    //登录接口
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname +'/user.json', { encoding: "utf-8" })
        //user 注册信息
        user = JSON.parse(user);
        //login 接收登录信息
        let login = req.body
        let resInfo = {
            success: 0,
            info: "用户名或密码错误",
            token: ""//密钥 后端加密逻辑
        }
        user.forEach(item => {
            if (item.username == login.username && item.password == login.password) {
                resInfo.success = 1;
                resInfo.info = "登录成功";
                resInfo.user={
                    name:item.username,
                    time:new Date().toLocaleTimeString(),
                    nickname:'lucky'
                }
            }
        });
        if (resInfo.success == 1) {
            //加密
            resInfo.token = jwt.sign(login, "1511", {
                //限制登录账户存在时长
                expiresIn: 60 * 60//单位:秒
            })
        }
        res.end(JSON.stringify(resInfo))
    })

    //添加购物车接口
    app.post('/user/Cart/addCart', function (req, res) {
        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({ 
                    info: "登录超时，请重新登录",
                    name: err.TokenExpiredError 
                }))
            } else {
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + "/cart_info.json", { encoding: "utf-8" }))
                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username];
                    let flag = false//新加商品
                    recordList.forEach((item, index) => {
                        if (item.goods_id == req.body.goods_info.goods_id) {
                            ++item.count
                            flag = true//重复商品
                        }
                    })
                    if (!flag) {
                        let record = req.body.goods_info;
                        record.count = 1;
                        record.selected = 0;
                        cartInfo[decoded.username].push(record)
                    }
                    //cartInfo[decoded.username].push(req.body.goods_info)
                } else {
                    let record = req.body.goods_info
                    record.count = 1;
                    record.selected = 0;
                    cartInfo[decoded.username] = [record]
                }
                fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartInfo), function () {
                    res.end("1")
                })
            }
        })
    })

    //分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        let data = JSON.parse(fs.readFileSync(__dirname + "/list.json", {encoding: "utf-8"}))
        data.list.map((item,ind) =>{
        if(item.id==req.query.id){
            res.end(JSON.stringify(item))
        }
        })
    })

    //默认数据渲染购物车列表登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList',function(req,res){
        jwt.verify(req.body.token,'1511',(err,decoded) =>{
            if(err){
                res.end(JSON.stringify({
                    info:"登录超时,请重新登录",
                    detail:err.TokenExpiredError,
                    error:1
                }))
            }else{
                try{
                    let goodsRecord=JSON.parse(fs.readFileSync("./cart_info.json",{ encoding: "utf-8" }))
                    let goodsList=goodsRecord[decoded.username] || []
                    // console.log(goodsList)
                    res.json(goodsRecord)
                }
                catch(err){
                    res.json(error)
                }            
            }
        })
    })
    //删除购物车指定商品
    app.post('/user/Cart/delGoods',function(req,res){
        //返回要删除的商品数组
        jwt.verify(req.body.token,'1511',(err,decoded) =>{
            if(err){
                res.json(err)
            }else{
                let cartRecord=JSON.parse(fs.readFileSync("./cart_info.json",{ encoding: "utf-8" }))                
                let cartList=cartRecord[decoded.username];
                //删除选中的商品的数据
                 _.remove(cartList,function(item){
                    return req.body.selectedId.indexOf(item.goods_id)>-1
                })
                //更新删除过后 剩余的数据
                //cartRecord[decoded.username]=cartList;
                //重新写入json文件中
                cartRecord[decoded.username]=cartList
                fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartRecord), function () {
                    res.json({
                        success:1,
                        info:'删除成功',
                        delGoods:cartRecord   
                    })
                })
            }
        })
        
    })
}