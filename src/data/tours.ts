export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Unique, stable id — used as the React key and the tour detail slug (/tours/[id]). */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: string;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). */
  price: string;
  /**
   * Photos under /public/tours. Feeds the card gallery (TourGallery), the
   * detail page hero background (first photo), and the detail page photo
   * slider (full array). One photo = no gallery arrows/thumbnails shown
   * anywhere. Add more entries once there are extra photos for a tour.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: string;
  /** Short subtitle shown under the title on the tour detail page hero. */
  description: string;
  /** Detail page accordion: bullet points under "Timing". */
  timing: string[];
  /** Detail page accordion: bullet points under "Inclusive". */
  inclusive: string[];
  /** Detail page accordion: bullet points under "Exclusive". */
  exclusive: string[];
  /** Detail page accordion: bullet points under "Additional information". */
  additionalInfo: string[];
};

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: "Kolsai, Kaindy & Moon Canyon",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-moon-canyon.webp",
        alt: "Kaindy Lake's turquoise water and its sunken pine forest",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-4.webp",
        alt: "Wide view of Moon Canyon's layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "River winding through the canyon near Moon Canyon",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
    ],
    badge: "every day",
    description:
      "Moon Canyon, the mysterious sunken forest of Kaindy Lake, and the crystal-clear waters of Kolsai Lake — all in one unforgettable day. A scenic journey through Kazakhstan's mountains, with breathtaking landscapes, a local lunch and plenty of time to explore.",
    timing: [
      "5:00–5:30 — Guest pickup",
      "7:00–7:30 — Stop at a gas station (breakfast option)",
      "8:30–10:00 — Moon Canyon",
      "11:00–13:30 — Kaindy Lake",
      "13:30–14:00 — Lunch",
      "14:30–16:00 — Kolsai Lake",
      "18:00–18:30 — Stop at a gas station",
      "20:00–21:00 — Return to Almaty",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person for a group of 16",
      "$90 per person for a group of 8",
      "$110 per person for a group of 3",
      "Tours run every day",
    ],
  },
  {
    id: "kolsai-kaindy-charyn-black-moon-2-day",
    title:
      "Kolsai, Kaindy, Charyn, Black Canyon & Moon Canyon (2-Day Tour)",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-charyn-black-moon-2-day.webp",
        alt: "Canyon landscape with layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-4.webp",
        alt: "Wide view of Moon Canyon's layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "River winding through the canyon near Moon Canyon",
      },
    ],
    badge: "Mon, Wed, Fri",
    description:
      "Moon Canyon, Black Canyon and the dramatic Charyn Canyon, turquoise Kolsai Lake and the sunken forest of Kaindy Lake — two days of Kazakhstan's most spectacular mountain landscapes, with cozy accommodation, local food and an unforgettable road trip through the wild.",
    timing: [
      "Day 1",
      "7:00–7:30 — Guest pickup at the hotel",
      "8:00–8:30 — Stop at a gas station",
      "10:00–10:30 — Moon Canyon",
      "11:00–11:30 — Black Canyon",
      "12:30–13:30 — Lunch",
      "14:00–18:00 — Kolsai Lake",
      "19:00–19:30 — Hotel check-in and dinner",
      "Day 2",
      "7:00–7:30 — Breakfast",
      "8:00–10:00 — Kaindy Lake",
      "11:30–12:00 — Lunch",
      "13:30–16:30 — Charyn Canyon",
      "18:00–19:00 — Return to Almaty",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$110 per person — guest house (shared bathroom)",
      "$130 per person — guest house (private bathroom)",
      "$150 per person — traditional house (yurt, shared bathroom)",
      "Tours run on Monday, Wednesday, and Friday",
    ],
  },
  {
    id: "big-almaty-lake-falcon-show",
    title: "Big Almaty Lake & Falcon Show",
    price: "$60",
    images: [
      {
        src: "/tours/big-almaty-lake-falcon-show.webp",
        alt: "Big Almaty Lake surrounded by snow-capped mountains",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-2.webp",
        alt: "Big Almaty Lake's turquoise water framed by snowy peaks in winter",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-3.webp",
        alt: "Wildflowers and pine trees along the shore of Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-4.webp",
        alt: "Hikers walking along the mountain water pipeline near Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-5.webp",
        alt: "The mountain water pipeline leading toward Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-6.webp",
        alt: "A forest lake with autumn foliage along the shore",
      },
    ],
    badge: "every day",
    description:
      "Big Almaty Lake surrounded by the peaks of the Trans-Ili Alatau, followed by an impressive falconry show. A perfect day trip from Almaty combining breathtaking mountain scenery, fresh air, free time by the lake and a unique look into Kazakhstan's nomadic traditions.",
    timing: [
      "7:00 — Guest pickup at the hotel",
      "10:00 — Arrival at Big Almaty Lake",
      "10:00–14:00 — Free time at Big Almaty Lake",
      "15:00 — Arrival at the hotel parking lot",
      "16:00–16:40 — Falconry show",
      "17:30 — Return to Almaty",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person — hiking route + falconry show",
      "$80 per person — car ride",
      "Tours run every day",
    ],
  },
  {
    id: "oi-qaragai-mountain-resort",
    title: "Oi-Qaragai Mountain Resort",
    price: "$60",
    images: [
      {
        src: "/tours/oi-qaragai-mountain-resort.webp",
        alt: "Colorful cottages of Oi-Qaragai Mountain Resort among autumn trees",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-2.webp",
        alt: "Traditional yurt restaurant at the entrance to Oi-Qaragai Mountain Resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-3.webp",
        alt: "Chairlift ride above the forest at Oi-Qaragai Mountain Resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-4.webp",
        alt: "Green mountain ridges and pine forest surrounding Oi-Qaragai",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-5.webp",
        alt: "Wooden cabins and a yurt along a mountain stream at the resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-6.webp",
        alt: "A treehouse-style cabin among tall pine trees",
      },
    ],
    badge: "every day",
    description:
      "A three-day escape to Oi-Qaragai Mountain Resort, surrounded by forests and mountain landscapes. Slow mornings, cozy accommodation and a huge choice of activities — hiking, horseback riding, ziplining, golf, archery, climbing and spa time. The perfect mix of adventure and complete relaxation just outside Almaty.",
    timing: [
      "Day 1",
      "12:30 — Guest pickup",
      "14:00–14:30 — Arrival at Oi-Qaragai mountain resort",
      "14:30–15:00 — Check-in",
      "15:00 — Free time",
      "Day 2",
      "7:00–7:30 — Breakfast at the resort",
      "8:00 — Free time — enjoy the resort's activities:",
      "Paintball",
      "Hiking",
      "Mountain golf",
      "Archery",
      "Rope park",
      "Climbing park",
      "Zipline",
      "Horseback riding",
      "Spa",
      "Day 3",
      "7:00–7:30 — Breakfast at the resort",
      "7:30–11:30 — Free time",
      "11:30–12:00 — Check-out",
      "13:30–14:00 — Return to Almaty",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person — hiking route + falconry show",
      "$80 per person — car ride",
      "Tours run every day",
    ],
  },
  {
    id: "city-tour",
    title: "City Tour",
    price: "$60",
    images: [
      {
        src: "/tours/city-tour.webp",
        alt: "Shymbulak gondola cabin over a chalet village in the mountains",
      },
      {
        src: "/tours/city-tour-7.webp",
        alt: "Panfilov Park alley with the Momyshuly monument and war memorial cannons",
      },
      {
        src: "/tours/city-tour-8.webp",
        alt: "Ascension Cathedral in Panfilov Park",
      },
      {
        src: "/tours/city-tour-9.webp",
        alt: "Eternal flame at the Memorial of Glory in Panfilov Park",
      },
      {
        src: "/tours/city-tour-3.webp",
        alt: "Aerial view of Shymbulak's chalets and mountain road",
      },
      {
        src: "/tours/city-tour-4.webp",
        alt: "Gondola cabin carrying skiers over snowy peaks",
      },
      {
        src: "/tours/city-tour-5.webp",
        alt: "Medeu skating rink surrounded by autumn mountains",
      },
      {
        src: "/tours/city-tour-6.webp",
        alt: "View of the ski slope from above the clouds at Shymbulak",
      },
    ],
    badge: "every day",
    description:
      "A flexible one-day city tour around Almaty — choose one of four route options: Shymbulak ski resort and Panfilov Park, the Alma-Arasan and Ayusai gorges, Kok-Tobe and Central Park, or the Green Bazaar and Arbat pedestrian street. A relaxed way to see the best of Almaty and its surroundings, tailored to what you want to explore.",
    timing: [
      "Option 1",
      "11:00–15:30 — Visit Shymbulak Mountain Resort (3 cable car stations) and enjoy the snow and mountain scenery",
      "16:30–17:30 — Visit Panfilov Park and the Memorial of Glory",
      "Option 2",
      "11:00–15:30 — Visit Alma-Arasan Gorge (hot springs) and Ayusai Gorge",
      "16:00–17:00 — Watch a bird show or visit the Presidential Park",
      "Option 3",
      "11:00–13:30 — Visit Kok-Tobe Park (cable car, panoramic views and summer slide)",
      "14:00–17:00 — Visit Central Park: amusement rides, lake and zoo",
      "Option 4",
      "13:30–15:30 — Visit Green Bazaar and a chocolate factory",
      "16:00–18:00 — Walk along Arbat pedestrian street and explore the city center",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person — hiking route + falconry show",
      "$80 per person — car ride",
      "Tours run every day",
    ],
  },
  {
    id: "tour-package",
    title: "Tour Package",
    price: "$60",
    images: [
      {
        src: "/tours/city-tour-4.webp",
        alt: "Gondola cabin carrying skiers over snowy peaks",
      },
      {
        src: "/tours/city-tour.webp",
        alt: "Shymbulak gondola cabin over a chalet village in the mountains",
      },
      {
        src: "/tours/city-tour-3.webp",
        alt: "Aerial view of Shymbulak's chalets and mountain road",
      },
      {
        src: "/tours/city-tour-7.webp",
        alt: "Panfilov Park alley with the Momyshuly monument and war memorial cannons",
      },
      {
        src: "/tours/city-tour-8.webp",
        alt: "Ascension Cathedral in Panfilov Park",
      },
      {
        src: "/tours/city-tour-9.webp",
        alt: "Eternal flame at the Memorial of Glory in Panfilov Park",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-4.webp",
        alt: "Green mountain ridges and pine forest near Almaty",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-3.webp",
        alt: "Wildflowers and pine trees in the Almaty mountains",
      },
    ],
    badge: "every day",
    description:
      "A 6-day journey through Almaty's mountains and lakes — Shymbulak ski resort, Kolsai Lake, Alma-Arasan and Ayusai gorges, Butakovka gorge, the Lesnaya Skazka mountain resort and Issyk Lake. Scenic hikes, riverside stops and breathtaking views every day.",
    timing: [
      "Day 1",
      "11:00–15:30 — Visit Shymbulak Mountain Resort (3 cable car stations), enjoy the mountain views and snowy scenery",
      "16:30–17:30 — Visit Panfilov Park and the Memorial of Glory",
      "Day 2",
      "09:00–18:00 — Trip to Kolsai Lake, enjoy the breathtaking natural scenery and relax by the lake",
      "Day 3",
      "10:30–15:30 — Visit Alma-Arasan Gorge (natural springs and riverside relaxation) and Ayusai Gorge",
      "16:00–17:30 — Visit the Presidential Park",
      "Day 4",
      "10:30–15:30 — Visit Butakovka Gorge, a walk through the forest and along the river",
      "16:00–18:00 — Visit Lesnaya Skazka Mountain Resort (cable car, mountain views and entertainment)",
      "Day 5",
      "09:30–17:30 — Trip to Issyk Lake, with stops at trout farms and riverside recreation areas along the way",
      "Day 6",
      "Transfer to Almaty Airport according to the flight departure time",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person for a group of 16",
      "$90 per person for a group of 8",
      "$110 per person for a group of 3",
      "Tours run every day",
    ],
  },
];
