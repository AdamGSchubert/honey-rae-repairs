import { CustomerProfile } from "./customerForm"
import { EmployeeForm } from "./employeeForm"




export const Profile = () => {
    

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if(honeyUserObject.staff){
        return <EmployeeForm/>
    }
    else {
        return <CustomerProfile/>
    }

    
}

