export const TicketSearch =( { setterFunction } )=>{
    return (
        <div>
            <input
            onChange={
                (changeEvent)=>{
                    setterFunction(changeEvent.target.value)
                }
            
            
            } type="text" placeholder="enter search term here"/>
            </div>
    )
    
}