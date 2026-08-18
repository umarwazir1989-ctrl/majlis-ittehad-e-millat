export type SiteSettings={
  brand:{name:string;tagline:string;description:string};
  contact:{phone:string;email:string;office:string;whatsapp:string};
  social:{facebook:string;youtube:string;x:string;instagram:string};
  footer:{newsletter_title:string;newsletter_text:string;copyright:string};
  home:{
    kicker:string;title:string;description:string;
    primary_label:string;primary_url:string;secondary_label:string;secondary_url:string;
    message_title:string;message_text:string;verse_text:string;verse_reference:string;
    about_eyebrow:string;about_title:string;about_description:string;forums_title:string;
    elders_eyebrow:string;elders_title:string;elders_description:string;
    advisory_eyebrow:string;advisory_title:string;advisory_description:string;
    pillars:{icon:string;title:string;text:string}[];
  }
};

export const defaultSiteSettings:SiteSettings={
  brand:{
    name:"مجلس اتحادِ ملت",
    tagline:"فکر میں ہم آہنگی، عمل میں وحدت",
    description:"فکری ہم آہنگی، علمی مکالمہ، آدابِ اختلاف اور مشترکہ ملی مسائل میں تعاون کے لیے علمی و مشاورتی پلیٹ فارم۔"
  },
  contact:{phone:"",email:"",office:"",whatsapp:""},
  social:{facebook:"",youtube:"",x:"",instagram:""},
  footer:{
    newsletter_title:"اپ ڈیٹس حاصل کریں",
    newsletter_text:"مجلس کی تازہ سرگرمیوں اور علمی مواد سے باخبر رہنے کے لیے ای میل شامل کریں۔",
    copyright:"© 2026 مجلس اتحادِ ملت — جملہ حقوق محفوظ ہیں"
  },
  home:{
    kicker:"ایک قومی فکری پلیٹ فارم",
    title:"فکری ہم آہنگی، علمی مکالمہ اور ملی وحدت",
    description:"مجلس اتحادِ ملت اہلِ علم، اہلِ فکر، فکری شخصیات اور مختلف مکاتبِ فکر کے درمیان احترام، باہمی اعتماد اور مشترکہ قومی و ملی مسائل میں تعاون کے لیے ایک علمی و مشاورتی پلیٹ فارم ہے۔",
    primary_label:"مجلس کے بارے میں جانیں",
    primary_url:"/about",
    secondary_label:"ہمیں جوائن کریں",
    secondary_url:"/membership",
    message_title:"مجلس کا بنیادی پیغام",
    message_text:"اختلاف خیال اور اختلاف رائے فطری ہیں، لیکن فکری وسعت، تحمل اور احترام کے ساتھ مکالمہ ہماری مشترکہ ذمہ داری ہے۔",
    verse_text:"وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    verse_reference:"سورۃ المائدہ: 2",
    about_eyebrow:"ہم کون ہیں؟",
    about_title:"مجلس اتحادِ ملت کیا ہے؟",
    about_description:"ایک غیر جماعتی، غیر فرقہ وارانہ اور غیر انتخابی علمی و مشاورتی فورم، جس کا مقصد مختلف فکری مکاتب کے درمیان تعمیری مکالمہ، باہمی احترام اور ملی یکجہتی کو فروغ دینا ہے۔",
    forums_title:"ہمارے اہم فورمز",
    elders_eyebrow:"علمی رہنمائی",
    elders_title:"مجلس بزرگان",
    elders_description:"دانشمندوں، روحانی و فکری قائدین اور ممتاز شخصیات پر مشتمل اعلیٰ علمی فورم۔",
    advisory_eyebrow:"اجتماعی مشاورت",
    advisory_title:"مجلس مشاورت",
    advisory_description:"اہلِ علم و فکر اور ماہرین پر مشتمل مشاورتی فورم جو اہم مسائل پر تجاویز مرتب کرتا ہے۔",
    pillars:[
      {icon:"shield",title:"اخلاص و دیانت",text:"دینی و ملی امور میں اخلاص، دیانت اور خیر خواہی کو بنیادی قدر سمجھنا۔"},
      {icon:"unity",title:"عملی وحدت",text:"قومی و اجتماعی مسائل کے حل کے لیے مشترکات کو مضبوط بنیاد بنانا۔"},
      {icon:"book",title:"تحقیق و فکر",text:"معیاری تحقیق، مطالعہ اور علمی رہنمائی کے ذریعے فکری بلوغ پیدا کرنا۔"},
      {icon:"dialogue",title:"حوار و مکالمہ",text:"احترام اور شائستگی کے ساتھ سنجیدہ علمی اور فکری گفتگو کو فروغ دینا۔"},
      {icon:"people",title:"مختلف مکاتبِ فکر",text:"مختلف مکاتبِ فکر اور اداروں کے اہلِ علم کو باہمی تعاون کے لیے قریب لانا۔"}
    ]
  }
};

export const siteDetails={
  name:defaultSiteSettings.brand.name,
  shortName:defaultSiteSettings.brand.name,
  tagline:defaultSiteSettings.brand.tagline,
  description:defaultSiteSettings.brand.description,
  contact:defaultSiteSettings.contact,
  social:defaultSiteSettings.social
};

export function displayOrPending(value:string){
  return value?.trim()?value:"جلد شامل کیا جائے گا";
}
