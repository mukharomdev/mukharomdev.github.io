---
title: " Penggunaan React useState."
excerpt: "Berikut daftar hook React.js beserta penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-26T05:35:07.322Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---

`useState` adalah salah satu **React Hook** yang digunakan untuk menambahkan dan mengelola *state* (data yang dapat berubah) di dalam komponen fungsi React. Berikut penjelasan lengkap dan contoh penggunaannya:

---

### **1. Dasar Penggunaan `useState`**
#### Sintaks:
```javascript
const [state, setState] = useState(initialValue);
```
- **`state`**: Nilai state saat ini.
- **`setState`**: Fungsi untuk memperbarui state.
- **`initialValue`**: Nilai awal state (bisa berupa string, number, array, object, dll).

#### Contoh Sederhana (Counter):
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Inisialisasi state dengan nilai 0

  return (
    <div>
      <p>Hitungan: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(count - 1)}>Kurang</button>
    </div>
  );
}
```

---

### **2. Contoh Penggunaan Lain**
#### a. Form Input (Controlled Component):
```jsx
function Form() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state saat input berubah
        placeholder="Masukkan nama"
      />
      <p>Nama Anda: {name}</p>
    </div>
  );
}
```

#### b. State dengan Objek:
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    email: 'john@example.com'
  });

  const updateName = () => {
    // Salin nilai sebelumnya (...user) lalu update properti yang diinginkan
    setUser({ ...user, name: 'Jane' });
  };

  return (
    <div>
      <p>Nama: {user.name}</p>
      <p>Umur: {user.age}</p>
      <button onClick={updateName}>Ubah Nama ke Jane</button>
    </div>
  );
}
```

#### c. State dengan Array:
```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Belajar React', 'Makan Siang']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, input]); // Salin array lama dan tambah item baru
    setInput('');
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tambahkan todo"
      />
      <button onClick={addTodo}>Tambah</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **3. Aturan Penting**
1. **Jangan Mutasi State Langsung**:
   ```javascript
   // ❌ Salah
   user.name = 'Jane';
   setUser(user);

   // ✅ Benar
   setUser({ ...user, name: 'Jane' });
   ```

2. **Gunakan Functional Update untuk State yang Bergantung pada Nilai Sebelumnya**:
   ```javascript
   // ✅ Benar (untuk operasi seperti increment)
   setCount((prevCount) => prevCount + 1);
   ```

3. **State di Inisialisasi Hanya Sekali**:
   ```javascript
   // ✅ Jika inisialisasi memerlukan komputasi berat, gunakan fungsi:
   const [data] = useState(() => heavyComputation());
   ```

---

### **4. Perbedaan `useState` vs `useRef`**

| **Kriteria**         | `useState`                          | `useRef`                          |
|----------------------|-------------------------------------|-----------------------------------|
| **Re-render**        | Memicu re-render komponen           | Tidak memicu re-render            |
| **Penggunaan**       | Untuk data yang memengaruhi UI      | Untuk nilai yang tidak memengaruhi UI (seperti DOM, variabel persist) |
| **Nilai**            | Immutable (diubah via `setState`)   | Mutable (diubah via `ref.current`)|
| **Contoh Kasus**     | Form input, toggle UI, data dinamis | Fokus input, simpan interval timer |

---

### **5. Best Practices**
- **Pecah State Kompleks**: Jika state berupa objek/array, pertimbangkan untuk memisahkannya ke beberapa state.
  ```javascript
  // ❌ Kurang disarankan
  const [user, setUser] = useState({ name: '', age: 0 });

  // ✅ Lebih baik
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  ```

- **Hindari Penggunaan State untuk Data yang Tidak Di-render** (gunakan `useRef`).

---

### **Kapan Menggunakan `useState`?**
- Ketika data perlu **di-render di UI** (misal: form input, daftar data).
- Ketika perubahan data harus **memicu pembaruan tampilan**.
- Untuk logika yang memerlukan **reaktivitas** (perubahan data → perubahan UI).

---

### Contoh Lengkap: Toggle Komponen
```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? 'Matikan' : 'Nyalakan'}
      </button>
      <p>Status: {isOn ? 'Aktif' : 'Nonaktif'}</p>
    </div>
  );
}
```