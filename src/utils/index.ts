import {
dayjs,
// localizedFormat
} from '@/lib'





export function DateLocal(){
    let d = new Date()
    let day = dayjs(d)

	return day
}