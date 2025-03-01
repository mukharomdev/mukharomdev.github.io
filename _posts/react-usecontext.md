---
title: " Penggunaan React useContext"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-27T16:48:55.696Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---

**useContext** adalah hook di React yang memungkinkan Anda **mengakses nilai context** secara langsung di dalam komponen tanpa harus melewati props secara manual (prop drilling). Berikut penjelasan lengkap beserta contoh penggunaannya:

---

### **1. Konsep Dasar Context**
Context digunakan untuk **berbagi data** antar komponen dalam hierarki komponen tanpa harus mengirim props secara eksplisit. Contoh kasus: tema aplikasi, data user yang login, atau preferensi bahasa.

---

### **2. Langkah Menggunakan `useContext`**
#### a. **Buat Context**  
Gunakan `createContext()` untuk membuat context:
```jsx
import { createContext } from 'react';

// 1. Buat context dengan nilai default
const ThemeContext = createContext('light'); // 'light' adalah nilai default
```

#### b. **Provider Component**  
Bungkus komponen anak dengan `Provider` untuk menyediakan nilai context:
```jsx
function App() {
  const [theme, setTheme] = useState('dark');

  // 2. Berikan nilai context ke komponen anak
  return (
    <ThemeContext.Provider value={theme}>
      <Navbar />
      <button onClick={() => setTheme('dark')}>Ganti Tema</button>
    </ThemeContext.Provider>
  );
}
```

#### c. **Konsumsi Context dengan `useContext`**  
Akses nilai context di komponen anak:
```jsx
import { useContext } from 'react';

function Navbar() {
  // 3. Ambil nilai context
  const theme = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === 'dark' ? '#333' : '#eee' }}>
      Navbar ({theme})
    </nav>
  );
}
```

---

### **3. Contoh Lengkap: Tema Aplikasi**
#### a. Buat Context dan Provider
```jsx
// ThemeContext.js
import { createContext, useState } from 'react';

export const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### b. Gunakan Provider di Root Komponen
```jsx
// App.js
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}
```

#### c. Akses Context di Komponen Anak
```jsx
// Header.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Tema
      </button>
    </header>
  );
}
```

---

### **4. Aturan Penting**
1. **Provider Harus Membungkus Komponen Anak**  
   Pastikan komponen yang mengakses context berada di dalam `<Context.Provider>`.

2. **Nilai Context Bisa Berupa Apa Saja**  
   Nilai context bisa berupa string, objek, array, atau bahkan fungsi:
   ```jsx
   <UserContext.Provider value={{ user, setUser, logout }}>
     {children}
   </UserContext.Provider>
   ```

3. **Gunakan Context untuk Data yang Sering Diakses Global**  
   Contoh: autentikasi, tema, bahasa, atau konfigurasi.

---

### **5. Perbandingan `useContext` vs. Props Drilling**
| **Kriteria**      | **useContext**                  | **Props Drilling**                |
|--------------------|-----------------------------------|------------------------------------|
| **Kompleksitas**   | Minimal (akses langsung)         | Tinggi (kirim props ke banyak level)|
| **Keterbacaan**    | Lebih mudah                      | Rentan "spaghetti code"           |
| **Kasus Penggunaan**| Data global (tema, user)         | Data lokal antar 1-2 komponen     |

---

### **6. Best Practices**
- **Pisahkan Context Berdasarkan Fungsi**  
  Buat context terpisah untuk tema, user, dll., daripada satu context besar.
  
  ```jsx
  const ThemeContext = createContext();
  const UserContext = createContext();
  ```

- **Hindari Re-render Tidak Perlu**  
  Jika nilai context sering berubah, gunakan `useMemo` atau `memo` untuk optimisasi:
  ```jsx
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  ```

- **Gunakan Custom Hook untuk Context**  
  Contoh:
  ```jsx
  export function useTheme() {
    return useContext(ThemeContext);
  }
  ```

---

### **Kapan Menggunakan `useContext`?**
- Saat perlu **berbagi data** ke banyak komponen (misal: user login, tema).
- Untuk menghindari **prop drilling** yang rumit.
- Jika data **tidak sering berubah** (untuk data dinamis kompleks, pertimbangkan Redux/Zustand).

---

### Contoh Lain: User Authentication
```jsx
// UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Gunakan di komponen:
function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout {user.name}</button>
      ) : (
        <p>Silakan login</p>
      )}
    </div>
  );
}
```