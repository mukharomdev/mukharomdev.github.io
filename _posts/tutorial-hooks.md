---
title: "Tutorial Singkat Penggunaan React Hooks."
excerpt: "Berikut daftar hook React.js beserta penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react2.png"
date: "2025-02-26T05:35:07.322Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react2.png"

---
Berikut daftar hook React.js beserta penjelasan dan contoh penggunaannya:

---

### 1. **`useState`**
**Kegunaan**: Mengelola state dalam komponen fungsi.  
**Contoh**:
```jsx
const [count, setCount] = useState(0); // Inisialisasi state dengan nilai 0

return (
  <button onClick={() => setCount(count + 1)}>
    Klik saya: {count}
  </button>
);
```

---

### 2. **`useEffect`**
**Kegunaan**: Menangani efek samping (side effects) seperti API calls, subscriptions, atau manipulasi DOM.  
**Contoh**:
```jsx
useEffect(() => {
  console.log("Komponen dimount atau count berubah");
  return () => {
    console.log("Cleanup sebelum efek berikutnya");
  };
}, [count]); // Efek dijalankan ketika `count` berubah
```

---

### 3. **`useContext`**
**Kegunaan**: Mengakses nilai dari React Context.  
**Contoh**:
```jsx
const ThemeContext = React.createContext('light');

function Button() {
  const theme = useContext(ThemeContext); // Ambil nilai tema
  return <button className={theme}>Tombol</button>;
}
```

---

### 4. **`useReducer`**
**Kegunaan**: Mengelola state kompleks dengan pola Redux.  
**Contoh**:
```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
<button onClick={() => dispatch({ type: 'increment' })}>
  Hitung: {state.count}
</button>
```

---

### 5. **`useCallback`**
**Kegunaan**: Memoisasi fungsi untuk menghindari re-render tidak perlu.  
**Contoh**:
```jsx
const handleClick = useCallback(() => {
  console.log("Tombol diklik");
}, []); // Fungsi tidak dibuat ulang kecuali dependency berubah
```

---

### 6. **`useMemo`**
**Kegunaan**: Memoisasi nilai hasil komputasi mahal.  
**Contoh**:
```jsx
const expensiveValue = useMemo(() => {
  return a * b; // Hanya dihitung ulang jika `a` atau `b` berubah
}, [a, b]);
```

---

### 7. **`useRef`**
**Kegunaan**: Menyimpan referensi DOM atau nilai yang persist antar-render.  
**Contoh**:
```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>
  Fokus Input
</button>
```

---

### 8. **`useImperativeHandle`**
**Kegunaan**: Menyesuaikan nilai instance yang diekspos ke komponen parent via `ref`.  
**Contoh**:
```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  return <input ref={inputRef} />;
});
```

---

### 9. **`useLayoutEffect`**
**Kegunaan**: Mirip `useEffect`, tetapi dijalankan secara sinkron setelah DOM dimutasi.  
**Contoh**:
```jsx
useLayoutEffect(() => {
  // Ukur dimensi DOM di sini
  const width = element.current.offsetWidth;
}, [deps]);
```

---

### 10. **`useDebugValue`**
**Kegunaan**: Menampilkan label kustom di React DevTools untuk custom hook.  
**Contoh**:
```jsx
function useCustomHook() {
  const status = "Online";
  useDebugValue(status); // Tampilkan "Online" di DevTools
  return status;
}
```

---

### 11. **`useDeferredValue`** (React 18+)
**Kegunaan**: Menunda pembaruan UI untuk nilai tertentu (optimisasi performa).  
**Contoh**:
```jsx
const deferredValue = useDeferredValue(value); // Tunda pembaruan `value`
return <List items={deferredValue} />;
```

---

### 12. **`useTransition`** (React 18+)
**Kegunaan**: Menandai pembaruan state sebagai transisi (non-blocking).  
**Contoh**:
```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setState(newState); // Pembaruan dianggap sebagai transisi
});
```

---

### 13. **`useId`** (React 18+)
**Kegunaan**: Membuat ID unik yang stabil di server dan client.  
**Contoh**:
```jsx
const id = useId(); // Contoh output: ":r1:"
return <label htmlFor={id}>Label</label>;
```

---

### 14. **`useSyncExternalStore`** (React 18+)
**Kegunaan**: Subscribe ke external store (e.g., state management eksternal).  
**Contoh**:
```jsx
const state = useSyncExternalStore(
  store.subscribe,
  store.getState
);
```

---

### Catatan:
- **Hooks dengan `use`** hanya bisa dipanggil di komponen fungsi atau custom hook.
- **Dependency Array** pada `useEffect`, `useCallback`, dan `useMemo` menentukan kapan efek/fungsi/nilai diperbarui.
- **Hooks React 18+** memerlukan versi React 18 atau lebih baru.