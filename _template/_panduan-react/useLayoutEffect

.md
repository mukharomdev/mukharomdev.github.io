---
title: " Penggunaan React useLayoutEffect."
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-03-01T08:14:47.924Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useLayoutEffect` adalah hook di React yang mirip dengan `useEffect`, tetapi dijalankan **secara sinkron setelah React melakukan mutasi DOM dan sebelum browser melakukan painting**. Ini berguna ketika Anda perlu membaca atau memodifikasi layout DOM secara sinkron sebelum browser menampilkan perubahan ke layar. Berikut penjelasan lengkapnya:

---

### **1. Sintaks Dasar**
```javascript
useLayoutEffect(() => {
  // Kode efek samping di sini
  return () => {
    // Cleanup (opsional)
  };
}, [dependencies]); // Dependency array
```

---

### **2. Perbedaan `useLayoutEffect` vs `useEffect`**
| **Kriteria**          | `useLayoutEffect`              | `useEffect`                   |
|-----------------------|--------------------------------|-------------------------------|
| **Waktu Eksekusi**    | Setelah mutasi DOM, **sebelum browser paint** | Setelah mutasi DOM, **setelah browser paint** |
| **Penggunaan**        | Untuk operasi yang memengaruhi tampilan (misal: ukuran/posisi DOM) | Untuk efek samping umum (fetch data, subscriptions) |
| **Blokir Paint**      | Ya (jika kode berat)           | Tidak                         |
| **SSR**               | Tidak direkomendasikan (menyebabkan peringatan) | Aman di SSR    |

---

### **3. Kapan Menggunakan `useLayoutEffect`?**
- **Membaca/mengukur DOM** (misal: ukuran elemen, posisi scroll).
- **Memodifikasi DOM secara sinkron** untuk menghindari "flicker" atau perubahan visual yang terlihat pengguna.
- **Animasi atau transisi** yang memerlukan pembaruan DOM sebelum paint.

---

### **4. Contoh Penggunaan**
#### a. **Mengukur Ukuran Elemen**
```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function MeasureElement() {
  const ref = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    // Ukur elemen setelah DOM diupdate
    const { width, height } = ref.current.getBoundingClientRect();
    setSize({ width, height });
  }, []); // Jalankan sekali saat mount

  return (
    <div>
      <div ref={ref} style={{ border: '1px solid red' }}>
        Ukuran: {size.width}x{size.height}
      </div>
    </div>
  );
}
```

#### b. **Menyesuaikan Posisi Tooltip**
```jsx
function Tooltip({ text }) {
  const tooltipRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Hitung posisi tooltip relatif terhadap parent
    const parentRect = tooltipRef.current.parentElement.getBoundingClientRect();
    const newPosition = {
      top: parentRect.top - 30,
      left: parentRect.left + parentRect.width / 2,
    };
    setPosition(newPosition);
  }, [text]); // Jalankan ulang saat `text` berubah

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      {text}
    </div>
  );
}
```

#### c. **Auto-Scroll ke Bawah List**
```jsx
function ChatList({ messages }) {
  const listRef = useRef();

  useLayoutEffect(() => {
    // Auto-scroll ke bawah saat pesan baru ditambahkan
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={listRef} style={{ height: '300px', overflowY: 'auto' }}>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

---

### **5. Peringatan Penting**
1. **Hindari Kode Berat di `useLayoutEffect`**  
   Karena dijalankan sebelum browser paint, kode yang lambat akan memblokir tampilan visual hingga selesai.  
   Contoh buruk:  
   ```javascript
   useLayoutEffect(() => {
     // Kode berat (misal: loop ribuan iterasi)
     for (let i = 0; i < 100000; i++) { /* ... */ }
   }, []);
   ```

2. **Masalah dengan Server-Side Rendering (SSR)**  
   `useLayoutEffect` tidak bekerja di server. Jika digunakan di SSR, React akan memberi peringatan.  
   Solusi:  
   - Gunakan `useEffect` untuk SSR.  
   - Atau, jalankan kode hanya di client dengan:  
     ```javascript
     useLayoutEffect(() => {
       if (typeof window !== 'undefined') {
         // Kode khusus client
       }
     }, []);
     ```

---

### **6. Best Practices**
- **Gunakan `useEffect` Sebagai Default**  
  Beralih ke `useLayoutEffect` hanya jika ada masalah visual yang perlu diatasi secara sinkron.

- **Optimasi Operasi DOM**  
  Pastikan operasi di `useLayoutEffect` cepat dan tidak menghambat paint.

- **Hindari State Update di `useLayoutEffect`**  
  Jika memungkinkan, gunakan untuk operasi DOM langsung, bukan update state yang memicu re-render.

---

### **Kapan Memilih `useLayoutEffect`?**
- Saat Anda perlu **membaca atau menulis DOM secara sinkron** sebelum browser paint (misal: menghitung posisi tooltip).
- Untuk **menghindari flicker** saat perubahan DOM harus langsung terlihat (misal: animasi transisi).

---

### **Kesimpulan**
`useLayoutEffect` adalah alat yang powerful untuk kasus khusus di mana pembaruan DOM harus terjadi **sebelum browser paint**. Gunakan dengan bijak untuk menghindari masalah performa dan kompatibilitas! 🚨