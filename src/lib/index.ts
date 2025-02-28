import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Impor locale Indonesia


export function DateLocal(){
  // Set locale ke Indonesia
  dayjs.locale('id');

  // Contoh penggunaan Day.js
  const now = dayjs();
  const formattedDate = now.format('dddd, D MMMM YYYY'); // Format tanggal

  return formattedDate
}






