`useDeferredValue` adalah hook di React yang digunakan untuk **menunda pembaruan nilai** yang tidak prioritas/urgent, sehingga memungkinkan komponen untuk tetap responsif saat menangani operasi berat atau pembaruan yang lambat. Hook ini sering digunakan bersama dengan `Suspense` dan fitur Concurrent Mode untuk mengoptimalkan performa UI.

---

### **1. Kapan Menggunakan `useDeferredValue`?**
- **Menunda render konten yang berat** (misal: hasil pencarian, daftar besar).
- **Mengoptimalkan responsivitas input** (misal: input pencarian yang memicu render data besar).
- **Mencegah UI "lag"** saat menunggu operasi asinkron (seperti fetching data).

---

### **2. Sintaks Dasar**
```javascript
const deferredValue = useDeferredValue(value);
```
- **`value`**: Nilai yang ingin ditunda pembaruannya.
- **`deferredValue`**: Nilai yang di-defer (bisa sama dengan `value` atau nilai sebelumnya selama pembaruan tertunda).

---

### **3. Contoh Penggunaan**
#### a. **Input Pencarian dengan Hasil yang Ditunda**
```jsx
import { useState, useDeferredValue, memo } from 'react';

function SearchResults({ query }) {
  // Simulasi data besar (misal: 10.000 item)
  const items = Array(10000).fill(null).map((_, i) => `Item ${i + 1} untuk "${query}"`);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Komponen hasil pencarian di-memo untuk optimisasi
const MemoizedResults = memo(SearchResults);

function SearchApp() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // Tunda pembaruan query

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari..."
      />
      {/* Tampilkan hasil pencarian yang di-defer */}
      <MemoizedResults query={deferredQuery} />
    </div>
  );
}
```

#### b. **Optimasi Transisi dengan `useDeferredValue`**
```jsx
function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ketik sesuatu..."
      />
      {/* Komponen berat yang di-defer */}
      <HeavyComponent text={deferredText} />
    </div>
  );
}

// Komponen yang render-nya lambat
const HeavyComponent = memo(({ text }) => {
  // Simulasi komputasi berat
  const items = Array(1000).fill(null).map((_, i) => text.repeat(100));

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item.substring(0, 10)}...</div>
      ))}
    </div>
  );
});
```

---

### **4. Cara Kerja `useDeferredValue`**
- Saat nilai asli (`value`) berubah, React akan:
  1. **Render ulang komponen dengan nilai sebelumnya** (stale value) untuk menjaga UI responsif.
  2. **Render ulang di latar belakang** dengan nilai baru.
  3. **Tampilkan nilai baru** begitu siap (tanpa memblokir interaksi pengguna).

---

### **5. Perbedaan `useDeferredValue` vs `useTransition`**
| **Kriteria**          | `useDeferredValue`              | `useTransition`               |
|-----------------------|----------------------------------|--------------------------------|
| **Penggunaan**        | Untuk nilai (value)             | Untuk transisi state           |
| **Contoh Kasus**      | Menunda render data pencarian   | Menunda navigasi halaman       |
| **Cara Akses**        | Langsung ke nilai               | Menggunakan `startTransition`  |
| **Prioritas**         | Rendah (deferred)               | Dapat diatur dengan prioritas  |

---

### **6. Best Practices**
1. **Kombinasikan dengan `memo` atau `useMemo`**  
   Untuk mencegah render ulang komponen anak yang tidak perlu:
   ```jsx
   const MemoizedComponent = memo(HeavyComponent);
   ```

2. **Gunakan untuk Nilai yang Sering Berubah**  
   Contoh: input pencarian real-time yang memicu operasi berat.

3. **Hindari untuk Pembaruan Urgent**  
   Misal: animasi, input yang harus langsung merespons (seperti toggle).

4. **Integrasi dengan `Suspense`**  
   Untuk menampilkan fallback UI saat operasi asinkron sedang berjalan:
   ```jsx
   <Suspense fallback={<Spinner />}>
     <MemoizedResults query={deferredQuery} />
   </Suspense>
   ```

---

### **7. Contoh dengan Fetching Data**
```jsx
function SearchApp() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = useFetchData(deferredQuery); // Simulasi fetching data

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
      />
      <Suspense fallback={<div>Memuat...</div>}>
        <SearchResults results={results} />
      </Suspense>
    </div>
  );
}
```

---

### **Kesimpulan**
`useDeferredValue` berguna untuk:
- **Meningkatkan responsivitas UI** dengan menunda pembaruan yang tidak kritis.
- **Mengoptimalkan render komponen berat** (seperti daftar besar atau data kompleks).
- **Mencegah lag** saat pengguna berinteraksi dengan input yang cepat (seperti pencarian).

Gunakan hook ini untuk kasus di mana **pengalaman pengguna lebih penting daripada pembaruan instan**! 🚀