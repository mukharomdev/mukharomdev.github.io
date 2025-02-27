`useDebugValue` adalah hook di React yang digunakan untuk **menambahkan label atau informasi debug ke custom hooks** di React DevTools. Hook ini tidak memiliki efek pada logika aplikasi, tetapi membantu developer memahami nilai atau state yang ada di dalam custom hook saat debugging.

---

### **1. Kapan Menggunakan `useDebugValue`?**
- **Debugging custom hooks**: Memberikan informasi tambahan tentang state atau nilai di dalam custom hook.
- **Meningkatkan keterbacaan di React DevTools**: Menampilkan nilai penting dari custom hook secara langsung di DevTools.
- **Kolaborasi tim**: Memudahkan anggota tim untuk memahami alur data dalam custom hook.

---

### **2. Sintaks Dasar**
```javascript
useDebugValue(value);
useDebugValue(value, format); // Dengan fungsi format
```

- **`value`**: Nilai yang ingin ditampilkan di DevTools (bisa berupa string, number, object, atau array).
- **`format`** (opsional): Fungsi untuk memformat nilai sebelum ditampilkan (misalnya, mengubah object ke string yang lebih mudah dibaca).

---

### **3. Contoh Penggunaan**
#### a. **Custom Hook Sederhana (Counter)**
```jsx
import { useState, useDebugValue } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Tampilkan nilai `count` di React DevTools
  useDebugValue(count); // 🛠️ Di DevTools: "useCounter: 0"

  return { count, increment, decrement };
}

// Penggunaan di komponen:
function CounterComponent() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

#### b. **Custom Hook dengan Formatting**
```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useDebugValue(windowSize, (size) => 
    `Window Size: ${size.width}x${size.height}` // Format ke string
  ); // 🛠️ Di DevTools: "useWindowSize: Window Size: 1200x800"

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```

---

### **4. Hasil di React DevTools**
Setelah menggunakan `useDebugValue`, custom hook akan menampilkan nilai yang ditentukan di DevTools:  
![React DevTools dengan useDebugValue](https://i.imgur.com/9kzZJdL.png)

---

### **5. Best Practices**
1. **Gunakan untuk Custom Hooks**  
   `useDebugValue` hanya berguna di dalam **custom hooks**, bukan di komponen biasa.

2. **Format Nilai untuk Keterbacaan**  
   Jika nilai kompleks (seperti object), gunakan fungsi format untuk mengubahnya ke string yang lebih jelas:
   ```javascript
   useDebugValue(user, (user) => `User: ${user.name} (${user.email})`);
   ```

3. **Hindari Komputasi Berat**  
   Jika nilai memerlukan komputasi, gunakan fungsi format untuk optimasi (komputasi hanya dijalankan saat DevTools terbuka):
   ```javascript
   useDebugValue(data, (data) => heavyComputation(data));
   ```

4. **Hanya untuk Development**  
   `useDebugValue` tidak berpengaruh di **production build**, jadi tidak perlu khawatir tentang performa.

---

### **6. Kapan Tidak Menggunakan `useDebugValue`?**
- Di **komponen biasa** (hanya untuk custom hooks).
- Untuk **logika bisnis** (tidak memengaruhi perilaku aplikasi).
- Jika nilai tidak penting untuk debugging.

---

### **7. Contoh Kasus Lain**
#### a. Debugging Auth Hook
```jsx
function useAuth() {
  const [user, setUser] = useState(null);

  useDebugValue(user, (user) => 
    user ? `Logged in as ${user.name}` : "Not logged in"
  ); // 🛠️ Di DevTools: "useAuth: Logged in as John"

  const login = () => setUser({ name: 'John' });
  const logout = () => setUser(null);

  return { user, login, logout };
}
```

#### b. Debugging Form Hook
```jsx
function useForm(initialState) {
  const [form, setForm] = useState(initialState);

  useDebugValue(form); // 🛠️ Di DevTools: "useForm: { name: '', email: '' }"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange };
}
```

---

### **Kesimpulan**
`useDebugValue` adalah alat yang berguna untuk:
- **Meningkatkan pengalaman debugging** custom hooks di React DevTools.
- **Menyediakan informasi kontekstual** tentang state atau nilai dalam hook.
- **Memudahkan kolaborasi tim** dengan membuat logika hook lebih transparan.

Gunakan dengan bijak untuk custom hooks yang kompleks atau sering digunakan! 🔍