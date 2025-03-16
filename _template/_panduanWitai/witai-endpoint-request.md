Di Wit.ai, terdapat beberapa **endpoint API** yang dapat digunakan untuk berinteraksi dengan bot. Setiap endpoint memiliki tujuan dan fungsinya masing-masing. Berikut adalah penjelasan tentang perbedaan antara endpoint **message**, **event**, **converse**, dan **composer**:

---

### 1. **Endpoint `/message`**
   - **Tujuan**: Mengirim pesan teks dari pengguna ke Wit.ai dan mendapatkan respons berdasarkan analisis pesan tersebut.
   - **Fungsi**:
     - Mengekstrak entitas (entities) dari pesan pengguna.
     - Mengembalikan respons berdasarkan intent yang terdeteksi.
   - **Kapan Digunakan**:
     - Ketika Anda hanya perlu menganalisis pesan pengguna tanpa mempertahankan konteks percakapan.
   - **Contoh Penggunaan**:
     ```bash
     curl -XPOST 'https://api.wit.ai/message' \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -d 'q=Hai, saya ingin pesan pizza'
     ```
   - **Respons**:
     ```json
     {
       "text": "Hai, saya ingin pesan pizza",
       "intents": [],
       "entities": {
         "food_item": [
           {
             "body": "pizza",
             "confidence": 0.95,
             "value": "pizza"
           }
         ]
       },
       "traits": {}
     }
     ```

---

### 2. **Endpoint `/event`**
   - **Tujuan**: Mengirim event atau tindakan yang dilakukan oleh pengguna atau sistem ke Wit.ai.
   - **Fungsi**:
     - Berguna untuk melacak aktivitas pengguna atau sistem yang tidak berupa pesan teks.
     - Dapat digunakan untuk mengirim data kontekstual atau metadata.
   - **Kapan Digunakan**:
     - Ketika Anda perlu melacak event seperti klik tombol, login, atau aktivitas non-teks lainnya.
   - **Contoh Penggunaan**:
     ```bash
     curl -XPOST 'https://api.wit.ai/event' \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -d 'name=button_click' \
     -d 'context={}' \
     -d 'entities={}'
     ```
   - **Respons**:
     ```json
     {
       "event": "button_click",
       "context": {},
       "entities": {}
     }
     ```

---

### 3. **Endpoint `/converse`**
   - **Tujuan**: Membangun percakapan interaktif dengan mempertahankan konteks percakapan.
   - **Fungsi**:
     - Mengelola alur percakapan dengan menyimpan dan memperbarui konteks.
     - Berguna untuk membuat bot yang mampu melakukan percakapan multi-tahap.
   - **Kapan Digunakan**:
     - Ketika Anda ingin membuat bot yang dapat mempertahankan konteks percakapan (misalnya, bot pesanan makanan atau layanan pelanggan).
   - **Contoh Penggunaan**:
     ```bash
     curl -XPOST 'https://api.wit.ai/converse' \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -d 'session_id=12345' \
     -d 'q=Hai, saya ingin pesan pizza'
     ```
   - **Respons**:
     ```json
     {
       "type": "msg",
       "msg": "Berapa banyak pizza yang ingin Anda pesan?",
       "context": {
         "order_type": "food",
         "step": "ask_quantity"
       }
     }
     ```

---

### 4. **Endpoint `/composer`**
   - **Tujuan**: Menggunakan **Composer**, fitur Wit.ai untuk membangun alur percakapan yang lebih kompleks.
   - **Fungsi**:
     - Mengelola alur percakapan dengan menggabungkan intents, entities, dan actions.
     - Memungkinkan pembuatan bot yang lebih dinamis dan fleksibel.
   - **Kapan Digunakan**:
     - Ketika Anda menggunakan fitur Composer di Wit.ai untuk mengelola percakapan.
   - **Contoh Penggunaan**:
     ```bash
     curl -XPOST 'https://api.wit.ai/composer' \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -d 'session_id=12345' \
     -d 'q=Hai, saya ingin pesan pizza'
     ```
   - **Respons**:
     ```json
     {
       "type": "action",
       "action": "askQuantity",
       "context": {
         "order_type": "food",
         "step": "ask_quantity"
       }
     }
     ```

---

### Perbandingan Singkat

| **Endpoint**   | **Tujuan**                                                                 | **Konteks**         | **Kapan Digunakan**                                                                 |
|----------------|---------------------------------------------------------------------------|---------------------|-------------------------------------------------------------------------------------|
| `/message`     | Menganalisis pesan teks dan mengekstrak entitas.                          | Tidak mempertahankan konteks. | Untuk analisis pesan satu kali tanpa perlu mempertahankan alur percakapan.          |
| `/event`       | Mengirim event atau tindakan non-teks.                                    | Opsional.           | Untuk melacak aktivitas pengguna atau sistem yang tidak berupa pesan teks.          |
| `/converse`    | Membangun percakapan interaktif dengan mempertahankan konteks.            | Mempertahankan konteks. | Untuk percakapan multi-tahap yang memerlukan penyimpanan konteks.                  |
| `/composer`    | Mengelola alur percakapan kompleks menggunakan fitur Composer.            | Mempertahankan konteks. | Ketika menggunakan Composer untuk membuat bot yang lebih dinamis dan fleksibel.     |

---

### Kesimpulan
- Gunakan **`/message`** untuk analisis pesan sederhana.
- Gunakan **`/event`** untuk melacak aktivitas non-teks.
- Gunakan **`/converse`** untuk percakapan interaktif dengan konteks.
- Gunakan **`/composer`** untuk alur percakapan kompleks dengan fitur Composer.

Pilih endpoint yang sesuai dengan kebutuhan aplikasi Anda!