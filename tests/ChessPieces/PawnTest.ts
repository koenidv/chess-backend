import { assert, assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { Board } from "../../Board.ts";
import { BoardPosition } from "../../BoardPosition.ts";
import { Pawn } from "../../ChessPieces/Pawn.ts";

// Black pieces straight movements

Deno.test("positions equal", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition(1, 1);
    const to = new BoardPosition(1, 1);
    assertEquals(pawn.validateMove(from, to, board), false)
})

Deno.test("black forward 1 from B7", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B7");
    const to = new BoardPosition("B6");
    assertEquals(pawn.validateMove(from, to, board), true)  
})

Deno.test("black forward 2 from B7", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B7");
    const to = new BoardPosition("B5");
    assertEquals(pawn.validateMove(from, to, board), true)  
})

Deno.test("black forward 3 from B7", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B7");
    const to = new BoardPosition("B4");
    assertEquals(pawn.validateMove(from, to, board), false)
})

Deno.test("black forward 1 from B6", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B6");
    const to = new BoardPosition("B5");
    assertEquals(pawn.validateMove(from, to, board), true)  
})

Deno.test("black forward 2 from B6", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B6");
    const to = new BoardPosition("B4");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

Deno.test("black backwards 1 from B6", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B6");
    const to = new BoardPosition("B7");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

Deno.test("black left 1 from B6", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B6");
    const to = new BoardPosition("A6");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

Deno.test("black right 1 from B6", () => {
    const pawn = new Pawn(false);
    const board = new Board();
    const from = new BoardPosition("B6");
    const to = new BoardPosition("C6");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

// White pieces directions

Deno.test("white forward 1 from B2", () => {
    const pawn = new Pawn(true);
    const board = new Board();
    const from = new BoardPosition("B2");
    const to = new BoardPosition("B3");
    assertEquals(pawn.validateMove(from, to, board), true)  
})

Deno.test("white forward 2 from B2", () => {
    const pawn = new Pawn(true);
    const board = new Board();
    const from = new BoardPosition("B2");
    const to = new BoardPosition("B4");
    assertEquals(pawn.validateMove(from, to, board), true)
})

Deno.test("white forward 2 from B3", () => {
    const pawn = new Pawn(true);
    const board = new Board();
    const from = new BoardPosition("B3");
    const to = new BoardPosition("B5");
    assertEquals(pawn.validateMove(from, to, board), false)
})

Deno.test("white backwards 1 from B3", () => {
    const pawn = new Pawn(true);
    const board = new Board();
    const from = new BoardPosition("B3");
    const to = new BoardPosition("B2");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

Deno.test("white backwards 2 from B3", () => {
    const pawn = new Pawn(true);
    const board = new Board();
    const from = new BoardPosition("B3");
    const to = new BoardPosition("B1");
    assertEquals(pawn.validateMove(from, to, board), false)  
})

// todo diagonal moves
// todo collisions
