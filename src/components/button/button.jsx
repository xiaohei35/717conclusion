import React,{Component} from 'react'
import {connect} from 'react-redux'
import './button.less'

class Button extends Component{
    constructor(){
        super()
        this.goBack=this.goBack.bind(this)
    }
    render(){
        return <button onClick={this.props.onClick}>{this.props.children}</button>
    }
    goBack(){
        this.props.history.go(-1)
    }
}
export default Button