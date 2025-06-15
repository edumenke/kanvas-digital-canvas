
import { LocalCMSProvider } from "@/components/LocalCMSProvider";
import NavBar from "@/components/NavBar";
import HeroCarousel from "@/components/HeroCarousel";
import SectionParallax from "@/components/SectionParallax";
import EditableText from "@/components/EditableText";
import AdminToggle from "@/components/AdminToggle";
import LeadForm from "@/components/LeadForm";

// SVG Splash decorativo (topo)
const SplashBg = () => (
  <svg
    viewBox="0 0 1440 350"
    className="absolute inset-0 w-full h-[340px] pointer-events-none z-0"
    aria-hidden="true"
    style={{ top: 0, left: 0 }}
  >
    <ellipse cx="300" cy="120" rx="210" ry="60" fill="#7AD657" fillOpacity="0.20"/>
    <ellipse cx="900" cy="60" rx="250" ry="70" fill="#8F61FF" fillOpacity="0.18"/>
    <ellipse cx="1210" cy="180" rx="120" ry="40" fill="#3EB1E6" fillOpacity="0.20"/>
    <ellipse cx="540" cy="180" rx="140" ry="50" fill="#FFE065" fillOpacity="0.16"/>
    <ellipse cx="780" cy="250" rx="200" ry="45" fill="#FF6161" fillOpacity="0.13"/>
  </svg>
);

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
    reverse: false,
    color: "splash1"
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
    reverse: true,
    color: "splash2"
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
    reverse: false,
    color: "splash3"
  }
];

const Index = () => {
  return (
    <LocalCMSProvider>
      <NavBar />
      <main className="mt-20 w-full bg-background text-foreground font-inter relative">
        {/* Splash SVG decorativo topo */}
        <div className="relative" style={{ minHeight: "340px" }}>
          <SplashBg />
          <section id="home" className="relative z-10">
            <HeroCarousel />
          </section>
        </div>
        {/* Descritivo principal sobre a Kanvas, com título personalizado */}
        <section className="bg-background py-16">
          <div className="container flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <EditableText
                cmsKey="sobre-title"
                as="h2"
                defaultValue="especialistas em digital biz: marketing estratégico para fazer seu negócio crescer."
                className="text-3xl md:text-4xl font-bold font-montez mb-4 text-splash2 lowercase"
              />
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
              <EditableText
                cmsKey={sessao.titleKey}
                as="h2"
                defaultValue={sessao.defaultTitle.toLowerCase()}
                className={`text-3xl md:text-4xl font-bold font-montez mb-4 text-${sessao.color} lowercase`}
              />
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
        <section id="contato" className="py-28 bg-gradient-to-b from-background via-splash1/10 to-splash3/40 relative">
          <div className="container">
            <EditableText
              cmsKey="contato-title"
              as="h2"
              defaultValue="Vamos conversar sobre seu próximo projeto digital?"
              className="text-3xl font-bold font-pacifico text-center mb-7 text-splash5"
            />
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
