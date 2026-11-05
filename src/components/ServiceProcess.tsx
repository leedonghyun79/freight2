import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    title: "운송 상담 및 접수",
    description:
      "운송할 장비의 종류와 크기, 출발지·도착지, 희망 일정을 알려주세요. 화물의 특성과 필요한 운송 조건을 함께 확인합니다.",
  },
  {
    title: "맞춤 운송 계획 수립",
    description:
      "장비의 중량과 반출입 환경에 맞춰 차량, 작업 인력, 이동 동선을 검토하고 견적과 진행 일정을 안내합니다.",
  },
  {
    title: "보호 포장 및 안전 상차",
    description:
      "장비 상태를 확인한 뒤 화물에 맞는 보호 포장과 결박을 진행합니다. 상차 후에는 고정 상태와 운송 준비 사항을 점검합니다.",
  },
  {
    title: "전용 차량 운송",
    description:
      "협의한 운송 조건에 따라 목적지까지 이동합니다. 운송 중 진행 상황을 확인하고 도착 일정에 맞춰 현장 인계를 준비합니다.",
  },
  {
    title: "현장 하차 및 인수 확인",
    description:
      "지정된 장소에 안전하게 하차하고 담당자와 장비의 외관 및 수량을 확인합니다. 최종 인수 확인으로 운송을 마무리합니다.",
  },
];

export default function ServiceProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-28 bg-surface py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-20 lg:px-12">
        <div>
          <div className="lg:sticky lg:top-36">
            <h2
              id="process-heading"
              className="break-keep text-3xl font-black leading-[1.35] tracking-tight text-primary-navy md:text-[44px]"
            >
              첫 상담부터
              <br />
              마지막 인계까지,
              <br />
              <span className="text-primary-orange">빈틈없는 운송 과정</span>
            </h2>
            <p className="mt-6 max-w-sm break-keep text-[18px] leading-7 text-gray-600">
              화물마다 다른 조건을 먼저 살피고,
              <br className="hidden sm:block" />
              정밀 장비에 맞는 운송 과정을 안내합니다.
              <br className="hidden sm:block" />
              필요한 정보를 남겨주시면 상담을 도와드립니다.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-6 rounded-full bg-primary-navy px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-orange"
            >
              내 화물 운송 상담하기
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <ol
          className="relative isolate before:absolute before:bottom-10 before:left-[23px] before:top-8 before:-z-10 before:w-px before:bg-gray-300 sm:before:left-[27px]"
          aria-label="운송 서비스 5단계"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-5 pb-8 last:pb-0 sm:gap-7 sm:pb-10"
            >
              <span className="mt-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-surface font-outfit text-lg font-bold tabular-nums text-primary-orange sm:h-14 sm:w-14">
                <span className="sr-only">단계 </span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 border-b border-gray-200 pb-8 pt-5 sm:pb-10">
                <h3 className="mb-3 break-keep text-lg font-bold tracking-tight text-primary-navy sm:text-xl">
                  {step.title}
                </h3>
                <p className="break-keep text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
