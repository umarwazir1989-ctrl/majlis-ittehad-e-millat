-- Phase 13 — source-grounded content migration
-- Run after Phase 6-12 migrations.

create table if not exists public.site_pages(
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  eyebrow text not null default '',
  title text not null,
  summary text not null default '',
  sections jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_pages enable row level security;

drop policy if exists "site pages public read" on public.site_pages;
create policy "site pages public read"
on public.site_pages for select
using(published=true or public.is_admin());

drop policy if exists "admin site pages write" on public.site_pages;
create policy "admin site pages write"
on public.site_pages for all
to authenticated
using(public.is_admin())
with check(public.is_admin());

insert into public.site_pages(slug,eyebrow,title,summary,sections,published)
values
(
 'about',
 'تعارف',
 'مجلس اتحادِ ملت کیا ہے؟',
 'مجلس اتحادِ ملت مختلف مکاتبِ فکر کے اہلِ علم اور دینی و فکری شخصیات کے درمیان مکالمہ، باہمی احترام اور مشترکہ ملی مسائل میں تعاون کے لیے ایک علمی و مشاورتی پلیٹ فارم ہے۔',
 '[
   {"title":"ہم کیا ہیں؟","body":"ایک ایسا مشترکہ علمی فورم جہاں مختلف مکاتبِ فکر سے تعلق رکھنے والے اہلِ علم باوقار مکالمے، باہمی اعتماد اور امت کے مشترکہ مسائل میں تعاون کے لیے جمع ہوں۔"},
   {"title":"ہم کیا نہیں ہیں؟","body":"یہ کوئی نیا مسلک، فقہی مکتب، سیاسی جماعت یا انتخابی اتحاد نہیں ہے۔ مجلس کا مقصد اختلافات کو مٹانا نہیں بلکہ انہیں علمی حدود، حسنِ گفتگو اور آدابِ اختلاف کے ساتھ منظم کرنا ہے۔"},
   {"title":"بنیادی سمت","body":"مشترکہ دینی و اخلاقی اقدار کا فروغ، داخلی ہم آہنگی، فکری دفاع، اور اہم قومی و ملی معاملات پر ذمہ دارانہ اجتماعی شعور پیدا کرنا مجلس کی بنیادی سمت ہے۔"}
 ]'::jsonb,
 true
),
(
 'vision',
 'وژن و اہداف',
 'فکری ہم آہنگی سے اجتماعی ذمہ داری تک',
 'مجلس کا وژن یہ ہے کہ اختلاف علمی حدود میں رہے، باہمی احترام مضبوط ہو اور امت کے مشترکہ فکری، سماجی اور ملی مسائل میں مشترکہ شعور اور تعاون پیدا ہو۔',
 '[
   {"title":"داخلی ہم آہنگی","body":"مشترکات کا فروغ، باہمی اعتماد کی بحالی، فرقہ وارانہ کشیدگی میں کمی اور آدابِ اختلاف کی علمی روایت کو مضبوط کرنا۔"},
   {"title":"فکری دفاع","body":"الحاد، دہریت اور جدید فکری چیلنجز کے مقابلے میں تحقیق، علمی تیاری، مؤثر لٹریچر اور ذمہ دارانہ ابلاغ کو فروغ دینا۔"},
   {"title":"اجتماعی و ملی موقف","body":"اہم قومی و ملی مسائل پر اہلِ علم کے درمیان مشاورت کے ذریعے متوازن، ذمہ دارانہ اور مشترکہ موقف کی تشکیل کی کوشش کرنا۔"},
   {"title":"عملی حکمتِ عملی","body":"فکری لٹریچر، ابلاغ و مکالمہ، تعلیمی و تدریسی اداروں کے ساتھ تعاون، اور سماجی امن و دفاع سے متعلق علمی سرگرمیوں کو منظم انداز میں آگے بڑھانا۔"}
 ]'::jsonb,
 true
)
on conflict (slug) do update set
 eyebrow=excluded.eyebrow,
 title=excluded.title,
 summary=excluded.summary,
 sections=excluded.sections,
 published=excluded.published,
 updated_at=now();

-- Organizational names from the supplied presentation material.
insert into public.people(name,slug,council,designation,summary,bio)
values
('ڈاکٹر حافظ عبدالرحمن مدنی','dr-hafiz-abdul-rahman-madani','مجلس بزرگان','رکن مجلس بزرگان','مجلس اتحادِ ملت کی مجلس بزرگان میں شامل علمی شخصیت۔','تفصیلی سوانحی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('ڈاکٹر صاحبزادہ جبار الرحمن صدیقی','dr-sahibzada-jabbar-rahman-siddiqui','مجلس بزرگان','رکن مجلس بزرگان','مجلس اتحادِ ملت کی مجلس بزرگان میں شامل علمی شخصیت۔','تفصیلی سوانحی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('مولانا زاہد الراشدی','maulana-zahid-al-rashidi','مجلس بزرگان','رکن مجلس بزرگان','مجلس اتحادِ ملت کی مجلس بزرگان میں شامل علمی شخصیت۔','تفصیلی سوانحی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('پروفیسر ڈاکٹر قبلہ ایاز','prof-dr-qibla-ayaz','مجلس بزرگان','رکن مجلس بزرگان','مجلس اتحادِ ملت کی مجلس بزرگان میں شامل علمی شخصیت۔','تفصیلی سوانحی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('احمد جاوید','ahmad-javed','مجلس بزرگان','رکن مجلس بزرگان','مجلس اتحادِ ملت کی مجلس بزرگان میں شامل علمی شخصیت۔','تفصیلی سوانحی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('سید ضیاء اللہ شاہ بخاری','syed-ziaullah-shah-bukhari','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('قاضی عبد القدیر خاموش','qazi-abdul-qadeer-khamosh','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('مفتی محمد زبیر','mufti-muhammad-zubair','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('مفتی گلزار نعیمی','mufti-gulzar-naeemi','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('مفتی شہزاد احمد علوی','mufti-shehzad-ahmad-alvi','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔'),
('صاحبزادہ محمد امانت رسول','sahibzada-muhammad-amanat-rasool','مجلس مشاورت','رکن مجلس مشاورت','مجلس اتحادِ ملت کی مجلس مشاورت میں شامل شخصیت۔','تفصیلی تعارف مستند معلومات کی حتمی منظوری کے بعد شامل کیا جائے گا۔')
on conflict (slug) do update set
 name=excluded.name,
 council=excluded.council,
 designation=excluded.designation,
 summary=excluded.summary;
