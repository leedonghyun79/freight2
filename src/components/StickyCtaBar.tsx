"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, CheckCheck, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";
import { PRIVACY_TEXT } from "@/lib/privacy";
import { useScrollReveal } from "@/lib/useScrollReveal";

const { contact } = siteConfig;

const formatPhoneNumber = (value: string) => {
  const n = value.replace(/[^\d]/g, "");
  if (n.length <= 3) return n;
  if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`;
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
};

const fieldClass =
  "h-10 rounded-lg bg-white/10 border border-white/15 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary-orange focus:bg-white/[0.16] transition-colors";

const CONTACT_TAGLINE = "부담 갖지 마시고 언제든 전화주시면 빠른 상담 가능합니다.";

export default function StickyCtaBar() {
  const revealed = useScrollReveal(400);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = form.phone.replace(/[^\d]/g, "");
    if (digits.length < 10 || digits.length > 11) {
      alert("올바른 연락처를 입력해 주세요. (예: 010-1234-5678)");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startLoc: "", endLoc: "", item: "", quantity: "" }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        trackConversion();
        setForm({ name: "", phone: "", message: "" });
        setDone(true);
        setTimeout(() => setDone(false), 5000);
      } else {
        alert(result.error || "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      alert("연결 오류가 발생했습니다. 네트워크 상태를 확인해 주세요.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div
        aria-hidden={!revealed}
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out ${
          revealed ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-primary-navy/70 backdrop-blur-xl border-t border-white/15 shadow-[0_-12px_32px_rgba(0,0,0,0.2)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3">
            {done ? (
              <div className="h-12 flex items-center gap-2.5 text-white">
                <CheckCheck size={20} className="text-primary-orange" />
                <span className="text-sm font-bold">
                  견적 문의가 접수되었습니다. 담당자가 빠르게 연락드리겠습니다.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap lg:flex-nowrap items-center gap-x-3 gap-y-2.5"
              >
                {/* Title + consent (lg+) */}
                <div className="hidden lg:flex flex-col shrink-0 pr-3 mr-1 border-r border-white/15">
                  <span className="text-white font-black text-[15px] tracking-tight">
                    무료 견적문의
                  </span>
                  <Consent onOpen={() => setShowPrivacy(true)} />
                </div>

                {/* Inputs */}
                <input
                  type="text"
                  placeholder="이름"
                  autoComplete="off"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${fieldClass} hidden sm:block w-28 shrink-0`}
                />
                <input
                  type="tel"
                  placeholder="연락처"
                  required
                  maxLength={13}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                  className={`${fieldClass} flex-1 sm:flex-none sm:w-40 min-w-0`}
                />
                <input
                  type="text"
                  placeholder="문의 내용을 입력해주세요"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${fieldClass} hidden md:block flex-1 min-w-0`}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className={`h-10 shrink-0 px-5 rounded-lg font-bold text-sm text-white flex items-center gap-1 transition-colors ${
                    sending ? "bg-gray-500 cursor-not-allowed" : "bg-primary-orange hover:bg-accent-orange"
                  }`}
                >
                  {sending ? "전송 중" : "신청하기"}
                  {!sending && <ChevronRight size={16} />}
                </button>

                {/* Consent (below inputs, < lg) */}
                <div className="lg:hidden w-full">
                  <Consent onOpen={() => setShowPrivacy(true)} />
                </div>

                {/* Contact (xl+) */}
                <a
                  href={`tel:${contact.phoneTel}`}
                  onClick={() => trackConversion()}
                  className="hidden xl:flex flex-col items-end shrink-0 pl-4 ml-1 border-l border-white/15 group"
                >
                  <span className="flex items-center gap-1.5 text-white font-black text-[15px] tracking-tight group-hover:text-primary-orange transition-colors">
                    <PhoneCall size={15} className="text-primary-orange" />
                    상담문의 {contact.phoneDisplay}
                  </span>
                  <span className="text-[11px] text-white/50 font-medium whitespace-nowrap">
                    {CONTACT_TAGLINE}
                  </span>
                </a>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Privacy modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="absolute inset-0 bg-primary-navy/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative z-10 flex flex-col mx-4"
            >
              <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-black text-primary-navy">개인정보 처리방침</h3>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto bg-gray-50/50 flex-1">
                <div className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-wrap break-keep">
                  {PRIVACY_TEXT}
                </div>
              </div>
              <div className="p-6 md:p-8 border-t border-gray-50 text-center">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-full md:w-auto px-10 py-4 bg-primary-navy text-white font-black rounded-xl md:rounded-2xl hover:bg-black transition-all"
                >
                  확인했습니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function Consent({ onOpen }: { onOpen: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-1 group/consent">
      <input type="checkbox" required className="peer sr-only" />
      <span className="w-4 h-4 border border-white/30 rounded bg-white/5 peer-checked:bg-primary-orange peer-checked:border-primary-orange transition-colors flex items-center justify-center shrink-0">
        <CheckCheck size={11} className="text-white scale-0 peer-checked:scale-100 transition-transform" />
      </span>
      <span className="text-[11px] text-white/60 font-medium group-hover/consent:text-white/80 transition-colors">
        개인정보처리방침 동의
      </span>
      <button
        type="button"
        onClick={onOpen}
        className="text-[11px] text-white/50 underline underline-offset-2 hover:text-primary-orange transition-colors"
      >
        상세보기
      </button>
    </label>
  );
}
