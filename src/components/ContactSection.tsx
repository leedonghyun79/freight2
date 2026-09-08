"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Smartphone,
  ChevronRight,
  CheckCheck,
  X
} from "lucide-react";
import { useState } from "react";

const PRIVACY_TEXT = `
[개인정보 수집 및 이용 동의 전문]

1. 수집하는 개인정보 항목
- 필수항목: 성함/업체명, 연락처, 상차지(출발지), 하차지(도착지)
- 선택항목: 운송 품목 및 수량, 상세 문의 내용

2. 개인정보의 수집 및 이용 목적
- 화물 운송 견적 상담 및 서비스 제공을 위한 본인 확인
- 서비스 이용에 따른 민원 사항 처리 및 고지사항 전달

3. 개인정보의 보유 및 이용기간
- 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.
- 단, 상담 이력 관리 및 관련 법령에 의하여 보존할 필요가 있는 경우 일정 기간 보관할 수 있습니다. (최대 1년)

4. 동의 거부 권리 및 불이익
- 귀하는 개인정보 수집 및 이용에 거부할 권리가 있습니다. 단, 필수 항목 수집에 거부하실 경우 견적 상담 서비스 이용이 제한될 수 있습니다.
`;

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
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18131349273/cQG8COijsMIcEJne2cVD', 'value': 1.0, 'currency': 'KRW' });
          if (typeof window !== 'undefined' && (window as any).wcs) {
            if (!(window as any)._nasa) (window as any)._nasa = {};
            (window as any)._nasa["cnv"] = (window as any).wcs.cnv("4", "1");
            (window as any).wcs_do((window as any)._nasa);
          }
        }
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

  return (
    <section id="contact" className="py-24 bg-[#f8f9fa] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-none shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[750px] border border-gray-100">
          {/* Left Info Area */}
          <div className="lg:w-5/12 bg-primary-navy p-[35px] relative overflow-hidden flex flex-col justify-between text-white">
            {/* Visual Background Accent */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-orange/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <span className="text-primary-orange text-xs font-black tracking-widest uppercase mb-[5px] md:mb-4 block">
                INQUIRY
              </span>
              <h2 className="text-2xl lg:text-5xl font-outfit font-black mb-8 leading-tight tracking-tight">
                고객 맞춤 <br />
                <span className="text-primary-orange">운송 솔루션</span>
              </h2>
              <p className="text-gray-400 text-[13px] leading-relaxed mb-12 max-w-xs font-medium">
                365일 24시간 실시간 관제 시스템 가동. <br />
                지금 바로 전문가와 상담하세요.
              </p>

              <div className="space-y-12">
                <div className="group">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold opacity-70">Company Representative</div>
                  <a
                    href="tel:18336362"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18131349273/cQG8COijsMIcEJne2cVD', 'value': 1.0, 'currency': 'KRW' });
                        if (typeof window !== 'undefined' && (window as any).wcs) {
                          if (!(window as any)._nasa) (window as any)._nasa = {};
                          (window as any)._nasa["cnv"] = (window as any).wcs.cnv("4", "1");
                          (window as any).wcs_do((window as any)._nasa);
                        }
                      }
                      window.location.href = 'tel:18336362'; 
                    }}
                    className="text-white text-4xl lg:text-5xl font-black tracking-tighter group-hover:text-primary-orange transition-colors flex items-center gap-3 cursor-pointer"
                  >
                    1833-6362
                    <PhoneCall size={24} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="group">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold opacity-70">Email Inquiry</div>
                  <a
                    href="mailto:protexmove@gmail.com"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18131349273/cQG8COijsMIcEJne2cVD', 'value': 1.0, 'currency': 'KRW' });
                        if (typeof window !== 'undefined' && (window as any).wcs) {
                          if (!(window as any)._nasa) (window as any)._nasa = {};
                          (window as any)._nasa["cnv"] = (window as any).wcs.cnv("4", "1");
                          (window as any).wcs_do((window as any)._nasa);
                        }
                      }
                    }}
                    className="text-white text-xl lg:text-2xl font-black group-hover:text-primary-orange transition-colors flex items-center gap-3 cursor-pointer break-all"
                  >
                    protexmove@gmail.com
                    <Mail size={20} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                </div>
              </div>

            </div>

            {/* Business Details (Enhanced Density) */}
            <div className="relative z-10 pt-8 border-t border-white/10 mt-12 grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Office Address</span>
                  <span className="text-xs text-gray-300 leading-relaxed font-medium break-keep">경기도 평택시 고덕동 1234-5 프로젝트 타워 801호</span>
                </div>
                <div className="flex items-start gap-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Representative</span>
                    <span className="text-xs text-gray-300 font-medium whitespace-nowrap">김태호</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary-orange animate-pulse"></div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Available 24/7 National Wide Support</span>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div id="contact-form" className="lg:w-7/12 p-[35px] relative bg-white">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-12">
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
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-sm"
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
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-sm"
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
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-sm"
                          value={formData.startLoc}
                          onChange={(e) => setFormData({ ...formData, startLoc: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">하차지 (도착지)</label>
                        <input
                          type="text"
                          placeholder="지역명 또는 상세주소"
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-sm"
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
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-[13px] md:text-sm"
                          value={formData.item}
                          onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[15px] font-bold text-primary-navy">수량</label>
                        <input
                          type="text"
                          placeholder="수량 입력"
                          className="w-full bg-gray-50 border-b-2 border-gray-100 h-10 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold placeholder:text-gray-300 placeholder:font-normal text-[13px] md:text-sm"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[15px] font-bold text-primary-navy">상세 문의 내용</label>
                      <textarea
                        rows={2}
                        placeholder="기타요청 및 특이사항 작성"
                        className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-1 focus:outline-none focus:border-primary-orange transition-all text-primary-navy font-bold resize-none placeholder:text-gray-300 placeholder:font-normal text-[13px] md:text-sm"
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
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] md:max-h-[80vh] overflow-hidden relative z-10 flex flex-col mx-4"
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
