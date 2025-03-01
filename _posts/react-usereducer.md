---
title: " Penggunaan React useReducer"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-28T11:17:44.507Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useReducer` adalah hook di React untuk mengelola state yang kompleks dengan pola **reducer** (seperti Redux). Hook ini cocok digunakan ketika:

1. **State memiliki logika yang rumit** dengan banyak sub-nilai.
2. **State berikutnya bergantung pada state sebelumnya**.
3. Anda ingin memisahkan logika state dari komponen untuk meningkatkan keterbacaan.

Berikut penjelasan lengkap dan contoh penggunaannya:

---

### **1. Sintaks Dasar**
```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```
- **`reducer`**: Fungsi yang menentukan bagaimana state diperbarui.
- **`initialArg`**: Nilai awal state atau argumen untuk fungsi inisialisasi (`init`).
- **`init`** (opsional): Fungsi untuk inisialisasi state secara lazy.

---

### **2. Cara Kerja `useReducer`**
#### a. **Buat Reducer Function**
Reducer menerima `state` saat ini dan `action`, lalu mengembalikan state baru.
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'TAMBAH':
      return { count: state.count + 1 };
    case 'KURANGI':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

#### b. **Inisialisasi `useReducer` di Komponen**
```jsx
import { useReducer } from 'react';

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Hitungan: {state.count}</p>
      <button onClick={() => dispatch({ type: 'TAMBAH' })}>+</button>
      <button onClick={() => dispatch({ type: 'KURANGI' })}>-</button>
    </div>
  );
}
```

---

### **3. Contoh Lengkap: Todo List**
#### a. Definisi Reducer dan State Awal
```javascript
const initialState = {
  todos: [],
  input: ''
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'TAMBAH_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        input: ''
      };
    case 'HAPUS_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
```

#### b. Komponen Todo
```jsx
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.input.trim()) {
      dispatch({ type: 'TAMBAH_TODO', payload: state.input });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={state.input}
          onChange={(e) => 
            dispatch({ type: 'SET_INPUT', payload: e.target.value })
          }
        />
        <button type="submit">Tambah</button>
      </form>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button 
              onClick={() => dispatch({ type: 'HAPUS_TODO', payload: index })}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **4. Inisialisasi Lazy State**
Jika inisialisasi state memerlukan komputasi berat, gunakan fungsi sebagai argumen ketiga:
```javascript
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  // ...
}
```

---

### **5. Perbandingan `useReducer` vs `useState`**
| **Kriteria**      | `useReducer`                  | `useState`                   |
|--------------------|-------------------------------|------------------------------|
| **Kompleksitas**   | Cocok untuk state kompleks    | Cocok untuk state sederhana  |
| **Logika Update**  | Terpusat di reducer           | Tersebar di handler          |
| **Testing**        | Mudah (reducer pure function) | Lebih sulit                  |
| **Boilerplate**    | Lebih banyak                  | Minimal                      |

---

### **6. Kapan Menggunakan `useReducer`?**
- State memiliki **banyak sub-nilai** (contoh: form dengan banyak field).
- **Transisi state kompleks** (contoh: drag-and-drop, state machine).
- Logika state perlu **digunakan di banyak komponen** (kombinasikan dengan `useContext`).
- Untuk **optimisasi performa** (dispatch tidak berubah, cocok untuk optimisasi memoization).

---

### **7. Best Practices**
1. **Gunakan Aksi Terstandarisasi**  
   Definisikan tipe aksi sebagai konstanta untuk menghindari typo:
   ```javascript
   const ACTIONS = {
     TAMBAH_TODO: 'TAMBAH_TODO',
     HAPUS_TODO: 'HAPUS_TODO'
   };
   ```

2. **Pisahkan Reducer dari Komponen**  
   Simpan reducer di file terpisah agar mudah di-test dan di-reuse.

3. **Hindari Mutasi Langsung State**  
   Selalu kembalikan state baru (gunakan spread operator atau `Immer` untuk objek/array):
   ```javascript
   // ❌ Salah
   state.todos.push(action.payload);
   return state;

   // ✅ Benar
   return { ...state, todos: [...state.todos, action.payload] };
   ```

---

### **Contoh Lain: Form Kompleks**
```jsx
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

function UserForm() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={state.name}
        onChange={(e) => 
          dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })
        }
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) => 
          dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### **Kesimpulan**
`useReducer` adalah solusi ideal untuk mengelola state yang kompleks dan terstruktur, sementara `useState` lebih cocok untuk state sederhana. Pilih sesuai kebutuhan aplikasi!