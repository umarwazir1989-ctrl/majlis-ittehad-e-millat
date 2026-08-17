export const activities=[
{slug:"inter-school-session",title:"بین المسالک علمی نشست",type:"علمی نشست",date:"ڈمی تاریخ",location:"مقام بعد میں شامل ہوگا",excerpt:"مشترکہ علمی موضوعات پر اہلِ علم کے درمیان باوقار مکالمہ۔",content:["یہ Phase 4 کے activity system کے لیے ڈمی تفصیل ہے۔"]},
{slug:"intellectual-consultation",title:"فکری چیلنجز پر مشاورتی اجلاس",type:"مشاورتی اجلاس",date:"ڈمی تاریخ",location:"مقام بعد میں شامل ہوگا",excerpt:"دورِ حاضر کے فکری مسائل اور علمی حکمتِ عملی پر مشاورت۔",content:["یہ فی الحال ڈمی سرگرمی ہے۔"]},
{slug:"adab-ikhtilaf-seminar",title:"آدابِ اختلاف سیمینار",type:"سیمینار",date:"ڈمی تاریخ",location:"مقام بعد میں شامل ہوگا",excerpt:"اختلاف کے علمی اور اخلاقی آداب کے فروغ کے لیے سیمینار۔",content:["یہ فی الحال ڈمی سرگرمی ہے۔"]}];
export const getActivity=(slug:string)=>activities.find(x=>x.slug===slug);
