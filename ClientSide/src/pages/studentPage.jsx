import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EditForm from "../components/editForm"


const Students = () => {

    let [StudentData, setStudentData] = useState([])
    let [ID, setID] = useState("")
    let [isEdit, setIsEdit] = useState(false)
    let [name, setName] = useState("")
    let [subject, setSubject] = useState("")
    let [marks, setMarks] = useState("")

    console.log(StudentData);

    useEffect(() => { getStudent() }, [])

    const getStudent = async () => {
        let id = JSON.parse(localStorage.getItem("userId"))
        console.log(id);
        let result = await fetch(`http://localhost:3001/student`,
            {
                headers: {
                    'x-api-key': JSON.parse(localStorage.getItem("token"))
                }
            })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            console.log(result.data, "**");
            setStudentData(result.data)
        }
    }

    const hidePopUp = () => {
        setIsEdit(false)
    }

    const deleteStudents = async (ID) => {
        // let id = JSON.parse(localStorage.getItem('userId'))
        let result = await fetch(`http://localhost:3001/student/${ID}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': JSON.parse(localStorage.getItem("token"))
            }
        })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            alert(result.message)
            getStudent()
        }
    }



    async function searchStudent() {

        let result = await fetch(`http://localhost:3001/students/${ID}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': JSON.parse(localStorage.getItem("token"))
            }
        })
        result = await result.json()

        if (result.status === false) {
            alert(result.message)
            setStudentData([])
        } else {
            alert(result.message)
            setStudentData(result.data)
        }
    }





    return (

        <div>

            <div className='search'>
                <input
                    type="text"
                    placeholder='Student ID'
                    value={ID}
                    onChange={(e) => setID(e.target.value)} />

                <button onClick={searchStudent}>Search</button>
                <button onClick={getStudent}>All Students</button>
            </div>



            <ul>
                <li><h3>Get All Students</h3></li>
                <li><Link className="logout" to="/" >LogOut</Link></li>
                <li><Link className="create-student" to="/addStudent" >Create Student</Link></li>
            </ul>

            <div>
                <table>
                    <tr>
                        <th>name</th>
                        <th>subject</th>
                        <th>marks</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    {StudentData.length > 0 ?

                        StudentData.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.name}</td>
                                    <td>{value.subject}</td>
                                    <td>{value.marks}</td>
                                    <td><button onClick={() => {
                                        setName(value.name)
                                        setSubject(value.subject)
                                        setMarks(value.marks)
                                        setID(value._id)
                                        setIsEdit(true)

                                    }}  ><div>Edit Detail</div></button></td>
                                    <td><button onClick={() => deleteStudents(value._id)}>Delete</button></td>
                                </tr>
                            )
                        }) : <h1>No Students Available!</h1>
                    }
                </table>


            </div>
            {
                isEdit &&
                <EditForm name={name} subject={subject} marks={marks} id={ID} hide={hidePopUp}></EditForm>
            }
        </div>
    )

}

export default Students