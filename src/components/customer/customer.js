import { Link } from "react-router-dom"


export const Customer =({id, fullName, email})=>{
    return <section className="customer" >
    <div>
        <Link to={`/customers/${id}`}>name: {fullName}</Link></div>
    <div>email: {email}</div>
</section>
}