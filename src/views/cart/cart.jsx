import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import CartItem from '../../components/cartItem/cartItem'
import './cart.less'

class Cart extends Component {
    constructor(){
        super()
        this.state={
            str:'all',
            edit:'编辑',
            pay:'结算'
        }
        this.tomine=this.tomine.bind(this)
        this.cartEdit=this.cartEdit.bind(this)
        this.toDelGoods=this.toDelGoods.bind(this)
    }
    render() {
        let {str,edit,pay}=this.state;
        let { cartList , totalCost , selectAll, toggleSelectAll} = this.props
        console.log(!!cartList)
        return <div id='cart'>
            <header>
                <span className='iconfont icon-xiangzuo1' onClick={this.tomine}></span>
                <span>购物车</span>
                <span className="edit" onClick={this.cartEdit}>{edit}</span>
            </header>
            <div className="goods_list">
                <ul>
                    {
                        cartList.map((item, ind) => {
                            return <CartItem key={'cartItem'+ind} item={item}></CartItem>
                        })
                    }
                </ul>
            </div>
            <footer>
                <div className="all"><span className={(selectAll?'actived iconfont icon-duihao':'actived iconfont')} onClick={()=>{
                    this.setState({
                        str : str=="all"?"none":"all"
                    });
                    toggleSelectAll(str)
                    }}></span>全选</div>
                <div className="heji">
                    <p>合计:<span className="sum">￥{totalCost}</span></p>
                    <div className="buy" onClick={this.toDelGoods}>{pay}</div>
                </div>
            </footer>
        </div>
    }
    componentDidMount() {
        this.props.fetchGoodsList(this.props.history)
    }
    tomine(){
        this.props.history.push('/index/home')
    }
    cartEdit(){
        this.setState({
            edit:this.state.edit=='编辑'?'完成':'编辑',
            pay:this.state.edit=='编辑'?'删除':'结算'
        })
    }
    toDelGoods(){
        if(this.state.pay=='结算') return;
        let selectedId=[];
        this.props.cartList.forEach((item,ind)=>{
            //如果被选中 装入一个数组
            if(item.selected==1){
                selectedId.push(item.goods_id)
            }
        })
        //删除该数组
        this.props.delCartGoods(selectedId)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)