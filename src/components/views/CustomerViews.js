// export const ApplicationViews = () => {
// 	return <>
// 		<h1 className="title--main">Honey Rae Repairs</h1>
// 		<div>Your one-stop shop for repairing your tech</div>
// 	</>
// }

import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerProfile } from "../profile/customerForm"
import { TicketUpdateForm } from "../tickets/editTicket"

import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketList />} />
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="profile" element={<CustomerProfile />} />
                <Route path="tickets/:ticketId/edit" element={ <TicketUpdateForm/> } />
            </Route>
        </Routes>
    )
}