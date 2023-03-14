import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import LogOut from "../components/logout";


const AddStudent = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');

    // const [studentData, setStudentData] = useState();

    const createStudent = async (e) => {
        e.preventDefault();
        console.log(name, subject, marks);

        let result = await fetch('http://localhost:3001/student', {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify({ name, subject, marks })
        });

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            navigate('/getStudent')
        }
    }

    return (
        <>
            <LogOut/>
            <div className="auth-input">

                <h3>Create Student</h3>

                <div className="login-input">
                    <form>
                        <label>name: </label>
                        <input
                            type='text'
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /><br />

                        <label>subject: </label>
                        <input
                            type='text'
                            placeholder="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        /><br />

                        <label>marks: </label>
                        <input
                            type='number'
                            placeholder="marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        /><br /><br />

                        <button className="btn" type="submit" onClick={createStudent}>Submit</button><br />

                        <span>
                            Do you want to go to <Link to="/getStudent">Student Page?</Link>
                        </span>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddStudent