---
title: " Penggunaan React useRef"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-28T15:28:31.153Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useRef` adalah hook di React yang digunakan untuk membuat referensi yang dapat dimutasi (mutable) dan bertahan sepanjang siklus hidup komponen. Berikut penjelasan lengkap beserta contoh penggunaannya:

### 1. **Mengakses DOM Element Langsung**
`useRef` sering digunakan untuk mengakses elemen DOM secara langsung, seperti fokus pada input.

```jsx
import { useRef } from 'react';

function InputFocus() {
  // 1. Buat ref
  const inputRef = useRef(null);

  const handleClick = () => {
    // 3. Akses DOM element via ref.current
    inputRef.current.focus();
  };

  return (
    <div>
      {/* 2. Attach ref ke elemen JSX */}
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Fokus Input</button>
    </div>
  );
}
```

### 2. **Menyimpan Nilai yang Tidak Menyebabkan Re-render**
`useRef` bisa menyimpan nilai (seperti variabel) yang tetap bertahan antar-render, tetapi perubahan tidak memicu re-render.

```jsx
import { useRef, useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(); // Simpan ID interval

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Hitungan: {count}</p>
      <button onClick={stopTimer}>Hentikan Timer</button>
    </div>
  );
}
```

### 3. **Menyimpan Nilai Sebelumnya (Previous Value)**
Contoh menyimpan nilai state sebelumnya:

```jsx
import { useRef, useEffect, useState } from 'react';

function PreviousValue() {
  const [name, setName] = useState('');
  const prevNameRef = useRef('');

  useEffect(() => {
    prevNameRef.current = name; // Update ref setelah render
  }, [name]);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Sekarang: {name}</p>
      <p>Sebelumnya: {prevNameRef.current}</p>
    </div>
  );
}
```

### Perbedaan `useRef` vs. `useState`
| **Fitur**          | **useRef**                     | **useState**                   |
|---------------------|--------------------------------|--------------------------------|
| Re-render           | Tidak memicu re-render         | Memicu re-render               |
| Nilai               | Mutable (bisa diubah langsung) | Immutable (diubah via setState)|
| Penggunaan          | Akses DOM, nilai persist       | Data yang memengaruhi UI       |

### Catatan Penting:
- **Nilai `ref.current`** diinisialisasi saat komponen dipasang (mount) dan tetap ada hingga komponen di-unmount.
- **Perubahan `ref.current` bersifat sinkronus** (langsung terupdate).
- **Jangan gunakan ref untuk nilai yang memengaruhi UI** (gunakan `useState` atau `useEffect`).

### Kapan Menggunakan `useRef`?
- Manipulasi DOM langsung (fokus, scroll, animasi).
- Menyimpan nilai seperti timer ID, instance library eksternal, atau variabel yang perlu persist.
- Menyimpan nilai sebelumnya (previous state) untuk keperluan komparasi.