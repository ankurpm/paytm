import { useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"SignUp"}></Heading>
                    <SubHeading label={"Enter details to create a new account"}></SubHeading>
                    <InputBox onchange={e => {
                        setFirstName(e.target.value);
                    }} placeholder="John" label={"First Name"} />
                    <InputBox onchange={e => {
                        setLastName(e.target.value)
                    }} placeholder="Wick" label={"Last Name"} />
                    <InputBox onchange={e => {
                        setEmail(e.target.value)
                    }} placeholder="apm@email.com" label={"Email"} />
                    <InputBox onchange={e => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    <Button onclick={() => {
                        axios.post('http://localhost:3000/api/v1/user/signup', {
                            firstName,
                            lastName,
                            email,
                            password
                        }).then(response => {
                            console.log(response.data);
                            if(response.status === 200) {
                                localStorage.setItem('atokid', response.data.token);
                                navigate('/dashboard');
                            }
                        }).catch(error => {
                            alert(error.message)
                        })
                    }} label={"SignUp"}></Button>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

                </div>
            </div>
        </div>
    )
}