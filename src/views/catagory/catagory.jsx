import React,{Component} from 'react'
import $http from '../../utils/http'
import './catagory.less'

class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0,
            data:[]
        }
    }
    render(){
        let datalist=['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        let {data}=this.state
        return <div id='catagory'>
            <header>
                <div>
                    <span className='iconfont icon-fangdajing'></span>
                    <input type="text" placeholder='请输入您想购买的商品'/>
                </div>
            </header>
            <div className='list'>
                <div className="left">
                    <ul>
                        {
                            datalist.map((item,ind)=>{
                                return <li key={ind} onClick={()=>{this.toData(ind)}}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="right">
                {
                    data.map((item,ind)=>{
                        return <dl key={ind}>
                            <dt><img src={item.images} alt=""/></dt>
                            <dd>{item.title}</dd>
                        </dl>
                    })
                }
                </div>
            </div>
        </div>
    }
    //首先渲染首页面
    componentDidMount(){
        $http.get('/mobile/Category/categorySon',{id:1}).then((res)=>{
            this.setState({
                data:res.catagory_list
            })
        })
    }
    toData(ind){
        this.setState({
            activeIndex:ind
        })
        $http.get('/mobile/Category/categorySon',{id:ind+1}).then((res)=>{
            this.setState({
                data:res.catagory_list
            })
        })
        
    }
}
export default Catagory