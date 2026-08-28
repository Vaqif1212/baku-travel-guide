import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Settings (singleton) ---
  const passwordHash = await bcrypt.hash("baku2026", 10);
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
      whatsapp: "994000000000",
      telegram: "bakutravelguide",
      phone: "+994 XX XXX XX XX",
      email: "info@bakutravelguide.example",
      instagram: "bakutravelguide",
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

  console.log("Seed complete. Admin login: password 'baku2026' (change it in /admin/settings).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
