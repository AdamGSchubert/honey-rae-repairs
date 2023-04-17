// export const TicketList = () => {
//     return <h2>List of Tickets</h2>
// }

import { useEffect, useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom"
import "./tickets.css"


export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    //const [emergency, setEmergency] = useState(false)

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response =>response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
            
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

        useEffect(
            ()=>{
                if(honeyUserObject.staff){
                    //for employee
                    setFiltered(tickets)
                }
                else{
                    //customer
                    const myTickets = tickets.filter(ticket =>ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets)
                }   
            },
            [tickets]
        )

        useEffect(
            ()=>{
            if (emergency){
                const emgergencyTickets = tickets.filter(ticket => ticket.emergency=== true)
                setFiltered(emgergencyTickets)
            }
            else{
                setFiltered(tickets)
            }
        },
        [emergency]
        )

        useEffect(
           ()=>{
            if(openOnly){
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }else
            {
                const myTickets = tickets.filter(ticket =>ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets)
            }
            },
            [openOnly]
        ) 
        
        useEffect(
            ()=>{
                const searchedTickets = tickets.filter(
                    ticket=> {
                        return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())})
                    setFiltered(searchedTickets)
            },
            [searchTermState]
        )




    return <>
        {
            honeyUserObject.staff
            ? <>
                <button onClick={ ()=> {setEmergency(true)} }>emergency only</button>
                <button onClick={ ()=> {setEmergency(false)} }>show all</button>
            </>
            : <>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => {updateOpenOnly(true)}}>Open Tickets</button>
                <button onClick={() =>{updateOpenOnly(false)} }>All Tickets</button>
             </>
        }
        
    <h2>List of Tickets</h2>
        <article className="tickets">

            {
                filteredTickets.map(
                    (ticket)=> {
                        return <section className="ticket">
                            <header> <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                            </header>
                        <section>{ticket.description}</section>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }



        </article>
        </>
        
}