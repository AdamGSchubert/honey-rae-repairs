import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
const api = "http://localhost:8088"
export const EmployeeDetails =()=>{
    const {employeeId}=useParams()
    const [employee, updateEmployee]= useState({})
    
    
    useEffect(
        ()=>{
            fetch(`${api}/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(res=>res.json())
            .then(
                (data)=>{
                    const singleEmployee =data[0]
                    updateEmployee(singleEmployee)
                }
            )

        },
        [employeeId]
    )
    
    
    return <>
    <section className="employee" >
    <header>{employee?.user?.fullName}</header>
    <div>email: {employee?.user?.email}</div>
    <div>specialty: {employee.specialty}</div> 
    <div>rate: {employee.rate}</div>
    <footer>currently working on {employee?.employeeTickets?.length} tickets</footer>
</section>
    </>
}