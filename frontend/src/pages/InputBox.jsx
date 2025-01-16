export default function InputBox(props){

    return(
        <div>
        <div className="text-sm font-medium text-left py-2"> {props.label}</div>
        <input onChange={props.onchange} placeholder={props.placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
    )

}