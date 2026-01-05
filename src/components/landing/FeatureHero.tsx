import SpotlightBackground from "./SpotlightBackground";

const FeatureHero = () => {
    return (
        <SpotlightBackground className="pt-32 pb-16 hero-gradient">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -mt-20" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -mb-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
                    Platform Capabilities
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Everything you need to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
                        master your SEO
                    </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    From technical audits to AI-driven insights, explore the tools that power the world's fastest-growing websites.
                </p>
            </div>
        </SpotlightBackground>
    );
};

export default FeatureHero;
