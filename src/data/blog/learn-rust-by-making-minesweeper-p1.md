---
title: "Learn Rust by Making Minesweeper - Part 1: Types"
author: Thinh TRUONG
pubDatetime: 2025-08-31T11:52:14Z
slug: learn-rust-by-making-minesweeper-part-1-types
featured: true
draft: false
tags:
  - rust
  - programming
  - game-development
  - minesweeper
  - tutorial
  - fp
  - functional-programming
  - functional

description: "In this series, I attempt to learn Rust by building a simple Minesweeper game. This first part covers the basics of Rust types, including scalar and compound types, and how they are used in the context of the game."
---

![Post OG Image](/posts/learn-rust-by-making-minesweeper-part-1-types/index.png)

## Table of Contents

## Introduction

In this series, I attempt to learn Rust by building a simple Minesweeper game. I will try to use functional programming whenever sensible and follow a type driven design approach. This first part covers the algebraic data types in my game and how they are used in the context of the game.

## Motivation

I have always wanted to learn Rust, but I never had a good reason to do so. Lately, I have been thinking about how I would do the "Remake the [Google Minesweeper](https://share.google/qbDBFPx0TvG8Fyxz5) Game" interview question in Rust, why not just use it as a reason to learn the language?

![Google Minesweeper](/assets/images/minesweeper/minesweeper-1.png)

## Setting Up the Project

First, I created a new Rust project using Cargo:

```bash
cargo new minesweeper

cd minesweeper
```

This is pretty much it. However, to make my life easier to do FP in Rust, I added the `itertools` and `im` crates to my `Cargo.toml` file:

```toml
[dependencies]
itertools = "0.10"
im = "15.0"
```

`itertools` provides extra iterator adaptors and functions, while `im` provides immutable data structures.

## Defining the Types

Record or Product type in Rust is defined using `struct` like in any other languages, and Union or Sum type is defined using `enum`. From a bottom-up perspective, our game needs a basic `Coord` type to represent the coordinates of a cell in the grid:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct Coord {
    x: i32,
    y: i32,
}
```

A `Coord` is simply a pair of `x` and `y` coordinates, both are unsigned integers. I derived some useful traits for this type, such as `Debug` for printing, `Clone` and `Copy` for copying, `PartialEq` and `Eq` for equality comparison, and `Hash` for hashing. The `derive` macro is like decorators in Python, annotations in Java/Kotlin or typeclasses in Haskell.

Then, looking at the game, we can see that a tile can be in one of the following states:

- It can be a mine
- It can be a number (1-8) indicating how many mines are adjacent to it
- It can be empty (0) indicating that there are no adjacent mines

This is a perfect example of a Sum type, we can define it using `enum`:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum TileContent {
    Mine,
    Number(u8), // 1-8
    Empty,      // 0
}

```

Similarly, a tile can be in one of the following states:

- It can be hidden, meaning that the player has not clicked on it yet
- It can be revealed, meaning that the player has clicked on it and it is now visible
- It can be flagged, meaning that the player has marked it as a mine

This is another Sum type, we can define it using `enum`:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum TileVisibility {
    Hidden,
    Revealed,
    Flagged,
}
```

We are halfway done defining the types for our game, now we can define the main `Tile` struct that encapsulates both the content and the visibility of a tile:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct Tile {
    content: TileContent,
    visibility: TileVisibility,
}
```

With the tiles define, we need a type to represent the game board, which is a grid of tiles. We can use a 2D vector to represent the grid of tiles, but for simplicity, I will use a hash map where the key is the `Coord` and the value is the `Tile`. This allows us to easily access and update the tiles in the grid:

```rust
use im::HashMap;
struct GameBoard {
    board_size: i32,
    tiles: HashMap<Coord, Tile>,
}
```

Here, I used `im::HashMap` from the `im` crate to represent the grid, which is an immutable hash map. The key is a `Coord` and the value is a `Tile`. This allows us to easily access and update the tiles in the grid.

Finally, we need a type to represent the game state, which includes the game board, the number of mines, and the game status (ongoing, won, lost):

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum GameStatus {
    Ongoing,
    Won,
    Lost,
}
struct GameState {
    board: GameBoard,
    num_mines: u32,
    status: GameStatus,
}
```

## Conclusion

Zooming out, we have defined the basic types for our Minesweeper game using Rust's `struct` and `enum`. We have a `Coord` type to represent the coordinates of a cell, a `TileContent` enum to represent the content of a tile, a `TileVisibility` enum to represent the visibility of a tile, a `Tile` struct to encapsulate both the content and visibility of a tile, a `GameBoard` struct to represent the grid of tiles, and a `GameState` struct to represent the overall game state.
In the next part, we will implement the game logic in form of pure functions that operate on these types.
I hope you found this post useful and interesting. Stay tuned for the next part of the series!

## References

- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Crate registry](https://crates.io/)
