import type { Localized } from "@/lib/i18n";

export type Review = {
  id: string;
  name: string;
  reviewDate: Localized<string>;
  rating: number;
  text: Localized<string>;
  avatar: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Emily Carter",
    reviewDate: { en: "June 2026", ru: "Июнь 2026" },
    rating: 5,
    text: {
      en: "The mountains were absolutely breathtaking, especially at sunrise. We spent hours just sitting and taking it all in. One of the most peaceful trips I've had in years.",
      ru: "Горы были потрясающе красивы, особенно на рассвете. Мы часами просто сидели и любовались видом. Одна из самых спокойных поездок за последние годы.",
    },
    avatar: "/reviews/avatar-1.webp",
  },
  {
    id: "review-2",
    name: "Daniyar Bekov",
    reviewDate: { en: "June 2026", ru: "Июнь 2026" },
    rating: 5,
    text: {
      en: "Horseback riding through the valley was the highlight of the whole trip. The trails were well kept and the scenery kept changing every hour — forests, rivers, open fields.",
      ru: "Катание на лошадях по долине стало главным впечатлением всей поездки. Тропы были в отличном состоянии, а пейзаж менялся каждый час — леса, реки, открытые поля.",
    },
    avatar: "/reviews/avatar-2.webp",
  },
  {
    id: "review-3",
    name: "Sophie Nguyen",
    reviewDate: { en: "August 2026", ru: "Август 2026" },
    rating: 5,
    text: {
      en: "Loved the canyon hike. The colors of the rock formations at golden hour are something photos just can't capture properly. Worth waking up early for.",
      ru: "Обожаю прогулку по каньону. Цвета скал в час заката невозможно передать на фото. Ради этого стоило вставать так рано.",
    },
    avatar: "/reviews/avatar-3.webp",
  },
  {
    id: "review-4",
    name: "Marcus Weber",
    reviewDate: { en: "July 2026", ru: "Июль 2026" },
    rating: 5,
    text: {
      en: "The lake was so clear you could see the bottom even in the deeper parts. We swam, had a picnic, and stayed until the stars came out. Simple but unforgettable.",
      ru: "Озеро было настолько прозрачным, что дно было видно даже на глубине. Мы купались, устроили пикник и остались до появления звёзд. Просто, но незабываемо.",
    },
    avatar: "/reviews/avatar-4.webp",
  },
  {
    id: "review-5",
    name: "Aigerim Sultan",
    reviewDate: { en: "June 2026", ru: "Июнь 2026" },
    rating: 5,
    text: {
      en: "Everything about this trip felt well paced — no rushing, no long waits. Just enough time at each stop to actually enjoy it instead of checking it off a list.",
      ru: "Вся поездка была выстроена в комфортном темпе — без спешки и долгих ожиданий. На каждой остановке было достаточно времени, чтобы по-настоящему насладиться местом, а не просто отметить его в списке.",
    },
    avatar: "/reviews/avatar-5.webp",
  },
  {
    id: "review-6",
    name: "Liam O'Connor",
    reviewDate: { en: "August 2026", ru: "Август 2026" },
    rating: 5,
    text: {
      en: "Camping under that sky was surreal, more stars than I've ever seen in my life. The nights got cold but the tea by the fire made up for it.",
      ru: "Ночёвка под таким небом была нереальной — столько звёзд я никогда в жизни не видел. Ночи были холодными, но чай у костра всё компенсировал.",
    },
    avatar: "/reviews/avatar-6.webp",
  },
  {
    id: "review-7",
    name: "Yuna Park",
    reviewDate: { en: "May 2026", ru: "Май 2026" },
    rating: 5,
    text: {
      en: "The waterfall hike was tougher than expected but so rewarding. Cold water, green cliffs, and almost no other people around. Felt like discovering it ourselves.",
      ru: "Поход к водопаду оказался сложнее, чем я думала, но того стоил. Холодная вода, зелёные скалы и почти никого вокруг. Ощущение, будто мы сами это место открыли.",
    },
    avatar: "/reviews/avatar-7.webp",
  },
  {
    id: "review-8",
    name: "Thomas Berg",
    reviewDate: { en: "July 2026", ru: "Июль 2026" },
    rating: 5,
    text: {
      en: "What stood out most was how varied the landscape was in just a few days — steppe, mountains, and canyons all in one trip. Never got repetitive.",
      ru: "Больше всего впечатлило, насколько разнообразными были пейзажи всего за несколько дней — степь, горы и каньоны в одной поездке. Ни разу не было скучно.",
    },
    avatar: "/reviews/avatar-8.webp",
  },
  {
    id: "review-9",
    name: "Zarina Yesenova",
    reviewDate: { en: "May 2026", ru: "Май 2026" },
    rating: 5,
    text: {
      en: "The road trip itself was half the fun. Great music, endless views out the window, and stops in places I never would have found on my own.",
      ru: "Сама дорога — уже половина удовольствия. Отличная музыка, бесконечные виды за окном и остановки в местах, которые сам я бы никогда не нашёл.",
    },
    avatar: "/reviews/avatar-9.webp",
  },
  {
    id: "review-10",
    name: "Noah Fischer",
    reviewDate: { en: "May 2026", ru: "Май 2026" },
    rating: 5,
    text: {
      en: "Quiet, scenic, and exactly the kind of slow travel I was looking for. The kind of trip that stays with you long after you're back home.",
      ru: "Тихо, живописно и именно то неспешное путешествие, которое я искал. Поездка, которая остаётся с тобой ещё долго после возвращения домой.",
    },
    avatar: "/reviews/avatar-10.webp",
  },
  {
    id: "review-11",
    name: "Rachel Simmons",
    reviewDate: { en: "June 2026", ru: "Июнь 2026" },
    rating: 5,
    text: {
      en: "Kolsai lake was unbelievably green, almost artificial looking. We sat by the water for an hour before moving on and I still wish we'd stayed longer.",
      ru: "Озеро Кольсай было невероятно зелёным, почти как ненастоящее. Мы просидели у воды целый час, прежде чем поехать дальше, и всё равно жалею, что не остались подольше.",
    },
    avatar: "/reviews/avatar-11.webp",
  },
  {
    id: "review-12",
    name: "Ilya Kravchenko",
    reviewDate: { en: "May 2026", ru: "Май 2026" },
    rating: 5,
    text: {
      en: "The sunken forest at Kaindy was surreal — dead trees rising straight out of turquoise water. Never seen anything like it.",
      ru: "Затопленный лес на Каинды выглядел нереально — сухие стволы прямо из бирюзовой воды. Никогда не видел ничего подобного.",
    },
    avatar: "/reviews/avatar-12.webp",
  },
  {
    id: "review-13",
    name: "Priya Nair",
    reviewDate: { en: "July 2026", ru: "Июль 2026" },
    rating: 5,
    text: {
      en: "Charyn canyon looked like something out of a Western movie. The scale of it only really hits you once you're walking through the rock corridors.",
      ru: "Чарынский каньон выглядел как декорации к вестерну. Масштаб по-настоящему ощущаешь только когда идёшь по каменным коридорам.",
    },
    avatar: "/reviews/avatar-13.webp",
  },
  {
    id: "review-14",
    name: "Erik Lindqvist",
    reviewDate: { en: "May 2026", ru: "Май 2026" },
    rating: 5,
    text: {
      en: "Sleeping in a yurt was way more comfortable than I expected. Warm, quiet, and waking up to the mountains right outside was worth the early wake-up call.",
      ru: "Ночёвка в юрте оказалась намного комфортнее, чем я ожидал. Тепло, тихо, а горы прямо за порогом того стоили, даже несмотря на ранний подъём.",
    },
    avatar: "/reviews/avatar-14.webp",
  },
  {
    id: "review-15",
    name: "Camille Dubois",
    reviewDate: { en: "August 2026", ru: "Август 2026" },
    rating: 5,
    text: {
      en: "The campfire in the evening turned into the best part of the whole trip — good food, clear sky, and everyone swapping travel stories.",
      ru: "Вечер у костра стал лучшей частью всей поездки — вкусная еда, ясное небо и рассказы о путешествиях от всех участников.",
    },
    avatar: "/reviews/avatar-15.webp",
  },
  {
    id: "review-16",
    name: "Bekzat Ormanov",
    reviewDate: { en: "August 2026", ru: "Август 2026" },
    rating: 5,
    text: {
      en: "Riding in the old UAZ van over rough mountain roads was half the adventure. Bumpy but somehow added to the whole experience.",
      ru: "Поездка на старом УАЗике по разбитым горным дорогам — уже половина приключения. Трясло, но это только добавило впечатлений.",
    },
    avatar: "/reviews/avatar-16.webp",
  },
  {
    id: "review-17",
    name: "Hannah Wright",
    reviewDate: { en: "July 2026", ru: "Июль 2026" },
    rating: 5,
    text: {
      en: "Two days was just enough time to see lakes, canyons, and mountains without feeling rushed between any of it.",
      ru: "Двух дней хватило ровно настолько, чтобы увидеть озёра, каньоны и горы, не чувствуя спешки ни на одном из этапов.",
    },
    avatar: "/reviews/avatar-17.webp",
  },
  {
    id: "review-18",
    name: "Dias Amangeldiev",
    reviewDate: { en: "July 2026", ru: "Июль 2026" },
    rating: 5,
    text: {
      en: "The horseback ride along the ridge gave a completely different view of the valley than walking would have. Slow pace, great scenery.",
      ru: "Верховая прогулка вдоль хребта дала совершенно другой взгляд на долину, чем прогулка пешком. Неспешный темп, отличные виды.",
    },
    avatar: "/reviews/avatar-18.webp",
  },
  {
    id: "review-19",
    name: "Laura Meyer",
    reviewDate: { en: "June 2026", ru: "Июнь 2026" },
    rating: 5,
    text: {
      en: "Waking up in Saty village with the mountains right there was such a calm start to the second day. Simple breakfast, incredible view.",
      ru: "Проснуться в селе Саты, когда горы прямо перед глазами — спокойное начало второго дня. Простой завтрак, невероятный вид.",
    },
    avatar: "/reviews/avatar-19.webp",
  },
  {
    id: "review-20",
    name: "Timur Zhaksybekov",
    reviewDate: { en: "August 2026", ru: "Август 2026" },
    rating: 5,
    text: {
      en: "The boat ride on the lake was short but the water was so still it felt like gliding over glass. A quiet highlight in a packed two days.",
      ru: "Катание на лодке по озеру было коротким, но вода была настолько спокойной, что казалось, будто скользишь по стеклу. Тихий момент среди насыщенных двух дней.",
    },
    avatar: "/reviews/avatar-20.webp",
  },
];
