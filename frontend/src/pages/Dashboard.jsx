import { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import axios from "axios";


export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/account/balance',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('atokid')
            }
        };

        axios.request(config)
            .then((response) => {
                setBalance(response.data.balance);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div>
            <AppBar />
            <Balance value={balance} />
            <Users />
        </div>
    )
}

