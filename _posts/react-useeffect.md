---
title: " Penggunaan React useEffect"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-27T05:35:07.322Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---

`useEffect` adalah hook di React yang digunakan untuk menangani **efek samping (side effects)** dalam komponen fungsi, seperti fetching data, manipulasi DOM, atau berlangganan event. Berikut penjelasan lengkap dan contoh penggunaannya:

---

### **1. Dasar Penggunaan `useEffect`**
#### Sintaks:
```javascript
useEffect(() => {
  // Kode efek samping di sini
  return () => {
    // Cleanup (opsional)
  };
}, [dependencies]); // Daftar dependensi (opsional)
```

#### Contoh Sederhana (Update judul halaman):
```jsx
import { useEffect, useState } from 'react';

function PageTitle() {
  const [count, setCount] = useState(0);

  // Update judul halaman setiap kali `count` berubah
  useEffect(() => {
    document.title = `Hitungan: ${count}`;
  }, [count]); // Efek dijalankan hanya jika `count` berubah

  return (
    <button onClick={() => setCount(count + 1)}>
      Klik ({count})
    </button>
  );
}
```

---

### **2. Jenis Penggunaan `useEffect`**
#### a. **Jalankan Sekali Saat Komponen Mount (Komponen Pertama Kali Render)**
Gunakan **array dependensi kosong** `[]`:
```jsx
useEffect(() => {
  // Fetch data dari API saat komponen mount
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));
}, []); // Tidak ada dependensi → jalankan sekali
```

#### b. **Jalankan Saat State/Props Tertentu Berubah**
Tambahkan variabel ke **array dependensi**:
```jsx
const [user, setUser] = useState('');

useEffect(() => {
  // Jalankan setiap kali `user` berubah
  console.log(`User diperbarui: ${user}`);
}, [user]); 
```

#### c. **Cleanup (Pembersihan)**
Gunakan **return function** untuk membersihkan efek (seperti unsubscribe atau clear timer):
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer aktif!');
  }, 1000);

  // Cleanup: Hentikan timer saat komponen di-unmount
  return () => clearInterval(timer);
}, []);
```

---

### **3. Contoh Kasus Umum**
#### a. Fetch Data dari API:
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return <div>{data ? data.name : 'Loading...'}</div>;
}
```

#### b. Event Listener (Dengan Cleanup):
```jsx
function WindowResizeLogger() {
  useEffect(() => {
    const handleResize = () => {
      console.log('Ukuran window:', window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Hapus event listener saat komponen di-unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Lihat console saat resize window!</p>;
}
```

#### c. Gabungkan dengan State dan Dependency:
```jsx
function UserTracker({ userId }) {
  const [userData, setUserData] = useState({});

  // Fetch ulang data saat `userId` berubah
  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [userId]); // Dependency: userId

  return <div>{userData.name || 'User tidak ditemukan'}</div>;
}
```

---

### **4. Aturan Penting**
1. **Hindari Infinite Loop**  
   Pastikan dependensi diatur dengan benar. Contoh kesalahan:
   ```jsx
   useEffect(() => {
     setCount(count + 1); // ❌ Memicu re-render tanpa henti jika dependensi [count] tidak ada
   }); // Tidak ada array dependensi → dijalankan setiap render
   ```

2. **Gunakan Dependency Array dengan Tepat**  
   Jika efek menggunakan nilai dari luar (state/props), tambahkan ke dependency array:
   ```jsx
   useEffect(() => {
     console.log(user); 
   }, [user]); // ✅ Jalankan hanya jika `user` berubah
   ```

3. **Hindari Mutasi Langsung State di useEffect**  
   Gunakan fungsi setState untuk update state:
   ```jsx
   useEffect(() => {
     // ❌ Salah
     // data.push(newItem);

     // ✅ Benar
     setData(prevData => [...prevData, newItem]);
   }, []);
   ```

---

### **5. Perbandingan dengan Lifecycle Class Component**
| **Lifecycle Class**       | **`useEffect` Equivalent**          |
|---------------------------|-------------------------------------|
| `componentDidMount`       | `useEffect(() => {}, [])`           |
| `componentDidUpdate`      | `useEffect(() => {}, [deps])`       |
| `componentWillUnmount`    | `return () => {}` di dalam useEffect|

---

### **6. Best Practices**
- **Pisahkan Efek Berdasarkan Tujuan**:  
  ```jsx
  // Pisahkan logika fetch data dan event listener
  useEffect(() => { /* fetch data */ }, []);
  useEffect(() => { /* event listener */ }, []);
  ```

- **Hindari Efek untuk Logika yang Bisa Ditangani di Render**:  
  Contoh: Formatting data atau filter array bisa dilakukan langsung di render.

- **Gunakan Custom Hooks untuk Efek Kompleks**:  
  Contoh: `useFetch`, `useEventListener`.

---

### **Kapan Menggunakan `useEffect`?**
- Fetch data dari API.
- Berlangganan event (scroll, resize, keyboard).
- Manipulasi DOM langsung.
- Integrasi dengan library eksternal (Chart.js, D3.js).
- Cleanup resource saat komponen di-unmount.