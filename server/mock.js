const Mock=require('mockjs')
const fs=require('fs')

let data=Mock.mock({
    'success':1,
    "info":"请求成功",
    "code":1001,
    "list|8":[
        {
            "id|+1":1,
            "catagory_list|6":[
                {
                    title:()=>Mock.mock('@ctitle(3)'),
                    images:()=>Mock.mock('@image("80x100","pink","","png","catagory")')
                }
            ]
        }
    ]
})
fs.writeFileSync('./list.json',JSON.stringify(data))