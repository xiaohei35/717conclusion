import React,{Component} from 'react'
import {loginout} from '../../utils/utils'
import {Dialog} from '../../components/dialog/dialog'
import './setting.less'

class Setting extends Component{
    constructor(){
        super()
        this.state={
            flag:false
        }
        this.Loginout=this.Loginout.bind(this)
        this.tomine=this.tomine.bind(this)
    }
    render(){
        let {flag}=this.state;
        return <div id='setting'>       
            <header>
                <span className='iconfont icon-xiangzuo1' onClick={this.tomine}></span>
                <span>设置</span>
                <span></span>
            </header>
            <div className="main">
                <ul>
                    <li>
                        <span>我的头像</span>
                        <span>
                            <img src={require('../../static/img/2.png')} alt=""/>
                            <em className='iconfont icon-xiangyou'></em>
                        </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>用户名</span>
                        <span>
                            <span>71712431905</span>
                            <em className='iconfont icon-xiangyou'></em>
                        </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>我的二维码名片</span>
                        <span>
                            <span className='iconfont icon-erweima'></span>
                            <em className='iconfont icon-xiangyou'></em>
                        </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>绑定手机号</span>
                        <span>
                            <em className='iconfont icon-xiangyou'></em>
                        </span>
                    </li>
                </ul>
            </div>
            <button onClick={this.Loginout}>退出登录</button>
            {
                flag&&<Dialog loginout={loginout} history={this.props} confirm={'确认'} cancel={'取消'}/>
            }
            {/* <div className="alert" ref='alert'>
                <span>确认要退出登录吗</span>
                <span className='yes'>确定</span>
                <span className='no'>取消</span>
            </div>
            <div className="mark" ref='mark'></div> */}
        </div>
    
    }
    Loginout(){
        this.setState({
            flag:true
        })
        let dialog_bg = document.querySelector('.dialog_bg')
        dialog_bg!=null?dialog_bg.className='dialog_bg':''
    }
    tomine(){
        this.props.history.push('/index/mine')
    }
}
export default Setting