export const siteDetails={
  name:"مجلس اتحادِ ملت",
  shortName:"مجلس اتحادِ ملت",
  tagline:"علمی و مشاورتی پلیٹ فارم",
  description:"فکری ہم آہنگی، علمی مکالمہ، آدابِ اختلاف اور مشترکہ ملی مسائل میں تعاون کے لیے علمی و مشاورتی پلیٹ فارم۔",

  // حتمی معلومات ملنے پر صرف یہ values بدلنی ہوں گی۔
  contact:{
    phone:"",
    email:"",
    office:"",
    whatsapp:""
  },

  social:{
    facebook:"",
    youtube:"",
    x:"",
    instagram:""
  }
};

export function displayOrPending(value:string){
  return value?.trim()?value:"جلد شامل کیا جائے گا";
}
