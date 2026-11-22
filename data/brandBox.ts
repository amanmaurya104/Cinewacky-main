import type { AdCampaign, AdStill } from '@/types/advert';

// The Brand Box page. Copy comes from Advertisement.pdf and data.md; the
// stills are frame grabs from the campaigns, built into
// public/projects/brand-box/<reel>/NN.jpg by scripts/build-brand-box-stills.mjs
// (that script lists which master each number comes from).
//
// Trailers: drop the file in public/projects/brand-box/trailers/ and set
// `trailer: { src, poster }` on the campaign (the showreel at the top) or on a
// spot. Until then each shows a "please stand by" card.

type Reel = 'garments' | 'product' | 'itc' | 'hills' | 'city' | 'bengal';

function still(reel: Reel, n: number, alt: string): AdStill {
  return { src: `/projects/brand-box/${reel}/${String(n).padStart(2, '0')}.jpg`, alt };
}

const brandBox: AdCampaign = {
  kicker: 'Brand Box — Advertisement trailers',
  headline: 'Your brand deserves the spotlight',

  wall: [
    still('hills', 15, 'Hotel facade lit up at dusk'),
    still('itc', 3, 'Christmas tree with red gifts beneath a lobby chandelier'),
    still('product', 1, 'Woman in a red saree holding a box of Mangaldeep Dhuno cups'),
    still('hills', 6, 'Rooftop infinity pool looking out over the mountains'),
    still('itc', 10, 'Crystal chandelier seen from below'),
    still('city', 17, 'Hotel entrance under a mural, lit at dusk'),
    still('garments', 2, 'Close-up of a woman in a red and gold saree'),
    still('bengal', 4, 'Aerial view of an arched gateway in green countryside'),
    still('hills', 3, 'Hotel lobby with a carved gold ceiling'),
    still('city', 12, 'Martini glass being filled'),
    still('itc', 5, 'White and silver Christmas tree in a lounge'),
    still('city', 10, 'Plated starter in soft focus'),
  ],

  copy: {
    headline: ['In a world full of noise,', 'your message deserves to shine.'],
    paragraphs: [
      'At Cinewacky, we don’t just create ads — we craft experiences that capture attention, ignite emotions, and drive results. Every idea, every campaign, and every word is tailored to make your brand unforgettable.',
      'Why choose advertising? Because it’s more than just promotion — it’s the art of connection. With the perfect blend of strategy, creativity, and innovation, we bring your vision to life in ways that resonate deeply with your audience.',
    ],
    signOff: 'Cinewacky — Brand Box',
  },
  transformations: [
    ['A product', 'a story'],
    ['A service', 'a solution'],
    ['A business', 'a brand people trust and love'],
  ],
  blend: ['Strategy', 'Creativity', 'Innovation'],

  roster: ['ITC', 'Mangaldeep', 'Shalimar', 'St. Ives'],
  categories: ['Garments', 'Hotels', 'Products'],

  close: {
    lede: 'It’s time to amplify your presence, inspire action, and leave a lasting impact.',
    words: ['Amplify', 'Inspire', 'Impact'],
    line: 'Let’s make your brand the one everyone is talking about.',
    signOff: 'Your journey to the unforgettable starts here.',
  },

  spots: [
    {
      id: 'garments',
      number: '01',
      category: 'Garments',
      layout: 'spread',
      headline: ['Crafted to fit,', 'designed to impress.'],
      subline: 'Your look, your legacy.',
      accent: '#d4473a',
      stills: [
        still('garments', 1, 'Woman seated in a red and gold saree beside a flower rangoli'),
        still('garments', 2, 'Close-up in a red and gold saree, eyes lowered'),
        still('garments', 3, 'Soft-focus portrait in a red saree with gold jewellery'),
      ],
    },
    {
      id: 'itc',
      number: '02',
      category: 'ITC',
      layout: 'vertical',
      // data.md reads "Where Every CLIENTS Is Royalty".
      headline: ['Where every client is royalty —', 'indulge in pure luxury.'],
      accent: '#d9b46c',
      stills: [
        still('itc', 1, 'Palatial hotel facade wrapped in light trails at night'),
        still('itc', 2, 'Marble staircase under a crystal chandelier, garlanded for Christmas'),
        still('itc', 3, 'Christmas tree with red gifts beneath a lobby chandelier'),
        still('itc', 4, 'Santa Claus display in a wood-panelled corridor'),
        still('itc', 5, 'White and silver Christmas tree in a lounge'),
        still('itc', 6, 'Restaurant entrance opening onto a gold-lit dining room'),
        still('itc', 7, 'Private dining booth under a domed lamp'),
        still('itc', 8, 'Round table laid for dinner in a cream booth'),
        still('itc', 9, 'Long banquet table beneath a chandelier'),
        still('itc', 10, 'Crystal chandelier seen from below'),
      ],
    },
    {
      id: 'hotels',
      number: '03',
      category: 'Hotels',
      layout: 'storyboard',
      headline: ['Escape the ordinary,', 'embrace the extraordinary.'],
      accent: '#7cc6d2',
      billboard: still('hills', 6, 'Rooftop infinity pool looking out over the mountains'),
      reels: [
        {
          id: 'hills',
          name: 'The Hills',
          note: 'Hill-station stays above the clouds',
          stills: [
            still('hills', 1, 'Hillside town, a hotel among the trees, mist in the valley'),
            still('hills', 2, 'Aerial through cloud over the town and its football ground'),
            still('hills', 3, 'Lobby with a carved gold ceiling and polished floor'),
            still('hills', 4, 'Guest room, double bed, window onto the hills'),
            still('hills', 5, 'Clay pots on the buffet beside stacked white bowls'),
            still('hills', 6, 'Rooftop infinity pool over the mountains'),
            still('hills', 7, 'Suite with leather sofas and a balcony at dusk'),
            still('hills', 8, 'Aerial of a red-roofed hotel in the forest'),
            still('hills', 9, 'Entrance drive, the hotel sign at the gate'),
            still('hills', 10, 'Guest room, wide bed, wooden-framed windows'),
            still('hills', 11, 'Kettle tray and windows onto the forest'),
            still('hills', 12, 'Boardroom under a timber ceiling'),
            still('hills', 13, 'Garden gazebo with tables on the lawn'),
            still('hills', 14, 'Waiter with a tray through a dining room strung with lights'),
            still('hills', 15, 'Facade lit up at dusk'),
          ],
        },
        {
          id: 'city',
          name: 'The City',
          note: 'A modern hotel off the highway',
          stills: [
            still('city', 1, 'Aerial of the hotel beside the highway and green fields'),
            still('city', 2, 'Entrance with colourful panels and white pillars'),
            still('city', 3, 'Guest room with a round mirror and a city view'),
            still('city', 4, 'Sitting room with carved armchairs'),
            still('city', 5, 'Window tables beside a colourful tile motif'),
            still('city', 6, 'Open-air terrace café'),
            still('city', 7, 'Suite with a bed and a work desk'),
            still('city', 8, 'Room with armchairs and a fruit bowl'),
            still('city', 9, 'Twin room, padded headboard, striped rug'),
            still('city', 10, 'Plated starter in soft focus'),
            still('city', 11, 'Wicker chairs in the conference room'),
            still('city', 12, 'Martini glass being filled'),
            still('city', 13, 'Games room under a rainbow ceiling'),
            still('city', 14, 'Banquet hall laid for a conference'),
            still('city', 15, 'Restaurant under round pendant lamps'),
            still('city', 16, 'Lobby glass wall opening onto the night'),
            still('city', 17, 'Entrance under a mural, lit at dusk'),
            still('city', 18, 'Driveway and palms at blue hour'),
          ],
        },
        {
          id: 'bengal',
          name: 'Experience Bengal',
          note: 'Riverside country, Bengal kitchens',
          stills: [
            still('bengal', 1, 'White hotel block in the morning sun'),
            still('bengal', 2, 'Table for two by the window'),
            still('bengal', 3, 'Fishing boats on a wide river beside the fields'),
            still('bengal', 4, 'Aerial of an arched gateway in green countryside'),
            still('bengal', 5, 'Jalebi with lime and mint'),
            still('bengal', 6, 'Fish fry with onion rings and green chutney'),
            still('bengal', 7, 'Facade lit at blue hour'),
            still('bengal', 8, 'The hotel front across the lawn at dusk'),
          ],
        },
      ],
    },
    {
      id: 'product',
      number: '04',
      category: 'Product',
      layout: 'packshot',
      headline: ['Redefine the way you live —', 'innovation starts here.'],
      accent: '#f4a52a',
      product: 'Mangaldeep Dhuno',
      hero: still('product', 1, 'Woman in a red saree holding a box of Mangaldeep Dhuno cups'),
      stills: [
        still('product', 2, 'Smiling close-up with the Dhuno box'),
        still('product', 3, 'Preparing dhuno in a clay pot beside a flower rangoli'),
        still('product', 4, 'Seated with the Dhuno box before a flower rangoli'),
      ],
    },
  ],
};

export default brandBox;
