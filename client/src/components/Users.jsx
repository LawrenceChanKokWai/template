import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component{

  constructor(props){
    super(props);
    this.state={
      users:[],
 
    }
    this.getUsersPost = this.getUsersPost.bind(this);
  }

  componentDidMount =() =>{
    this.getUsersPost();
 
  }


  getUsersPost =()=>{
    axios.get('http://localhost:8000/api/users')
    .then((response)=>{
      const data = response.data;
      this.setState({users:data});
     
     
    
     
      
     // console.log('Data has been received!!');
    })
    .catch(()=>{
      console.log('Error in retriving data')
    })

  }

  DeleteUser =(key)=>{
    var userstate = this.state.users
    console.log(userstate[key]);

  }
    render(){
       return(
        <div className="home">
        <div class="container">
          <h1 className=" mt-5 ">Users</h1>


          <table class="table table-hover">
          <thead>
            <tr>
            <th scope="col">No.</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col"></th>

            
            </tr>
          </thead>

          <tbody>

          { this.state.users.map((user, key) =>{
            return (
              <tr key = {key}>
              <td>{key + 1}</td>
              <td> {user.email}</td>
              <td> {user.password}</td>
              <td> 
                <button onClick={e => this.DeleteUser(e.target.value)} value={key} type="submit" className="btn btn-danger btn-block" >Delete</button></td>
              
            </tr>

            )
          })}

           
            
          
          </tbody>
        </table>
     
        </div>
      </div>
       )
    }
}

export default Users;

