import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperWrapper from '../../components/swiper/swiper'
import './home.less'
import GoodsItem from '../../components/goodsItem/goodsItem'

class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling=this.scrolling.bind(this)
    }
    toSearch(){
        //点击跳转路由
        let {history}=this.props
        history.push('/index/search')
    }
    render(){
        return <div id="home" onScroll={this.scrolling} ref="scroller">
            <div ref='doc'>
                <header>
                    <p>717</p>
                    <input type="text" placeholder="请输入您想要购买的商品" onFocus={this.toSearch}/>
                    <p>
                        <span className='iconfont icon-shop'></span>
                        <span>我的店铺</span>
                    </p>
                </header>
                <div className="banner">
                    <SwiperWrapper></SwiperWrapper>
                </div>
                <section>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>酒水饮料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>生鲜蔬果</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                </section>
                <h1>---- 家乡味道 ----</h1>
                <div className="goods_list"> 
                    {
                        this.state.goodslist.map((item,ind)=>{
                            return <GoodsItem key={ind} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                        })
                    }
                </div>
                <p className="last" ref="last">我是有底线的...</p>
            </div>
        </div>
    }
    componentDidMount(){
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                //接收返回来的真实数据
                goodslist:JSON.parse(res).data.data
            })
        })  
    }
    scrolling(){
        let {scroller,doc,last} = this.refs
        
        if(this.state.channel_id>9){
            last.style.display="block"
        };

        if(!this.state.caniquery) return;

        let st=scroller.scrollTop ;
        let sw=scroller.offsetHeight;
        let dh = doc.offsetHeight;
        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            console.log("满足条件,请求数据")
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} =this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
             .then(res=>{
                 console.log(goodslist)
                this.setState({
                    //goodslist 数据请求回来 依旧是个数组 需要结构
                    goodslist:[...goodslist,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
    }
    //scrollTop_windowHeight=documentHeight
}
export default Home