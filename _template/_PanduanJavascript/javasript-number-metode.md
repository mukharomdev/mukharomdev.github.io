JavaScript menyediakan berbagai metode bawaan untuk bekerja dengan tipe data **Number**. Berikut adalah beberapa metode dan properti penting yang sering digunakan beserta penjelasan dan contoh penggunaannya:

---

### 1. **`Number.isFinite(value)`**
- **Fungsi**: Memeriksa apakah nilai adalah angka terbatas (finite), bukan `Infinity`, `-Infinity`, atau `NaN`.
- **Contoh**:
  ```javascript
  console.log(Number.isFinite(123)); // Output: true
  console.log(Number.isFinite(Infinity)); // Output: false
  ```

---

### 2. **`Number.isInteger(value)`**
- **Fungsi**: Memeriksa apakah nilai adalah bilangan bulat (integer).
- **Contoh**:
  ```javascript
  console.log(Number.isInteger(123)); // Output: true
  console.log(Number.isInteger(123.45)); // Output: false
  ```

---

### 3. **`Number.isNaN(value)`**
- **Fungsi**: Memeriksa apakah nilai adalah `NaN` (Not-a-Number).
- **Contoh**:
  ```javascript
  console.log(Number.isNaN(NaN)); // Output: true
  console.log(Number.isNaN(123)); // Output: false
  ```

---

### 4. **`Number.parseFloat(string)`**
- **Fungsi**: Mengubah string menjadi angka desimal (float).
- **Contoh**:
  ```javascript
  console.log(Number.parseFloat("123.45")); // Output: 123.45
  console.log(Number.parseFloat("123.45abc")); // Output: 123.45 (mengabaikan karakter non-angka)
  ```

---

### 5. **`Number.parseInt(string, radix)`**
- **Fungsi**: Mengubah string menjadi bilangan bulat (integer) dengan basis (radix) tertentu.
- **Contoh**:
  ```javascript
  console.log(Number.parseInt("123")); // Output: 123
  console.log(Number.parseInt("1010", 2)); // Output: 10 (konversi dari biner ke desimal)
  ```

---

### 6. **`Number.prototype.toFixed(digits)`**
- **Fungsi**: Mengembalikan string yang mewakili angka dengan jumlah digit desimal tertentu.
- **Contoh**:
  ```javascript
  const num = 123.456;
  console.log(num.toFixed(2)); // Output: "123.46"
  ```

---

### 7. **`Number.prototype.toPrecision(precision)`**
- **Fungsi**: Mengembalikan string yang mewakili angka dengan jumlah digit tertentu (presisi).
- **Contoh**:
  ```javascript
  const num = 123.456;
  console.log(num.toPrecision(5)); // Output: "123.46"
  ```

---

### 8. **`Number.prototype.toString(radix)`**
- **Fungsi**: Mengubah angka menjadi string dengan basis (radix) tertentu.
- **Contoh**:
  ```javascript
  const num = 255;
  console.log(num.toString(16)); // Output: "ff" (konversi ke heksadesimal)
  ```

---

### 9. **`Number.prototype.toExponential(fractionDigits)`**
- **Fungsi**: Mengembalikan string yang mewakili angka dalam notasi eksponensial.
- **Contoh**:
  ```javascript
  const num = 12345;
  console.log(num.toExponential(2)); // Output: "1.23e+4"
  ```

---

### 10. **`Number.isSafeInteger(value)`**
- **Fungsi**: Memeriksa apakah nilai adalah bilangan bulat yang aman (safe integer), yaitu antara `-(2^53 - 1)` dan `2^53 - 1`.
- **Contoh**:
  ```javascript
  console.log(Number.isSafeInteger(9007199254740991)); // Output: true
  console.log(Number.isSafeInteger(9007199254740992)); // Output: false
  ```

---

### 11. **`Number.MAX_VALUE`**
- **Fungsi**: Mengembalikan nilai angka terbesar yang dapat direpresentasikan di JavaScript.
- **Contoh**:
  ```javascript
  console.log(Number.MAX_VALUE); // Output: 1.7976931348623157e+308
  ```

---

### 12. **`Number.MIN_VALUE`**
- **Fungsi**: Mengembalikan nilai angka positif terkecil yang dapat direpresentasikan di JavaScript.
- **Contoh**:
  ```javascript
  console.log(Number.MIN_VALUE); // Output: 5e-324
  ```

---

### 13. **`Number.MAX_SAFE_INTEGER`**
- **Fungsi**: Mengembalikan bilangan bulat terbesar yang aman (`2^53 - 1`).
- **Contoh**:
  ```javascript
  console.log(Number.MAX_SAFE_INTEGER); // Output: 9007199254740991
  ```

---

### 14. **`Number.MIN_SAFE_INTEGER`**
- **Fungsi**: Mengembalikan bilangan bulat terkecil yang aman (`-(2^53 - 1)`).
- **Contoh**:
  ```javascript
  console.log(Number.MIN_SAFE_INTEGER); // Output: -9007199254740991
  ```

---

### 15. **`Number.EPSILON`**
- **Fungsi**: Mengembalikan perbedaan terkecil antara dua angka yang dapat direpresentasikan.
- **Contoh**:
  ```javascript
  console.log(Number.EPSILON); // Output: 2.220446049250313e-16
  ```

---

### 16. **`Number.NaN`**
- **Fungsi**: Merepresentasikan nilai `NaN` (Not-a-Number).
- **Contoh**:
  ```javascript
  console.log(Number.NaN); // Output: NaN
  ```

---

### 17. **`Number.POSITIVE_INFINITY`**
- **Fungsi**: Merepresentasikan nilai tak terhingga positif (`Infinity`).
- **Contoh**:
  ```javascript
  console.log(Number.POSITIVE_INFINITY); // Output: Infinity
  ```

---

### 18. **`Number.NEGATIVE_INFINITY`**
- **Fungsi**: Merepresentasikan nilai tak terhingga negatif (`-Infinity`).
- **Contoh**:
  ```javascript
  console.log(Number.NEGATIVE_INFINITY); // Output: -Infinity
  ```

---

### 19. **`Math` Object (Metode Terkait Angka)**
Meskipun bukan bagian langsung dari `Number`, objek `Math` menyediakan banyak metode untuk operasi matematika:
- **`Math.round(x)`**: Membulatkan angka ke bilangan bulat terdekat.
- **`Math.floor(x)`**: Membulatkan angka ke bawah.
- **`Math.ceil(x)`**: Membulatkan angka ke atas.
- **`Math.random()`**: Menghasilkan angka acak antara 0 dan 1.
- **`Math.max(x, y, ...)`**: Mengembalikan nilai terbesar dari beberapa angka.
- **`Math.min(x, y, ...)`**: Mengembalikan nilai terkecil dari beberapa angka.

**Contoh**:
```javascript
console.log(Math.round(3.7)); // Output: 4
console.log(Math.floor(3.7)); // Output: 3
console.log(Math.ceil(3.2)); // Output: 4
console.log(Math.random()); // Output: Angka acak antara 0 dan 1
```

---

### Kesimpulan
Metode dan properti di atas sangat berguna untuk bekerja dengan angka di JavaScript. Jika Anda memiliki pertanyaan lebih lanjut atau butuh contoh tambahan, beri tahu saya! 😊