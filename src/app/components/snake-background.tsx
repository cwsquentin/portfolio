"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

export function SnakeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Snake game variables
    const gridSize = 25
    const snake: Point[] = [{ x: 10, y: 10 }]
    let food: Point = { x: 15, y: 15 }
    let direction: Point = { x: 1, y: 0 }

    const snakeColor = "#3b82f6" // Blue color
    const foodColor = "#10b981" // Green color
    const gridColor = "#e5e7eb" // Light gray

    const generateFood = () => {
      food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize)),
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = gridColor
      ctx.globalAlpha = 0.1
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const drawSnake = () => {
      snake.forEach((segment, index) => {
        const alpha = Math.max(0.15 - index * 0.02, 0.05)
        ctx.fillStyle = snakeColor
        ctx.globalAlpha = alpha
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2)
      })
      ctx.globalAlpha = 1
    }

    const drawFood = () => {
      ctx.fillStyle = foodColor
      ctx.globalAlpha = 0.2
      ctx.beginPath()
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const moveSnake = () => {
      const head = { ...snake[0] }
      head.x += direction.x
      head.y += direction.y

      // Wrap around edges
      if (head.x < 0) head.x = Math.floor(canvas.width / gridSize) - 1
      if (head.x >= canvas.width / gridSize) head.x = 0
      if (head.y < 0) head.y = Math.floor(canvas.height / gridSize) - 1
      if (head.y >= canvas.height / gridSize) head.y = 0

      snake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        generateFood()
      } else {
        snake.pop()
      }

      // Keep snake at reasonable length
      if (snake.length > 8) {
        snake.pop()
      }

      // Auto-pilot: simple AI to follow food
      const dx = food.x - head.x
      const dy = food.y - head.y

      // Add some randomness to make it more interesting
      if (Math.random() > 0.8) {
        if (Math.abs(dx) > Math.abs(dy)) {
          direction = { x: dx > 0 ? 1 : -1, y: 0 }
        } else {
          direction = { x: 0, y: dy > 0 ? 1 : -1 }
        }
      }
    }

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      drawFood()
      drawSnake()
      moveSnake()
    }

    // Start the game
    generateFood()
    const gameInterval = setInterval(gameLoop, 300)

    return () => {
      clearInterval(gameInterval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
