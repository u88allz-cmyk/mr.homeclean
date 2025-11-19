import { useState, useEffect } from "react";
import { Phone, CheckCircle, Sparkles, Shield, Users, Clock, Award, TrendingUp, MapPin, HeadphonesIcon, Wrench, Menu, X, Home as HomeIcon, Briefcase, Baby, Building2, AlertTriangle, Star, ChevronLeft, ChevronRight, FileText, ArrowRight } from "lucide-react";
import { SiNaver } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ConsultationForm } from "@/components/consultation-form";
import heroImage from "@assets/hero-team.webp";
import teamFinal from "@assets/team-final.webp";
import moveInImage from "@assets/service-movein.webp";
import officeImage from "@assets/service-office.webp";
import specialImage from "@assets/service-special.webp";
import windowImage from "@assets/service-window.webp";
import logoImage from "@assets/미스터홈클린 로고-Photoroom_1763451941494.png";
import logoCharacter from "@assets/logo-character.png";
import characterMain from "@assets/character-main.webp";
import review1 from "@assets/review-1.webp";
import review2 from "@assets/review-2.webp";
import review3 from "@assets/review-3.webp";
import review4 from "@assets/review-4.webp";
import review5 from "@assets/review-5.webp";
import review6 from "@assets/review-6.webp";
import review7 from "@assets/review-7.webp";
import review8 from "@assets/review-8.webp";
import review9 from "@assets/review-9.webp";
import review10 from "@assets/review-10.webp";

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);

  const reviews = [
    { img: review1, alt: "고객 리뷰 1" },
    { img: review2, alt: "고객 리뷰 2" },
    { img: review3, alt: "고객 리뷰 3" },
    { img: review4, alt: "고객 리뷰 4" },
    { img: review5, alt: "고객 리뷰 5" },
    { img: review6, alt: "고객 리뷰 6" },
    { img: review7, alt: "고객 리뷰 7" },
    { img: review8, alt: "고객 리뷰 8" },
    { img: review9, alt: "고객 리뷰 9" },
    { img: review10, alt: "고객 리뷰 10" }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openConsultation = () => {
    setIsConsultationOpen(true);
    setIsMobileMenuOpen(false);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const openReviewModal = (img: string) => {
    setSelectedReviewImage(img);
  };

  // Keyboard navigation for review slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedReviewImage) return; // Don't navigate when modal is open
      
      if (e.key === 'ArrowLeft') {
        setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReviewImage, reviews.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="미스터홈클린 로고" className="h-14 w-auto" />
              <span className="text-xl font-bold text-primary">미스터홈클린</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-nav-home">클린서비스</a>
              <a href="#strengths" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-nav-office">왜 선택할까요?</a>
              <a href="#work-scope" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-nav-special">작업범위</a>
              <a href="#reviews" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-nav-reviews">고객리뷰</a>
              <a href="#pricing" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-nav-window">별도문의</a>
              <Button size="sm" onClick={openConsultation} data-testid="button-nav-contact">
                상담문의
              </Button>
            </div>
            <button 
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="#services" 
                className="block px-3 py-2 rounded-md hover-elevate active-elevate-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-home"
              >
                클린서비스
              </a>
              <a 
                href="#strengths" 
                className="block px-3 py-2 rounded-md hover-elevate active-elevate-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-office"
              >
                왜 선택할까요?
              </a>
              <a 
                href="#work-scope" 
                className="block px-3 py-2 rounded-md hover-elevate active-elevate-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-special"
              >
                작업범위
              </a>
              <a 
                href="#reviews" 
                className="block px-3 py-2 rounded-md hover-elevate active-elevate-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-reviews"
              >
                고객리뷰
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 rounded-md hover-elevate active-elevate-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-window"
              >
                별도문의
              </a>
              <Button className="w-full" onClick={openConsultation} data-testid="button-mobile-contact">
                상담문의
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Consultation Form Dialog */}
      <ConsultationForm open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="미스터홈클린 전문 청소 팀" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight break-keep" data-testid="text-hero-title">
            전문적인 청소,<br />
            이제는 선택이 아닌<br />
            <span className="text-primary">필수</span>입니다
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-medium break-keep">
            미스터홈클린이 책임지는 프리미엄 청소 서비스
          </p>
        </div>
      </section>

      {/* Section 2: Contact CTA */}
      <section id="contact" className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <button 
              onClick={openConsultation}
              className="flex items-center gap-6 bg-white rounded-xl p-8 hover-elevate active-elevate-2 text-left"
              data-testid="button-contact-inquiry"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground break-keep">문의 남기기</p>
              </div>
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-6 bg-white rounded-xl p-8 hover-elevate active-elevate-2 text-left"
              data-testid="button-contact-services"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground break-keep">서비스 둘러보기</p>
              </div>
            </button>
            <a 
              href="tel:010-0000-0000" 
              className="flex items-center gap-6 bg-white rounded-xl p-8 hover-elevate active-elevate-2"
              data-testid="link-phone-contact"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground break-keep">전화 상담</p>
              </div>
            </a>
            <a 
              href="https://blog.naver.com/mrclean-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-6 bg-white rounded-xl p-8 hover-elevate active-elevate-2"
              data-testid="link-blog-portfolio"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center">
                <SiNaver className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 break-keep">블로그</p>
                <p className="text-2xl font-bold text-foreground break-keep">포트폴리오 확인하기</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Brand Logo */}
      <section className="py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <img 
            src={logoCharacter} 
            alt="미스터홈클린 로고" 
            className="w-full max-w-md h-auto"
            data-testid="img-brand-logo"
          />
        </div>
      </section>

      {/* Section 4: 9 Strengths */}
      <section id="strengths" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16 break-keep" data-testid="text-strengths-title">
            왜 미스터홈클린 일까요?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "본사 대표 직접 현장 투입",
                description: "모든 현장에 본사 대표가 직접 관리하여 최상의 서비스 품질을 보장합니다"
              },
              {
                icon: TrendingUp,
                title: "월평균 1000개 청소 진행",
                description: "풍부한 경험과 노하우로 어떤 공간이든 완벽하게 청소합니다"
              },
              {
                icon: Users,
                title: "100% 직영팀 운영",
                description: "하청 없이 직영팀만 운영하여 일관된 고품질 서비스를 제공합니다"
              },
              {
                icon: Award,
                title: "무상 A/S 보장",
                description: "청소 후 불만족 시 즉시 재작업해드리며, 추가 비용이 전혀 없습니다"
              },
              {
                icon: Wrench,
                title: "전문 장비 사용",
                description: "최신 전문 청소 장비와 친환경 세제를 사용하여 안전하고 깨끗하게"
              },
              {
                icon: Clock,
                title: "신속한 예약 시스템",
                description: "원하시는 날짜와 시간에 맞춰 빠르게 예약하실 수 있습니다"
              },
              {
                icon: HeadphonesIcon,
                title: "24시간 상담 가능",
                description: "언제든지 전화로 편하게 상담받으실 수 있으며 블로그에서 포트폴리오를 확인하실 수 있습니다"
              },
              {
                icon: MapPin,
                title: "전국 서비스 가능",
                description: "서울, 경기, 인천은 물론 전국 어디든 방문 서비스가 가능합니다"
              },
              {
                icon: Sparkles,
                title: "무료 부가 서비스",
                description: "곰팡이 제거, 악취 제거 등 추가 서비스를 무료로 제공합니다"
              }
            ].map((strength, index) => (
              <Card key={index} className="p-8 hover-elevate" data-testid={`card-strength-${index}`}>
                <strength.icon className="w-12 h-12 text-primary mb-4" data-testid={`icon-strength-${index}`} />
                <h3 className="text-xl font-bold text-foreground mb-3 break-keep" data-testid={`text-strength-title-${index}`}>{strength.title}</h3>
                <p className="text-muted-foreground leading-relaxed break-keep" data-testid={`text-strength-desc-${index}`}>{strength.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Target Customers */}
      <section id="personas" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16 break-keep" data-testid="text-target-title">
            미스터홈클린,<br />
            이런 분들에게 딱이에요
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "이사/입주 예정이신 분",
                description: "깨끗한 공간에서 새로운 시작을 준비하세요"
              },
              {
                icon: Briefcase,
                title: "바쁜 직장인",
                description: "시간이 부족한 분들을 위한 전문 청소 서비스"
              },
              {
                icon: Baby,
                title: "영유아가 있는 가정",
                description: "안전한 친환경 세제로 우리 아이를 지켜요"
              },
              {
                icon: Building2,
                title: "사무실/상가 운영자",
                description: "쾌적한 근무환경으로 업무 효율을 높이세요"
              }
            ].map((target, index) => (
              <Card key={index} className="p-8 text-center hover-elevate" data-testid={`card-target-${index}`}>
                <target.icon className="w-16 h-16 text-primary mx-auto mb-4" data-testid={`icon-target-${index}`} />
                <h3 className="text-xl font-bold text-foreground mb-3 break-keep" data-testid={`text-target-title-${index}`}>{target.title}</h3>
                <p className="text-muted-foreground break-keep" data-testid={`text-target-desc-${index}`}>{target.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Main Services */}
      <section id="services" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16 break-keep" data-testid="text-services-title">
            미스터홈클린의 대표 서비스
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: moveInImage,
                title: "입주/이사청소",
                description: "새집처럼 깨끗하게! 구석구석 완벽한 마무리로 기분 좋은 시작을 도와드립니다."
              },
              {
                image: officeImage,
                title: "사무실/상가 청소",
                description: "쾌적한 업무환경! 직원들의 건강과 업무 효율을 높이는 전문 오피스 클리닝"
              },
              {
                image: specialImage,
                title: "특수청소",
                description: "어려운 청소도 OK! 곰팡이 제거, 싱크대 배수구 등 특수 청소 전문가"
              },
              {
                image: windowImage,
                title: "외창청소",
                description: "투명하게 빛나는 창문! 고층 아파트도 안전하게 깨끗이 닦아드립니다"
              }
            ].map((service, index) => (
              <Card key={index} className="overflow-hidden hover-elevate" data-testid={`card-service-${index}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    data-testid={`img-service-${index}`}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 break-keep" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                  <p className="text-muted-foreground mb-6 break-keep" data-testid={`text-service-desc-${index}`}>{service.description}</p>
                  <Button variant="outline" className="w-full break-keep" onClick={openConsultation} data-testid={`button-service-${index}`}>
                    상담 신청하기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Work Scope */}
      <section id="work-scope" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16 break-keep" data-testid="text-scope-title">
            미스터홈클린,<br />
            작업범위는?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                area: "주방",
                items: ["싱크대 내외부 세척", "가스레인지 탈거 청소", "후드 필터 탈거 세척", "주방 벽면 타일 청소", "수납장 내부 청소", "스팀 살균 소독"]
              },
              {
                area: "화장실",
                items: ["변기 스팀 살균", "타일 줄눈 곰팡이 제거", "샤워부스 물때 제거", "세면대 광택", "거울 물때 제거", "환풍구 청소"]
              },
              {
                area: "베란다",
                items: ["창틀 먼지 제거", "바닥 물청소", "난간 청소", "샷시 청소", "벽면 먼지 제거", "배수구 청소"]
              },
              {
                area: "거실/방",
                items: ["바닥 물걸레질", "벽면 먼지 제거", "조명 청소", "창문틀 청소", "스위치 살균", "문틀 먼지 제거"]
              }
            ].map((scope, index) => (
              <Card key={index} className="p-6" data-testid={`card-scope-${index}`}>
                <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b break-keep" data-testid={`text-scope-area-${index}`}>{scope.area}</h3>
                <ul className="space-y-3">
                  {scope.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2" data-testid={`item-scope-${index}-${idx}`}>
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground break-keep">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7.5: Customer Reviews */}
      <section id="reviews" className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
              <h2 className="text-4xl font-bold text-foreground break-keep" data-testid="text-reviews-title">
                고객 리뷰
              </h2>
              <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-xl text-muted-foreground mb-4 break-keep">
              미스터홈클린과 함께한 고객님들의 생생한 후기입니다
            </p>
            <p className="text-sm text-muted-foreground break-keep">
              이미지를 클릭하시면 크게 보실 수 있습니다
            </p>
          </div>
          
          {/* Review Slider */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              {/* Previous Button */}
              <Button
                size="icon"
                variant="outline"
                onClick={prevReview}
                className="flex-shrink-0"
                aria-label="이전 리뷰 보기"
                data-testid="button-review-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Current Review Image */}
              <div 
                className="aspect-square w-full max-w-2xl overflow-hidden rounded-lg border-4 border-background shadow-xl cursor-pointer hover-elevate active-elevate-2"
                onClick={() => openReviewModal(reviews[currentReviewIndex].img)}
                role="button"
                tabIndex={0}
                aria-label={`${reviews[currentReviewIndex].alt} 크게 보기`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openReviewModal(reviews[currentReviewIndex].img);
                  }
                }}
                data-testid={`img-review-current-${currentReviewIndex + 1}`}
              >
                <img 
                  src={reviews[currentReviewIndex].img} 
                  alt={reviews[currentReviewIndex].alt}
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              {/* Next Button */}
              <Button
                size="icon"
                variant="outline"
                onClick={nextReview}
                className="flex-shrink-0"
                aria-label="다음 리뷰 보기"
                data-testid="button-review-next"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center justify-center gap-2 mt-8" role="group" aria-label="리뷰 슬라이드 네비게이션">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentReviewIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover-elevate'
                  }`}
                  aria-label={`리뷰 ${index + 1}로 이동`}
                  aria-current={index === currentReviewIndex ? 'true' : 'false'}
                  data-testid={`button-review-dot-${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              더 많은 고객님들이 미스터홈클린의 전문성에 만족하고 계십니다
            </p>
            <Button size="lg" onClick={openConsultation} data-testid="button-reviews-consult">
              <Phone className="w-5 h-5 mr-2" />
              지금 바로 상담받기
            </Button>
          </div>
        </div>
      </section>

      {/* Review Image Modal */}
      <Dialog open={selectedReviewImage !== null} onOpenChange={(open) => !open && setSelectedReviewImage(null)}>
        <DialogContent className="max-w-4xl p-2">
          <VisuallyHidden>
            <DialogTitle>고객 리뷰 이미지</DialogTitle>
            <DialogDescription>고객 리뷰 이미지를 확대하여 보실 수 있습니다</DialogDescription>
          </VisuallyHidden>
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            {selectedReviewImage && (
              <img 
                src={selectedReviewImage} 
                alt="고객 리뷰 확대"
                className="w-full h-full object-contain bg-white"
                data-testid="img-review-modal"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Section 8: Additional Costs */}
      <section id="pricing" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <h2 className="text-4xl font-bold text-center text-foreground break-keep" data-testid="text-additional-cost-title">
              이런 경우엔 별도 비용이 생겨요
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-16 break-keep" data-testid="text-additional-cost-desc">
            아래 항목에 해당되는 경우 추가 비용이 발생할 수 있습니다
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "장판 및 벽지 제거 작업",
              "페인트, 본드 자국 제거",
              "심한 곰팡이 및 찌든 때 제거",
              "가구/짐 정리 요청 시",
              "고층 외부 창문 청소",
              "특수 코팅 및 광택 작업",
              "대형 폐기물 처리",
              "추가 인력 투입 필요 시",
              "쓰레기집/고독사 현장"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20"
                data-testid={`item-cost-${index}`}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="text-sm text-foreground break-keep">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Closing CTA */}
      <section id="closing-cta" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2 break-keep" data-testid="text-closing-title">
            신속하고! 깔끔하게!
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-12 break-keep" data-testid="text-closing-subtitle">
            대한민국 넘버원 "미스터홈클린"
          </h3>
          <div className="mb-12 flex justify-center">
            <img 
              src={teamFinal} 
              alt="미스터홈클린 전문 팀" 
              className="max-w-3xl w-full h-auto rounded-lg"
              data-testid="img-hero-team"
            />
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button 
                onClick={openConsultation}
                size="lg"
                className="w-full sm:w-auto min-h-11" 
                data-testid="button-closing-consultation"
              >
                상담연결
              </Button>
              <a href="https://blog.naver.com/mrclean-" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#03C75A] text-white border border-[#03C75A] min-h-11" data-testid="button-closing-blog">
                  <SiNaver className="w-5 h-5 mr-2" />
                  블로그 포트폴리오 확인하기
                </Button>
              </a>
            </div>
            <p className="text-base font-bold text-foreground break-keep max-w-2xl" data-testid="text-closing-blog-desc">
              <span className="text-primary">미스터홈클린</span>이 매일 진행하는<br />
              청소 현장 전 / 후 비교 사진은<br />
              블로그 포트폴리오에서 확인 가능합니다!
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: Footer */}
      <footer className="bg-card py-16 border-t" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt="미스터홈클린 로고" className="h-10 w-auto" />
                <span className="text-lg font-bold text-primary break-keep" data-testid="text-footer-brand">미스터홈클린</span>
              </div>
              <p className="text-sm text-muted-foreground break-keep" data-testid="text-footer-tagline">
                전문적인 청소 서비스로<br />
                여러분의 공간을<br />
                새롭게 만들어드립니다
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 break-keep" data-testid="text-footer-services-heading">서비스</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-foreground break-keep" data-testid="link-footer-movein">입주/이사청소</a></li>
                <li><a href="#services" className="hover:text-foreground break-keep" data-testid="link-footer-office">사무실/상가 청소</a></li>
                <li><a href="#services" className="hover:text-foreground break-keep" data-testid="link-footer-special">특수청소</a></li>
                <li><a href="#services" className="hover:text-foreground break-keep" data-testid="link-footer-window">외창청소</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 break-keep" data-testid="text-footer-support-heading">고객센터</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="break-keep" data-testid="text-footer-phone">전화: 070-7106-1658</li>
                <li className="break-keep" data-testid="text-footer-hours">운영시간: 24시간 연중무휴</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 break-keep" data-testid="text-footer-company-heading">회사정보</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="break-keep" data-testid="text-footer-company-name">상호명: 미스터홈클린</li>
                <li className="break-keep" data-testid="text-footer-business-number">사업자번호: 121-36-10314</li>
                <li className="break-keep" data-testid="text-footer-address">주소: 경기도 양주시 부흥로 1936, 4층</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p className="break-keep" data-testid="text-footer-copyright">Copyright 2024 미스터홈클린. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
