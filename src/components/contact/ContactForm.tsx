import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { site } from "../../content/site";
import type { Locale } from "../../lib/cms-types";

const contactSchema = z.object({
  name: z.string().min(1, "required").max(120),
  email: z.string().email("invalid").max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  subject: z.string().min(1, "required").max(200),
  message: z.string().min(1, "required").max(4000),
  // honeypot - must remain empty; bots fill it
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale: Locale;
}

const COPY = {
  id: {
    name: "Nama",
    email: "Email",
    company: "Perusahaan (opsional)",
    subject: "Subjek",
    message: "Pesan",
    submit: "Kirim via email",
    required: "wajib diisi",
    invalid: "tidak valid",
    intro: "Isi formulir di bawah ini. Saat Anda mengirim, kami akan membuka aplikasi email Anda dengan pesan yang sudah terisi.",
  },
  en: {
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    subject: "Subject",
    message: "Message",
    submit: "Send via email",
    required: "required",
    invalid: "invalid",
    intro: "Fill the form below. When you submit, we'll open your email client with a pre-filled message.",
  },
} as const;

export function ContactForm({ locale }: ContactFormProps) {
  const labels = COPY[locale];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", subject: "", message: "", website: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    if (values.website && values.website.length > 0) return;
    const subject = encodeURIComponent(`[DTM] ${values.subject}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.company ? `Company: ${values.company}` : "",
        "",
        values.message,
      ].filter(Boolean).join("\n")
    );
    window.location.assign(`mailto:${site.contactEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <p className="text-sm text-muted">{labels.intro}</p>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div>
        <label htmlFor="cf-name" className="label-uppercase block mb-2">{labels.name}</label>
        <input id="cf-name" type="text" autoComplete="name" className="w-full rounded-card border border-border bg-surface px-4 py-3 text-base text-primary focus:outline-none focus:border-accent" {...register("name")} />
        {errors.name && <p className="mt-1 text-sm text-error" role="alert">{errors.name.message === "required" ? labels.required : errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="label-uppercase block mb-2">{labels.email}</label>
        <input id="cf-email" type="email" autoComplete="email" className="w-full rounded-card border border-border bg-surface px-4 py-3 text-base text-primary focus:outline-none focus:border-accent" {...register("email")} />
        {errors.email && <p className="mt-1 text-sm text-error" role="alert">{errors.email.message === "invalid" ? labels.invalid : errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-company" className="label-uppercase block mb-2">{labels.company}</label>
        <input id="cf-company" type="text" autoComplete="organization" className="w-full rounded-card border border-border bg-surface px-4 py-3 text-base text-primary focus:outline-none focus:border-accent" {...register("company")} />
      </div>

      <div>
        <label htmlFor="cf-subject" className="label-uppercase block mb-2">{labels.subject}</label>
        <input id="cf-subject" type="text" className="w-full rounded-card border border-border bg-surface px-4 py-3 text-base text-primary focus:outline-none focus:border-accent" {...register("subject")} />
        {errors.subject && <p className="mt-1 text-sm text-error" role="alert">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="label-uppercase block mb-2">{labels.message}</label>
        <textarea id="cf-message" rows={6} className="w-full rounded-card border border-border bg-surface px-4 py-3 text-base text-primary focus:outline-none focus:border-accent" {...register("message")} />
        {errors.message && <p className="mt-1 text-sm text-error" role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-solid">
        {labels.submit}
      </button>
    </form>
  );
}
