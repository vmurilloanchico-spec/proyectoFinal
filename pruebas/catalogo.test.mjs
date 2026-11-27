import test from "node:test";
import assert from "node:assert/strict";
import { Trie, Pila, Grafo } from "../src/app/catalogo/indices.ts";
import { HeapMaximo } from "../src/app/catalogo/capacidad.ts";
test("El trie busca prefijos aunque cambien las tildes o las mayúsculas", () => {
  const t = new Trie();
  t.agregar("María", "m");
  t.agregar("Marina", "n");
  assert.deepEqual([...t.buscar(" MARÍ ")], ["m", "n"]);
  assert.equal(t.buscar("ría").size, 0);
});
test("La pila devuelve primero el último filtro", () => {
  const p = new Pila();
  p.guardar("Todos");
  p.guardar("Poesía");
  assert.equal(p.sacar(), "Poesía");
  assert.equal(p.sacar(), "Todos");
  assert.equal(p.sacar(), undefined);
});
test("El heap conserva la mayor capacidad en la raíz", () => {
  const h = new HeapMaximo();
  for (const n of [8, 14, 2, 11, 20, 17]) h.agregar(n, n);
  assert.equal(h.primero(), 20);
});
test("El grafo relaciona en ambos sentidos sin duplicar aristas", () => {
  const g = new Grafo();
  g.conectar("a", "b");
  g.conectar("a", "b");
  assert.deepEqual([...g.relacionados("b")], ["a"]);
  assert.deepEqual([...g.relacionados("a")], ["b"]);
});
