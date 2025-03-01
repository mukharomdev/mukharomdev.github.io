---
title: " Penggunaan React useSyncExternalStore "
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-03-01T14:52:27.967Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useSyncExternalStore` adalah hook di React yang memungkinkan komponen untuk **berlangganan (subscribe) ke sumber data eksternal** di luar React (seperti store Redux, Zustand, atau browser APIs) dan tetap sinkron dengan perubahan yang terjadi. Hook ini sangat berguna untuk integrasi dengan sistem manajemen state eksternal atau data yang berubah di luar siklus hidup React.

---

### **Kapan Menggunakan `useSyncExternalStore`?**
1. **Integrasi dengan state eksternal** (contoh: global store seperti Redux).
2. **Berlangganan ke browser APIs** (seperti geolocation, online status, atau media queries).
3. **Menggunakan data dari WebSocket atau event-driven sources**.
4. **Menghindari masalah "tearing"** (ketidaksesuaian tampilan) saat menggunakan React Concurrent Features.

---

### **Sintaks Dasar**
```javascript
const state = useSyncExternalStore(
  subscribe, // Fungsi untuk subscribe ke perubahan
  getSnapshot, // Fungsi untuk mengambil nilai saat ini
  getServerSnapshot? // (Opsional) Fungsi untuk SSR
);
```

- **`subscribe`**: Fungsi yang mendaftarkan callback untuk dipanggil saat data eksternal berubah.
- **`getSnapshot`**: Fungsi yang mengembalikan nilai terbaru dari data eksternal.
- **`getServerSnapshot`**: Fungsi untuk mengambil nilai awal saat rendering di server (SSR).

---

### **Contoh Penggunaan**
#### 1. **Subscribe ke Store Eksternal Sederhana**
```javascript
// External store (contoh sederhana)
let counter = 0;
const listeners = new Set();

function increment() {
  counter++;
  listeners.forEach((listener) => listener());
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback); // Cleanup subscription
}

function getSnapshot() {
  return counter;
}

// Komponen React
function Counter() {
  const count = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

#### 2. **Subscribe ke Browser API (Online Status)**
```javascript
function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine // getSnapshot
  );

  return <div>Status: {isOnline ? 'Online' : 'Offline'}</div>;
}
```

#### 3. **Dengan Server-Side Rendering (SSR)**
```javascript
function StoreData() {
  const data = useSyncExternalStore(
    subscribe,
    getSnapshot,
    // getServerSnapshot (untuk SSR)
    () => 'Nilai awal dari server'
  );

  return <div>{data}</div>;
}
```

---

### **Perbandingan dengan Hook Lain**
| **Kriteria**          | `useSyncExternalStore`          | `useState` / `useEffect`       |
|-----------------------|---------------------------------|---------------------------------|
| **Sumber Data**       | Eksternal (di luar React)       | Internal React state            |
| **Penggunaan**        | Untuk integrasi dengan store    | Untuk state lokal komponen       |
| **SSR**               | Mendukung dengan `getServerSnapshot` | Membutuhkan penanganan manual |

---

### **Best Practices**
1. **Gunakan untuk Sumber Data Eksternal**: Jangan digunakan untuk state lokal komponen.
2. **Optimasi dengan `useMemo`**: Jika `subscribe` atau `getSnapshot` kompleks, gunakan `useMemo` untuk mencegah re-render tidak perlu.
   ```javascript
   const subscribe = useMemo(() => (callback) => {
     // Logika subscribe
   }, []);
   ```
3. **Hindari Side Effects di `getSnapshot`**: Fungsi ini harus murni (pure function).
4. **Handle Error dengan Baik**: Pastikan sumber data eksternal memiliki penanganan error.

---

### **Pitfall (Kesalahan Umum)**
- **Memory Leak**: Lupa melakukan unsubscribe di cleanup function.
- **Stale Closure**: Pastikan `getSnapshot` selalu mengembalikan nilai terbaru.
- **Tidak Support SSR**: Jika lupa menyediakan `getServerSnapshot`, mungkin menyebabkan hydration mismatch.

---

### **Contoh Integrasi dengan Zustand Store**
```javascript
import { useSyncExternalStore } from 'react';
import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

function UserProfile() {
  const user = useSyncExternalStore(
    useStore.subscribe,
    () => useStore.getState().user
  );

  return <div>{user ? user.name : 'Belum login'}</div>;
}
```

---

### **Kesimpulan**
`useSyncExternalStore` adalah hook yang powerful untuk:
- **Integrasi dengan sistem state eksternal** (Redux, Zustand, dll).
- **Subscribe ke data dinamis dari browser APIs**.
- **Mendukung SSR dengan aman** melalui `getServerSnapshot`.

Gunakan hook ini ketika Anda perlu **menghubungkan React dengan sumber data di luar ekosistem React**! 🚀