"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Cell = { row: number; col: number };
type Direction = "up" | "down" | "left" | "right";

const DIRECTION_VECTORS: Record<Direction, { dr: number; dc: number }> = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const ALL_DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

const cellKey = (cell: Cell) => `${cell.row},${cell.col}`;

const moveHead = (head: Cell, dir: Direction): Cell => {
  const { dr, dc } = DIRECTION_VECTORS[dir];
  return { row: head.row + dr, col: head.col + dc };
};

const inBounds = (cell: Cell, rows: number, cols: number) =>
  cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols;

const manhattan = (a: Cell, b: Cell) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

function buildInitialSnake(rows: number, cols: number): Cell[] {
  const row = Math.floor(rows / 2);
  const col = Math.floor(cols / 2);
  return [
    { row, col },
    { row, col: col - 1 },
    { row, col: col - 2 },
  ];
}

function placeFood(snake: Cell[], rows: number, cols: number): Cell {
  const occupied = new Set(snake.map(cellKey));
  while (true) {
    const candidate = {
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols),
    };
    if (!occupied.has(cellKey(candidate))) {
      return candidate;
    }
  }
}

function chooseDirection(
  snake: Cell[],
  food: Cell,
  current: Direction,
  rows: number,
  cols: number,
): Direction {
  const head = snake[0];
  const occupied = new Set(snake.slice(0, -1).map(cellKey));

  type Candidate = { dir: Direction; safe: boolean; dist: number };
  const scored: Candidate[] = ALL_DIRECTIONS.filter(
    (d) => d !== OPPOSITE[current],
  ).map((dir) => {
    const next = moveHead(head, dir);
    const safe = inBounds(next, rows, cols) && !occupied.has(cellKey(next));
    return { dir, safe, dist: manhattan(next, food) };
  });

  const safe = scored
    .filter((c) => c.safe)
    .sort((a, b) => a.dist - b.dist);
  if (safe.length > 0) return safe[0].dir;

  return current;
}

interface SnakeGameMiniProps {
  rows?: number;
  cols?: number;
  tickMs?: number;
  cellColor?: string;
  foodColor?: string;
  opacityClass?: string;
  className?: string;
}

function deterministicStarterFood(rows: number, cols: number): Cell {
  return { row: 2, col: Math.max(cols - 3, 0) };
}

export function SnakeGameMini({
  rows = 12,
  cols = 44,
  tickMs = 180,
  cellColor = "bg-paper",
  foodColor = "bg-cyan",
  opacityClass = "opacity-15",
  className,
}: SnakeGameMiniProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [snake, setSnake] = useState<Cell[]>(() => buildInitialSnake(rows, cols));
  const [food, setFood] = useState<Cell>(() =>
    deterministicStarterFood(rows, cols),
  );
  const directionRef = useRef<Direction>("right");

  const foodRef = useRef(food);
  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    if (reducedMotion || tickMs <= 0) return;

    const intervalId = setInterval(() => {
      setSnake((current) => {
        const currentFood = foodRef.current;
        const nextDir = chooseDirection(
          current,
          currentFood,
          directionRef.current,
          rows,
          cols,
        );
        directionRef.current = nextDir;
        const newHead = moveHead(current[0], nextDir);

        const hitsWall = !inBounds(newHead, rows, cols);
        const bodyWithoutTail = new Set(current.slice(0, -1).map(cellKey));
        const hitsSelf = bodyWithoutTail.has(cellKey(newHead));

        if (hitsWall || hitsSelf) {
          const fresh = buildInitialSnake(rows, cols);
          directionRef.current = "right";
          setFood(placeFood(fresh, rows, cols));
          return fresh;
        }

        const ateFood =
          newHead.row === currentFood.row && newHead.col === currentFood.col;
        if (ateFood) {
          const grown = [newHead, ...current];
          setFood(placeFood(grown, rows, cols));
          return grown;
        }

        return [newHead, ...current.slice(0, -1)];
      });
    }, tickMs);

    return () => clearInterval(intervalId);
  }, [reducedMotion, tickMs, rows, cols]);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    }),
    [rows, cols],
  );

  const snakeSet = useMemo(() => new Set(snake.map(cellKey)), [snake]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-500",
        opacityClass,
        className,
      )}
      aria-hidden="true"
    >
      <div className="grid h-full w-full" style={gridStyle}>
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const key = `${row},${col}`;
          const isFood = row === food.row && col === food.col;
          const isSnake = snakeSet.has(key);
          return (
            <span
              key={key}
              className={cn(
                "block",
                isSnake && cellColor,
                !isSnake && isFood && foodColor,
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
