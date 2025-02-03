
import { useSearchParams } from "react-router-dom"
import { Button } from "./Button";
import { useState } from "react";
import InputBox from "./InputBox";
import axios from "axios";
export default function Transfer() {

    const [searchParams] = useSearchParams();
    const to = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState('')


    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name.charAt(0)}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <InputBox onchange={e => {
                        setAmount(e.target.value)
                    }}
                                    type="number"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <Button onclick={() => {
                                
                                let config = {
                                  method: 'post',
                                  maxBodyLength: Infinity,
                                  url: 'http://localhost:3000/api/v1/account/transfer',
                                  headers: { 
                                    'Content-Type': 'application/json', 
                                    'Authorization': 'Bearer ' + localStorage.getItem('atokid')
                                  },
                                  data : { to, amount}
                                };
                                
                                axios.request(config)
                                .then((response) => {
                                  console.log(JSON.stringify(response.data));
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                                
                            }} label="Initiate Transfer" className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}