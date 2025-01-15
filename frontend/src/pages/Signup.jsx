import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";

export default function Signup() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"SignUp"}></Heading>
                    <SubHeading label={"Enter details to create a new account"}></SubHeading>
                    <InputBox placeholder="John" label={"First Name"} />
                    <InputBox placeholder="Wick" label={"Last Name"} />
                    <InputBox placeholder="apm@email.com" label={"Email"} />
                    <InputBox placeholder="123456" label={"Password"} />
                    <Button label={"SignUp"}></Button>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

                </div>
            </div>
        </div>
    )
}