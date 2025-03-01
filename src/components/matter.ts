"use client"

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';



export function MatterSimulation({ref}){
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create an engine
    const { Engine, Render, Runner, World, Bodies } = Matter;

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
    <div> 
    <canvas ref={canvasRef} /> 
    </div>
    );
};

