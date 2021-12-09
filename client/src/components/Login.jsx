import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function loginUser(event){
        event.preventDefault()

        const response = await fetch('http://localhost:8000/api/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				email,
				password,
			}),
        })
        const data = await response.json()

        if(data.status ==="success, you are logged in"){
            localStorage.setItem('token',data.user)
            alert('Login successful')
            navigate('/blog')
        }
        if (data.status === "fail, incorrect password"){
            alert("Email is not registered or password is wrong. Please try again")
        }
        if(data.status ==="fail, user not found"){
            alert("Email is not registered or password is wrong. Please try again")
        }
        if(data.error === "Password must be at least  6 characters long"){
            alert("Password must be at least 6 characters long")
        }
    }
 
        return (
            <form onSubmit={loginUser}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" />
                </div>

  

                <button value='Login' type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Haven't Registered? <a href="./Signup">Register</a>
                </p>
            </form>
        );
    }

export default Login