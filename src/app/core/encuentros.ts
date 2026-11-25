export interface Encuentro {
  id: string;
  titulo: string;
  genero: string;
  lugar: string;
  horario: string;
  portada: string;
  descripcion: string;
  capacidad: number;
}
export const encuentros: Encuentro[] = [
  {
    id: "voragine",
    titulo: "La vorágine",
    genero: "Novela",
    lugar: "Sala Guadual",
    horario: "Lunes · 4:00 p. m.",
    portada: "selva",
    descripcion:
      "Leemos a José Eustasio Rivera para conversar sobre el poder de la selva en la novela colombiana.",
    capacidad: 12,
  },
  {
    id: "ficciones",
    titulo: "Ficciones",
    genero: "Cuento",
    lugar: "Sala Ceiba",
    horario: "Miércoles · 5:00 p. m.",
    portada: "laberinto",
    descripcion:
      "Exploramos bibliotecas, laberintos y mundos posibles en los cuentos de Jorge Luis Borges.",
    capacidad: 10,
  },
  {
    id: "desolacion",
    titulo: "Desolación",
    genero: "Poesía",
    lugar: "Patio central",
    horario: "Viernes · 3:00 p. m.",
    portada: "luna",
    descripcion:
      "Compartimos una lectura en voz alta de Gabriela Mistral y conversamos sobre las imágenes que nos deja.",
    capacidad: 8,
  },
  {
    id: "maria",
    titulo: "María",
    genero: "Novela",
    lugar: "Sala Guadual",
    horario: "Jueves · 4:00 p. m.",
    portada: "valle",
    descripcion:
      "Recorremos el Valle del Cauca a través de los paisajes y los recuerdos de la novela de Jorge Isaacs.",
    capacidad: 14,
  },
];
