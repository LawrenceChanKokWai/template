import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function registerUser(event){
        event.preventDefault()
        const response = await fetch('http://localhost:8000/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json()
        if(data.status ==='ok'){
            alert("Account created!")
            navigate('/login')
        }
        if(data.error ==='Password must be at least  6 characters long'){
            alert("Password must be at least 6 characters long")
        }
        if(data.status ==='fail'){
            alert("There is already an account with that email registered with us.")
            window.location.reload();
        }
    }
 
        return (
            <form onSubmit={registerUser}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button value="Register" type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already Registered? <a href="./Login">sign in</a>
                </p>
            </form>
        );
    }

    export default Signup