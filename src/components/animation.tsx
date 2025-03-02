"use client"

import React, { useEffect, useRef,useState } from "react";
import Matter from "matter-js";

const MatterSimulation = () => {
  const sceneRef = useRef<HTMLElement>(null); // Ref untuk container canvas
  const [score, setScore] = useState(0); // State untuk skor

  useEffect(() => {
    if(!sceneRef){return}
    // Modul yang diperlukan dari Matter.js
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

    // Buat engine
    const engine = Engine.create();
    const { world } = engine;

    // Buat renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      canvas: document.createElement("canvas"),
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: "#f4f4f4",
      },
    });

    // Tambahkan canvas ke DOM
    sceneRef.current.appendChild(render.canvas);

    // Buat objek fisika
    const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(800, 300, 60, 600, { isStatic: true });

    const ball = Bodies.circle(400, 100, 40, { restitution: 0.9 });

    // Tambahkan objek ke dunia
    World.add(world, [ground, leftWall, rightWall, ball]);

    // Setup mouse interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // Sembunyikan garis constraint
        },
      },
    });

    // Tambahkan mouse constraint ke dunia
    World.add(world, mouseConstraint);

    // Event listener untuk tumbukan
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        if (pair.bodyA === ball || pair.bodyB === ball) {
          setScore((prevScore) => prevScore + 1); // Tambahkan skor
        }
      });
    });

    // Jalankan renderer dan engine
    Render.run(render);
    Runner.run(Runner.create(), engine);

    // Cleanup saat komponen di-unmount
    return () => {
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      sceneRef.current.removeChild(render.canvas);
    };
  }, []);
  return (
    <div className="text-4xl font-bold text-gray-800 text-center text-shadow-lg shadow-gray-500">
      <h1>Pukul bola jangan sampai menyentuh dinding hitam</h1>
      <p>Score : {score}</p>
      <p>{score > 12? "kamu kalah": "ayo semangat!!"}</p>
      {score > 12 ?  window.location.reload(true): " " }
      <div ref={sceneRef}></div>
    </div>
  );

};

export default MatterSimulation



