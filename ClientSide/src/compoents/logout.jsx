import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {

    const navigate = useNavigate()

    return <button className="logout" onClick={async (e) => {

        e.preventDefault();
        localStorage.removeItem("token")
        let result = await fetch('http://localhost:3001/logout', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
        });

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            navigate('/')
        }

    }}>LogOut</button>;
}
