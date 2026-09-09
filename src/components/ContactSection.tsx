"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCheck, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { trackConversion } from "@/lib/track";
import { PRIVACY_TEXT } from "@/lib/privacy";

const { company } = siteConfig;

export default function ContactSection() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    startLoc: "",
    endLoc: "",
    item: "",
    quantity: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 휴대폰 번호 자동 하이픈 및 숫자만 추출 함수
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, ""); // 숫자만 남기기
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 휴대폰 번호 최종 확인 (하이픈 제외 10~11자리)
    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      alert("올바른 휴대폰 번호 형식을 입력해 주세요. (예: 010-1234-5678)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        trackConversion();
        setFormData({ name: '', phone: '', startLoc: '', endLoc: '', item: '', quantity: '', message: '' });
        setIsSubmitted(true);

      } else {
        alert(result.error || '견적 신청 중 오류가 발생했습니다. 잠시 후 고객센터로 문의 부탁드립니다.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('연결 오류가 발생했습니다. 네트워크 상태를 확인 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-gray-50 border-b-2 border-gray-100 h-14 px-2 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-base";

  return (
    <section id="contact" className="bg-primary-navy py-20 md:py-32 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Statement */}
        <div className="text-white text-left mb-10 md:mb-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-primary-orange text-xs font-black tracking-[0.2em] uppercase">
              Inquiry
            </span>
            <span className="h-px w-12 bg-primary-orange" />
          </div>
          <h2 className="text-3xl lg:text-[52px] font-outfit font-black leading-[1.15] tracking-tight mb-6 break-keep">
            고객 맞춤 <br />
            <span className="text-primary-orange">운송 솔루션</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-medium break-keep">
            {company.supportNote} <br />
            지금 바로 전문가와 상담하세요.
          </p>
        </div>

        {/* Form panel */}
        <div
          id="contact-form"
          className="bg-white rounded-2xl p-6 md:p-10 lg:p-14 shadow-2xl shadow-black/30"
        >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-10">
                    <h3 className="text-2xl font-black text-primary-navy mb-3">온라인 견적 문의</h3>
                    <p className="text-gray-400 text-[13px] font-medium">필수 정보(*)를 입력하시면 30분 이내에 답변 드립니다.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-[15px] font-bold text-primary-navy flex items-center">
                          성함 / 업체명 <span className="text-primary-orange ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="off"
                          placeholder="담당자명 또는 회사명을 입력하세요"
                          className={inputClass}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[15px] font-bold text-primary-navy flex items-center">
                          연락처 <span className="text-primary-orange ml-1">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="010-0000-0000"
                          maxLength={13}
                          className={inputClass}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">상차지 (출발지)</label>
                        <input
                          type="text"
                          placeholder="지역명 또는 상세주소"
                          className={inputClass}
                          value={formData.startLoc}
                          onChange={(e) => setFormData({ ...formData, startLoc: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">하차지 (도착지)</label>
                        <input
                          type="text"
                          placeholder="지역명 또는 상세주소"
                          className={inputClass}
                          value={formData.endLoc}
                          onChange={(e) => setFormData({ ...formData, endLoc: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">운송 품목</label>
                        <input
                          type="text"
                          placeholder="운송 품목 입력"
                          className={inputClass}
                          value={formData.item}
                          onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">수량</label>
                        <input
                          type="text"
                          placeholder="수량 입력"
                          className={inputClass}
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[15px] font-bold text-primary-navy">상세 문의 내용</label>
                      <textarea
                        rows={3}
                        placeholder="기타요청 및 특이사항 작성"
                        className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold resize-none placeholder:text-gray-300 placeholder:font-normal text-sm md:text-base"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input type="checkbox" required className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-gray-200 rounded-md bg-white peer-checked:bg-primary-orange peer-checked:border-primary-orange transition-all flex items-center justify-center">
                            <CheckCheck size={14} className="text-white scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                        </div>
                        <span className="text-[13px] font-bold text-gray-500 group-hover:text-primary-navy transition-colors tracking-tight leading-none">개인정보 수집 및 이용 동의</span>
                        <button
                          type="button"
                          onClick={() => setShowPrivacy(true)}
                          className="text-[11px] font-bold text-gray-400 border-b border-gray-200 hover:text-primary-orange hover:border-primary-orange transition-all ml-2 h-4 leading-none"
                        >
                          전문보기
                        </button>
                      </label>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-10 py-5 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-navy hover:bg-black'} text-white rounded-2xl font-black flex items-center justify-center group transition-all shadow-xl shadow-primary-navy/20`}
                      >
                        {isSubmitting ? '전송 중...' : '신청하기'}
                        <ChevronRight size={20} className={`ml-2 ${!isSubmitting && 'group-hover:translate-x-1'} transition-transform`} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-primary-navy mb-6">
                    <CheckCheck size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-primary-navy">문의가 접수되었습니다!</h3>
                  <p className="text-gray-400 font-medium max-w-sm leading-relaxed">
                    접수해주신 내용은 담당자가 즉시 확인 중입니다. <br />
                    빠른 시간 내에 전문 상담사가 연락을 드립니다.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="absolute inset-0 bg-primary-navy/80 backdrop-blur-md"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] md:max-h-[80vh] overflow-hidden relative z-10 flex flex-col mx-4"
            >
              <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-black text-primary-navy">개인정보 처리방침</h3>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto bg-gray-50/50 flex-1">
                <div
                  className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans whitespace-pre-wrap break-keep"
                  dangerouslySetInnerHTML={{ __html: PRIVACY_TEXT.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
              <div className="p-6 md:p-8 border-t border-gray-50 text-center">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-full md:w-auto px-10 py-4 bg-primary-navy text-white font-black rounded-xl md:rounded-2xl hover:bg-black transition-all shadow-xl shadow-primary-navy/20"
                >
                  확인했습니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
