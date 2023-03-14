import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditForm(props) {


    const [name, setName] = useState(props.name);
    const [subject, setSubject] = useState(props.subject);
    const [marks, setMarks] = useState(props.marks);
    const navigate = useNavigate()

    async function updateMarks(e) {
        // e.preventDefault();
        console.log(name, marks, subject);

        let result = await fetch(`http://localhost:3001/student/${props.id}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify({ name, marks, subject, studentId: props.id })
        });
        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            console.log(result.data, "**");
            navigate('/getStudent')
        }
    }

    return <div className="popup">
        <button className="hide" onClick={props.hide}>x</button>
        <form>
            <label>Name:</label>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            />
            <label>Subject:</label>
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
            />
            <label >Marks:</label>
            <input type="text" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)}
            />
            <button className="btn" type='submit' onClick={updateMarks}>Save</button>
        </form>
    </div>
}
