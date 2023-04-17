import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const api ="http://localhost:8088"
export const EmployeeForm = () => {
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    // TODO: Provide initial state for profile
    const [profile, setProfile]=useState({
        specialty:"",
        rate:"",
        userId:""
    })


    // TODO: Get employee profile info from API and update state
    useEffect(()=>{
        fetch(`${api}/employees?userId=${honeyUserObject.id}`)
        .then(res=>res.json())
        .then((data)=>{
            const employeeObject = data[0]
            setProfile(employeeObject)
        })
    },[]
        
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            return fetch(`${api}/employees/${profile.id}`,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
            .then(res=>res.json())
            .then(()=>{
               setFeedback("Employee Profile sucessfully saved") 
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
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.specialty =evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy ={...profile}
                                copy.rate =parseFloat(evt.target.value, 2)
                                setProfile(copy)
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