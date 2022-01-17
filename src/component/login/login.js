import React,{Component} from 'react';
import Header from '../Header'; 

const loginUrl = "https://zomloginlogout.herokuapp.com/auth/login";


class Login extends Component{
    constructor(props){
        super(props)

        this.state={
            email:'Pooja@gmail.com',
            password:'',
            message:''
        }
    }
    handleSubmit =() =>{
        // var obj = this.state;
        // obj.details = sessionStorage.getItem('menu');
        // delete obj.menuItems
        // console.log(obj)
        fetch(loginUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)

        })
        // .then(this.props.history.push('/viewBooking'))
        .then((res)=> res.json())
        .then((data)=>{
            if(data.auth === false){
                this.setState({message:data.token});
            }else{
                localStorage.setItem('ltk',data.token)
                this.props.history.push('/')
            }
        })

    }


   
    

    handleChange = (event) =>{

        this.setState({[event.target.name]:event.target.value})
    }

   
    render(){
        
        return(
            <>

        <Header/>
            <div className="container">
                
                <br/>
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h1>Login Here...</h1>
                    </div>
                    <div className="panel-body">
                      <h3 style={{color:'red'}}>{this.state.message}</h3>  
                        <div className="row">
                            
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" name="email"
                                            value={this.state.email} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                               
                                    <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className="form-control" name="password"
                                                value={this.state.password} onChange={this.handleChange}/>
                                            </div>
                                    </div>
                        </div>
                             <button className="btn btn-warning"  onClick={this.handleSubmit}>Login</button>
                    </div>
                        
                </div>
            </div>
            </>
            
          
            
        )
    }

   
    
}
export default Login