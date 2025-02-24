import {
dayjs

} from '@/lib'





export function DateLocal(){
    const d = new Date()
    let day = null
    if(typeof dayjs() == 'function'){
         day = dayjs(d)
    }
   

	return day
}