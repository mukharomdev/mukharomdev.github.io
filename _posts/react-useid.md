---
title: " Penggunaan React useId"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-03-01T14:52:04.709Z
"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---

`useId` adalah hook di React yang digunakan untuk **menghasilkan ID unik yang stabil** baik di sisi klien (client-side) maupun server (server-side). Hook ini terutama berguna untuk menghindari masalah *hydration mismatch* saat menggunakan Server-Side Rendering (SSR) dan untuk keperluan aksesibilitas seperti menghubungkan label dengan input menggunakan atribut `htmlFor` dan `id`.

---

### **Kapan Menggunakan `useId`?**
1. **Aksesibilitas**: Mengaitkan `<label>` dengan `<input>` menggunakan `htmlFor` dan `id`.
2. **Komponen yang Dirender di Server (SSR)**: Menghindari perbedaan ID antara server dan klien.
3. **Elemen yang Membutuhkan ID Unik**: Seperti elemen ARIA (aria-labelledby, aria-describedby) atau komponen kustom.

---

### **Sintaks Dasar**
```javascript
const id = useId();
```

---

### **Contoh Penggunaan**
#### 1. **Label dan Input**
```jsx
import { useId } from 'react';

function InputField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Nama:</label>
      <input type="text" id={id} />
    </div>
  );
}
```

#### 2. **Komponen dengan Beberapa ID**
```jsx
function LoginForm() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <form>
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input type="email" id={emailId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:</label>
        <input type="password" id={passwordId} />
      </div>
    </form>
  );
}
```

#### 3. **Kompleks dengan Suffix/Prefix**
```jsx
function Accordion() {
  const id = useId();

  return (
    <div>
      <button aria-controls={`${id}-panel`} id={`${id}-button`}>
        Toggle Panel
      </button>
      <div id={`${id}-panel`} aria-labelledby={`${id}-button`}>
        Konten panel...
      </div>
    </div>
  );
}
```

---

### **Mengapa Tidak Boleh Menggunakan `Math.random()` atau Counter?**
- **`Math.random()`**: Menghasilkan ID berbeda setiap render → menyebabkan *hydration mismatch* di SSR.
- **Counter**: ID tidak unik antar komponen atau sesi.
- **`useId`**: Menjamin ID stabil dan unik di seluruh komponen, baik di server maupun klien.

---

### **Aturan Penting**
1. **Jangan Gunakan untuk Key dalam List**  
   `useId` tidak dirancang untuk `key` di list. Gunakan ID dari data atau hash unik.
   ```jsx
   // ❌ Salah
   {items.map((item) => (
     <div key={useId()}>{item}</div>
   ))}

   // ✅ Benar
   {items.map((item) => (
     <div key={item.id}>{item.name}</div>
   ))}
   ```

2. **Hanya untuk ID yang Terkait dengan HTML**  
   Jangan gunakan untuk keperluan lain seperti CSS-in-JS atau ID kustom untuk logika bisnis.

---

### **Perbandingan dengan Cara Lain**
| **Metode**          | **Masalah**                          | **Solusi `useId`**                  |
|---------------------|--------------------------------------|--------------------------------------|
| `Math.random()`     | ID berbeda setiap render             | ID stabil antar server dan klien    |
| `crypto.randomUUID()`| Tidak bekerja di SSR                 | Mendukung SSR                       |
| Manual counter      | ID tidak unik antar komponen         | ID unik global                      |

---

### **Best Practices**
- **Gunakan untuk Aksesibilitas**: Pastikan atribut `id` dan `htmlFor` selalu terhubung.
- **Hindari Concatenasi Manual**: Jika membutuhkan beberapa ID dalam satu komponen, gunakan suffix/prefix:
  ```jsx
  const id = useId();
  const inputId = `${id}-input`;
  const labelId = `${id}-label`;
  ```
- **SSR/Next.js**: Tidak perlu konfigurasi khusus. `useId` otomatis bekerja dengan baik.

---

### **Contoh Lengkap: Form dengan Validasi**
```jsx
function SignupForm() {
  const emailId = useId();
  const passwordId = useId();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements[emailId].value;
    if (!email.includes('@')) {
      setError('Email tidak valid');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input type="email" id={emailId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:</label>
        <input type="password" id={passwordId} />
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Daftar</button>
    </form>
  );
}
```

---

### **Kesimpulan**
`useId` adalah solusi React untuk:
- Menghasilkan **ID unik yang stabil** di server dan klien.
- Mencegah masalah **hydration mismatch** di SSR.
- Meningkatkan **aksesibilitas** dengan menghubungkan elemen HTML.

Gunakan hook ini untuk semua kebutuhan ID yang terkait dengan markup HTML! 🛠️