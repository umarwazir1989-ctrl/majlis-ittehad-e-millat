export type Person = {
  slug: string;
  name: string;
  initials: string;
  council: "مجلس بزرگان" | "مجلس مشاورت";
  designation: string;
  city: string;
  expertise: string[];
  summary: string;
  bio: string[];
};

export const people: Person[] = [
  {
    slug: "dr-hafiz-abdul-rahman-madani",
    name: "ڈاکٹر حافظ عبدالرحمن مدنی",
    initials: "ع م",
    council: "مجلس بزرگان",
    designation: "رکن مجلس بزرگان",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["علمی رہنمائی", "فکری مشاورت"],
    summary: "مجلس اتحادِ ملت کے علمی و مشاورتی ڈھانچے میں مجلس بزرگان کی نمائندہ شخصیت۔",
    bio: ["تفصیلی علمی تعارف، مناصب، تصانیف اور خدمات ادارے کی حتمی منظوری اور مستند معلومات موصول ہونے کے بعد شامل کی جائیں گی۔"]
  },
  {
    slug: "dr-sahibzada-jabbar-rahman-siddiqui",
    name: "ڈاکٹر صاحبزادہ جبار الرحمن صدیقی",
    initials: "ج ص",
    council: "مجلس بزرگان",
    designation: "رکن مجلس بزرگان",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["علمی رہنمائی", "اجتماعی مشاورت"],
    summary: "مجلس بزرگان کے رکن کی حیثیت سے علمی اور مشاورتی رہنمائی کے لیے شامل۔",
    bio: ["تفصیلی تعارف اور مستند سوانحی معلومات بعد میں شامل کی جائیں گی۔"]
  },
  {
    slug: "maulana-zahid-al-rashidi",
    name: "مولانا زاہد الراشدی",
    initials: "ز ر",
    council: "مجلس بزرگان",
    designation: "رکن مجلس بزرگان",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["علمی مکالمہ", "فکری رہنمائی"],
    summary: "مجلس بزرگان کی سطح پر علمی مکالمے اور اجتماعی رہنمائی کے لیے شامل۔",
    bio: ["تفصیلی علمی و دعوتی خدمات کا مستند تعارف بعد میں شامل کیا جائے گا۔"]
  },
  {
    slug: "prof-dr-qibla-ayaz",
    name: "پروفیسر ڈاکٹر قبلہ ایاز",
    initials: "ق ا",
    council: "مجلس بزرگان",
    designation: "رکن مجلس بزرگان",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["علمی مشاورت", "ملی امور"],
    summary: "مجلس بزرگان کے علمی اور مشاورتی کردار میں شامل نمائندہ شخصیت۔",
    bio: ["تفصیلی تعارف، علمی مناصب اور خدمات کی تصدیق شدہ معلومات بعد میں شامل ہوں گی۔"]
  },
  {
    slug: "syed-ziaullah-shah-bukhari",
    name: "سید ضیاء اللہ شاہ بخاری",
    initials: "ض ب",
    council: "مجلس مشاورت",
    designation: "رکن مجلس مشاورت",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["اجتماعی مشاورت", "ملی امور"],
    summary: "مجلس مشاورت میں اجتماعی اور ملی امور پر مشاورتی کردار کے لیے شامل۔",
    bio: ["تفصیلی تعارف اور متعلقہ خدمات کی مستند معلومات بعد میں شامل کی جائیں گی۔"]
  },
  {
    slug: "qazi-abdul-qadeer-khamosh",
    name: "قاضی عبد القدیر خاموش",
    initials: "ع خ",
    council: "مجلس مشاورت",
    designation: "رکن مجلس مشاورت",
    city: "معلومات بعد میں شامل ہوں گی",
    expertise: ["مشاورت", "بین المسالک رابطہ"],
    summary: "مجلس مشاورت کے رکن کی حیثیت سے رابطہ، مشاورت اور مشترکہ امور میں شمولیت۔",
    bio: ["تفصیلی علمی و تنظیمی تعارف حتمی معلومات موصول ہونے کے بعد شامل ہوگا۔"]
  }
];

export const leadership = people.filter((person) => person.council === "مجلس بزرگان");
export const advisory = people.filter((person) => person.council === "مجلس مشاورت");

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}
