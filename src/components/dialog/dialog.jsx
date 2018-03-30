import React from 'react';  
import './dialog.less'

export class Dialog extends React.Component {  
    constructor(){
      super()
    }
    render(){
      let {confirm,cancel,history,loginout} = this.props
      //console.log(loginout)
      return <div className='dialog_bg'>
          <div className='dialog' ref='dialog'>
              <h1>确定要退出登录吗</h1>
              <Confirm history={history} loginout={loginout}>{confirm}</Confirm>
              <Cancel>{cancel}</Cancel>
          </div>
      </div>
    }
}

export class Confirm extends React.Component{
    constructor(){
      super()
      this.confirm=this.confirm.bind(this)
    }
    render(){
        return <span className='Confirm' onClick={this.confirm}>{this.props.children}</span>
    }
    confirm(){
      console.log(this.props.loginout())
      this.props.history.history.push('/index/home')
      this.props.loginout()
    }
}

export class Cancel extends React.Component{
    constructor(){
      super()
      this.cancel=this.cancel.bind(this)
    }
    render(){
        return <span className='Cancel' onClick={this.cancel}>{this.props.children}</span>
    }
    cancel(){
      let dialog_bg = document.querySelector('.dialog_bg')
        dialog_bg.className+=' hide'
    }
}

