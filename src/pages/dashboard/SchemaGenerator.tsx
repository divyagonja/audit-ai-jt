import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Code,
    Check,
    Copy,
    AlertCircle,
    ExternalLink,
    Database,
    Box,
    MapPin,
    FileText,
    HelpCircle,
    Star,
    Building,
    User,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generateSchema, SchemaType, SCHEMA_DEFINITIONS, SchemaField } from "@/services/ai/schemaGenerator";

const ICON_MAP = {
    [SchemaType.Article]: FileText,
    [SchemaType.Product]: Box,
    [SchemaType.LocalBusiness]: MapPin,
    [SchemaType.FAQ]: HelpCircle,
    [SchemaType.Review]: Star,
    [SchemaType.Organization]: Building,
    [SchemaType.Person]: User,
    [SchemaType.HowTo]: Code, // Fallback icon
};

const SchemaGenerator = () => {
    const [selectedType, setSelectedType] = useState<SchemaType>(SchemaType.Article);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            // Filter out empty fields
            const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
            const code = await generateSchema(selectedType, cleanData);
            setGeneratedCode(code);
            toast.success("Schema markup generated successfully!");
        } catch (error) {
            toast.error("Failed to generate schema");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!generatedCode) return;
        navigator.clipboard.writeText(generatedCode);
        toast.success("Code copied to clipboard");
    };

    const renderField = (field: SchemaField) => {
        if (field.type === "textarea") {
            return (
                <Textarea
                    placeholder={field.placeholder}
                    className="min-h-[100px] bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
            );
        }
        // TODO: Handle array/object types with more complex UI if needed. 
        // For now, simple text inputs are a good MVP for "array" (asking for comma separated)
        return (
            <Input
                placeholder={field.placeholder}
                className="h-12 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                onChange={(e) => handleInputChange(field.key, e.target.value)}
            />
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Schema Markup Generator"
                subtitle="Technical SEO & Rich Snippet Creator"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 🏗️ Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                                <Code className="h-4 w-4" />
                                Technical SEO
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Schema <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-fuchsia-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]">Architect</span>
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Win <span className="text-white">Rich Snippets</span> (Stars, Images, FAQs) in Google Search results. Select a schema type, fill in the details, and let our AI generate valid JSON-LD code instantly.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-8">
                                {/* Type Selector */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Select Schema Type</label>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.values(SchemaType).map((type) => {
                                            const Icon = ICON_MAP[type] || Code;
                                            const isSelected = selectedType === type;
                                            return (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedType(type)}
                                                    className={`
                                                        flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300
                                                        ${isSelected
                                                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40 transform scale-105"
                                                            : "bg-slate-950 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-sm font-bold">{type}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Dynamic Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500" key={selectedType}>
                                    {SCHEMA_DEFINITIONS[selectedType]?.map((field) => (
                                        <div key={field.key} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                {field.label}
                                                {field.required && <span className="text-rose-500">*</span>}
                                            </label>
                                            {renderField(field)}
                                            {field.description && <p className="text-[10px] text-slate-500 ml-1">{field.description}</p>}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-lg shadow-indigo-900/20 transition-all group text-lg mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Validating & Generating Code...
                                        </>
                                    ) : (
                                        <>
                                            Generate JSON-LD Code
                                            <Code className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📄 Code Result */}
                {generatedCode && (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl -mr-32 -mt-32"></div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                                        <Check className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white">Generated Schema</h3>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Valid JSON-LD • Ready to Deploy</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => window.open('https://validator.schema.org/', '_blank')} className="border-white/10 hover:bg-white/5 text-slate-300">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Validate
                                    </Button>
                                    <Button onClick={copyToClipboard} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
                                        <Copy className="mr-2 h-4 w-4" /> Copy Code
                                    </Button>
                                </div>
                            </div>

                            <div className="relative group/code">
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-transparent rounded-full opacity-50"></div>
                                <pre className="p-6 bg-slate-950/50 rounded-2xl overflow-x-auto border border-white/5 text-sm font-mono text-indigo-300 leading-relaxed custom-scrollbar">
                                    {generatedCode}
                                </pre>
                            </div>

                            <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-start gap-3">
                                <div className="mt-0.5">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                                </div>
                                <p className="text-xs text-indigo-200/80 leading-relaxed font-medium">
                                    <strong>Installation:</strong> Paste this code into the <code className="bg-white/10 px-1 py-0.5 rounded text-white">&lt;head&gt;</code> section of your HTML page. Or use Google Tag Manager to inject it dynamically.
                                </p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchemaGenerator;
