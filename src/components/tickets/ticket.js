import { json, Link } from "react-router-dom"
export const Ticket =({ticketObject, currentUser, employees,getAllTickets})=>{
    
    //find the assigned employee for current ticket
   let assignedEmployee=null
   if(ticketObject.employeeTickets.length>0){
        //select the first 
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        // ticketObj is the ticket 
        assignedEmployee = employees.find(employee =>employee.id === ticketEmployeeRelationship.employeeId)

   } 
   //find the employee profile obj for current user
   const userEmployee = employees.find(employee=> employee.userId === currentUser.id)
   //example currentUser id is 4, checks employee array for object that has userId=4 and returns that obj to userEmployee
 

   const canClose =()=>{
    if (userEmployee?.id === assignedEmployee?.id && !ticketObject?.dateCompleted){
        return <button className="ticket__Finish" onClick={closeTicket}>Finish</button>
    }
    else{
        return ""
    }
   }

    const closeTicket =()=>{
        const copy ={
             userId: ticketObject.userId,
             description: ticketObject.description,
             emergency: ticketObject.emergency,
             dateCompleted: new Date()

        }
        fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
                },
            body: JSON.stringify(copy)
           })
           .then(res=>res.json())
            .then(getAllTickets())
        
    }

const deleteButton =()=>{
    if (!currentUser.staff){
        return <button className="ticket__Delete" onClick={()=>{
          fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
            method: "DELETE",
            })
            .then(()=>{
                getAllTickets()
            })
          }}>Delete</button>
    }
    else{
        return ""
    }
   }





   const buttonOrNoButton =()=>{
    if (currentUser.staff) {
        return <button 
            onClick={()=>{
            //modify api state 
                fetch(`http://localhost:8088/employeeTickets`, {
                    method:"POST",
                    headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: userEmployee.id,
                    serviceTicketId: ticketObject.id
                })
                })
                .then(response =>response.json())
                .then(() => {
                    //reRender all tickets 
                    getAllTickets()
        })}}>claim</button>
    }
    else {
        return ""
    }
   }

    return <section className="ticket">
    <header> {
        //check if loggedin user is staff
        currentUser.staff
            ? `Ticket ${ticketObject.id}`//if staff dont show link to edit ticket
            //if not staff show link to edit the ticket
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        
        }
    </header>
<section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer>{
        //check the array to see if there exists an employee
        ticketObject.employeeTickets.length
        //if employee exists 
            ? `currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`

            : buttonOrNoButton()

        
        
        }
        { canClose() }
        {deleteButton()}
        </footer>
</section>
}