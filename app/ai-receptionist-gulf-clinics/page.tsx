import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "AI receptionist for clinics in Dubai and the Gulf (English, Arabic, Urdu)",
  description:
    "An AI receptionist for clinics in Dubai, Abu Dhabi, Riyadh and across the Gulf. Answers every call in English, Arabic or Urdu, books the appointment and hands urgent cases to your staff.",
  alternates: { canonical: "/ai-receptionist-gulf-clinics" },
};

const faq: [string, string][] = [
  ["Which languages does the AI receptionist speak?", "English, Arabic and Urdu. A caller can start in one language and switch to another. Other languages are scoped on request."],
  ["Can it answer calls after hours and on weekends?", "Yes. It answers at any hour, books the next free slot and flags anything urgent to a person on your team."],
  ["Does it work with our existing phone number and booking system?", "We connect to the number and calendar or practice software you already use. If an integration does not exist, we scope building it before any work starts."],
  ["What about patient data and privacy?", "Data handling is agreed in writing before we start. We do not claim a certification we do not hold, and any regional health-data requirement is scoped first, including where data may be stored."],
  ["Will patients know they are speaking to an AI?", "Yes. The agent introduces itself plainly and any caller can ask for a person at any time."],
];

export default function GulfClinicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          }),
        }}
      />
      <PageHeader
        path="/ai-receptionist-gulf-clinics"
        eyebrow="For clinics in the Gulf"
        title="AI receptionist for Gulf clinics"
        lead="Answers every call in English, Arabic or Urdu, books the appointment, and hands anything urgent to your staff."
      />
      <div className="frame border-t hair">
        <section className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 data-reveal className="head">Why the Gulf is different</h2>
          <div className="max-w-2xl space-y-4 text-slate">
            <p>Patients in the Gulf call in many languages. A front desk that only works in one loses people on the first sentence. Our AI receptionist speaks English, Arabic and Urdu, so a patient can talk in the language they are most comfortable in.</p>
            <p>Most big AI receptionist tools are built for US practices and focus on English and Spanish. We build for the Gulf first: the languages, the hours and the way clinics here actually take bookings.</p>
            <p>Calls often come late in the evening and on weekends, when the front desk is closed. The agent answers at any hour, takes the details and books the next free slot.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 data-reveal className="head">What it does</h2>
          <ul className="max-w-2xl list-disc space-y-2 ps-5 text-slate">
            <li>Answers in one ring and finds out what the patient needs.</li>
            <li>Books, moves or cancels the appointment in your real calendar.</li>
            <li>Texts a confirmation and a reminder before the visit.</li>
            <li>Passes urgent or sensitive calls to a person on your team, with a short summary.</li>
            <li>Sends you a plain weekly summary of calls answered and slots booked.</li>
          </ul>
        </section>

        <section className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 data-reveal className="head">بالعربية</h2>
          <div lang="ar" dir="rtl" className="max-w-2xl space-y-4 text-slate">
            <p>موظف استقبال بالذكاء الاصطناعي للعيادات في دبي والخليج. يرد على كل مكالمة من أول رنة، بالعربية أو الإنجليزية أو الأردية، ويحجز الموعد في تقويمك الفعلي، ويرسل رسالة تأكيد وتذكير للمريض.</p>
            <p>يعمل في أي ساعة، بما في ذلك المساء وعطلات نهاية الأسبوع. وأي حالة عاجلة أو حساسة تُحوَّل فوراً إلى أحد أفراد فريقك مع ملخص قصير، ويُعرِّف المساعد بنفسه بوضوح بأنه ذكاء اصطناعي، ويمكن لأي متصل طلب التحدث إلى شخص في أي وقت.</p>
            <p>نتفق كتابياً على طريقة التعامل مع بيانات المرضى قبل أن نبدأ، ولا ندّعي أي شهادة لا نملكها.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 data-reveal className="head">اردو میں</h2>
          <div lang="ur" dir="rtl" className="max-w-2xl space-y-4 text-slate">
            <p>دبئی اور خلیج کے کلینکس کے لیے اے آئی ریسپشنسٹ۔ یہ ہر کال پہلی گھنٹی پر اٹھاتا ہے، اردو، عربی یا انگریزی میں بات کرتا ہے، آپ کے اصل کیلنڈر میں اپائنٹمنٹ بک کرتا ہے اور مریض کو تصدیق اور یاد دہانی کا پیغام بھیجتا ہے۔</p>
            <p>یہ کسی بھی وقت کام کرتا ہے، شام اور ویک اینڈ سمیت۔ کوئی ہنگامی یا حساس کال مختصر خلاصے کے ساتھ فوراً آپ کے عملے کے کسی فرد کو منتقل کر دی جاتی ہے۔ ایجنٹ صاف بتاتا ہے کہ وہ اے آئی ہے، اور کال کرنے والا کسی بھی وقت انسان سے بات کرنے کو کہہ سکتا ہے۔</p>
            <p>کام شروع کرنے سے پہلے ہم مریضوں کے ڈیٹا کے بارے میں تحریری طور پر طے کرتے ہیں، اور ایسی کسی سند کا دعویٰ نہیں کرتے جو ہمارے پاس نہیں ہے۔</p>
          </div>
        </section>

        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">Questions</h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={faq} />
          </div>
        </section>

        <p className="px-4 py-6 text-sm text-slate md:px-10">
          Looking for the general version? See <Link href="/industries/clinics" className="u-link font-medium hover:text-plum">AI receptionist for clinics</Link> or{" "}
          <Link href="/services/voice" className="u-link font-medium hover:text-plum">how the voice agent works</Link>.
        </p>
      </div>
      <PageCta />
    </>
  );
}
