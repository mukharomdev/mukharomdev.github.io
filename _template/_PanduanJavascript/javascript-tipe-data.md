Di JavaScript, tipe data dibagi menjadi dua kategori utama: **tipe data primitif** dan **tipe data bentukan (non-primitif)**. Berikut penjelasan lengkapnya:

---

## **Tipe Data Primitif**
Tipe data primitif adalah tipe data yang paling dasar dan tidak dapat diubah (immutable). Mereka disimpan secara langsung di memori dan memiliki nilai yang tetap. Ada 7 tipe data primitif di JavaScript:

### 1. **`number`**
- Menyimpan angka, baik integer maupun floating-point.
- Contoh:
  ```javascript
  let age = 25;
  let price = 99.99;
  ```

### 2. **`string`**
- Menyimpan teks atau karakter.
- Contoh:
  ```javascript
  let name = "John";
  let greeting = 'Hello, World!';
  ```

### 3. **`boolean`**
- Menyimpan nilai `true` atau `false`.
- Contoh:
  ```javascript
  let isActive = true;
  let isLoggedIn = false;
  ```

### 4. **`undefined`**
- Menunjukkan bahwa variabel telah dideklarasikan tetapi belum diberi nilai.
- Contoh:
  ```javascript
  let x;
  console.log(x); // Output: undefined
  ```

### 5. **`null`**
- Menunjukkan ketiadaan nilai yang disengaja.
- Contoh:
  ```javascript
  let y = null;
  console.log(y); // Output: null
  ```

### 6. **`bigint`**
- Menyimpan bilangan bulat besar yang tidak dapat ditangani oleh tipe `number`.
- Contoh:
  ```javascript
  let bigNumber = 1234567890123456789012345678901234567890n;
  ```

### 7. **`symbol`**
- Menyimpan nilai unik dan tidak dapat diubah, sering digunakan sebagai identifier untuk properti objek.
- Contoh:
  ```javascript
  let id = Symbol("id");
  ```

---

## **Tipe Data Bentukan (Non-Primitif)**
Tipe data bentukan adalah tipe data yang dapat menyimpan koleksi nilai atau kompleks data. Mereka bersifat mutable (dapat diubah) dan disimpan sebagai referensi di memori. Ada 3 tipe data bentukan utama di JavaScript:

### 1. **`object`**
- Menyimpan koleksi properti (key-value pairs).
- Contoh:
  ```javascript
  let person = {
    name: "John",
    age: 30,
    isStudent: false
  };
  ```

### 2. **`array`**
- Menyimpan koleksi nilai dalam bentuk list.
- Contoh:
  ```javascript
  let fruits = ["Apple", "Banana", "Cherry"];
  ```

### 3. **`function`**
- Menyimpan blok kode yang dapat dipanggil.
- Contoh:
  ```javascript
  function greet(name) {
    return `Hello, ${name}!`;
  }
  ```

---

## **Perbedaan Tipe Data Primitif dan Bentukan**

| **Karakteristik**       | **Tipe Data Primitif**                  | **Tipe Data Bentukan**                |
|--------------------------|-----------------------------------------|---------------------------------------|
| **Mutabilitas**          | Immutable (tidak bisa diubah)           | Mutable (bisa diubah)                 |
| **Penyimpanan**          | Disimpan sebagai nilai (by value)       | Disimpan sebagai referensi (by reference) |
| **Contoh**               | `number`, `string`, `boolean`, dll.     | `object`, `array`, `function`         |
| **Perbandingan**         | Dibandingkan berdasarkan nilai          | Dibandingkan berdasarkan referensi    |

---

### Contoh Perbandingan Penyimpanan

#### Tipe Data Primitif (By Value)
```javascript
let a = 10;
let b = a; // Nilai a disalin ke b
b = 20;
console.log(a); // Output: 10 (nilai a tidak berubah)
```

#### Tipe Data Bentukan (By Reference)
```javascript
let obj1 = { name: "John" };
let obj2 = obj1; // obj2 merujuk ke obj1
obj2.name = "Jane";
console.log(obj1.name); // Output: "Jane" (nilai obj1 berubah)
```

---

## **Kesimpulan**
- **Tipe data primitif** adalah tipe data dasar yang tidak dapat diubah dan disimpan sebagai nilai.
- **Tipe data bentukan** adalah tipe data kompleks yang dapat diubah dan disimpan sebagai referensi.
- Pemahaman tentang kedua jenis tipe data ini penting untuk menghindari kesalahan dalam manipulasi data di JavaScript.

Jika Anda memiliki pertanyaan lebih lanjut atau butuh contoh tambahan, beri tahu saya! 😊