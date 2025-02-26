---
title: " Penggunaan React useCallback."
excerpt: "Berikut daftar hook React.js beserta penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/react-usestate/react-usestate.png"
date: "2025-02-26T05:35:07.322Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/react-usestate/react-usestate.png"

---

`useCallback` adalah hook di React yang digunakan untuk **memoize (menyimpan cache)** fungsi, sehingga fungsi tersebut tidak dibuat ulang setiap kali komponen dirender ulang, kecuali jika dependency-nya berubah. Ini berguna untuk mengoptimalkan performa, terutama ketika:

1. **Fungsi di-pass sebagai prop ke komponen anak** yang menggunakan optimasi seperti `React.memo`.
2. **Fungsi menjadi dependency di hook lain** (seperti `useEffect`).

---

### **1. Sintaks Dasar**
```javascript
const memoizedCallback = useCallback(
  () => { /* fungsi */ },
  [dependency1, dependency2] // Array dependency
);
```

---

### **2. Contoh Penggunaan**
#### a. **Mencegah Re-render Komponen Anak**
```jsx
import { useCallback, useState } from 'react';

// Komponen anak dengan React.memo
const ChildButton = React.memo(({ onClick }) => {
  console.log('Child dirender ulang');
  return <button onClick={onClick}>Klik Saya</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Tanpa useCallback:
  // const handleClick = () => setCount(count + 1);

  // Dengan useCallback (fungsi tidak dibuat ulang jika `count` tidak berubah):
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Recreate jika `count` berubah

  return (
    <div>
      <p>Hitungan: {count}</p>
      <ChildButton onClick={handleClick} />
    </div>
  );
}
```

#### b. **Digunakan dengan `useEffect`**
```jsx
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);

  // Fungsi fetchData tidak dibuat ulang kecuali `userId` berubah
  const fetchData = useCallback(async () => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    setData(await response.json());
  }, [userId]); // Dependency: userId

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Efek dijalankan hanya jika fetchData berubah

  return <div>{data ? data.name : 'Loading...'}</div>;
}
```

---

### **3. Kapan Menggunakan `useCallback`?**
- Saat **fungsi di-pass ke komponen anak** yang dioptimasi dengan `React.memo`.
- Ketika **fungsi menjadi dependency di hook lain** (misal: `useEffect`, `useMemo`).
- Untuk **mencegah re-render tidak perlu** akibat perubahan referensi fungsi.

---

### **4. Perbedaan `useCallback` vs `useMemo`**
| **Kriteria**      | `useCallback`                  | `useMemo`                     |
|--------------------|--------------------------------|-------------------------------|
| **Return Value**   | Memoize **fungsi**             | Memoize **nilai hasil fungsi**|
| **Contoh**         | `useCallback(() => {}, [])`    | `useMemo(() => 100, [])`      |
| **Penggunaan**     | Untuk callback/event handler  | Untuk nilai komputasi berat   |

---

### **5. Best Practices**
1. **Jangan Overuse**  
   Gunakan hanya jika benar-benar diperlukan. Overuse bisa meningkatkan penggunaan memori.

2. **Perhatikan Dependency Array**  
   Pastikan semua dependency yang digunakan di fungsi dimasukkan ke array:
   ```javascript
   // ❌ Salah (stale closure jika `count` berubah)
   const increment = useCallback(() => setCount(count + 1), []);

   // ✅ Benar
   const increment = useCallback(() => setCount(count + 1), [count]);
   ```

3. **Kombinasikan dengan `React.memo`**  
   Untuk komponen anak yang menerima fungsi sebagai prop:
   ```jsx
   const Child = React.memo(({ onClick }) => (
     <button onClick={onClick}>Child</button>
   ));
   ```

---

### **6. Contoh Kasus: Form Input dengan Validasi**
```jsx
function Form() {
  const [name, setName] = useState('');

  // Validasi tidak dibuat ulang kecuali dependency berubah
  const validateName = useCallback((value) => {
    return value.length >= 3;
  }, []); // Tidak ada dependency → fungsi tetap sama

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateName(name)) {
        alert(`Nama valid: ${name}`);
      }
    },
    [name, validateName] // Dependency: name dan validateName
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### **7. Kesalahan Umum**
#### a. **Lupa Dependency Array**  
Fungsi akan selalu dibuat ulang:
```javascript
const log = useCallback(() => console.log(count)); // ❌ Tidak ada dependency array
```

#### b. **Dependency Array Kosong**  
Menyebabkan **stale closure** (nilai state tidak update):
```javascript
const increment = useCallback(() => setCount(count + 1), []); // ❌
```

#### Solusi:  
Gunakan **functional update** untuk state yang bergantung pada nilai sebelumnya:
```javascript
const increment = useCallback(() => {
  setCount(prev => prev + 1); // ✅ Tidak perlu dependency `count`
}, []);
```

---

### **Kesimpulan**
Gunakan `useCallback` untuk:
- Mengoptimalkan komponen yang menerima **fungsi sebagai prop**.
- Mencegah **efek samping tidak perlu** di `useEffect`.
- Memastikan **referensi fungsi tetap stabil** selama dependency tidak berubah.

Hindari penggunaannya jika tidak diperlukan untuk mencegah kompleksitas yang tidak perlu!

