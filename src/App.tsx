import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Instagram, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Network,
  Settings,
  Sun,
  Shield,
  Headphones,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import './App.css';

// Hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(0);

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Network,
      title: 'Diseño e Infraestructura de Red',
      description: 'Diseñamos e implementamos redes empresariales robustas y escalables. Desde cableado estructurado hasta configuración de switches, routers y equipos de red.',
      features: ['Cableado estructurado', 'Configuración de equipos', 'Redes LAN/WAN', 'Soluciones WiFi']
    },
    {
      icon: Settings,
      title: 'Soporte Técnico SAP y ASPEL',
      description: 'Soporte especializado para tus sistemas ERP. Expertos certificados en SAP y ASPEL para garantizar el funcionamiento óptimo de tus operaciones.',
      features: ['Implementación SAP', 'Soporte ASPEL', 'Capacitación', 'Mantenimiento']
    },
    {
      icon: Sun,
      title: 'Energía Renovable',
      description: 'Soluciones de energía solar para empresas. Reduce tus costos operativos y haz tu negocio más sostenible con nuestros sistemas fotovoltaicos.',
      features: ['Paneles solares', 'Inversores', 'Baterías', 'Monitoreo']
    },
    {
      icon: Shield,
      title: 'CCTV y Alarmas',
      description: 'Sistemas de seguridad integral con cámaras de alta definición y alarmas inteligentes. Protege tus instalaciones con tecnología de vanguardia.',
      features: ['Cámaras HD/4K', 'Videovigilancia', 'Alarmas', 'Control de acceso']
    },
    {
      icon: Headphones,
      title: 'Soporte Técnico en Sistemas',
      description: 'Soporte técnico integral para tu infraestructura IT. Resolución rápida de incidentes y mantenimiento preventivo.',
      features: ['Soporte remoto', 'Soporte presencial', 'Mantenimiento', 'Consultoría IT']
    }
  ];

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Contacto', href: '#contact' },
  ];

  // Scroll animation refs
  const aboutAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gctel-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-gctel-black/95 border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a 
              href="#hero" 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/logo.png" alt="GCTEL" className="h-32
             w-70" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-sm text-white/60 hover:text-gctel-orange transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gctel-orange transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:flex items-center gap-6"
            >
              <a href="tel:5626127290" className="text-sm text-white/60 hover:text-white transition-colors">
                56 2612 7290
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-gctel-black border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-white/70 hover:text-gctel-orange transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <a href="tel:5626127290" className="text-sm text-white/60">
                    56 2612 7290
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <img 
            src="/astronauta.jpg" 
            alt="Space background" 
            className="w-full h-full object-cover opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gctel-black/70 via-gctel-black/40 to-gctel-black" />
        </motion.div>

        {/* Content */}
        <motion.div 
          className="relative z-10 w-full px-6 lg:px-12 pt-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gctel-orange text-sm tracking-widest uppercase"
              >
                Tecnología sin límites
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
              >
                Conectamos<br />
                <span className="text-gradient font-normal">tu mundo</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-white/60 max-w-xl mx-auto"
              >
                Soluciones integrales en telecomunicaciones para llevar tu empresa al siguiente nivel.
              </motion.p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.a 
                href="https://wa.me/525626127290"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="bg-gctel-orange text-white hover:bg-gctel-orange/90 px-6 py-5 text-sm rounded-md">
                    Contáctanos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.a>
              <motion.a 
                href="#services"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-6 py-5 text-sm rounded-md">
                    Servicios
                  </Button>
                </motion.div>
              </motion.a>
            </div>

            <div className="flex justify-center items-center gap-12 mt-16">
              {[
                { value: '+10', label: 'Años de experiencia' },
                { value: '+100', label: 'Clientes' },
                { value: '24/7', label: 'Soporte' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                  className="text-center"
                >
                  <p className="text-2xl font-light text-gctel-orange">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div ref={aboutAnimation.ref}>
              <motion.p 
                initial={{ opacity: 0, y: 60 }}
                animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-gctel-orange text-sm tracking-widest uppercase mb-4"
              >
                Sobre Nosotros
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 60 }}
                animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-3xl md:text-4xl font-light mb-8"
              >
                Tu aliado tecnológico de confianza
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 60 }}
                animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/60 leading-relaxed mb-6"
              >
                En GCTEL nos especializamos en brindar soluciones tecnológicas integrales para empresas. 
                Desde infraestructura de red hasta energía renovable, nuestro equipo de expertos está 
                comprometido con la excelencia.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 60 }}
                animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="text-white/60 leading-relaxed"
              >
                Con más de 10 años de experiencia, hemos ayudado a cientos de empresas 
                a optimizar sus operaciones mediante tecnología de punta.
              </motion.p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[
                  { icon: Zap, label: 'Innovación' },
                  { icon: Shield, label: 'Confianza' },
                  { icon: Network, label: 'Infraestructura' },
                  { icon: Settings, label: 'Soporte' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + 0.1 * index }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="p-4 cursor-default"
                  >
                    <item.icon className="w-6 h-6 text-gctel-orange mx-auto mb-3" />
                    <h4 className="text-sm font-medium">{item.label}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div ref={servicesAnimation.ref}>
              <div className="text-center mb-12">
                <motion.p 
                  initial={{ opacity: 0, y: 60 }}
                  animate={servicesAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-gctel-orange text-sm tracking-widest uppercase mb-4"
                >
                  Nuestros Servicios
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 60 }}
                  animate={servicesAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-3xl md:text-4xl font-light"
                >
                  Soluciones integrales
                </motion.h2>
              </div>

              <div className="space-y-3">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = activeService === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      animate={servicesAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + 0.1 * index }}
                      className={`border border-white/5 rounded-lg overflow-hidden transition-all cursor-pointer ${
                        isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                      }`}
                      onClick={() => setActiveService(isActive ? null : index)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-gctel-orange' : 'text-white/40'}`} />
                          </motion.div>
                          <h3 className="text-sm font-medium">{service.title}</h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isActive ? (
                            <ChevronUp className="w-4 h-4 text-gctel-orange" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-white/30" />
                          )}
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5">
                              <p className="text-sm text-white/50 mb-4 pl-9">{service.description}</p>
                              <div className="flex flex-wrap gap-2 pl-9">
                                {service.features.map((feature, fIndex) => (
                                  <motion.span 
                                    key={fIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: 0.05 * fIndex }}
                                    className="px-2 py-1 bg-white/5 rounded text-xs text-white/60"
                                  >
                                    {feature}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div ref={contactAnimation.ref}>
              <div className="text-center mb-12">
                <motion.p 
                  initial={{ opacity: 0, y: 60 }}
                  animate={contactAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-gctel-orange text-sm tracking-widest uppercase mb-4"
                >
                  Contacto
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 60 }}
                  animate={contactAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-3xl md:text-4xl font-light"
                >
                  Estamos aquí para ayudarte
                </motion.h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Phone, label: 'Teléfono', value: '56 2612 7290', href: 'tel:5626127290' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '56 2612 7290', href: 'https://wa.me/525626127290', external: true },
                  { icon: Instagram, label: 'Instagram', value: '@gctelmx', href: 'https://instagram.com/gctelmx', external: true }
                ].map((item, index) => (
                  <motion.a 
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 60 }}
                    animate={contactAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + 0.1 * index }}
                    whileHover={{ y: -8 }}
                    className="text-center group"
                  >
                    <motion.div 
                      className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-gctel-orange transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="w-5 h-5 text-white/60 group-hover:text-gctel-orange transition-colors" />
                    </motion.div>
                    <p className="text-xs text-white/40 mb-1">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                animate={contactAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mt-12"
              >
                <a 
                  href="https://wa.me/525626127290"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="bg-gctel-orange text-white hover:bg-gctel-orange/90 px-8 py-5 text-sm rounded-md">
                      Escríbenos
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-8 border-t border-white/5"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.img 
                src="/logo.png" 
                alt="GCTEL" 
                className="h-6 w-auto"
                whileHover={{ scale: 1.05 }}
              />
              
              <div className="flex gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs text-white/40 hover:text-gctel-orange transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} GCTEL
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
