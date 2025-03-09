"use client"

import {Tag,handleClose} from "@/app/_components/tag"

interface Tags {
  label: string;
  color: string;
  Close?:any;
}

interface TagActionProps {
  tags: Tags[];
}


export default function TagAction(props:TagActionProps){
  if(!props.tags)return;
  return (
    <div>
      {props.tags.map((tag,i) => (
       
        <Tag
          key={i}
          label={tag.label}
          color={tag.color}
          Close={handleClose}
        />
      ))
    }
    </div>
  );
};