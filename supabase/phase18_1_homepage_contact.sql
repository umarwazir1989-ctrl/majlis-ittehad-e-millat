-- Phase 18.1 — Professional homepage copy + official contact details
-- Safe merge: existing social/footer settings are preserved.

update public.site_settings
set
  value =
    jsonb_set(
      jsonb_set(
        jsonb_set(
          value,
          '{brand}',
          coalesce(value->'brand','{}'::jsonb) || jsonb_build_object(
            'name','مجلس اتحادِ ملت',
            'tagline','فکر میں ہم آہنگی، عمل میں وحدت',
            'description','امت کے مشترکہ شعور، علمی مکالمے، آدابِ اختلاف اور قومی و ملی مسائل میں باہمی تعاون کے لیے ایک غیر جماعتی علمی و مشاورتی پلیٹ فارم۔'
          ),
          true
        ),
        '{contact}',
        coalesce(value->'contact','{}'::jsonb) || jsonb_build_object(
          'phone','03008931555',
          'email','majlisittehad63@gmail.com',
          'whatsapp','03008931555'
        ),
        true
      ),
      '{home}',
      coalesce(value->'home','{}'::jsonb) || jsonb_build_object(
        'kicker','ایک مشترکہ قومی و فکری پلیٹ فارم',
        'title','فکری ہم آہنگی، علمی مکالمہ اور ملی وحدت',
        'description','مجلس اتحادِ ملت مختلف مکاتبِ فکر کے اہلِ علم اور فکری شخصیات کو باہمی احترام، سنجیدہ مکالمے اور مشترکہ قومی و ملی مسائل میں تعاون کے لیے ایک علمی و مشاورتی فورم پر جمع کرتی ہے۔',
        'primary_label','مجلس کا تعارف',
        'primary_url','/about',
        'secondary_label','رکنیت و تعاون',
        'secondary_url','/membership',
        'message_title','مجلس کا بنیادی پیغام',
        'message_text','اختلاف علمی زندگی کا فطری حصہ ہے؛ اسے نزاع کے بجائے علم، تحمل اور باہمی احترام کے ساتھ مفید مکالمے میں تبدیل کرنا ہماری مشترکہ ذمہ داری ہے۔',
        'verse_text','وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ',
        'verse_reference','سورۃ المائدہ: 2',
        'about_eyebrow','تعارفِ مجلس',
        'about_title','مجلس اتحادِ ملت کیا ہے؟',
        'about_description','یہ کوئی نیا مسلک، جماعت یا انتخابی اتحاد نہیں؛ بلکہ مختلف مکاتبِ فکر کے اہلِ علم کے درمیان مکالمہ، باہمی اعتماد اور مشترکہ ملی مسائل پر اجتماعی شعور کو مضبوط بنانے کا علمی و مشاورتی پلیٹ فارم ہے۔',
        'forums_title','مجلس کے بنیادی فورمز',
        'elders_eyebrow','علمی و فکری رہنمائی',
        'elders_title','مجلس بزرگان',
        'elders_description','ممتاز اہلِ علم، فکری قائدین اور قومی شخصیات پر مشتمل رہنما فورم، جو مجلس کی فکری سمت اور بنیادی ترجیحات میں رہنمائی فراہم کرتا ہے۔',
        'advisory_eyebrow','اجتماعی مشاورت',
        'advisory_title','مجلس مشاورت',
        'advisory_description','مختلف علمی و فکری حلقوں کے نمائندہ اہلِ علم پر مشتمل مشاورتی فورم، جو اہم قومی، فکری اور سماجی موضوعات پر تجاویز مرتب کرتا ہے۔',
        'pillars',jsonb_build_array(
          jsonb_build_object('icon','shield','title','اخلاص و دیانت','text','قومی و دینی معاملات میں خیر خواہی، دیانت اور ذمہ دارانہ طرزِ عمل۔'),
          jsonb_build_object('icon','unity','title','مشترکات پر تعاون','text','اختلاف کے باوجود مشترکہ ملی مسائل میں تعاون اور اجتماعی شعور کی تقویت۔'),
          jsonb_build_object('icon','book','title','تحقیق و فکر','text','معیاری علمی تحقیق اور سنجیدہ فکری مباحث کے ذریعے رہنمائی۔'),
          jsonb_build_object('icon','dialogue','title','حوار و مکالمہ','text','اختلاف کو احترام، دلیل اور علمی آداب کے ساتھ مفید مکالمے میں بدلنا۔'),
          jsonb_build_object('icon','people','title','بین المکاتب رابطہ','text','مختلف مکاتبِ فکر کے اہلِ علم اور اداروں کے درمیان اعتماد اور رابطے کا فروغ۔')
        )
      ),
      true
    ),
  updated_at=now()
where setting_key='main';
