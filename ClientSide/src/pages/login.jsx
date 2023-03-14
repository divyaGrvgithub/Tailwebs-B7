import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './login.css'


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const logIn = async (e) => {
        e.preventDefault();
        console.log(email, password);

        let result = await fetch('http://localhost:3001/login', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        result = await result.json()

        if (result.status === false) {
            alert(result.message)

        } else {
            localStorage.setItem("userId", JSON.stringify(result.data.userId))
            localStorage.setItem("token", JSON.stringify(result.data.token))
            console.log(result);
            navigate('/getStudent')
        }
    }


    return (
        <div className="login">
            <h3>Login</h3>

            <div className="auth-input">
                <form>
                    <label>Email: </label>
                    <input
                        type='email'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />

                    <label>Password: </label>
                    <input
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                 
                    <button className="btn" type="submit" onClick={logIn}>Login</button><br/>

                    <p className="dont-have">
                        Don't have an account ? <Link to="/signup">SignUp.</Link>
                    </p>
                </form>
            </div>

        </div>

    )

}

export default Login