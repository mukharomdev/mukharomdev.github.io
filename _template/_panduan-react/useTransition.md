`useTransition` adalah hook di React yang digunakan untuk **mengontrol prioritas pembaruan state** sehingga pembaruan yang tidak urgent (seperti render data besar atau navigasi halaman) tidak memblokir interaksi pengguna. Hook ini memungkinkan Anda menandai pembaruan state sebagai "transisi" yang bisa ditunda, sehingga UI tetap responsif.  

---

### **Kapan Menggunakan `useTransition`?**
1. **Navigasi antar halaman/komponen** yang memuat data berat.
2. **Filter/operasi pencarian** yang memicu render besar.
3. **Mengoptimalkan responsivitas UI** saat pengguna melakukan interaksi (klik, input).
4. **Mencegah "lag"** saat pembaruan state memakan waktu lama.

---

### **Sintaks Dasar**
```javascript
const [isPending, startTransition] = useTransition();
```
- **`isPending`**: Boolean yang menandakan apakah transisi sedang berlangsung.
- **`startTransition`**: Fungsi untuk membungkus pembaruan state yang bisa ditunda.

---

### **Contoh Penggunaan**
#### 1. **Navigasi Tab dengan Konten Berat**
```jsx
import { useState, useTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  // Simulasi komponen berat
  const HeavyTabContent = ({ tab }) => {
    // Render 10.000 item (simulasi operasi berat)
    const items = Array(10000).fill(null).map((_, i) => <div key={i}>Item {i} ({tab})</div>);
    return <div>{items}</div>;
  };

  const selectTab = (nextTab) => {
    // Tandai pembaruan state sebagai transisi
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('profile')}>Profile</button>
      
      {/* Tampilkan indikator loading saat transisi */}
      {isPending ? <div>Loading...</div> : null}
      
      <HeavyTabContent tab={tab} />
    </div>
  );
}
```

#### 2. **Input Pencarian dengan Hasil Ditunda**
```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Update langsung (urgent)

    // Tunda pembaruan hasil pencarian (non-urgent)
    startTransition(() => {
      fetchResults(value).then(data => setResults(data));
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} />
      {isPending ? <div>Mencari...</div> : <SearchResults data={results} />}
    </div>
  );
}
```

---

### **Perbedaan `useTransition` vs `useDeferredValue`**
| **Kriteria**          | `useTransition`                 | `useDeferredValue`             |
|-----------------------|---------------------------------|--------------------------------|
| **Fokus**             | Mengontrol prioritas state update | Menunda nilai untuk render     |
| **Penggunaan**        | Saat memicu pembaruan state     | Saat membaca nilai yang diubah |
| **Indikator Pending** | Menyediakan `isPending`         | Tidak ada indikator langsung   |
| **Contoh Kasus**      | Navigasi, submit form           | Input pencarian, filter data   |

---

### **Best Practices**
1. **Bagi State Menjadi Urgent dan Non-Urgent**  
   ```jsx
   // State urgent (contoh: input)
   const [query, setQuery] = useState('');

   // State non-urgent (contoh: hasil pencarian)
   const [results, setResults] = useState([]);
   const [isPending, startTransition] = useTransition();
   ```

2. **Gunakan untuk Operasi yang Memblock Render**  
   Contoh:  
   - Fetching data besar.
   - Render daftar kompleks.

3. **Hindari untuk Pembaruan yang Harus Instan**  
   Misal:  
   - Animasi.
   - Input teks (kecuali untuk hasil yang ditunda).

4. **Kombinasikan dengan `Suspense`**  
   Untuk menampilkan fallback UI selama transisi:
   ```jsx
   <Suspense fallback={<Spinner />}>
     <HeavyComponent />
   </Suspense>
   ```

---

### **Catatan Penting**
- **Hanya untuk State Updates**: `startTransition` hanya membungkus pembaruan state.
- **Tidak untuk Event Handler Async**: Gunakan `startTransition` di dalam event handler, bukan untuk logika async langsung:
  ```jsx
  // ❌ Salah
  startTransition(async () => {
    const data = await fetchData();
    setData(data);
  });

  // ✅ Benar
  startTransition(() => {
    fetchData().then(data => setData(data));
  });
  ```

---

### **Kesimpulan**
`useTransition` adalah solusi untuk:  
- **Meningkatkan responsivitas UI** dengan memprioritaskan pembaruan penting.  
- **Mengelola operasi berat** tanpa mengganggu interaksi pengguna.  
- **Memberi feedback visual** (melalui `isPending`) saat transisi berlangsung.  

Gunakan ketika Anda perlu **menyeimbangkan kinerja dan pengalaman pengguna**! 🚀