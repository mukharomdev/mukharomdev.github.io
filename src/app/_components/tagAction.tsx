import {Tag,handleClose} from "@/app/_components/tag"

type Props = {
  label: string;
  color:string;
  slug: string;
  Close?: any;
};

export default function TagRelease(props:Props[]){
  return(
  <div>
   {props.map(Tag)}
  </div>)
}