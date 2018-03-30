import React,{Component} from 'react'
import {connect} from 'react-redux'
import './Header.less'

class Header extends Component{
    constructor(){
        super()
        this.goBack=this.goBack.bind(this)
    }
    render(){
        return <header>
            <span className='iconfont icon-xiangzuo1' onClick={this.goBack}></span>
            <span>{this.props.children}</span>
            <span className='iconfont icon-shop'></span>
        </header>
    }
    goBack(){
        this.props.history.go(-1)
    }
}
export default Header