import { useEffect, useState } from "react"
import "./customerList.css"
import { Customer } from "./customer"
const api ="http://localhost:8088"
export const CustomerList =()=>{
    const [customers, setCustomers]= useState([])


    useEffect(
        ()=>{
             fetch(`${api}/users?isStaff=false`)
            .then(res=> res.json())
            .then((customerArr)=>{
                setCustomers(customerArr)
            }
                
            )
        },
        []
    )


    return <article className="customers" >
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`} 
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email}/>)
        }
    
    </article>
}