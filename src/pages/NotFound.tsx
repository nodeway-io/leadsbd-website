import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const GlitchText = () => {
  return (
    <div className="relative select-none">
      {/* Base layer */}
      <motion.h1 
        className="text-[120px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary to-primary/50"
        style={{ 
          textShadow: '0 0 80px rgba(0, 200, 150, 0.4), 0 0 120px rgba(0, 200, 150, 0.2)',
          WebkitTextStroke: '1px rgba(0, 200, 150, 0.3)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        404
      </motion.h1>
      
      {/* Glitch layer 1 - Cyan offset */}
      <motion.h1 
        className="absolute inset-0 text-[120px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-cyan-400/30"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0, 0.3, 0],
          x: [0, -4, 0, 3, 0],
          y: [0, 2, 0, -1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.2, 0.4, 0.6, 1]
        }}
        aria-hidden="true"
      >
        404
      </motion.h1>
      
      {/* Glitch layer 2 - Red offset */}
      <motion.h1 
        className="absolute inset-0 text-[120px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-red-400/20"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0, 0.4, 0],
          x: [0, 3, 0, -2, 0],
          y: [0, -1, 0, 2, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.3, 0.5, 0.7, 1],
          delay: 0.5
        }}
        aria-hidden="true"
      >
        404
      </motion.h1>

      {/* Scanline effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
        animate={{ 
          y: ['-100%', '100%']
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
        aria-hidden="true"
      />
    </div>
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

const NotFound = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Page Not Found | Leads.bd</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-infrastructure flex items-center justify-center relative overflow-hidden">
        {/* Background grid effect */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 200, 150, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 150, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Radial glow behind 404 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <FloatingParticles />

        <div className="text-center px-4 relative z-10">
          {/* Connection lost icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <WifiOff className="w-10 h-10 text-primary/60" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wifi className="w-10 h-10 text-primary/30" />
              </motion.div>
            </div>
          </motion.div>

          <GlitchText />
          
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Signal Lost
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground mb-8 max-w-md mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The page you're looking for doesn't exist or has been moved to a different location.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-hero group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Status indicator */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.span 
              className="w-2 h-2 bg-primary/60 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>Reconnecting to infrastructure...</span>
          </motion.div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </PageTransition>
  );
};

export default NotFound;
