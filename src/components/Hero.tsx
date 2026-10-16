import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_shesafe_style_1792082877235.jpg';

interface HeroProps {
  onExploreFeatures: () => void;
  onGetSupport: () => void;
}

export default function Hero({ onExploreFeatures, onGetSupport }: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#2D1B4E] text-white"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Diverse women in profile facing forward surrounded by ethereal magenta and deep purple cinematic atmosphere"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        />

        {/* Precise overlay matching reference screenshot:
            Allows the swirling magenta and faces on the left to shine,
            darkens the center slightly for 100% text legibility,
            and blends seamlessly into deep rich purple-navy on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#240F3E]/60 via-[#261342]/70 to-[#2A184A]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#200B36]/40 to-[#180829]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#200B36]/50 via-transparent to-[#1F0A2E]/90" />
      </div>

      {/* Hero Content - Perfectly Centered in Viewport */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-24 pb-16">
        <h1 className="font-display text-4xl sm:text-6xl md:text-[68px] lg:text-[74px] font-bold tracking-tight text-white leading-[1.12] max-w-4xl mb-6 text-balance drop-shadow-sm">
          Recognize Early. <br />
          Reach Help. Protect Dignity.
        </h1>

        {/* Subheading - Comfortable width, clean white text, exactly as positioned in reference */}
        <p className="text-sm sm:text-base md:text-[17px] text-white/90 max-w-2xl mx-auto font-normal leading-relaxed mb-9 text-balance">
          Every woman deserves to feel safe, heard, and supported. SAATHI AI
          combines intelligent early-warning guidance, confidential help requests,
          and human-reviewed support to help women find the right next step.
        </p>

        {/* Primary Rounded White Pill Button matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreFeatures}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold text-[#2D1B4E] bg-white rounded-full shadow-lg hover:shadow-2xl hover:bg-white/95 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span>Explore Safety Features</span>
            <ArrowRight className="w-4 h-4 text-[#2D1B4E] transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Discreet secondary support affordance without disrupting the clean reference look */}
          <button
            type="button"
            onClick={onGetSupport}
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 border border-white/30 hover:border-white/60 rounded-full transition-all duration-200 cursor-pointer"
          >
            Get Support
          </button>
        </div>
      </div>
    </section>
  );
}
