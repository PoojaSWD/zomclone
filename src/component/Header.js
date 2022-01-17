import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import {withRouter} from 'react-router-dom';

const url ="https://zomloginlogout.herokuapp.com/auth/userInfo"

class Header extends Component{
    constructor(props){
        super()

        this.state={
            userdata:''
        }
    }
  
    handleLogout =() =>{
        this.setState({userdata:''})
        localStorage.removeItem('userdata')
        localStorage.removeItem('ltk')
        this.props.history.push('/')

    }


    conditionalHeader = () =>{
        if(localStorage.getItem('ltk')!== null){
            
            let data = this.state.userdata;
            let outputArray = [data.name,data.email,data.phone,data.role]
            localStorage.setItem('userdata', outputArray)
            return(
                <>
                
                <button className="btn btn-logged">Hi {outputArray[0]}</button>
                <button onClick={this.handleLogout} className="btn btn-logout">Logout</button>
            
               
                </>
                
            )
        }else{
            return(
                <>
                <Link to="/login"  type="button" className="btn btn-login">Login</Link>
                    <Link to="/register" type="button" className="btn btn-register">Register</Link>  
            </>
            )

        }
            
        
    }
    render(){
        return(
            <React.Fragment>
               <div id="header">
                    <div id="brand">
                    <Link to="/">Zomclon</Link>
                    </div>
                    <div className="social">
                    {this.conditionalHeader()}
                   
                    </div>
                    
                </div>
    
             
            </React.Fragment>
        )
    }
    
    componentDidMount(){
        fetch(url,{
            method: 'GET',
            headers: {
                'x-access-token':localStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) =>{
            this.setState({userdata:data})
        })
    }




}




export default withRouter(Header);
