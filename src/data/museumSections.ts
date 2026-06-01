export type FrameSpec = {
  left: string
  top: string
  width: number
  height: number
  src?: string
  alt?: string
}

export type MuseumSectionKind = 'standard' | 'special'

export type MuseumSection = {
  id: string
  title: string
  frames: FrameSpec[]
  kind?: MuseumSectionKind
  subtitle?: string
}

const EMPTY_WALL_FRAMES: FrameSpec[] = [
  { left: '14%', top: '20%', width: 155, height: 195 },
  { left: '40%', top: '17%', width: 195, height: 138 },
  { left: '64%', top: '21%', width: 148, height: 188 },
  { left: '32%', top: '50%', width: 175, height: 148 },
]

export const MUSEUM_SECTIONS: MuseumSection[] = [
  {
    id: 'designed',
    title: "Things I've designed",
    frames: [
      {
        left: '22%',
        top: '21%',
        width: 158,
        height: 158,
        src: '/museum/designed/picnic.png',
        alt: 'Welcome picnic event poster for a UCLA student club',
      },
      {
        left: '40%',
        top: '15%',
        width: 215,
        height: 148,
        src: '/museum/designed/ergonomics-dashboard.png',
        alt: 'Ergonomics monitoring dashboard for workplace safety',
      },
      {
        left: '64%',
        top: '17%',
        width: 172,
        height: 128,
        src: '/museum/designed/tennis.png',
        alt: 'A still taken from an interactive Figma tennis court card I made for my tennis pal',
      },
      {
        left: '40%',
        top: '48%',
        width: 180,
        height: 180,
        src: '/museum/designed/ceramic-plate.png',
        alt: 'Hand-painted ceramic plate with ladybugs',
      },
      {
        left: '62%',
        top: '50%',
        width: 130,
        height: 158,
        src: '/museum/designed/blob-character.png',
        alt: 'Bunny with red strawberry, and a fun attempt at 3D design',
      },
    ],
  },
  {
    id: 'music',
    title: "Music I've loved",
    frames: [
      {
        left: '16%',
        top: '32%',
        width: 148,
        height: 148,
        src: '/museum/music/horrors-v.png',
        alt: 'I met you when I was 18 - Lauv',
      },
      {
        left: '34%',
        top: '32%',
        width: 148,
        height: 148,
        src: '/museum/music/5sos-youngblood.png',
        alt: 'Youngblood - 5 Seconds of Summer',
      },
      {
        left: '52%',
        top: '32%',
        width: 148,
        height: 148,
        src: '/museum/music/silver-star.png',
        alt: 'Bewitched - Laufey',
      },
      {
        left: '70%',
        top: '32%',
        width: 148,
        height: 148,
        src: '/museum/music/glass-animals-dreamland.png',
        alt: 'Dreamland - Glass Animals',
      },
    ],
  },
  {
    id: 'books',
    title: "Books I've loved",
    frames: [
      {
        left: '16%',
        top: '26%',
        width: 132,
        height: 188,
        src: '/museum/books/remains-of-the-day.png',
        alt: 'The Remains of the Day - Kazuo Ishiguro',
      },
      {
        left: '34%',
        top: '38%',
        width: 132,
        height: 188,
        src: '/museum/books/piranesi.png',
        alt: 'Piranesi - Susanna Clarke',
      },
      {
        left: '52%',
        top: '26%',
        width: 132,
        height: 188,
        src: '/museum/books/island-of-missing-trees.png',
        alt: 'The Island of Missing Trees - Elif Shafak',
      },
      {
        left: '70%',
        top: '38%',
        width: 132,
        height: 188,
        src: '/museum/books/time-war.png',
        alt: 'This Is How You Lose the Time War - Amal El-Mohtar & Max Gladstone',
      },
    ],
  },
  {
    id: 'photos',
    title: "Photos I've taken",
    frames: [
      {
        left: '16%',
        top: '26%',
        width: 132,
        height: 188,
        src: '/museum/photos/rainy-house.png',
        alt: 'Rainy day outside a brown wooden house',
      },
      {
        left: '34%',
        top: '38%',
        width: 132,
        height: 188,
        src: '/museum/photos/hammocks.png',
        alt: 'Hammocks and flowers below a Tudor-style building',
      },
      {
        left: '52%',
        top: '26%',
        width: 132,
        height: 188,
        src: '/museum/photos/yellow-lilies.png',
        alt: 'Yellow lilies in front of a timber-framed gable',
      },
      {
        left: '70%',
        top: '38%',
        width: 132,
        height: 188,
        src: '/museum/photos/heron.png',
        alt: 'Grey heron among lily pads and pink water lilies',
      },
    ],
  },
  {
    id: 'shows',
    title: "Shows & films I've loved",
    frames: [
      {
        left: '16%',
        top: '30%',
        width: 148,
        height: 186,
        src: '/museum/shows/mindhunter.png',
        alt: 'Mindhunter -- still disappointed that Netflix canceled this one.',
      },
      {
        left: '34%',
        top: '30%',
        width: 148,
        height: 186,
        src: '/museum/shows/severance.png',
        alt: "Severance -- Imagining a version of me that's just designing 24/7",
      },
      {
        left: '52%',
        top: '30%',
        width: 148,
        height: 186,
        src: '/museum/shows/poor-things.png',
        alt: 'Poor Things - Would not stop talking about the philosophical references in this film after watching it',
      },
      {
        left: '70%',
        top: '30%',
        width: 148,
        height: 186,
        src: '/museum/shows/grand-budapest.png',
        alt: 'The Grand Budapest Hotel - A gorgeous, breathtaking film where the melancholy lingers after the comedy.',
      },
    ],
  },
  {
    id: 'special',
    kind: 'special',
    title: 'Owner of the gallery',
    frames: [
      {
        left: '10%',
        top: '30%',
        width: 128,
        height: 186,
        src: '/museum/special/photo-1.png',
        alt: '',
      },
      {
        left: '26%',
        top: '30%',
        width: 128,
        height: 186,
        src: '/museum/special/photo-2.png',
        alt: '',
      },
      {
        left: '42%',
        top: '30%',
        width: 128,
        height: 186,
        src: '/museum/special/photo-3.png',
        alt: '',
      },
      {
        left: '58%',
        top: '30%',
        width: 128,
        height: 186,
        src: '/museum/special/photo-4.png',
        alt: '',
      },
      {
        left: '74%',
        top: '30%',
        width: 128,
        height: 186,
        src: '/museum/special/photo-5.png',
        alt: '',
      },
    ],
  },
]

export const MUSEUM_SECTION_COUNT = MUSEUM_SECTIONS.length
