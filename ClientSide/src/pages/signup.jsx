import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './signup.css'


const SignUp = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const SignUp = async (e) => {
        e.preventDefault();
        console.log(title, name, phone, email, password);

        let result = await fetch('http://localhost:3001/register', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, name, phone, email, password })
        });

        result = await result.json()

        if (result.status === false) {
            alert(result.message)

        } else {
            localStorage.setItem("userId", JSON.stringify(result.data.userId))
            localStorage.setItem("token", JSON.stringify(result.data.token))
            console.log(result);
            navigate('/')
        }
    }

    return (

        <div className="signup">
            <h3>
                SignUp
            </h3>

            <div className="auth-input">
                <form>

                    <label>Title: </label>
                    <input
                        type='text'
                        placeholder="Title: Mr, Mrs, Miss"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br />
                    <label>Name: </label>
                    <input
                        type='text'
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                    <label>Email: </label>
                    <input
                        type='email'
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <label>Phone: </label>
                    <input
                        type='tel'
                        placeholder="Enter phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /><br />
                    <label>Password: </label>
                    <input
                        type='password'
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />

                    <button className="btn" type="submit" onClick={SignUp}>SignUp</button><br />

                    <p className="dont-have">
                        Already have an account ? <Link to="/">Login.</Link>
                    </p >

                </form>
            </div>

        </div>
    )

}

export default SignUp
