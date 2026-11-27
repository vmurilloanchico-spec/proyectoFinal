export function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
class NodoPrefijo {
  ramas = new Map<string, NodoPrefijo>();
  ids = new Set<string>();
}
export class Trie {
  private raiz = new NodoPrefijo();
  agregar(titulo: string, id: string) {
    let nodo = this.raiz;
    nodo.ids.add(id);
    for (const letra of normalizar(titulo)) {
      if (!nodo.ramas.has(letra)) nodo.ramas.set(letra, new NodoPrefijo());
      nodo = nodo.ramas.get(letra)!;
      nodo.ids.add(id);
    }
  }
  buscar(prefijo: string) {
    let nodo: NodoPrefijo | undefined = this.raiz;
    for (const letra of normalizar(prefijo)) nodo = nodo?.ramas.get(letra);
    return nodo?.ids ?? new Set<string>();
  }
}
export class Pila<T> {
  private datos: T[] = [];
  guardar(valor: T) {
    this.datos.push(valor);
  }
  sacar() {
    return this.datos.pop();
  }
  get cantidad() {
    return this.datos.length;
  }
}
export class Grafo {
  private vecinos = new Map<string, Set<string>>();
  conectar(a: string, b: string) {
    for (const [origen, destino] of [
      [a, b],
      [b, a],
    ]) {
      if (!this.vecinos.has(origen)) this.vecinos.set(origen, new Set());
      this.vecinos.get(origen)!.add(destino);
    }
  }
  relacionados(id: string) {
    return this.vecinos.get(id) ?? new Set<string>();
  }
}
