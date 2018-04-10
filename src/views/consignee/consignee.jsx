import React,{Component} from 'react'
import {connect} from 'react-redux'
import './consignee.less'
import Header from '../../components/header/header'
import Button from '../../components/button/button'
import propTypes from 'prop-types'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'

import {T} from 'react-toast-mobile'
import Toast from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'

//input组件 点击传递value
class Input extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <input type="text" placeholder={this.props.placeholder} onChange={this.getVal}/>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}
//propsType 检查参数是否符合格式
Input.propTypes={
    onChange:propTypes.func.isRequired
}

//select组件
class Select extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <select onChange={this.getVal}>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="上海">上海</option>
            <option value="深圳">深圳</option>
        </select>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}
Select.propTypes={
    onChange:propTypes.func.isRequired
}

class Consignee extends Component{
    constructor(){
        super()
        this.name='';
        this.phone='';
        this.address='';
        this.province='';
        this.city='';
        this.region='';
        this.toSave=this.toSave.bind(this)
    }
    render(){
        return <div id='consignee'>
            <Header history={this.props.history}>收货人</Header>
            <section>
                <Input ref='name' placeholder='收货人姓名' onChange={(val)=>{this.inputChange('name',val)}}/>
                <Input ref='phone' placeholder='手机号' onChange={(val)=>{this.inputChange('phone',val)}}/>
                <Select ref='province' onChange={(val)=>{this.inputChange('province',val)}}></Select>
                <Select ref='city' onChange={(val)=>{this.inputChange('city',val)}}></Select>
                <Select ref='region' onChange={(val)=>{this.inputChange('region',val)}}></Select>
                <Input ref='address'placeholder='详细地址' onChange={(val)=>{this.inputChange('address',val)}}/>
                <p>
                    <span className='actived iconfont icon-duihao'></span>
                    <em>设为默认地址</em>
                </p>
                <Button onClick={this.toSave}><span className='iconfont icon-jiahao'></span>&nbsp;保存</Button>
            </section>
            <Toast/>
        </div>
    }
    toSave(){
        let reg_name=/([A-Za-z\d\u4e00-\u9fa5]+)$/g;
        let reg_phone=/^1[3|7|5|8]\d{9}$/;
        // if(!reg_name.test(this.name)){
        //     T.notify('用户名输入不正确')
        //     return;
        // }
        // if(!reg_phone.test(this.phone)){
        //     T.notify('手机号输入不正确')
        //     return;
        // }
        // if(this.province || this.city || this.region){
        //     T.notify('请选择省市区')
        //     return;
        // }
        // if(!this.address){
        //     T.notify('请选择街道')
        //     return;
        // }
        T.notify('添加地址成功')
        $http.post('/user/Mail/addNew',{
            name:this.name,
            phone:this.phone,
            province:this.province,
            city:this.city,
            region:this.region,
            address:this.address,
            token:getCookie('token')
        }).then(res=>{
            console.log(res)
            if(res.success==1){   
                this.props.history.replace('/deliveryList')   
            }
        })
    }
    inputChange(a,b){
        this[a]=b;
    }
}

export default Consignee