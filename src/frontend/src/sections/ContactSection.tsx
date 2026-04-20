import emailjs from "@emailjs/browser";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: "adithiyan2809@gmail.com",
    href: "mailto:adithiyan2809@gmail.com",
    icon: Mail,
    colorClass: "text-primary hover:text-primary/80",
    external: false,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91 97906 62809",
    href: "tel:+919790662809",
    icon: Phone,
    colorClass: "text-accent hover:text-accent/80",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/adithiyan-adi",
    href: "https://www.linkedin.com/in/adithiyan-adi",
    icon: Linkedin,
    colorClass: "text-accent hover:text-accent/80",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/adithiyan-adi",
    href: "https://github.com/adithiyan-adi",
    icon: Github,
    colorClass: "text-foreground hover:text-muted-foreground",
    external: true,
  },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export function ContactSection() {

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string>("");

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof FormState) {
    const fieldErrors = validateForm(form);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const result = await emailjs.send(
        "service_portfolio",
        "template_contact",
        {
          name: form.name.trim(),
          from_name: form.name.trim(),
          user_name: form.name.trim(),
          email: form.email.trim(),
          from_email: form.email.trim(),
          user_email: form.email.trim(),
          message: form.message.trim(),
          reply_to: form.email.trim(),
        },
        "cZ_Ww3f0jlNZdLFUR"
      );

      if (result.status === 200) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send via EmailJS");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div data-ocid="contact-section">
      <SectionHeading
        label="Get in Touch"
        title="Contact Me"
        subtitle="Have a project in mind, a collaboration idea, or just want to connect? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Contact Info */}
        <AnimatedSection direction="left">
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground leading-relaxed">
              I'm actively seeking internship and full-time opportunities in
              VLSI design, embedded systems, and industrial automation. Whether
              it's a role, collaboration, or just a chat about hardware
              engineering — reach out.
            </p>

            {/* Social Links */}
            <div className="flex flex-col gap-4 mt-2">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-smooth ${link.colorClass}`}
                    data-ocid={`contact-link-${link.id}`}
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold tracking-widest uppercase font-mono text-muted-foreground mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground font-mono">
                Available for internships & full-time opportunities
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Right: Contact Form */}
        <AnimatedSection direction="right" delay={0.15}>
          <NeumorphicCard>
            {status === "success" ? (
              <div
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                data-ocid="contact-success"
              >
                <CheckCircle2
                  className="w-14 h-14 text-accent"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold font-display text-foreground">
                  Message Received!
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  Thank you! Your message has been received. I'll get back to
                  you as soon as possible.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="mt-2"
                  data-ocid="contact-send-another"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
                data-ocid="contact-form"
              >
                <h3 className="text-lg font-semibold font-display text-foreground mb-1">
                  Send a Message
                </h3>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name" className="text-sm font-medium">
                    Name{" "}
                    <span className="text-destructive" aria-hidden="true">
                      *
                    </span>
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    data-ocid="contact-input-name"
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email{" "}
                    <span className="text-destructive" aria-hidden="true">
                      *
                    </span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    data-ocid="contact-input-email"
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Message{" "}
                    <span className="text-destructive" aria-hidden="true">
                      *
                    </span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    data-ocid="contact-input-message"
                    rows={5}
                    className={`resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {status === "error" && serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive"
                    data-ocid="contact-error"
                  >
                    <AlertCircle
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {serverError}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="chip-button bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-1"
                  data-ocid="contact-submit"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </NeumorphicCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
