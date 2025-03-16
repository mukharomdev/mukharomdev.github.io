Berikut adalah contoh kode **Node.js** menggunakan library `node-wit` untuk memanfaatkan semua endpoint Wit.ai, yaitu **message**, **event**, **converse**, dan **composer**. Pastikan Anda telah menginstal library `node-wit` terlebih dahulu dengan menjalankan:

```bash
npm install node-wit
```

---

### Contoh Kode Lengkap

```javascript
const { Wit, log } = require('node-wit');

// Inisialisasi client Wit.ai
const client = new Wit({
  accessToken: 'YOUR_ACCESS_TOKEN', // Ganti dengan access token Wit.ai Anda
  logger: new log.Logger(log.DEBUG), // Aktifkan logging untuk debugging
});

// Contoh penggunaan endpoint /message
async function sendMessage() {
  try {
    const response = await client.message('Saya ingin pesan pizza');
    console.log('Response dari /message:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error saat menggunakan /message:', error);
  }
}

// Contoh penggunaan endpoint /event
async function sendEvent() {
  try {
    const response = await client.event('button_click', { sessionId: '12345' });
    console.log('Response dari /event:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error saat menggunakan /event:', error);
  }
}

// Contoh penggunaan endpoint /converse
async function sendConverse() {
  try {
    const sessionId = '12345'; // ID sesi untuk melacak percakapan
    const response = await client.converse(sessionId, 'Hai, saya ingin pesan pizza', {});
    console.log('Response dari /converse:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error saat menggunakan /converse:', error);
  }
}

// Contoh penggunaan endpoint /composer
async function sendComposer() {
  try {
    const sessionId = '12345'; // ID sesi untuk melacak percakapan
    const response = await client.composer(sessionId, 'Hai, saya ingin pesan pizza', {});
    console.log('Response dari /composer:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error saat menggunakan /composer:', error);
  }
}

// Jalankan semua fungsi
(async () => {
  console.log('Menggunakan endpoint /message:');
  await sendMessage();

  console.log('\nMenggunakan endpoint /event:');
  await sendEvent();

  console.log('\nMenggunakan endpoint /converse:');
  await sendConverse();

  console.log('\nMenggunakan endpoint /composer:');
  await sendComposer();
})();
```

---

### Penjelasan Kode

1. **Inisialisasi Client Wit.ai**:
   - Menggunakan `node-wit` untuk membuat client dengan access token Wit.ai Anda.

2. **Endpoint `/message`**:
   - Mengirim pesan teks ke Wit.ai dan mendapatkan respons yang berisi entitas, intents, dan traits.

3. **Endpoint `/event`**:
   - Mengirim event (misalnya, `button_click`) ke Wit.ai. Berguna untuk melacak aktivitas non-teks.

4. **Endpoint `/converse`**:
   - Mengelola percakapan interaktif dengan mempertahankan konteks menggunakan `sessionId`.

5. **Endpoint `/composer`**:
   - Menggunakan fitur Composer Wit.ai untuk mengelola alur percakapan yang lebih kompleks.

---

### Output Contoh

Berikut adalah contoh output dari kode di atas:

```plaintext
Menggunakan endpoint /message:
Response dari /message:
{
  "text": "Saya ingin pesan pizza",
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

Menggunakan endpoint /event:
Response dari /event:
{
  "event": "button_click",
  "context": {},
  "entities": {}
}

Menggunakan endpoint /converse:
Response dari /converse:
{
  "type": "msg",
  "msg": "Berapa banyak pizza yang ingin Anda pesan?",
  "context": {
    "order_type": "food",
    "step": "ask_quantity"
  }
}

Menggunakan endpoint /composer:
Response dari /composer:
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

### Catatan
- Ganti `YOUR_ACCESS_TOKEN` dengan access token Wit.ai Anda.
- Pastikan Anda telah mengonfigurasi intents, entities, dan actions di Wit.ai Console.
- Untuk endpoint `/composer`, pastikan Anda telah mengaktifkan dan mengonfigurasi Composer di Wit.ai.

Dengan kode ini, Anda dapat memanfaatkan semua endpoint Wit.ai untuk membangun bot yang cerdas dan interaktif!