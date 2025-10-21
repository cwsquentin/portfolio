"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

type SnakeBackgroundProps = {
  tickMs?: number
  gridSize?: number
  maxFoods?: number
  spawnIntervalMs?: number
  initialFoods?: number
}

export function SnakeBackground({
  tickMs = 300,
  gridSize: gridSizeProp = 25,
  maxFoods = 5,
  spawnIntervalMs = 2000,
  initialFoods = 2,
}: SnakeBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

  const gridSize = gridSizeProp
  const snake: Point[] = [{ x: 10, y: 10 }]
  const foods: Point[] = []
  let direction: Point = { x: 1, y: 0 }

    const snakeColor = "#3b82f6" // Blue color
  const foodColor = "#10b981" // Green color
    const gridColor = "#e5e7eb" // Light gray

    // Prevent 180° turns: reject opposite direction
    const trySetDirection = (next: Point) => {
      if (snake.length > 1) {
        const isOpposite = next.x === -direction.x && next.y === -direction.y
        if (isOpposite) return
      }
      direction = next
    }

    const randomFood = (): Point => ({
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize)),
    })

    const cellOccupiedBySnake = (p: Point) =>
      snake.some((s) => s.x === p.x && s.y === p.y)

    const cellOccupiedByFood = (p: Point) =>
      foods.some((f) => f.x === p.x && f.y === p.y)

    const spawnFood = () => {
      if (foods.length >= maxFoods) return
      // Try a few times to find a free cell
      for (let i = 0; i < 10; i++) {
        const p = randomFood()
        if (!cellOccupiedBySnake(p) && !cellOccupiedByFood(p)) {
          foods.push(p)
          return
        }
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
      for (const f of foods) {
        ctx.beginPath()
        ctx.arc(
          f.x * gridSize + gridSize / 2,
          f.y * gridSize + gridSize / 2,
          gridSize / 3,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
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

      // Check if any food is eaten
      const eatenIndex = foods.findIndex((f) => f.x === head.x && f.y === head.y)
      if (eatenIndex !== -1) {
        // Grow by not popping tail
        foods.splice(eatenIndex, 1)
      } else {
        // Move without growing
        snake.pop()
      }

      // Auto-pilot: simple AI to follow food
      // Pick nearest food (if any)
      let target: Point | null = null
      let best = Infinity
      for (const f of foods) {
        const d = Math.abs(f.x - head.x) + Math.abs(f.y - head.y)
        if (d < best) {
          best = d
          target = f
        }
      }
      const dx = target ? target.x - head.x : 0
      const dy = target ? target.y - head.y : 0

      // Add some randomness to make it more interesting
      if (Math.random() > 0.8) {
        if (Math.abs(dx) > Math.abs(dy)) {
          trySetDirection({ x: dx > 0 ? 1 : -1, y: 0 })
        } else {
          trySetDirection({ x: 0, y: dy > 0 ? 1 : -1 })
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
    // Seed initial foods
    for (let i = 0; i < initialFoods; i++) spawnFood()
    const gameInterval = setInterval(gameLoop, tickMs)
    const spawnInterval = setInterval(spawnFood, spawnIntervalMs)

    return () => {
      clearInterval(gameInterval)
      clearInterval(spawnInterval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [gridSizeProp, initialFoods, maxFoods, spawnIntervalMs, tickMs])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
      role="presentation"
    />
  )
}
