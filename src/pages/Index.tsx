
import { LocalCMSProvider } from "@/components/LocalCMSProvider";
import NavBar from "@/components/NavBar";
import HeroCarousel from "@/components/HeroCarousel";
import SectionParallax from "@/components/SectionParallax";
import EditableText from "@/components/EditableText";
import AdminToggle from "@/components/AdminToggle";
import LeadForm from "@/components/LeadForm";

const SES = [
  {
    id: "performance",
    titleKey: "performance-title",
    descKey: "performance-desc",
    defaultImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imgCmsKey: "performance-img",
    defaultTitle: "Performance",
    defaultDesc:
      "Otimizamos canais digitais através de análises de dados avançados, gestão de campanhas, SEO, mídia de performance e CRO. Resultados mensuráveis de verdade.",
    reverse: false
  },
  {
    id: "branding",
    titleKey: "branding-title",
    descKey: "branding-desc",
    defaultImg: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    imgCmsKey: "branding-img",
    defaultTitle: "Branding",
    defaultDesc:
      "Construímos marcas fortes para o ambiente digital: identidade visual, posicionamento, experiência de marca e comunicação coerente para diferenciar seu negócio.",
    reverse: true
  },
  {
    id: "user-experience",
    titleKey: "ux-title",
    descKey: "ux-desc",
    defaultImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    imgCmsKey: "ux-img",
    defaultTitle: "User Experience",
    defaultDesc:
      "Mapeamos jornadas, desenvolvemos protótipos, testamos e aplicamos métodos de design thinking para criar experiências digitais sedutoras e intuitivas.",
    reverse: false
  }
];

// Splash image style utility
const SplashTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block w-fit">
    <img
      src="/lovable-uploads/ee21ead5-356b-4d9d-979f-570d9fa03072.png"
      aria-hidden="true"
      className="absolute -top-4 left-1/2 -translate-x-1/2 w-[180px] md:w-[240px] opacity-40 pointer-events-none select-none"
      style={{ zIndex: 0 }}
      alt=""
      draggable={false}
    />
    <span className="relative z-10">{children}</span>
  </div>
);

const Index = () => {
  return (
    <LocalCMSProvider>
      <NavBar />
      <main className="mt-20 w-full overflow-x-hidden bg-background text-foreground font-inter">
        {/* Home Hero/Banner */}
        <section id="home">
          <HeroCarousel />
        </section>
        {/* Descritivo principal sobre a Kanvas */}
        <section className="bg-background py-16">
          <div className="container flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <SplashTitle>
                <EditableText
                  cmsKey="sobre-title"
                  as="h2"
                  defaultValue="Especialistas em Digital Biz: Marketing estratégico para fazer seu negócio crescer."
                  className="text-3xl md:text-4xl font-bold font-display mb-4"
                />
              </SplashTitle>
              <EditableText
                cmsKey="sobre-desc"
                as="p"
                defaultValue="A Kanvas é uma consultoria especializada em Negócios Digitais. Abordamos marketing por um viés técnico e estratégico, estudando seu negócio em profundidade para desenhar soluções sob medida que destravam valor e performance. Combinamos análise, criatividade e métodos avançados de design thinking para criação, crescimento e reposicionamento de empresas no universo digital."
                className="text-lg text-muted-foreground"
              />
            </div>
          </div>
        </section>
        {/* Sessões Parallax */}
        {SES.map(sessao => (
          <SectionParallax
            key={sessao.id}
            id={sessao.id}
            defaultImg={sessao.defaultImg}
            cmsImgKey={sessao.imgCmsKey}
            reverse={sessao.reverse}
          >
            <div className="flex-1 min-w-[300px]">
              <SplashTitle>
                <EditableText
                  cmsKey={sessao.titleKey}
                  as="h2"
                  defaultValue={sessao.defaultTitle}
                  className="text-3xl md:text-4xl font-bold font-display mb-4"
                />
              </SplashTitle>
              <EditableText
                cmsKey={sessao.descKey}
                as="p"
                defaultValue={sessao.defaultDesc}
                className="text-lg text-background/85"
              />
            </div>
          </SectionParallax>
        ))}
        {/* Seção Contato */}
        <section id="contato" className="py-28 bg-gradient-to-b from-background via-secondary to-secondary/80 relative">
          <div className="container">
            <SplashTitle>
              <EditableText
                cmsKey="contato-title"
                as="h2"
                defaultValue="Vamos conversar sobre seu próximo projeto digital?"
                className="text-3xl font-bold font-display text-center mb-7"
              />
            </SplashTitle>
            <LeadForm />
          </div>
        </section>
      </main>
      <AdminToggle />
      <footer className="bg-background border-t border-gray-200 py-8 mt-8 text-center text-sm text-muted-foreground font-inter">
        © {new Date().getFullYear()} Kanvas | Digital Biz & Design Thinking.
      </footer>
    </LocalCMSProvider>
  );
};

export default Index;
