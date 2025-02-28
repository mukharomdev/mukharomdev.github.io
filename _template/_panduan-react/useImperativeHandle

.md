---
title: " Penggunaan React useImperativeHandle"
excerpt: "Berikut penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/reacts/react1.png"
date: "2025-02-28T15:49:51.037Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/reacts/react1.png"

---
`useImperativeHandle` adalah hook di React yang digunakan untuk **menyesuaikan nilai instance (metode atau properti) yang diekspos ke komponen parent** ketika menggunakan `ref` pada komponen anak. Hook ini umumnya dipakai bersama `forwardRef` untuk mengontrol perilaku komponen anak secara imperatif (seperti memanggil fungsi atau mengakses nilai langsung).

---

### **Kapan Menggunakan `useImperativeHandle`?**
1. Saat ingin **membatasi akses parent** ke metode/properti tertentu dari komponen anak.
2. Untuk **integrasi dengan library eksternal** (misalnya, mengontrol DOM element secara imperatif).
3. Ketika perlu **mengakses fungsi komponen anak secara langsung** (contoh: fokus input, play/pause video).

---

### **Sintaks Dasar**
```javascript
useImperativeHandle(ref, () => ({
  // Metode/properti yang ingin diekspos ke parent
}), [dependencies]);
```

---

### **Contoh Penggunaan**
#### 1. **Komponen Anak dengan Metode Imperatif**
```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

// Komponen anak menggunakan forwardRef
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Ekspos metode focus dan getValue ke parent
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    getValue: () => inputRef.current.value,
  }), []); // Dependency array kosong → hanya dijalankan sekali

  return <input ref={inputRef} {...props} />;
});

// Komponen Parent
function Parent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus(); // Panggil metode focus dari parent
    console.log('Nilai input:', inputRef.current.getValue());
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>Fokus Input</button>
    </div>
  );
}
```

#### 2. **Integrasi dengan Video Player**
```jsx
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    isPlaying: () => !videoRef.current.paused,
  }), []);

  return <video ref={videoRef} src="video.mp4" />;
});

function App() {
  const playerRef = useRef();

  return (
    <div>
      <VideoPlayer ref={playerRef} />
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
    </div>
  );
}
```

---

### **Aturan Penting**
1. **Wajib Digunakan dengan `forwardRef`**  
   Komponen anak harus dibungkus dengan `forwardRef` untuk menerima `ref` dari parent.

2. **Hanya Ekspos yang Diperlukan**  
   Batasi metode/properti yang diekspos untuk mengurangi kompleksitas.

3. **Perhatikan Dependency Array**  
   Jika metode bergantung pada nilai state/props, tambahkan ke dependency array:
   ```javascript
   const [count, setCount] = useState(0);

   useImperativeHandle(ref, () => ({
     getCount: () => count, // Perbarui saat `count` berubah
   }), [count]);
   ```

---

### **Perbandingan `useImperativeHandle` vs. `ref` Biasa**
| **Kriteria**          | `useImperativeHandle`          | `ref` Biasa                  |
|-----------------------|--------------------------------|------------------------------|
| **Akses ke Instance** | Terbatas (hanya yang diekspos) | Full akses ke DOM/node       |
| **Kontrol**           | Parent mengontrol secara terbatas | Parent bisa manipulasi langsung |
| **Kasus Penggunaan**  | Komponen dengan API spesifik   | Integrasi DOM/library eksternal |

---

### **Best Practices**
- **Gunakan untuk Kasus Spesifik**: Hindari penggunaan berlebihan. Sebisa mungkin, gunakan komunikasi data via props/state.
- **Encapsulation**: Sembunyikan detail internal komponen anak.
- **Type Safety (TypeScript)**: Jika menggunakan TypeScript, definisikan tipe untuk ref:
  ```typescript
  type VideoPlayerHandle = {
    play: () => void;
    pause: () => void;
    isPlaying: () => boolean;
  };

  const VideoPlayer = forwardRef<VideoPlayerHandle>((props, ref) => {
    // ...
  });
  ```

---

### **Kesalahan Umum**
1. **Lupa Dependency Array**  
   Jika metode bergantung pada nilai yang berubah, pastikan untuk menambahkannya ke dependency array untuk menghindari *stale closure*.

2. **Ekspos Seluruh Instance**  
   Jangan mengekspos semua metode DOM (misal: `ref.current` langsung), karena bisa menyebabkan ketidakkonsistenan.

---

### **Kesimpulan**
`useImperativeHandle` berguna ketika:
- Parent perlu **mengontrol komponen anak secara imperatif**.
- Anda ingin **membatasi akses parent** ke fungsi tertentu.
- Berintegrasi dengan **library pihak ketiga yang memerlukan ref**.

Gunakan dengan bijak untuk menjaga prinsip **enkapsulasi** dan **keterbacaan kode**! 🛠️