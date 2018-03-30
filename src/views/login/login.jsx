import React,{Component} from 'react'
import './login.less'
import $http from '../../utils/http'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch';

class Login extends Component{
    constructor(){
        super()
        this.toLogin=this.toLogin.bind(this)
    }
    render(){
        return <div id='login'>
            <h1>欢迎登录</h1>
            <p>用户名&nbsp;:&nbsp;&nbsp;<input type="text" className='username' ref='username'/></p>
            <p>密&nbsp;&nbsp;&nbsp;码&nbsp;:&nbsp;&nbsp;<input type="text" className='password' ref='password'/></p>
            <p>
                <button><Link to='/register' style={{color:'#fff','font-size':'18px'}}>注册</Link></button>
                <button onClick={this.toLogin}>登录</button>
            </p>
        </div>
    }
    toLogin(){
        let {username,password}=this.refs
        $http.post("/user/login",{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            if(res.success==1){
                //把用户信息存储一份到store中
                this.props.saveUser(res.user);
                //存储一份到localStorage中
                localStorage.setItem('user-info',JSON.stringify(res.user))
                //登录成功之后判断要跳转的页面
                let from = this.props.location.state ? this.props.location.state.from || 'index/home':'index/home'
                document.cookie="token="+res.token;
                this.props.history.replace(from)
            }
            else{
                alert('该用户名不存在或密码错误')
            }
        })
    }
}
export default connect(null,mapDispatchToProps)(Login)