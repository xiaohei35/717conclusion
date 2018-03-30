import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

class SwiperWrapper extends Component{
    render(){
        return <div className="swiper-container" ref='swiperDOM'>
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={require("../../static/img/i1.jpg")} alt=""/></div>
                <div className="swiper-slide"><img src={require("../../static/img/i2.jpg")} alt=""/></div>
                <div className="swiper-slide"><img src={require("../../static/img/i3.jpg")} alt=""/></div>
                <div className="swiper-slide"><img src={require("../../static/img/i4.jpg")} alt=""/></div>
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.swiperDOM,{
            autoplay:true,
            loop:true
        })
    }
}
export default SwiperWrapper