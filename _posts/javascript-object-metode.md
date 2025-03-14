---
title: "Javascript Object Metode dan Penggunaanya"
excerpt: "JavaScript menyediakan banyak metode bawaan pada objek `Object` yang berguna untuk memanipulasi, mengakses, dan memeriksa objek. Berikut adalah beberapa metode penting dari `Object` beserta penjelasannya"
coverImage: "/assets/blog/javascript/javascript.png"
date: "2025-03-14T22:03:20.516Z"
author:
  name: mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "/assets/blog/javascript/javascript.png"
---


JavaScript menyediakan banyak metode bawaan pada objek `Object` yang berguna untuk memanipulasi, mengakses, dan memeriksa objek. Berikut adalah beberapa metode penting dari `Object` beserta penjelasannya:

---

### 1. **`Object.assign(target, ...sources)`**
- **Fungsi**: Menyalin properti yang dapat di-enumerate (yang bisa di-loop) dari satu atau lebih objek sumber (`sources`) ke objek target (`target`).
- **Contoh**:
  ```javascript
  const target = { a: 1 };
  const source = { b: 2, c: 3 };
  const result = Object.assign(target, source);
  console.log(result); // Output: { a: 1, b: 2, c: 3 }
  ```
- **Catatan**: Jika ada properti yang sama di `target` dan `source`, nilai dari `source` akan menimpa nilai di `target`.

---

### 2. **`Object.create(proto, propertiesObject)`**
- **Fungsi**: Membuat objek baru dengan prototipe yang ditentukan (`proto`) dan properti opsional (`propertiesObject`).
- **Contoh**:
  ```javascript
  const proto = { greet: function() { return "Hello!"; } };
  const obj = Object.create(proto);
  console.log(obj.greet()); // Output: "Hello!"
  ```

---

### 3. **`Object.defineProperty(obj, prop, descriptor)`**
- **Fungsi**: Menambahkan atau memodifikasi properti pada objek dengan deskripsi tertentu (seperti `writable`, `enumerable`, `configurable`, `value`, `get`, `set`).
- **Contoh**:
  ```javascript
  const obj = {};
  Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: false, // Tidak bisa diubah
    enumerable: true // Bisa di-loop
  });
  console.log(obj.name); // Output: "John"
  ```

---

### 4. **`Object.defineProperties(obj, properties)`**
- **Fungsi**: Menambahkan atau memodifikasi beberapa properti sekaligus pada objek.
- **Contoh**:
  ```javascript
  const obj = {};
  Object.defineProperties(obj, {
    name: { value: 'John', enumerable: true },
    age: { value: 30, enumerable: true }
  });
  console.log(obj); // Output: { name: "John", age: 30 }
  ```

---

### 5. **`Object.entries(obj)`**
- **Fungsi**: Mengembalikan array dari pasangan `[key, value]` untuk setiap properti yang dapat di-enumerate pada objek.
- **Contoh**:
  ```javascript
  const obj = { a: 1, b: 2 };
  console.log(Object.entries(obj)); // Output: [ ['a', 1], ['b', 2] ]
  ```

---

### 6. **`Object.keys(obj)`**
- **Fungsi**: Mengembalikan array dari semua properti yang dapat di-enumerate pada objek.
- **Contoh**:
  ```javascript
  const obj = { a: 1, b: 2 };
  console.log(Object.keys(obj)); // Output: ['a', 'b']
  ```

---

### 7. **`Object.values(obj)`**
- **Fungsi**: Mengembalikan array dari semua nilai properti yang dapat di-enumerate pada objek.
- **Contoh**:
  ```javascript
  const obj = { a: 1, b: 2 };
  console.log(Object.values(obj)); // Output: [1, 2]
  ```

---

### 8. **`Object.freeze(obj)`**
- **Fungsi**: Membekukan objek, sehingga propertinya tidak bisa diubah, ditambah, atau dihapus.
- **Contoh**:
  ```javascript
  const obj = { a: 1 };
  Object.freeze(obj);
  obj.a = 2; // Tidak akan berubah
  console.log(obj.a); // Output: 1
  ```

---

### 9. **`Object.seal(obj)`**
- **Fungsi**: Menyegel objek, sehingga properti yang sudah ada tidak bisa dihapus, tetapi masih bisa diubah.
- **Contoh**:
  ```javascript
  const obj = { a: 1 };
  Object.seal(obj);
  obj.a = 2; // Bisa diubah
  delete obj.a; // Tidak bisa dihapus
  console.log(obj); // Output: { a: 2 }
  ```

---

### 10. **`Object.is(value1, value2)`**
- **Fungsi**: Membandingkan dua nilai secara strict (termasuk `NaN` dan `+0`/`-0`).
- **Contoh**:
  ```javascript
  console.log(Object.is(NaN, NaN)); // Output: true
  console.log(Object.is(0, -0)); // Output: false
  ```

---

### 11. **`Object.getPrototypeOf(obj)`**
- **Fungsi**: Mengembalikan prototipe dari objek.
- **Contoh**:
  ```javascript
  const proto = { greet: function() { return "Hello!"; } };
  const obj = Object.create(proto);
  console.log(Object.getPrototypeOf(obj) === proto); // Output: true
  ```

---

### 12. **`Object.setPrototypeOf(obj, prototype)`**
- **Fungsi**: Mengatur prototipe dari objek.
- **Contoh**:
  ```javascript
  const proto = { greet: function() { return "Hello!"; } };
  const obj = {};
  Object.setPrototypeOf(obj, proto);
  console.log(obj.greet()); // Output: "Hello!"
  ```

---

### 13. **`Object.hasOwnProperty(prop)`**
- **Fungsi**: Memeriksa apakah objek memiliki properti tertentu (tidak termasuk properti dari prototipe).
- **Contoh**:
  ```javascript
  const obj = { a: 1 };
  console.log(obj.hasOwnProperty('a')); // Output: true
  console.log(obj.hasOwnProperty('toString')); // Output: false
  ```

---

### 14. **`Object.isExtensible(obj)`**
- **Fungsi**: Memeriksa apakah objek bisa ditambahkan properti baru.
- **Contoh**:
  ```javascript
  const obj = { a: 1 };
  console.log(Object.isExtensible(obj)); // Output: true
  Object.freeze(obj);
  console.log(Object.isExtensible(obj)); // Output: false
  ```

---

### 15. **`Object.preventExtensions(obj)`**
- **Fungsi**: Mencegah penambahan properti baru ke objek.
- **Contoh**:
  ```javascript
  const obj = { a: 1 };
  Object.preventExtensions(obj);
  obj.b = 2; // Tidak akan ditambahkan
  console.log(obj); // Output: { a: 1 }
  ```

---

### 16. **`Object.fromEntries(iterable)`**
- **Fungsi**: Mengubah array pasangan `[key, value]` menjadi objek.
- **Contoh**:
  ```javascript
  const entries = [ ['a', 1], ['b', 2] ];
  const obj = Object.fromEntries(entries);
  console.log(obj); // Output: { a: 1, b: 2 }
  ```

---

### Kesimpulan
Metode-metode di atas adalah alat yang sangat berguna untuk bekerja dengan objek di JavaScript. Setiap metode memiliki kegunaan spesifik, seperti manipulasi properti, pengaturan prototipe, atau pemeriksaan objek. Jika Anda memiliki pertanyaan lebih lanjut atau butuh contoh tambahan, beri tahu saya! 😊