import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";

export default function Signin() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox placeholder="apm@email.com" label={"Email"} />
                    <InputBox placeholder="123456" label={"Password"} />
                    <Button label={"Sign in"} />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
                </div>
            </div>
        </div>
    )
}