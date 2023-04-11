import { useEffect, useState } from "react"
import "./EmployeeList.css"
import { Employee } from "./employee"
const api ="http://localhost:8088"
export const EmployeeList =()=>{
    const [employees, setEmployees]= useState([])


    useEffect(
        ()=>{
             fetch(`${api}/users?isStaff=true`)
            .then(res=> res.json())
            .then((employeeArr)=>{
                setEmployees(employeeArr)
            }
                
            )
        },
        []
    )


    return <article className="employees" >
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`} 
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email}/>)
        }
    
    </article>
}