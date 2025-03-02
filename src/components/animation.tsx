'use client'

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';


// Create an engine
const { Engine, Render, Runner, World, Bodies,Mouse, MouseConstraint } = Matter;

declare global {
  interface Window {
    engine: Matter.Engine
    runner: Matter.Runner
  }
}

export default function MatterSimulation(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Tentukan tipe ref


  useEffect(() => {
    if (!canvasRef.current) return; // Pastikan canvasRef.current ada

    const engine = Engine.create();
    const { world } = engine;

    // Create a renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Set to true for wireframe mode
        background: '#f4f4f4',
      },
    });

    // Add a ground
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 100, {
      isStatic: true,
      render: {
        fillStyle: '#555',
      },
    });

    // Add a ball
    const ball = Bodies.circle(window.innerWidth / 2, 200, 50, {
      restitution: 0.8,
      render: {
        fillStyle: '#ff0000',
      },
    });

    // Add bodies to the world
    World.add(world, [ground, ball]);

    // Run the engine and renderer
    Engine.run(engine);
    Render.run(render);

    // Add a runner to keep the simulation running
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle window resizing
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      // Update the ground's position and size
      Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: window.innerHeight - 50,
      });
      Matter.Body.setVertices(ground, [
        { x: 0, y: window.innerHeight - 50 },
        { x: window.innerWidth, y: window.innerHeight - 50 },
        { x: window.innerWidth, y: window.innerHeight },
        { x: 0, y: window.innerHeight },
      ]);
    };
    // Add a stack of boxes
for (let i = 0; i < 5; i++) {
  const box = Bodies.rectangle(300 + i * 60, 100, 50, 50, {
    render: {
      fillStyle: '#00ff00',
    },
  });
  World.add(world, box);
}



const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

World.add(world, mouseConstraint);
render.mouse = mouse;
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return(
    <div className="container mx-auto"> 
    <canvas ref={canvasRef} /> 
    </div>
    );
};

