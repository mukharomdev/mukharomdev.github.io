import {
dayjs

} from '@/lib'





export function DateLocal(){
    const d = new Date()
    const day = dayjs(d)

	return day
}