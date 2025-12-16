const SocialProof = () => {
  const companies = [
    "Accenture",
    "Deloitte",
    "McKinsey",
    "Bain & Co",
    "BCG",
    "PwC",
  ];

  return (
    <section className="py-16 bg-background border-b border-slate-200">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-10">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-2xl font-bold text-slate-300 hover:text-slate-400 transition-colors duration-200 cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
