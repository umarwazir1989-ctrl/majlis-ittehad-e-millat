-- Phase 16 — Site settings + Newsletter subscribers

create table if not exists public.site_settings(
  id uuid primary key default gen_random_uuid(),
  setting_key text unique not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site settings public read" on public.site_settings;
create policy "site settings public read"
on public.site_settings for select
using(true);

drop policy if exists "admin site settings write" on public.site_settings;
create policy "admin site settings write"
on public.site_settings for all
to authenticated
using(public.is_admin())
with check(public.is_admin());

insert into public.site_settings(setting_key,value)
values(
  'main',
  jsonb_build_object(
    'brand',jsonb_build_object(
      'name','مجلس اتحادِ ملت',
      'tagline','فکر میں ہم آہنگی، عمل میں وحدت',
      'description','فکری ہم آہنگی، علمی مکالمہ، آدابِ اختلاف اور مشترکہ ملی مسائل میں تعاون کے لیے علمی و مشاورتی پلیٹ فارم۔'
    ),
    'contact',jsonb_build_object('phone','','email','','office','','whatsapp',''),
    'social',jsonb_build_object('facebook','','youtube','','x','','instagram',''),
    'footer',jsonb_build_object(
      'newsletter_title','اپ ڈیٹس حاصل کریں',
      'newsletter_text','مجلس کی تازہ سرگرمیوں اور علمی مواد سے باخبر رہنے کے لیے ای میل شامل کریں۔',
      'copyright','© 2026 مجلس اتحادِ ملت — جملہ حقوق محفوظ ہیں'
    ),
    'home',jsonb_build_object(
      'kicker','ایک قومی فکری پلیٹ فارم',
      'title','فکری ہم آہنگی، علمی مکالمہ اور ملی وحدت',
      'description','مجلس اتحادِ ملت اہلِ علم، اہلِ فکر، فکری شخصیات اور مختلف مکاتبِ فکر کے درمیان احترام، باہمی اعتماد اور مشترکہ قومی و ملی مسائل میں تعاون کے لیے ایک علمی و مشاورتی پلیٹ فارم ہے۔',
      'primary_label','مجلس کے بارے میں جانیں',
      'primary_url','/about',
      'secondary_label','ہمیں جوائن کریں',
      'secondary_url','/membership',
      'message_title','مجلس کا بنیادی پیغام',
      'message_text','اختلاف خیال اور اختلاف رائے فطری ہیں، لیکن فکری وسعت، تحمل اور احترام کے ساتھ مکالمہ ہماری مشترکہ ذمہ داری ہے۔',
      'verse_text','وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ',
      'verse_reference','سورۃ المائدہ: 2',
      'about_eyebrow','ہم کون ہیں؟',
      'about_title','مجلس اتحادِ ملت کیا ہے؟',
      'about_description','ایک غیر جماعتی، غیر فرقہ وارانہ اور غیر انتخابی علمی و مشاورتی فورم، جس کا مقصد مختلف فکری مکاتب کے درمیان تعمیری مکالمہ، باہمی احترام اور ملی یکجہتی کو فروغ دینا ہے۔',
      'forums_title','ہمارے اہم فورمز',
      'elders_eyebrow','علمی رہنمائی',
      'elders_title','مجلس بزرگان',
      'elders_description','دانشمندوں، روحانی و فکری قائدین اور ممتاز شخصیات پر مشتمل اعلیٰ علمی فورم۔',
      'advisory_eyebrow','اجتماعی مشاورت',
      'advisory_title','مجلس مشاورت',
      'advisory_description','اہلِ علم و فکر اور ماہرین پر مشتمل مشاورتی فورم جو اہم مسائل پر تجاویز مرتب کرتا ہے۔',
      'pillars',jsonb_build_array(
        jsonb_build_object('icon','shield','title','اخلاص و دیانت','text','دینی و ملی امور میں اخلاص، دیانت اور خیر خواہی کو بنیادی قدر سمجھنا۔'),
        jsonb_build_object('icon','unity','title','عملی وحدت','text','قومی و اجتماعی مسائل کے حل کے لیے مشترکات کو مضبوط بنیاد بنانا۔'),
        jsonb_build_object('icon','book','title','تحقیق و فکر','text','معیاری تحقیق، مطالعہ اور علمی رہنمائی کے ذریعے فکری بلوغ پیدا کرنا۔'),
        jsonb_build_object('icon','dialogue','title','حوار و مکالمہ','text','احترام اور شائستگی کے ساتھ سنجیدہ علمی اور فکری گفتگو کو فروغ دینا۔'),
        jsonb_build_object('icon','people','title','مختلف مکاتبِ فکر','text','مختلف مکاتبِ فکر اور اداروں کے اہلِ علم کو باہمی تعاون کے لیے قریب لانا۔')
      )
    )
  )
)
on conflict (setting_key) do nothing;

create table if not exists public.newsletter_subscribers(
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check(status in ('active','unsubscribed')),
  source text not null default 'footer',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "public newsletter insert" on public.newsletter_subscribers;
create policy "public newsletter insert"
on public.newsletter_subscribers for insert
to anon, authenticated
with check(status='active');

drop policy if exists "admin newsletter read" on public.newsletter_subscribers;
create policy "admin newsletter read"
on public.newsletter_subscribers for select
to authenticated
using(public.is_admin());

drop policy if exists "admin newsletter update" on public.newsletter_subscribers;
create policy "admin newsletter update"
on public.newsletter_subscribers for update
to authenticated
using(public.is_admin())
with check(public.is_admin());

drop policy if exists "admin newsletter delete" on public.newsletter_subscribers;
create policy "admin newsletter delete"
on public.newsletter_subscribers for delete
to authenticated
using(public.is_admin());

create index if not exists idx_newsletter_status on public.newsletter_subscribers(status);
create index if not exists idx_newsletter_created_at on public.newsletter_subscribers(created_at desc);
