---
title: " Penggunaan React useMemo."
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-28T15:17:34.135Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useMemo` adalah hook di React yang digunakan untuk **memoize (menyimpan cache) nilai hasil komputasi**, sehingga komputasi tersebut tidak dijalankan ulang setiap kali komponen dirender, kecuali jika *dependency*-nya berubah. Ini berguna untuk mengoptimalkan performa, terutama ketika:

1. **Komputasi berat** (seperti filter array, kalkulasi matematika kompleks).
2. **Mencegah re-render komponen anak** yang bergantung pada nilai tersebut.
3. **Mempertahankan referensi objek/array** untuk mencegah efek samping di `useEffect`.

---

### **1. Sintaks Dasar**
```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b), // Fungsi yang menghasilkan nilai
  [a, b] // Dependency array (opsional)
);
```

---

### **2. Contoh Penggunaan**
#### a. **Filter Data (Optimasi Komputasi)**
```jsx
import { useMemo, useState } from 'react';

function ProductList({ products, searchTerm }) {
  // Hanya jalankan filter jika `products` atau `searchTerm` berubah
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

#### b. **Mempertahankan Referensi Objek**
```jsx
function UserProfile({ user }) {
  // Objek config tidak dibuat ulang kecuali `user.role` berubah
  const config = useMemo(() => ({
    theme: user.role === 'admin' ? 'dark' : 'light',
    permissions: ['read', 'write']
  }), [user.role]);

  useEffect(() => {
    // Efek ini hanya dijalankan jika `config` berubah
    console.log('Config diperbarui:', config);
  }, [config]);

  return <div>Profil Pengguna</div>;
}
```

---

### **3. Kapan Menggunakan `useMemo`?**
- **Komputasi intensif** (misal: sorting/filter data besar).
- **Mengirim nilai ke komponen anak yang di-optimasi** (seperti `React.memo`).
- **Mencegah re-render tidak perlu** karena perubahan referensi objek/array.

---

### **4. Perbedaan `useMemo` vs `useCallback`**
| **Kriteria**      | `useMemo`                      | `useCallback`                  |
|--------------------|--------------------------------|--------------------------------|
| **Return Value**   | Nilai hasil fungsi            | Fungsi itu sendiri            |
| **Contoh**         | `useMemo(() => [1,2,3], [])`  | `useCallback(() => {}, [])`   |
| **Penggunaan**     | Untuk memoize nilai            | Untuk memoize fungsi           |

---

### **5. Best Practices**
1. **Jangan Overuse**  
   Gunakan hanya untuk komputasi yang benar-benar berat. Overuse bisa menambah kompleksitas.

2. **Perhatikan Dependency Array**  
   Pastikan semua variabel yang digunakan di dalam fungsi dimasukkan ke dependency array:
   ```javascript
   // ❌ Salah (stale data jika `price` berubah)
   const total = useMemo(() => price * quantity, []);

   // ✅ Benar
   const total = useMemo(() => price * quantity, [price, quantity]);
   ```

3. **Pisahkan Logika Komputasi**  
   Untuk kode yang lebih bersih:
   ```javascript
   const calculateTotal = (price, quantity) => price * quantity;
   const total = useMemo(() => calculateTotal(price, quantity), [price, quantity]);
   ```

---

### **6. Contoh Kasus: Kalkulasi Kompleks**
```jsx
function Fibonacci({ n }) {
  const fibNumber = useMemo(() => {
    const calculateFib = (num) => {
      if (num <= 1) return num;
      return calculateFib(num - 1) + calculateFib(num - 2);
    };
    return calculateFib(n); // Komputasi berat untuk n besar
  }, [n]);

  return <p>Fibonacci ke-{n}: {fibNumber}</p>;
}
```

---

### **7. Kesalahan Umum**
#### a. **Lupa Dependency Array**  
Nilai akan dihitung ulang setiap render:
```javascript
const total = useMemo(() => price * quantity); // ❌
```

#### b. **Menyimpan Nilai Sederhana**  
Tidak perlu memoize operasi trivial:
```javascript
const total = useMemo(() => 10 + 20, []); // ❌ Tidak perlu
```

#### c. **Mengubah Nilai Langsung**  
Hindari mutasi objek/array:
```javascript
const user = useMemo(() => {
  const newUser = { ...prevUser }; // ✅ Salin objek
  newUser.age = 30;
  return newUser;
}, [prevUser]);
```

---

### **Kesimpulan**
Gunakan `useMemo` untuk:
- **Mengoptimalkan komputasi berat**.
- **Mencegah re-render komponen anak** yang bergantung pada nilai kompleks.
- **Mempertahankan referensi objek/array** yang stabil.

Hindari penggunaannya untuk nilai sederhana atau operasi trivial. Selalu evaluasi apakah optimasi ini benar-benar diperlukan! 🚀