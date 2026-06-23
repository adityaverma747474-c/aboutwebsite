import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/delete-account")({
  component: DeleteAccount,
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  color: "#111827",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  WebkitUserSelect: "text",
  userSelect: "text",
  touchAction: "manipulation",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

export default function DeleteAccount() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLSelectElement>(null);
  const commentsRef = useRef<HTMLTextAreaElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: "", phone: "", email: "", reason: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const reason = reasonRef.current?.value || "";
    const comments = commentsRef.current?.value.trim() || "";
    const confirmed = confirmRef.current?.checked || false;

    if (!name) { toast.error("Apna naam likhein"); return; }
    if (!phone && !email) { toast.error("Phone number ya Email mein se ek zaroori hai"); return; }
    if (!reason) { toast.error("Account delete karne ki wajah chunein"); return; }
    if (!confirmed) { toast.error("Confirmation checkbox par tick karein"); return; }

    setIsSubmitting(true);
    setSubmittedData({ name, phone, email, reason });

    setTimeout(() => {
      const subject = encodeURIComponent("Doearno - Account Deletion Request");
      const body = encodeURIComponent(
        `Dear Doearno Support Team,\n\n` +
        `I request permanent deletion of my Doearno account.\n\n` +
        `Full Name: ${name}\n` +
        `Phone: ${phone || "Not provided"}\n` +
        `Email: ${email || "Not provided"}\n` +
        `Reason: ${reason}\n` +
        `Comments: ${comments || "None"}\n\n` +
        `I confirm this action is permanent and I will lose all my coins, XP, and referral history.\n\n` +
        `Regards,\n${name}`
      );
      window.location.href = `mailto:business@doearno.in?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", color: "#111827", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="https://i.ibb.co/bMmCYpfm/logo.jpg" alt="Doearno" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.3rem", color: "#111827" }}>Doearno</span>
          </Link>
          <a href="https://official.doearno.in"
            style={{ backgroundColor: "#059669", color: "#fff", borderRadius: 999, padding: "8px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Start Earning →
          </a>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, maxWidth: 620, width: "100%", margin: "0 auto", padding: "32px 16px" }}>

        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#6b7280", textDecoration: "none", marginBottom: 20 }}>
          ← Home par wapas jaayein
        </Link>

        {!isSubmitted ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "28px 24px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>

            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#fee2e2", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: "1.4rem", fontFamily: "'Instrument Serif', serif", color: "#111827" }}>Account Delete Request</h1>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: "#6b7280" }}>Apne Doearno account ko permanently delete karein</p>
              </div>
            </div>

            {/* Warning Box */}
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 16px", marginBottom: 22, fontSize: 13, color: "#92400e", display: "flex", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span><strong>Dhyan dein:</strong> Yeh action permanent hai. Aapke saare coins, XP, referral history aur pending withdrawals hamesha ke liye delete ho jayenge.</span>
            </div>

            {/* FORM — using uncontrolled inputs (no value prop) */}
            <form onSubmit={handleSubmit} autoComplete="on">

              {/* Name */}
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="del-name" style={labelStyle}>Poora Naam *</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="del-name"
                  name="fullname"
                  autoComplete="name"
                  placeholder="Apna registered naam likhein"
                  style={inputStyle}
                />
              </div>

              {/* Phone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label htmlFor="del-phone" style={labelStyle}>Phone Number</label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    id="del-phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91 9876543210"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="del-email" style={labelStyle}>Email Address</label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="del-email"
                    name="email"
                    autoComplete="email"
                    placeholder="naam@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Reason */}
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="del-reason" style={labelStyle}>Delete karne ki wajah *</label>
                <select
                  ref={reasonRef}
                  id="del-reason"
                  name="reason"
                  style={{ ...inputStyle, color: "#374151" }}
                >
                  <option value="">Wajah chunein...</option>
                  <option value="App ab use nahi karta">App ab use nahi karta</option>
                  <option value="Privacy concerns">Privacy ya data security concerns</option>
                  <option value="Technical issues">Bahut zyada technical issues</option>
                  <option value="Earning rates kam hain">Earning rates kam hain</option>
                  <option value="Duplicate account">Duplicate account banaya tha</option>
                  <option value="Other">Kuch aur (neeche likhein)</option>
                </select>
              </div>

              {/* Comments */}
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="del-comments" style={labelStyle}>Additional Comments (Optional)</label>
                <textarea
                  ref={commentsRef}
                  id="del-comments"
                  name="comments"
                  rows={3}
                  placeholder="Hume kaise better kar sakte hain..."
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              {/* Checkbox */}
              <div style={{ backgroundColor: "#f3f4f6", borderRadius: 10, padding: "14px 16px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <input
                  ref={confirmRef}
                  type="checkbox"
                  id="del-confirm"
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#059669", cursor: "pointer", flexShrink: 0 }}
                />
                <label htmlFor="del-confirm" style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, cursor: "pointer" }}>
                  Main confirm karta/karti hoon ki mera account permanently delete ho jayega aur saare coins, XP, aur referral history <strong>wapas nahi ayenge</strong>. *
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%", padding: "14px", borderRadius: 999, backgroundColor: isSubmitting ? "#d1d5db" : "#dc2626", color: "#ffffff", fontSize: 15, fontWeight: 700, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.5)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                    Bhej rahe hain...
                  </>
                ) : "Account Delete Request Submit Karein"}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
                Submit karne par aapka email app khulega — email send karna na bhulein
              </p>
            </form>
          </div>

        ) : (
          // Success
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "40px 24px", textAlign: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#dcfce7", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.8rem", margin: "0 0 10px", color: "#111827" }}>Request Send Ho Gayi!</h1>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.7 }}>
              Aapka email app open ho gaya hoga. Agar nahi hua, neeche button se manually bhejein <strong>business@doearno.in</strong> par.
            </p>

            <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 18px", marginBottom: 20, textAlign: "left" }}>
              <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 13, color: "#374151", borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Request Summary</p>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 2 }}>
                <div><strong>Naam:</strong> {submittedData.name}</div>
                {submittedData.phone && <div><strong>Phone:</strong> {submittedData.phone}</div>}
                {submittedData.email && <div><strong>Email:</strong> {submittedData.email}</div>}
                <div><strong>Wajah:</strong> {submittedData.reason}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`mailto:business@doearno.in?subject=${encodeURIComponent("Doearno - Account Deletion Request")}&body=${encodeURIComponent(`Dear Doearno Support Team,\n\nI request deletion of my account.\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nEmail: ${submittedData.email}\nReason: ${submittedData.reason}\n\nThank you.`)}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 999, backgroundColor: "#059669", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                📧 Email Dobara Bhejein
              </a>
              <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px", borderRadius: 999, border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                Home par Wapas Jaayein
              </Link>
            </div>

            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 16 }}>
              Aapki request 7 working days ke andar process ki jayegi.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>© 2026 Doearno · business@doearno.in · Made in India 🇮🇳</p>
      </footer>
    </div>
  );
}
