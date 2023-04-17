import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export const CustomerProfile =()=>{
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const api ="http://localhost:8088"
    const [customerProf, updateCustomerProf]= useState({
        address:"",
        phoneNumber: "",
        userId:""
    })

    useEffect(()=>{
        fetch(`${api}/customers?userId=${honeyUserObject.id}`)
        .then(res=>res.json())
        .then((data)=>{
            const customerObject = data[0]
            updateCustomerProf(customerObject)
        })
    },
    []
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            return fetch(`${api}/customers/${customerProf.id}`,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customerProf)
            })
            .then(res=>res.json())
            .then(()=>{
               setFeedback("Customer Profile sucessfully saved") 
            })
    }
    const [feedback, setFeedback] = useState("")

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

    return (<>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={customerProf.address}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...customerProf}
                                copy.address =evt.target.value
                                updateCustomerProf(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="tel"
                        className="form-control"
                        value={customerProf.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy ={...customerProf}
                                copy.phoneNumber =evt.target.value
                                updateCustomerProf(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=>{handleSaveButtonClick(clickEvent)}}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>)


                    }