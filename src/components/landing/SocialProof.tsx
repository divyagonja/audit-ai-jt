const SocialProof = () => {
  const logos = [
    { name: "TechFlow", Component: Logo1 },
    { name: "Nexus", Component: Logo2 },
    { name: "Sphere", Component: Logo3 },
    { name: "Global", Component: Logo4 },
    { name: "Acme", Component: Logo5 },
    { name: "Vertex", Component: Logo6 },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
          Trusted by 500+ High-Growth Companies
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap">
          {logos.concat(logos).concat(logos).map((logo, index) => (
            <div
              key={index}
              className="mx-12 w-32 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
            >
              <logo.Component className="h-8 max-w-full text-navy" />
            </div>
          ))}
        </div>

        {/* Gradients for smooth fade in/out */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* Add global style for the animation if it's not in index.css */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// --- SVG Logo Components (Abstract/Generic for Layout) ---

const Logo1 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <path d="M15 15C15 23.2843 8.28427 30 0 30V0C8.28427 0 15 6.71573 15 15Z" />
    <rect x="20" y="5" width="20" height="20" rx="5" />
    <text x="50" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">Flow</text>
  </svg>
);

const Logo2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="6" />
    <text x="35" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">NEXUS</text>
  </svg>
);

const Logo3 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <path d="M15 0L28 25H2L15 0Z" />
    <text x="35" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">VORTEX</text>
  </svg>
);

const Logo4 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <rect x="0" y="0" width="10" height="30" />
    <rect x="15" y="10" width="10" height="20" />
    <rect x="30" y="5" width="10" height="25" />
    <text x="50" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">Data</text>
  </svg>
);

const Logo5 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <circle cx="10" cy="15" r="5" />
    <circle cx="25" cy="15" r="5" />
    <text x="40" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">echo</text>
  </svg>
);

const Logo6 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 30" fill="currentColor" {...props}>
    <path d="M0 15L10 5L20 15L30 5V25H0V15Z" />
    <text x="40" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="bold">Pulse</text>
  </svg>
);

export default SocialProof;
