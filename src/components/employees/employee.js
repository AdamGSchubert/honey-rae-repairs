import { Link } from "react-router-dom"


export const Employee =({id, fullName, email})=>{
    return <section className="employee" >
    <div>
        <Link to={`/employees/${id}`}>name: {fullName}</Link></div>
    <div>email: {email}</div>
</section>
}