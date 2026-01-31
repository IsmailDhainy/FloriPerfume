// pages/home.ts - Home page translations
import { PageContent } from "../basic.shape";

const homeTranslations = {
  nav_service: {
    EN: "Services",
    AR: "الخدمات",
    FR: "Services",
  },
  nav_features: {
    EN: "Features",
    AR: "الميزات",
    FR: "Fonctionnalités",
  },
  nav_reviews: {
    EN: "Reviews",
    AR: "التقييمات",
    FR: "Avis",
  },
  nav_contact: {
    EN: "Contact",
    AR: "اتصل بنا",
    FR: "Contact",
  },
  nav_get_started: {
    EN: "Get Started",
    AR: "ابدأ الآن",
    FR: "Commencer",
  },
  hero_animated_text: {
    EN: "🚀 Lightning Fast Government Services",
    AR: "🚀 خدمات حكومية سريعة كالصاروخ",
    FR: "🚀 Services gouvernementaux rapides comme l'éclair",
  },
  hero_title: {
    EN: "Get Your Official Documents in Record Time",
    AR: "احصل على مستنداتك الرسمية في وقت قياسي",
    FR: "Obtenez vos documents officiels en un temps record",
  },
  hero_subtitle: {
    EN: "Skip the lines, avoid the hassle. We handle all your government paperwork and deliver signed documents to your door.",
    AR: "تجنب الطوابير، وتخلص من المتاعب. نحن نت عامل مع جميع أوراقك الحكومية ونوصل المستندات الموقعة إلى باب منزلك.",
    FR: "Évitez les files d'attente et les tracas. Nous nous occupons de tous vos documents gouvernementaux et livrons les documents signés à votre porte.",
  },
  hero_start_application: {
    EN: "Start Your Application",
    AR: "ابدأ طلبك",
    FR: "Commencer votre demande",
  },
  hero_learn_more: {
    EN: "Learn More",
    AR: "تعرف على المزيد",
    FR: "En savoir plus",
  },
} as const satisfies PageContent;

export type HomeTranslations = typeof homeTranslations;
export default homeTranslations;
