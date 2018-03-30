import React,{Component} from 'react'

class Result extends Component{
    render(){
        return <div>Result</div>
    }
    componentDidMount(){
        let {location}=this.props
        console.log(location.state)
    }
}
export default Result