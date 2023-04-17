import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const api ="http://localhost:8088"

export const TicketUpdateForm = () => {
    const { ticketId } = useParams()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, updateTicket] = useState({
        description:"",
        emergency: false

    })
    
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()


    useEffect(()=>{
        fetch(`${api}/servicetickets?userId=${honeyUserObject.id}`)
        .then(res=>res.json())
        .then((tixData)=>{
            const tick = tixData[0]
            updateTicket(tick)
        }
        )
    },
    [ticketId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //console.log("you clicked the button")

        // TODO: Create the object to be saved to the API
        
        // "userId": 3,
        // "description": "Saepe ex sapiente deserunt et voluptas fugiat vero quasi. Ipsam est non ipsa. Occaecati rerum ipsa consequuntur. Ratione commodi unde sint non rerum. Sit quia et aut sunt.",
        // "emergency": false,
        // "dateCompleted":

        // const ticketToSend ={
        //     userId: honeyUserObject.id,
        //     description: ticket.description,
        //     emergency: ticket.emergency,
        //     dateCompleted: ""
        // }
    
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`${api}/serviceTickets/${ticketId}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(res=>res.json())
        .then(
            ()=>{
                navigate("/tickets")
            }
        )



    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt)=>{
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                updateTicket(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt)=>{
                                const copy ={...ticket}
                                copy.emergency = evt.target.checked 
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary"
            onClick={(clickEvent)=>{handleSaveButtonClick(clickEvent)}}>
                Update Ticket
            </button>
        </form>
    )
}