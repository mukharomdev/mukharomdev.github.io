---
title: " Daftar eventHandler di React."
excerpt: "Berikut daftar event Handler React.js beserta penjelasan dan contoh penggunaannya:"
coverImage: "/assets/blog/react-usestate/react-usestate.png"
date: "2025-02-28T05:35:07.322Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/react-usestate/react-usestate.png"

---

Berikut adalah daftar **event handler** umum yang digunakan di React, dikelompokkan berdasarkan kategori:

---

### **1. Mouse Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onClick`             | Klik kiri mouse                               |
| `onDoubleClick`       | Klik ganda                                    |
| `onMouseDown`         | Saat tombol mouse ditekan                     |
| `onMouseUp`           | Saat tombol mouse dilepas                     |
| `onMouseEnter`        | Saat kursor masuk ke area elemen              |
| `onMouseLeave`        | Saat kursor keluar dari area elemen           |
| `onMouseOver`         | Saat kursor berada di atas elemen             |
| `onMouseOut`          | Saat kursor keluar dari elemen atau anaknya   |
| `onContextMenu`       | Klik kanan mouse                              |

**Contoh:**
```jsx
<button onClick={() => console.log("Diklik!")}>Klik Saya</button>
```

---

### **2. Keyboard Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onKeyDown`           | Saat tombol keyboard ditekan                  |
| `onKeyUp`             | Saat tombol keyboard dilepas                  |
| `onKeyPress`          | Saat tombol ditekan (tidak termasuk modifier keys seperti `Shift`) |

**Contoh:**
```jsx
<input 
  onKeyDown={(e) => {
    if (e.key === 'Enter') console.log("Enter ditekan!");
  }}
/>
```

---

### **3. Form Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onChange`            | Saat nilai input/select/textarea berubah      |
| `onSubmit`            | Saat form di-submit                           |
| `onInput`             | Saat nilai input berubah (lebih cepat dari `onChange`) |
| `onInvalid`           | Saat form input tidak valid                   |
| `onReset`             | Saat form di-reset                            |

**Contoh:**
```jsx
<form onSubmit={(e) => {
  e.preventDefault();
  console.log("Form di-submit!");
}}>
  <input type="text" onChange={(e) => console.log(e.target.value)} />
</form>
```

---

### **4. Focus & Blur Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onFocus`             | Saat elemen mendapat fokus                    |
| `onBlur`              | Saat elemen kehilangan fokus                  |

**Contoh:**
```jsx
<input 
  onFocus={() => console.log("Input fokus!")}
  onBlur={() => console.log("Input kehilangan fokus!")}
/>
```

---

### **5. Touch Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onTouchStart`        | Saat jari menyentuh layar                     |
| `onTouchEnd`          | Saat jari diangkat dari layar                 |
| `onTouchMove`         | Saat jari bergerak di layar                   |
| `onTouchCancel`       | Saat sentuhan dibatalkan                      |

---

### **6. Drag & Drop Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onDrag`              | Saat elemen di-drag                           |
| `onDragStart`         | Saat drag dimulai                             |
| `onDragEnd`           | Saat drag selesai                             |
| `onDragOver`          | Saat elemen di-drag di atas target            |
| `onDrop`              | Saat elemen di-drop ke target                 |

---

### **7. Clipboard Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onCopy`              | Saat konten di-copy                           |
| `onCut`               | Saat konten di-cut                            |
| `onPaste`             | Saat konten di-paste                          |

**Contoh:**
```jsx
<div 
  onCopy={() => console.log("Teks di-copy!")}
  onPaste={() => console.log("Teks di-paste!")}
>
  Salin teks ini.
</div>
```

---

### **8. Media Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onPlay`              | Saat media mulai diputar                      |
| `onPause`             | Saat media dijeda                             |
| `onEnded`             | Saat media selesai diputar                    |
| `onVolumeChange`      | Saat volume diubah                            |

---

### **9. Scroll Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onScroll`            | Saat elemen di-scroll                         |

---

### **10. Image Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onLoad`              | Saat gambar selesai dimuat                    |
| `onError`             | Saat gambar gagal dimuat                      |

**Contoh:**
```jsx
<img 
  src="image.jpg" 
  onLoad={() => console.log("Gambar dimuat!")}
  onError={() => console.log("Gagal memuat gambar!")}
/>
```

---

### **11. Animation/Transition Events**
| **Event Handler**     | **Keterangan**                                 |
|-----------------------|-----------------------------------------------|
| `onAnimationStart`    | Saat animasi CSS dimulai                      |
| `onAnimationEnd`      | Saat animasi CSS selesai                      |
| `onTransitionEnd`     | Saat transisi CSS selesai                     |

---

### **12. Window/Global Events**
Untuk event global seperti `resize` atau `scroll`, gunakan `useEffect`:
```jsx
useEffect(() => {
  const handleResize = () => console.log("Ukuran window berubah!");
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

### **Catatan Penting:**
1. **Synthetic Events**:  
   React menggunakan *synthetic events* (event wrapper) untuk konsistensi di semua browser.  
   Contoh: `e.preventDefault()` untuk mencegah perilaku default.

2. **Event Pooling**:  
   Objek event di React di-reuse untuk optimasi. Jika perlu akses event secara asinkron, gunakan `e.persist()`.

3. **Parameter Event**:  
   Event handler menerima objek event sebagai argumen pertama:
   ```jsx
   <button onClick={(e) => console.log(e.target)}>Klik</button>
   ```

4. **Perbedaan dengan DOM Native Events**:  
   - Nama event camelCase (bukan lowercase).  
   - Handler di-pass sebagai prop (bukan string).  
   Contoh: `onclick` → `onClick`, `onsubmit` → `onSubmit`.

---

Semoga daftar ini membantu! 🚀