import Heading from "./Heading";
import SubHeading from "./SubHeading";

export default function Signup() {
    return (
        <div >
            <div className="flex justify-around"><Heading label="Sign Up"/></div>
            <div className="flex justify-around"><SubHeading label="Enter details here to create a new account" /></div>
                   </div>
    )
}