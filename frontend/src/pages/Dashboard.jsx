import { useState } from "react";
import { AppBar } from "./AppBar";
import { Balance } from "./Balance";
import { Users } from "./Users";

export default function Dashboard() {
    
    return (
        <div>
           <AppBar/>
           <Balance value={"12000"}/>
           <Users/>
        </div>
    )
}

