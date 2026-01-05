import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const KnowledgeHero = () => {
    return (
        <section className="bg-navy py-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -mr-40 -mt-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -ml-40 -mb-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    How can we help you?
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                    Search our knowledge base for answers, tutorials, and troubleshooting guides.
                </p>

                <div className="max-w-2xl mx-auto relative">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search for articles (e.g., 'API keys', 'billing', 'audit errors')..."
                            className="w-full h-14 pl-12 pr-4 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:bg-white/20 focus:border-white/30 text-lg transition-all"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeHero;
