import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
const api = "http://localhost:8088"
export const CustomerDetails =()=>{
    const {customerId}=useParams()
    const [customer, updateCustomer]= useState({})
    
    
    useEffect(
        ()=>{
            fetch(`${api}/users?_embed=customers&isStaff=false&userId=${customerId}`)
            .then(res=>res.json())
            .then(
                (data)=>{
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                }
            )

        },
        [customerId]
    )
    
    
    return <>
    <section className="customer" >
    <header>{customer.fullName}</header>
    <div>email: {customer.email}</div>
    <div>address: {customer?.customers?.[0]?.address}</div> 
    <div>phone: {customer?.customers?.[0]?.phoneNumber}</div>
    <footer>currently working on tickets</footer>
</section>
    </>
}