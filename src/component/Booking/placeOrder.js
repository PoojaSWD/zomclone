import React,{Component} from 'react';
import './placeOrder.css';
import Header from '../Header';
import {Link} from 'react-router-dom';

const menuUrl = "https://zomclone.herokuapp.com/menuitem";
const PlaceOrderUrl = "https://zomclone.herokuapp.com/placeorder";

class PlaceOrder extends Component{
    constructor(props){
        super(props)

        this.state={
            id:Math.floor(Math.random()*10000),
            hotel_name:this.props.match.params.restName,
            name:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[0]:'',
            phone:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[2]:'',
            email:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[1]:'',
            cost:0,
            address:'Pune',
            menuItems:''
        }
    }
    handleSubmit =() =>{
        var obj = this.state;
        obj.details = sessionStorage.getItem('menu');
        delete obj.menuItems
        console.log(obj)
        fetch(PlaceOrderUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(obj)

        })
        // .then(this.props.history.push('/viewBooking'))
        .then(console.log('Going for Payment'))

    }


    renderItem = (data) =>{
        if(data){
            return data.map((item,index)=>{
                return(
                   <div className="orderItems" key={index}>
                       <img src={item.img} alt={item.name}/>
                       <h4 style={{fontWeight:'bold'}}>{item.name}</h4>

                   </div>
                )

            })

        }
    }

    handleChange = (event) =>{

        this.setState({[event.target.name]:event.target.value})
    }

   
    render(){
        if(localStorage.getItem('ltk') == null){
            return(
                <>
                <Header/>
                <center>
                <h2>Login first to place booking</h2>
                </center>
               
                </>
            )
           
            
        
        }
        return(
            <>
            <Header/>
            <div className="container">
                <br/>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h1>Place Order Here...</h1>
                    </div>
                    <div className="panel-body">
                        <form action="https://zomclonpay.herokuapp.com/paynow" method="POST">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input className="form-control" name="name"
                                        value={this.state.name} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input className="form-control" name="email"
                                        value={this.state.email} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone No</label>
                                        <input className="form-control" name="phone"
                                        value={this.state.phone} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input className="form-control" name="address"
                                        value={this.state.address} onChange={this.handleChange}/>
                                    </div>
                                </div>
                             </div>
                             {this.renderItem(this.state.menuItems)}
                            <input type="hidden" name="amount" value={this.state.cost}/>
                            <input type="hidden" name="id" value={this.state.id}/>
                            <input type="hidden" name="hotel_name" value={this.state.hotel_name}/>
                            <div className="totalcost">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Total Cost is Rs.{this.state.cost}</h3>
                                    </div>
                                </div>

                            </div>

                             <button className="btn btn-warning" type="submit" onClick={this.handleSubmit}>Place Order</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>  
            
            </>
            
        )
    }

    componentDidMount(){
        let menuItems = sessionStorage.getItem('menu')
        let menuIds =[]
        menuItems.split(',').map((item)=>{
            menuIds.push(parseInt(item))
            return 'ok'
        })
        fetch(menuUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(menuIds)

        })
        .then((res)=> res.json())
        .then((data)=>{
            let menuDetails = [];
            let totalPrice =0;
            data.map((item) =>{
                var myObj ={}
                totalPrice = totalPrice + parseInt(item.menu_price)
                myObj.name =item.menu_name
                myObj.img = item.menu_image
                menuDetails.push(myObj);
                return 'ok'
            })
            this.setState({cost:totalPrice,menuItems:menuDetails})
        
        })
    }
}
export default PlaceOrder