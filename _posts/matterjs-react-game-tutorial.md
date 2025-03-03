---
title: "Membuat Game 2D MatterJs dan React"
excerpt: "Untuk membuat game menggunakan **Matter.js** dan **React**, Anda dapat membagi aplikasi menjadi beberapa komponen React untuk memisahkan tanggung jawab dan menjaga kode tetap terorganisir. Berikut adalah contoh struktur komponen yang dapat digunakan:"
coverImage: "https://brm.io/matter-js/img/matter-js.svg"
date: "2025-03-03T17:24:17.910Z"
author:
  name: Mukharomdev
  picture: "/assets/blog/authors/mukharomdev.png"
ogImage:
  url: "https://brm.io/matter-js/img/matter-js.svg"

---
Untuk membuat game menggunakan **Matter.js** dan **React**, Anda dapat membagi aplikasi menjadi beberapa komponen React untuk memisahkan tanggung jawab dan menjaga kode tetap terorganisir. Berikut adalah contoh struktur komponen yang dapat digunakan:

---

### **Struktur Komponen untuk Game Matter.js**

1. **`App`** (Komponen Utama):
   - Bertanggung jawab untuk menginisialisasi game dan merender komponen lainnya.
   - Mengelola state global jika diperlukan (misalnya, skor, status game).

2. **`GameWorld`** (Komponen Dunia Game):
   - Bertanggung jawab untuk menginisialisasi dan mengelola dunia fisika Matter.js.
   - Menangani logika game seperti menambahkan objek, mendeteksi tabrakan, dan merender canvas.

3. **`Player`** (Komponen Pemain):
   - Bertanggung jawab untuk mengelola objek pemain (misalnya, karakter atau kendaraan).
   - Menangani input pengguna (misalnya, keyboard atau mouse) untuk mengontrol pemain.

4. **`Obstacle`** (Komponen Rintangan):
   - Bertanggung jawab untuk membuat dan mengelola rintangan atau objek statis di dunia game.

5. **`Scoreboard`** (Komponen Skor):
   - Bertanggung jawab untuk menampilkan skor atau status game.

6. **`GameControls`** (Komponen Kontrol):
   - Bertanggung jawab untuk menampilkan tombol atau kontrol game (misalnya, mulai, jeda, ulang).

---

### **Contoh Implementasi**

#### 1. **`App` (Komponen Utama)**

```javascript
import React, { useState } from 'react';
import GameWorld from './GameWorld';
import Scoreboard from './Scoreboard';
import GameControls from './GameControls';

function App() {
  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => {
    setIsGameRunning(true);
    setScore(0);
  };

  const endGame = () => {
    setIsGameRunning(false);
  };

  return (
    <div>
      <h1>Matter.js Game</h1>
      <Scoreboard score={score} />
      <GameControls
        isGameRunning={isGameRunning}
        onStart={startGame}
        onEnd={endGame}
      />
      {isGameRunning && <GameWorld setScore={setScore} />}
    </div>
  );
}

export default App;
```

---

#### 2. **`GameWorld` (Komponen Dunia Game)**

```javascript
import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import Player from './Player';
import Obstacle from './Obstacle';

function GameWorld({ setScore }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies } = Matter;

    // Buat engine dan renderer
    const engine = Engine.create();
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#f4f4f4',
      },
    });

    // Tambahkan canvas ke DOM
    sceneRef.current.appendChild(render.canvas);

    // Buat dunia fisika
    const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
    World.add(engine.world, [ground]);

    // Tambahkan pemain dan rintangan
    const player = Player(engine);
    const obstacle = Obstacle(engine);

    // Deteksi tabrakan untuk skor
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === player || pair.bodyB === player) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });

    // Jalankan renderer dan engine
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Bersihkan saat komponen di-unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [setScore]);

  return <div ref={sceneRef}></div>;
}

export default GameWorld;
```

---

#### 3. **`Player` (Komponen Pemain)**

```javascript
import Matter from 'matter-js';

function Player(engine) {
  const player = Matter.Bodies.rectangle(100, 100, 50, 50, {
    restitution: 0.9,
    render: {
      fillStyle: 'blue',
    },
  });

  Matter.World.add(engine.world, [player]);

  // Tambahkan kontrol keyboard
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      Matter.Body.setVelocity(player, { x: 5, y: 0 });
    }
    if (event.key === 'ArrowLeft') {
      Matter.Body.setVelocity(player, { x: -5, y: 0 });
    }
  });

  return player;
}

export default Player;
```

---

#### 4. **`Obstacle` (Komponen Rintangan)**

```javascript
import Matter from 'matter-js';

function Obstacle(engine) {
  const obstacle = Matter.Bodies.rectangle(400, 300, 80, 80, {
    isStatic: true,
    render: {
      fillStyle: 'red',
    },
  });

  Matter.World.add(engine.world, [obstacle]);

  return obstacle;
}

export default Obstacle;
```

---

#### 5. **`Scoreboard` (Komponen Skor)**

```javascript
import React from 'react';

function Scoreboard({ score }) {
  return (
    <div>
      <h2>Score: {score}</h2>
    </div>
  );
}

export default Scoreboard;
```

---

#### 6. **`GameControls` (Komponen Kontrol)**

```javascript
import React from 'react';

function GameControls({ isGameRunning, onStart, onEnd }) {
  return (
    <div>
      {!isGameRunning && <button onClick={onStart}>Start Game</button>}
      {isGameRunning && <button onClick={onEnd}>End Game</button>}
    </div>
  );
}

export default GameControls;
```

---

### **Struktur Folder**
```
src/
├── components/
│   ├── App.js
│   ├── GameWorld.js
│   ├── Player.js
│   ├── Obstacle.js
│   ├── Scoreboard.js
│   └── GameControls.js
├── App.css
└── index.js
```

---

### **Kesimpulan**
Dengan membagi game menjadi beberapa komponen, kode menjadi lebih modular, mudah dikelola, dan dapat dikembangkan lebih lanjut. Anda dapat menambahkan lebih banyak fitur seperti level, musuh, atau efek khusus sesuai kebutuhan game Anda.

Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya! 😊