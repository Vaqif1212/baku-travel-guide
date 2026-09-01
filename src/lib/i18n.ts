export const locales = ["ru", "az", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Path prefix for a locale: "" for the default (ru), "/az" / "/en" otherwise. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export const dictionaries: Record<Locale, ReturnType<typeof buildDict>> = {
  ru: buildDict("ru"),
  az: buildDict("az"),
  en: buildDict("en"),
};

export function getDict(locale: Locale) {
  return dictionaries[locale];
}

function buildDict(locale: Locale) {
  const dict = {
    ru: {
      htmlLang: "ru",
      siteName: "Baku Travel Guide",
      nav: { home: "Главная", tours: "Туры", about: "Обо мне", reviews: "Отзывы", blog: "Блог", contact: "Контакты" },
      headerCta: "Написать в WhatsApp",
      hero: {
        eyebrow: "Личный гид в Баку",
        titleLine1: "Настоящий Азербайджан",
        titleLine2: "глазами местного гида",
        subtitle: "Гид, водитель и переводчик. Покажу вам настоящий Азербайджан — от древних улиц Ичери-шехер до огненных гор Апшерона.",
        ctaPrimary: "Написать в WhatsApp",
        ctaSecondary: "Позвонить",
      },
      stats: {
        experience: "лет как личный гид по Баку",
        languages: "языка: русский, азербайджанский, английский",
        tourists: "туристов остались довольны",
        support: "на связи в любое время",
      },
      about: {
        eyebrow: "Обо мне",
        title: "Гид, который вырос в этом городе",
        paragraphs: [
          "Я родился и вырос в Баку — знаю этот город, вместе со всеми его пригородами и уголками, как свои пять пальцев. Уже более 8 лет показываю гостям не только достопримечательности, но и живую душу Азербайджана: многовековую историю, богатую культуру и гостеприимство, которым славится наш народ.",
          "Окончил исторический факультет Бакинского государственного университета — поэтому в моих экскурсиях всегда настоящие истории, а не просто список дат.",
          "Помимо экскурсий провожу мастер-классы по азербайджанской кухне, помогаю с переводом и трансфером, организую небольшие свадебные церемонии для иностранных пар, влюблённых в Баку так же, как и я.",
        ],
        tags: ["Историк по образованию", "Личный водитель", "Переводчик", "Организация свадеб", "Мастер-классы по кухне"],
        license: {
          label: "Лицензированный гид",
          numberLabel: "Удостоверение №",
          number: "0053.25",
          validLabel: "Действительно до",
          validUntil: "26.12.2028",
          issuer: "Государственное агентство по туризму Азербайджанской Республики",
        },
      },
      tours: {
        eyebrow: "Маршруты",
        title: "Популярные маршруты",
        subtitle: "Выберите формат — индивидуально или в группе.",
        dayTour: "Экскурсия",
        hours: "часов",
        individual: "Индивидуально",
        group: "В группе",
        perCar: "за экскурсию",
        perPerson: "с человека",
        peopleWord: "чел.",
        more: "Подробнее",
        backToTours: "← Все туры",
        askAboutTour: "Остались вопросы об этом туре?",
        askAboutTourSub: "Напишите в WhatsApp — расскажу подробнее и согласуем дату.",
        askButton: "Спросить в WhatsApp",
        galleryTitle: "Кадры с этого маршрута",
        includedTitle: "Что входит в стоимость",
        notIncludedTitle: "Что не входит в стоимость",
      },
      gallery: {
        eyebrow: "Репортаж",
        title: "Кадры с туров",
        subtitle: "Ичери-шехер, Хыналыг, Атешгях и горы Кавказа — то, что вы увидите своими глазами.",
      },
      testimonials: {
        eyebrow: "Отзывы",
        title: "Что говорят туристы",
        disclaimer: "Примеры отзывов",
        leaveGoogleReview: "Оставить отзыв в Google →",
        qrHint: "Или отсканируйте QR-код телефоном",
        qrDownload: "Скачать QR-код",
      },
      faq: {
        title: "Частые вопросы",
        items: [
          { q: "Как забронировать тур?", a: "Напишите в WhatsApp — согласуем дату, маршрут и способ оплаты." },
          { q: "Сколько человек может быть в группе?", a: "Провожу как индивидуальные туры (1–4 человека), так и группы до 15 человек." },
          { q: "На каком языке проводятся экскурсии?", a: "Провожу туры на русском, азербайджанском и английском языках." },
        ],
      },
      cta: { title: "Готовы увидеть настоящий Баку?", button: "Написать в WhatsApp" },
      contactForm: {
        title: "Или напишите напрямую",
        subtitle: "Если удобнее — оставьте сообщение, и я отвечу в течение дня.",
        name: "Ваше имя",
        contact: "WhatsApp, телефон или email",
        message: "Сообщение",
        submit: "Отправить",
        sending: "Отправка…",
        success: "Спасибо! Сообщение отправлено, скоро отвечу.",
        error: "Не получилось отправить. Попробуйте написать в WhatsApp.",
      },
      footer: {
        tagline: "Личный гид, водитель и переводчик в Баку.",
        navTitle: "Навигация",
        contactTitle: "Контакты",
        rights: "© 2026 Baku Travel Guide",
        privacy: "Политика конфиденциальности",
      },
      themeToggle: { light: "Светлая", dark: "Тёмная" },
    },
    az: {
      htmlLang: "az",
      siteName: "Baku Travel Guide",
      nav: { home: "Ana səhifə", tours: "Turlar", about: "Haqqımda", reviews: "Rəylər", blog: "Bloq", contact: "Əlaqə" },
      headerCta: "WhatsApp-a yazın",
      hero: {
        eyebrow: "Bakıda şəxsi bələdçi",
        titleLine1: "Əsl Azərbaycan",
        titleLine2: "yerli bələdçinin gözü ilə",
        subtitle: "Bələdçi, sürücü və tərcüməçi. Sizə əsl Azərbaycanı göstərəcəyəm — İçərişəhərin qədim küçələrindən Abşeronun odlu dağlarına qədər.",
        ctaPrimary: "WhatsApp-a yazın",
        ctaSecondary: "Zəng edin",
      },
      stats: {
        experience: "il Bakıda şəxsi bələdçi təcrübəsi",
        languages: "dil: rus, azərbaycan, ingilis",
        tourists: "məmnun turist",
        support: "həmişə əlaqədə",
      },
      about: {
        eyebrow: "Haqqımda",
        title: "Bu şəhərdə böyümüş bələdçi",
        paragraphs: [
          "Mən Bakıda anadan olmuşam və böyümüşəm — bu şəhəri, bütün ətraf qəsəbələri ilə birlikdə, beş barmağım kimi tanıyıram. 8 ildən artıqdır ki, qonaqlara təkcə görməli yerləri deyil, Azərbaycanın canlı ruhunu — çoxəsrlik tarixini, zəngin mədəniyyətini və xalqımıza məxsus qonaqpərvərliyi göstərirəm.",
          "Bakı Dövlət Universitetinin tarix fakültəsini bitirmişəm — ona görə də ekskursiyalarımda sadəcə tarixlər deyil, əsl hekayələr var.",
          "Ekskursiyalardan başqa, Azərbaycan mətbəxi üzrə master-klasslar keçirir, tərcümə və transferlə kömək edir, Bakını mənim kimi sevən əcnəbi cütlüklər üçün kiçik toy mərasimləri təşkil edirəm.",
        ],
        tags: ["Tarixçi", "Şəxsi sürücü", "Tərcüməçi", "Toy təşkilatçısı", "Mətbəx master-klasları"],
        license: {
          label: "Lisenziyalı bələdçi",
          numberLabel: "Vəsiqə №",
          number: "0053.25",
          validLabel: "Etibarlıdır",
          validUntil: "26.12.2028",
          issuer: "Azərbaycan Respublikasının Dövlət Turizm Agentliyi",
        },
      },
      tours: {
        eyebrow: "Marşrutlar",
        title: "Populyar marşrutlar",
        subtitle: "Formatı seçin — fərdi və ya qrupla.",
        dayTour: "Ekskursiya",
        hours: "saat",
        individual: "Fərdi",
        group: "Qrupda",
        perCar: "ekskursiya üçün",
        perPerson: "nəfər başına",
        peopleWord: "nəfər",
        more: "Ətraflı",
        backToTours: "← Bütün turlar",
        askAboutTour: "Bu tur haqqında sualınız var?",
        askAboutTourSub: "WhatsApp-a yazın — ətraflı danışaq və tarixi razılaşdıraq.",
        askButton: "WhatsApp-a yazın",
        galleryTitle: "Bu marşrutdan kadrlar",
        includedTitle: "Qiymətə daxildir",
        notIncludedTitle: "Qiymətə daxil deyil",
      },
      gallery: {
        eyebrow: "Reportaj",
        title: "Turlardan kadrlar",
        subtitle: "İçərişəhər, Xınalıq, Atəşgah və Qafqaz dağları — öz gözünüzlə görəcəkləriniz.",
      },
      testimonials: {
        eyebrow: "Rəylər",
        title: "Turistlər nə deyir",
        disclaimer: "Nümunə rəylər",
        leaveGoogleReview: "Google-da rəy qoyun →",
        qrHint: "Və ya telefonla QR-kodu skan edin",
        qrDownload: "QR-kodu yüklə",
      },
      faq: {
        title: "Tez-tez verilən suallar",
        items: [
          { q: "Turu necə bron etmək olar?", a: "WhatsApp-a yazın — tarix, marşrut və ödəniş üsulunu razılaşdıraq." },
          { q: "Qrupda neçə nəfər ola bilər?", a: "Fərdi turlar 1–4 nəfər, qruplar isə 15 nəfərədək ola bilər." },
          { q: "Ekskursiyalar hansı dildə keçirilir?", a: "Rus, azərbaycan və ingilis dillərində." },
        ],
      },
      cta: { title: "Əsl Bakını görməyə hazırsınız?", button: "WhatsApp-a yazın" },
      contactForm: {
        title: "Və ya birbaşa yazın",
        subtitle: "Rahat olarsa, mesaj qoyun — bir gün ərzində cavab verəcəyəm.",
        name: "Adınız",
        contact: "WhatsApp, telefon və ya email",
        message: "Mesajınız",
        submit: "Göndər",
        sending: "Göndərilir…",
        success: "Təşəkkürlər! Mesajınız göndərildi, tezliklə cavab verəcəyəm.",
        error: "Göndərmək alınmadı. WhatsApp-a yazmağı sınayın.",
      },
      footer: {
        tagline: "Bakıda şəxsi bələdçi, sürücü və tərcüməçi.",
        navTitle: "Naviqasiya",
        contactTitle: "Əlaqə",
        rights: "© 2026 Baku Travel Guide",
        privacy: "Məxfilik siyasəti",
      },
      themeToggle: { light: "İşıqlı", dark: "Qaranlıq" },
    },
    en: {
      htmlLang: "en",
      siteName: "Baku Travel Guide",
      nav: { home: "Home", tours: "Tours", about: "About", reviews: "Reviews", blog: "Blog", contact: "Contact" },
      headerCta: "Message on WhatsApp",
      hero: {
        eyebrow: "Private guide in Baku",
        titleLine1: "The real Azerbaijan",
        titleLine2: "through a local guide's eyes",
        subtitle: "Guide, driver and translator. I'll show you the real Azerbaijan — from the ancient streets of Icherisheher to the eternal flames of Absheron.",
        ctaPrimary: "Message on WhatsApp",
        ctaSecondary: "Call",
      },
      stats: {
        experience: "years as a private guide in Baku",
        languages: "languages: Russian, Azerbaijani, English",
        tourists: "happy travelers",
        support: "always reachable",
      },
      about: {
        eyebrow: "About me",
        title: "A guide who grew up in this city",
        paragraphs: [
          "I was born and raised in Baku — I know this city, and every neighbourhood around it, like the back of my hand. For over 8 years I've been showing visitors not just the landmarks, but the living soul of Azerbaijan: its centuries of history, rich culture, and the hospitality our people are known for.",
          "I studied history at Baku State University, which is why my tours are built on real stories, not just dates.",
          "Beyond guiding, I run Azerbaijani cooking master classes, help with translation and transfers, and organize small wedding ceremonies for foreign couples who fall in love with Baku just like I did.",
        ],
        tags: ["History graduate", "Personal driver", "Translator", "Wedding coordination", "Cooking master classes"],
        license: {
          label: "Licensed Tour Guide",
          numberLabel: "Card No.",
          number: "0053.25",
          validLabel: "Valid until",
          validUntil: "26.12.2028",
          issuer: "State Tourism Agency of the Republic of Azerbaijan",
        },
      },
      tours: {
        eyebrow: "Routes",
        title: "Popular routes",
        subtitle: "Choose a format — private or group.",
        dayTour: "Tour",
        hours: "hours",
        individual: "Private",
        group: "Group",
        perCar: "per tour",
        perPerson: "per person",
        peopleWord: "people",
        more: "Learn more",
        backToTours: "← All tours",
        askAboutTour: "Have questions about this tour?",
        askAboutTourSub: "Message me on WhatsApp — I'll tell you more and we'll set a date.",
        askButton: "Ask on WhatsApp",
        galleryTitle: "Photos from this route",
        includedTitle: "What's included",
        notIncludedTitle: "What's not included",
      },
      gallery: {
        eyebrow: "Reportage",
        title: "Moments from tours",
        subtitle: "The Old City, Khinalig, Ateshgah and the Caucasus mountains — what you'll see with your own eyes.",
      },
      testimonials: {
        eyebrow: "Reviews",
        title: "What travelers say",
        disclaimer: "Sample reviews",
        leaveGoogleReview: "Leave a review on Google →",
        qrHint: "Or scan the QR code with your phone",
        qrDownload: "Download QR code",
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          { q: "How do I book a tour?", a: "Message me on WhatsApp and we'll agree on a date, route and payment." },
          { q: "How many people can join a group?", a: "Private tours fit 1–4 people; groups can go up to 15." },
          { q: "What languages are the tours in?", a: "Russian, Azerbaijani and English." },
        ],
      },
      cta: { title: "Ready to see the real Baku?", button: "Message on WhatsApp" },
      contactForm: {
        title: "Or write directly",
        subtitle: "If it's easier, leave a message and I'll reply within a day.",
        name: "Your name",
        contact: "WhatsApp, phone or email",
        message: "Message",
        submit: "Send",
        sending: "Sending…",
        success: "Thank you! Your message was sent, I'll reply soon.",
        error: "Couldn't send it. Try messaging on WhatsApp instead.",
      },
      footer: {
        tagline: "Private guide, driver and translator in Baku.",
        navTitle: "Navigation",
        contactTitle: "Contact",
        rights: "© 2026 Baku Travel Guide",
        privacy: "Privacy policy",
      },
      themeToggle: { light: "Light", dark: "Dark" },
    },
  } as const;

  return dict[locale];
}
