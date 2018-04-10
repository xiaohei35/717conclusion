export default function mapStateToProps(state){
    console.log(state)
    return {
        deliveryList:state.delivery_list
    }
}