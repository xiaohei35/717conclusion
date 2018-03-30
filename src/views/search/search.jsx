import React,{Component} from 'react'
import { connect } from 'react-redux'
import './search.less'

class Search extends Component{
    constructor(){
        super()
        this.state={
            historylist:[]
        }
        this.toSearch=this.toSearch.bind(this)
        this.clearHistory=this.clearHistory.bind(this)
        this.testSaga=this.testSaga.bind(this)
    }
    render(){
        //historylist 本地存储中的值
        let {historylist}=this.state
        return <div id='search'>
            <header>
                <p>
                    <span className='iconfont icon-fangdajing'></span>
                    <input type="text" placeholder='请输入您想购买的商品' ref='keyWords'/>
                </p>
                <button onClick={this.toSearch}>搜索</button>
            </header>
            <section className='lately'>
                <p>最近搜索  <span className='iconfont icon-shanchu' onClick={this.clearHistory}></span></p>
                {
                    historylist.length ==0 ? <p style={{'font-size':'.27rem','margin-bottom':'.6rem','padding-left':'.2rem'}}>暂无搜索记录...</p> : 
                    <ul>
                        {historylist.map((item,ind)=>{
                            return <li key={ind} onClick={()=>{this.toResult(item)}}>{item}</li>
                        })}
                    </ul>
                }
                
            </section>
            <section className='more'>
                <p>大家都在搜</p>
                <ul>
                    <li onClick={this.testSaga}>粽子</li>
                    <li>锅巴</li>
                    <li>酱</li>
                    <li>小吃</li>
                    <li>零食</li>
                    <li>干果</li>
                    <li>特产</li>
                    <li>油</li>
                    <li>大米</li>
                    <li>面粉</li>
                </ul>
            </section>
        </div>
    }
    toSearch(){
        if(!this.refs.keyWords.value) return;
        let keyWords=this.refs.keyWords.value;
        let ls=localStorage;
        //本地存储
        if(ls.getItem('SearchHistory')){
            let shArr=JSON.parse(ls.getItem('SearchHistory'))
            if(shArr.indexOf(keyWords)>-1) return 
            //如果输入搜索的值不一样 存入数组中
            shArr.push(keyWords)
            ls.setItem('SearchHistory',JSON.stringify(shArr))
        }else{
            ls.setItem('SearchHistory',JSON.stringify([keyWords]))
        }
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    toResult(keyWords){
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    clearHistory(){
        //清空本地存储
        localStorage.removeItem('SearchHistory')
        this.setState({
            historylist:[]
        })
    }
    componentDidMount(){
        if(localStorage.getItem('SearchHistory')){
            //将本地的值放到数组中 进行渲染
            this.setState({
                historylist:JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
    testSaga(){
        // this.props.dispatch({
        //     type:'GET_GOODS_LIST'
        // })
    }
}
export default connect(function(state){
    console.log(state.goods_list)
})(Search)