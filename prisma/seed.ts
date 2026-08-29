import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Settings (singleton) ---
  const passwordHash = await bcrypt.hash("anar2026", 10);
  await prisma.setting.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      adminPasswordHash: passwordHash,
      promoEnabled: false,
      promoTextRu: "Скидка 10% при бронировании за неделю",
      promoTextAz: "Bir həftə əvvəldən bron etdikdə 10% endirim",
      promoTextEn: "10% off when you book a week ahead",
      usdRate: 1.7,
      rubRate: 0.019,
      whatsapp: "994702537570",
      telegram: "",
      phone: "+994 70 253 75 70",
      email: "anarrustamlii@gmail.com",
      instagram: "rustamlianar",
      facebook: "share/1EfPcAGUkc/",
    },
  });

  // --- Tours ---
  await prisma.tour.upsert({
    where: { slug: "gobustan-yanardag" },
    update: {},
    create: {
      slug: "gobustan-yanardag",
      order: 1,
      published: true,
      imageUrl: "/images/tour-rock-formations.jpg",
      titleRu: "Гобустан, Янардаг и грязевые вулканы",
      titleAz: "Qobustan, Yanardağ və palçıq vulkanları",
      titleEn: "Gobustan, Yanar Dag and mud volcanoes",
      descriptionRu:
        "Наскальные рисунки возрастом 40 000 лет, вечно горящая гора и единственные в мире действующие грязевые вулканы — в получасе от Баку.",
      descriptionAz:
        "40 000 il yaşı olan qaya rəsmləri, əbədi yanan dağ və dünyada bənzəri olmayan fəaliyyətdə olan palçıq vulkanları — Bakıdan yarım saat məsafədə.",
      descriptionEn:
        "40,000-year-old rock carvings, a mountain that burns forever, and the world's only working mud volcanoes — half an hour from Baku.",
      durationRu: "8",
      durationAz: "8",
      durationEn: "8",
      priceIndividualAzn: 150,
      priceGroupAzn: 55,
    },
  });

  await prisma.tour.upsert({
    where: { slug: "old-city-modern-baku" },
    update: {},
    create: {
      slug: "old-city-modern-baku",
      order: 2,
      published: true,
      imageUrl: "/images/anar-vintage-car.jpg",
      titleRu: "Баку: Ичери-шехер и современный город",
      titleAz: "Bakı: İçərişəhər və müasir şəhər",
      titleEn: "Baku: Old City and the modern skyline",
      descriptionRu:
        "Старый город, Девичья башня, Приморский бульвар и небоскрёбы Пламенных башен — весь Баку за один день.",
      descriptionAz:
        "Qala divarları, Qız qalası, Dəniz bulvarı və Alov qüllələri — bir gündə bütün Bakı.",
      descriptionEn:
        "The walled Old City, Maiden Tower, seaside boulevard and the Flame Towers — all of Baku in one day.",
      durationRu: "6",
      durationAz: "6",
      durationEn: "6",
      priceIndividualAzn: 120,
      priceGroupAzn: 40,
    },
  });

  // --- Testimonials (clearly sample data, disclosed on the site) ---
  const testimonials = [
    {
      order: 1,
      name: "Елена",
      country: "Россия",
      textRu: "Лучший гид, которого я встречала в поездках! Анар знает историю каждого уголка Баку.",
      textAz: "Səyahətlərimdə rastlaşdığım ən yaxşı bələdçi! Anar Bakının hər guşəsinin tarixini bilir.",
      textEn: "The best guide I've met while traveling! Anar knows the history of every corner of Baku.",
    },
    {
      order: 2,
      name: "Дмитрий",
      country: "Казахстан",
      textRu: "Организовал для нас идеальный день в Гобустане и Янардаге. Всё чётко и с душой.",
      textAz: "Bizim üçün Qobustan və Yanardağda ideal bir gün təşkil etdi. Hər şey dəqiq və ürəklə.",
      textEn: "Organized a perfect day for us in Gobustan and Yanar Dag. Everything precise and heartfelt.",
    },
    {
      order: 3,
      name: "Марина",
      country: "Беларусь",
      textRu: "С Анаром экскурсия по Старому городу превратилась в настоящее путешествие во времени.",
      textAz: "Anarla Köhnə şəhər gəzintisi əsl zamanda səyahətə çevrildi.",
      textEn: "With Anar, the Old City tour turned into a real journey through time.",
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `seed-${t.order}` },
      update: {},
      create: { id: `seed-${t.order}`, published: true, ...t },
    });
  }

  // --- Blog posts (RU only, for SEO) ---
  const posts = [
    {
      order: 1,
      slug: "gobustan-i-yanardag-chto-posmotret",
      title: "Гобустан и Янардаг: что посмотреть за один день из Баку",
      excerpt:
        "Наскальные рисунки, грязевые вулканы и гора, которая горит уже больше 4000 лет — маршрут выходного дня рядом с Баку.",
      body:
        "Гобустан и Янардаг — один из самых насыщенных однодневных маршрутов рядом с Баку.\n\n" +
        "Гобустанский заповедник — это тысячи наскальных рисунков возрастом от 5 000 до 40 000 лет: сцены охоты, танцев, лодок и животных, выбитых прямо на камне. Рядом — грязевые вулканы: невысокие конусы, из которых медленно выходит холодная минеральная грязь. Таких мест в мире меньше десятка.\n\n" +
        "Янардаг («горящая гора») — естественный выход природного газа, который горит на склоне холма непрерывно уже несколько тысячелетий. Особенно эффектно выглядит в сумерках.\n\n" +
        "Обычно маршрут занимает 6–8 часов вместе с дорогой и остановками для фото. Лучше ехать с личным гидом — так вы не потеряете время на логистику и услышите настоящие истории, а не только даты.",
      coverImageUrl: "/images/tour-yanar-dag.jpg",
    },
    {
      order: 2,
      slug: "staryy-gorod-baku-marshrut",
      title: "Старый город Баку за полдня: маршрут по Ичери-шехер",
      excerpt: "Девичья башня, дворец Ширваншахов и узкие улочки, которым больше 800 лет — как пройти Старый город с толком.",
      body:
        "Ичери-шехер, Старый город Баку, — объект Всемирного наследия ЮНЕСКО и, пожалуй, самое атмосферное место в городе.\n\n" +
        "Начать стоит с Девичьей башни — символа Баку с не до конца разгаданной историей возникновения. Дальше — дворец Ширваншахов, резиденция азербайджанских правителей XV века. Между ними — лабиринт улиц с чайхонами, ремесленными лавками и жилыми домами, где до сих пор живут семьи в нескольких поколениях.\n\n" +
        "На осмотр в спокойном темпе хватает 3–4 часов. Вечером Старый город особенно красив — зажигается подсветка, а с крыш открывается вид на Пламенные башни.",
      coverImageUrl: "/images/tour-old-city.jpg",
    },
  ];
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: { published: true, ...p },
    });
  }

  console.log("Seed complete. Admin login: password 'anar2026' (change it in /admin/settings).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
