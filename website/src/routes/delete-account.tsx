import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/delete-account")({
  component: DeleteAccount,
});

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      toast.error("Please enter your registered Phone Number or Email");
      return;
    }
    if (!formData.reason) {
      toast.error("Please select a reason for deletion");
      return;
    }
    if (!formData.confirmLoss) {
      toast.error("Please confirm you understand the permanent data loss");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const emailTo = "business@doearno.in";
      const subject = encodeURIComponent("Doearno - Account Deletion Request");
      const body = encodeURIComponent(
        `Dear Doearno Support Team,\n\n` +
        `I am writing to request permanent deletion of my Doearno account.\n\n` +
        `Full Name: ${formData.name}\n` +
        `Phone Number: ${formData.phone || "Not provided"}\n` +
        `Email Address: ${formData.email || "Not provided"}\n` +
        `Reason: ${formData.reason}\n` +
        `Additional Comments: ${formData.additionalComments || "None"}\n\n` +
        `I understand this action is permanent and all my data, coins, and referral history will be erased.\n\n` +
        `Please process this request within 7 working days.\n\n` +
        `Regards,\n${formData.name}`
      );

      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Email client opened. Please send the email to complete your request.");
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--background)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, overflow: "hidden", display: "grid", placeItems: "center", border: "1px solid var(--primary)" }}>
              <img src="https://i.ibb.co/bMmCYpfm/logo.jpg" alt="Doearno" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--foreground)", fontWeight: 400 }}>Doearno</span>
          </Link>
          <a
            href="https://official.doearno.in"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 999, padding: "8px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
          >
            Start Earning →
          </a>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, maxWidth: 640, width: "100%", margin: "0 auto", padding: "40px 20px" }}>
        {/* Back link */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--muted-foreground)", textDecoration: "none", marginBottom: 24 }}>
          ← Back to Home
        </Link>

        {!isSubmitted ? (
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            {/* Title */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(239,68,68,0.1)", display: "grid", placeItems: "center", flexShrink: 0, border: "1px solid rgba(239,68,68,0.25)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", margin: 0, color: "var(--foreground)" }}>Delete Account Request</h1>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted-foreground)" }}>Request permanent deletion of your Doearno account and data.</p>
              </div>
            </div>

            {/* Warning */}
            <div style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 24, fontSize: 13, color: "var(--muted-foreground)", display: "flex", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <div>
                <strong style={{ color: "var(--foreground)" }}>Important:</strong> This action is permanent. You will lose all coins, XP, referral history, and pending withdrawals. Please clear any pending withdrawals before proceeding.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="name" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted-foreground)", marginBottom: 6 }}>Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your registered name"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Phone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div>
                  <label htmlFor="phone" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted-foreground)", marginBottom: 6 }}>Registered Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted-foreground)", marginBottom: 6 }}>Registered Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Reason */}
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="reason" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted-foreground)", marginBottom: 6 }}>Reason for Deletion *</label>
                <select
                  id="reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", color: formData.reason ? "var(--foreground)" : "var(--muted-foreground)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                >
                  <option value="" disabled>Select a reason...</option>
                  <option value="No longer using the app">No longer using the app</option>
                  <option value="Privacy or data security concerns">Privacy or data security concerns</option>
                  <option value="Too many technical issues">Too many technical issues</option>
                  <option value="Earning rates are low">Earning rates are low</option>
                  <option value="Created a duplicate account">Created a duplicate account</option>
                  <option value="Other">Other (please specify below)</option>
                </select>
              </div>

              {/* Additional Comments */}
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="additionalComments" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted-foreground)", marginBottom: 6 }}>Additional Comments (Optional)</label>
                <textarea
                  id="additionalComments"
                  name="additionalComments"
                  rows={3}
                  value={formData.additionalComments}
                  onChange={handleChange}
                  placeholder="Tell us how we can improve..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>

              {/* Checkbox */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, padding: "12px 14px", borderRadius: 10, backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}>
                <input
                  type="checkbox"
                  id="confirmLoss"
                  name="confirmLoss"
                  checked={formData.confirmLoss}
                  onChange={handleChange}
                  style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, accentColor: "var(--primary)", cursor: "pointer" }}
                />
                <label htmlFor="confirmLoss" style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.5, cursor: "pointer" }}>
                  I confirm I want to permanently delete my account. I understand all my coins, XP, rewards, and referral history will be erased and <strong style={{ color: "var(--foreground)" }}>cannot be recovered</strong>. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%", padding: "13px 20px", borderRadius: 999, backgroundColor: isSubmitting ? "var(--muted)" : "var(--primary)", color: "var(--primary-foreground)", fontSize: 15, fontWeight: 600, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Sending request...
                  </>
                ) : (
                  "Submit Account Deletion Request"
                )}
              </button>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>
          </div>
        ) : (
          /* Success State */
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "40px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", margin: "0 0 12px", color: "var(--foreground)" }}>Request Generated!</h1>
            <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24, lineHeight: 1.6 }}>
              Your deletion request has been prepared. If your email app didn't open automatically, click the button below to send it manually to <strong>business@doearno.in</strong>.
            </p>

            {/* Summary */}
            <div style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
              <p style={{ margin: "0 0 12px", fontWeight: 600, fontSize: 13, color: "var(--foreground)", borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>Request Summary</p>
              <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 2 }}>
                <div><strong>Name:</strong> {formData.name}</div>
                {formData.phone && <div><strong>Phone:</strong> {formData.phone}</div>}
                {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
                <div><strong>Reason:</strong> {formData.reason}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`mailto:business@doearno.in?subject=${encodeURIComponent("Doearno - Account Deletion Request")}&body=${encodeURIComponent(`Dear Doearno Support Team,\n\nI request deletion of my Doearno account.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nReason: ${formData.reason}\n\nThank you.\n${formData.name}`)}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 999, backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send Email Again
              </a>
              <Link
                to="/"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--foreground)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
              >
                Go back to Home
              </Link>
            </div>

            <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 20 }}>
              Your request will be processed within 7 working days after we receive your email.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--background)", padding: "24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, overflow: "hidden", display: "grid", placeItems: "center" }}>
              <img src="https://i.ibb.co/bMmCYpfm/logo.jpg" alt="Doearno" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
            <span style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>Doearno</span>
          </Link>
          <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>© 2026 Doearno · business@doearno.in</p>
        </div>
      </footer>
    </div>
  );
}
