import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Mail, ShieldAlert, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/delete-account")({
  component: DeleteAccount,
});

function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl overflow-hidden border border-primary/30">
            <img src="https://i.ibb.co/bMmCYpfm/logo.jpg" alt="Doearno Logo" className="w-full h-full object-cover" />
          </span>
          <span className="font-serif text-2xl tracking-tight">Doearno</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" hash="earn" className="text-muted-foreground hover:text-primary transition-colors">Earn</Link>
          <Link to="/" hash="how" className="text-muted-foreground hover:text-primary transition-colors">How it works</Link>
          <Link to="/" hash="tribes" className="text-muted-foreground hover:text-primary transition-colors">Tribes</Link>
          <Link to="/" hash="stories" className="text-muted-foreground hover:text-primary transition-colors">Stories</Link>
        </nav>
        <a href="https://official.doearno.in" className="btn-3d rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors">
          Start Earning →
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-background/40 backdrop-blur-md border-t border-border/10 py-12 relative z-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl overflow-hidden border border-primary/30">
            <img src="https://i.ibb.co/bMmCYpfm/logo.jpg" alt="Doearno Logo" className="w-full h-full object-cover" />
          </span>
          <span className="font-serif text-2xl">Doearno</span>
        </Link>
        <p className="eyebrow text-muted-foreground">LEARN · DO · GROW · UPI PAYOUTS · MADE IN INDIA</p>
        <p className="text-sm text-muted-foreground">© 2026 Doearno · business@doearno.in</p>
      </div>
    </footer>
  );
}

export default function DeleteAccount() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    additionalComments: "",
    confirmLoss: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      toast.error("Please enter either your registered Phone Number or Email");
      return;
    }
    if (!formData.reason) {
      toast.error("Please select a reason for deletion");
      return;
    }
    if (!formData.confirmLoss) {
      toast.error("You must agree to the permanent loss of rewards to proceed");
      return;
    }

    setIsSubmitting(true);

    // Simulate premium loading state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Request generated! Opening your email client to send.");

      // Construct mailto link
      const emailTo = "business@doearno.in";
      const subject = encodeURIComponent("Doearno - Account Deletion Request");
      const body = encodeURIComponent(
        `Dear Doearno Support Team,\n\n` +
        `I am writing to request the permanent deletion of my Doearno account. Below are my registered details:\n\n` +
        `- Full Name: ${formData.name}\n` +
        `- Phone Number: ${formData.phone || "Not provided"}\n` +
        `- Email Address: ${formData.email || "Not provided"}\n` +
        `- Reason for Deletion: ${formData.reason}\n` +
        `- Additional Feedback: ${formData.additionalComments || "None"}\n\n` +
        `I confirm that I understand that this action is permanent. All my accumulated coins, points, referral history, and pending withdrawals will be permanently erased and cannot be recovered.\n\n` +
        `Please process this request within the standard 7 working days.\n\n` +
        `Best regards,\n` +
        `${formData.name}`
      );

      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-2xl px-6 py-16 relative z-10">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl max-w-lg mx-auto" />
          
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>

          {!isSubmitted ? (
            <div className="glass rounded-3xl p-8 md:p-10 gradient-border card-3d">
              <div className="flex items-start gap-4 mb-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shrink-0">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground">Delete Account Request</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Request permanent deletion of your Doearno account and associated data.
                  </p>
                </div>
              </div>

              <div className="bg-destructive-foreground/5 border border-destructive/20 rounded-2xl p-5 mb-8 flex gap-3 text-sm text-muted-foreground">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Important Note:</span> Account deletion is permanent and cannot be undone. You will lose access to all your earned coins, XP, active referral networks, and history. If you have pending withdrawals, please wait for them to clear before deleting your account.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your registered name"
                    className="w-full px-4 py-3 rounded-xl bg-background/20 backdrop-blur-sm border border-border/20 focus:outline-none focus:border-primary text-foreground transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                      Registered Phone Number (UPI/App login)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-background/20 backdrop-blur-sm border border-border/20 focus:outline-none focus:border-primary text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-background/20 backdrop-blur-sm border border-border/20 focus:outline-none focus:border-primary text-foreground transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-muted-foreground mb-2">
                    Why do you want to delete your account? *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background/25 border border-border/20 focus:outline-none focus:border-primary text-foreground transition-all"
                  >
                    <option value="" disabled className="bg-background text-foreground">Select a reason</option>
                    <option value="No longer using the app" className="bg-background text-foreground">No longer using the app</option>
                    <option value="Privacy or data security concerns" className="bg-background text-foreground">Privacy or data security concerns</option>
                    <option value="Too many technical issues/bugs" className="bg-background text-foreground">Too many technical issues/bugs</option>
                    <option value="Earning rates are low" className="bg-background text-foreground">Earning rates are low</option>
                    <option value="Created a duplicate account" className="bg-background text-foreground">Created a duplicate account</option>
                    <option value="Other" className="bg-background text-foreground">Other (please specify below)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalComments" className="block text-sm font-medium text-muted-foreground mb-2">
                    Additional comments or feedback (Optional)
                  </label>
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    rows={3}
                    value={formData.additionalComments}
                    onChange={handleChange}
                    placeholder="Tell us how we can improve..."
                    className="w-full px-4 py-3 rounded-xl bg-background/20 backdrop-blur-sm border border-border/20 focus:outline-none focus:border-primary text-foreground transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="confirmLoss"
                    name="confirmLoss"
                    checked={formData.confirmLoss}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="confirmLoss" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I confirm that I want to delete my Doearno account and understand that all my data, including coins, referral rewards, and history, will be permanently erased. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-3d rounded-full bg-primary hover:bg-primary-deep text-primary-foreground font-semibold py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[var(--shadow-glow)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Generating request...
                    </>
                  ) : (
                    "Submit Account Deletion Request"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="glass rounded-3xl p-10 gradient-border text-center card-3d">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h1 className="font-serif text-4xl text-foreground mb-4">Request Generated!</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Thank you. We have pre-filled an email deletion request for you. 
                If your email application did not open automatically, please click the button below to send your request.
              </p>

              <div className="bg-background/20 border border-border/20 rounded-2xl p-5 mb-8 text-left space-y-3 text-sm">
                <p className="font-semibold text-foreground text-center border-b border-border/10 pb-2 mb-2">Request Details</p>
                <div><span className="text-muted-foreground font-medium">Name:</span> {formData.name}</div>
                {formData.phone && <div><span className="text-muted-foreground font-medium">Phone:</span> {formData.phone}</div>}
                {formData.email && <div><span className="text-muted-foreground font-medium">Email:</span> {formData.email}</div>}
                <div><span className="text-muted-foreground font-medium">Reason:</span> {formData.reason}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:business@doearno.in?subject=${encodeURIComponent("Doearno - Account Deletion Request")}&body=${encodeURIComponent(
                    `Dear Doearno Support Team,\n\nI request deletion of my Doearno account.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nReason: ${formData.reason}\n\nThank you.`
                  )}`}
                  className="btn-3d rounded-full bg-primary hover:bg-primary-deep text-primary-foreground font-semibold px-6 py-3 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4" /> Send Email Again
                </a>
                <Link
                  to="/"
                  className="btn-3d glass rounded-full px-6 py-3 flex items-center justify-center hover:text-primary transition-all"
                >
                  Go back to Home
                </Link>
              </div>

              <p className="text-xs text-muted-foreground mt-8">
                Your request will be processed within 7 working days after receipt of your email. You will receive a confirmation message once deletion is complete.
              </p>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
