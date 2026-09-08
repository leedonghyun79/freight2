"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Info,
  ChevronUp,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRIVACY_POLICY_TEXT = `
**프로펙스 (이하 ‘회사’라 한다)**는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.

**제1조 (개인정보의 처리목적)**
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
1. 홈페이지 회원 가입 및 관리
회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 각종 고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.
2. 재화 또는 서비스 제공
물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산 등을 목적으로 개인정보를 처리합니다.
3. 고충 처리
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.

**제2조 (개인정보의 처리 및 보유기간)**
① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
1. 홈페이지 서비스 관리 : 서비스 종료 시까지
2. 재화 또는 서비스 제공 : 재화․서비스 공급완료 및 요금결제․정산 완료 시까지 (단, 전자상거래법 등 관계 법령에 따라 표시․광고 6개월, 계약 5년, 소비자 불만 3년 보관)

**제13조(개인정보 처리방침 시행 및 변경)**
이 개인정보 처리방침은 **2024. 04. 01.** 부터 적용됩니다.
`;

const TERMS_OF_SERVICE_TEXT = `
제1조 목적
본 이용약관은 **프로펙스**(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.

제2조 용어의 정의
본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.
① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.

제7조 운영자의 의무
① 운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가격적 빨리 처리하여야 합니다.
② 운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 최선을 다합니다.

제16조 면책
① 운영자는 천재지변 또는 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
② 운영자는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.

부칙
이 약관은 **2024. 04. 01.** 부터 시행합니다.
`;

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="bg-[#0f1115] text-white pt-20 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-orange/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mb-8 block"
            >
              <Image
                src="/images/로고_w.png"
                alt="PROTEX Logo"
                width={180}
                height={50}
                className="object-contain"
              />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8 break-keep">
              프로텍스 특수운송은 반도체, 의료기기, 전산장비 등 고가의 정밀 자산을 현지 기술 인력과 실시간 관제 시스템을 통해 가장 안전하게 운송합니다.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary-orange mr-3"></span>
                Contact Information
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-primary-orange"><Phone size={18} /></div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Representative Number</div>
                    <div className="text-lg font-black text-white">1833-6362</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-primary-orange"><Mail size={18} /></div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email Support</div>
                    <div className="text-sm font-bold text-gray-300">protexmove@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary-orange mr-3"></span>
                Business Center
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-primary-orange"><MapPin size={18} /></div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Office Location</div>
                    <div className="text-sm font-bold text-gray-300 leading-relaxed">
                      본사: 경기도 안산시 단원구 시화호수로 835 <br />
                      사업소(고덕): 경기도 평택시 고덕면 1234-5
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-primary-orange"><Building2 size={18} /></div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Registration Details</div>
                    <div className="text-sm font-bold text-gray-300">
                      대표: 김태호
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
          <div className="flex space-x-4 mb-4 md:mb-0 items-center">
            <button onClick={() => setModalType("privacy")} className="hover:text-primary-orange transition-colors">개인정보처리방침</button>
            <span className="text-gray-800 font-normal">|</span>
            <button onClick={() => setModalType("terms")} className="hover:text-primary-orange transition-colors">이용약관</button>
          </div>
          <div className="flex items-center space-x-4">
            <span>© 2026 PROTEX Special Cargo. <br className="md:hidden" /> ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-hidden relative z-10 flex flex-col mx-4"
            >
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white relative z-20">
                <h3 className="text-lg md:text-xl font-black text-primary-navy">
                  {modalType === "privacy" ? "개인정보처리방침" : "이용약관"}
                </h3>
                <button
                  onClick={() => setModalType(null)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto bg-gray-50/50 flex-1">
                <div className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans whitespace-pre-wrap break-keep space-y-4">
                  {modalType === "privacy" ? (
                    <div dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY_TEXT.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: TERMS_OF_SERVICE_TEXT.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  )}
                </div>
              </div>
              <div className="p-6 md:p-8 border-t border-gray-100 text-center bg-white">
                <button
                  onClick={() => setModalType(null)}
                  className="w-full md:w-auto px-10 py-4 bg-primary-navy text-white font-black rounded-xl md:rounded-2xl hover:bg-black transition-all shadow-xl shadow-primary-navy/20"
                >
                  확인했습니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
