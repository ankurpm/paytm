import axios from "axios";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onchange={e => {
                        setEmail(e.target.value)
                    }} placeholder="apm@email.com" label={"Email"} />
                    <InputBox onchange={e => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    <Button onclick={() => {
                        axios.post('http://localhost:3000/api/v1/user/signin', {
                            email,
                            password
                        })
                        .then(response => {
                            if(response.status === 200) {
                                localStorage.setItem('atokid', response.data.token);
                                navigate('/dashboard');
                            }
                            
                        }).catch(error => {
                            alert(error.message)
                        })
                    }} label={"Sign in"} />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
                </div>
            </div>
        </div>
    )
}