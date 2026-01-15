import { useState } from 'react';
import { X, Upload, FileText, Check, AlertCircle, User, Mail, Phone, Linkedin, Github } from 'lucide-react';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    department: string;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
    coverLetter: string;
    resume: File | null;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    resume?: string;
}

const JobApplicationModal = ({ isOpen, onClose, jobTitle, department }: JobApplicationModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        github: '',
        coverLetter: '',
        resume: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.resume) {
            newErrors.resume = 'Resume is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('fullName', formData.fullName);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('linkedIn', formData.linkedIn);
            submitData.append('github', formData.github);
            submitData.append('coverLetter', formData.coverLetter);
            submitData.append('jobTitle', jobTitle);
            submitData.append('department', department);
            if (formData.resume) {
                submitData.append('resume', formData.resume);
            }

            // TODO: Replace with actual API endpoint
            // await fetch('/api/careers/apply', {
            //   method: 'POST',
            //   body: submitData,
            // });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Application submitted:', {
                ...formData,
                resume: formData.resume?.name,
                jobTitle,
                department,
            });

            setSubmitSuccess(true);
            setTimeout(() => {
                onClose();
                resetForm();
            }, 2500);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            linkedIn: '',
            github: '',
            coverLetter: '',
            resume: null,
        });
        setErrors({});
        setSubmitSuccess(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, resume: 'File size must be less than 5MB' });
                return;
            }
            if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
                setErrors({ ...errors, resume: 'Only PDF and Word documents are allowed' });
                return;
            }
            setFormData({ ...formData, resume: file });
            setErrors({ ...errors, resume: undefined });
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, resume: 'File size must be less than 5MB' });
                return;
            }
            if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
                setErrors({ ...errors, resume: 'Only PDF and Word documents are allowed' });
                return;
            }
            setFormData({ ...formData, resume: file });
            setErrors({ ...errors, resume: undefined });
        }
    };

    if (!isOpen) return null;

    if (submitSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="glass-dark max-w-md w-full p-8 rounded-2xl text-center animate-scale-in">
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Application Submitted!</h3>
                    <p className="text-slate-300">
                        Thank you for your interest! We've received your application and will review it shortly.
                        You'll hear from us within 5-7 business days.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="glass-dark max-w-2xl w-full my-auto max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Apply for {jobTitle}</h2>
                            <p className="text-slate-400">{department}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Email Address <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="john@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Phone Number <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* LinkedIn & GitHub */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                LinkedIn Profile
                            </label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.linkedIn}
                                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="linkedin.com/in/johndoe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                GitHub Profile
                            </label>
                            <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="github.com/johndoe"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Resume/CV <span className="text-red-400">*</span>
                        </label>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                                ? 'border-blue-500 bg-blue-500/10'
                                : errors.resume
                                    ? 'border-red-500 bg-red-500/5'
                                    : 'border-white/20 bg-white/5 hover:border-white/30'
                                }`}
                        >
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {formData.resume ? (
                                <div className="flex items-center justify-center gap-3">
                                    <FileText className="w-8 h-8 text-green-400" />
                                    <div className="text-left">
                                        <p className="text-white font-medium">{formData.resume.name}</p>
                                        <p className="text-sm text-slate-400">
                                            {(formData.resume.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <Check className="w-6 h-6 text-green-400" />
                                </div>
                            ) : (
                                <div>
                                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                                    <p className="text-white font-medium mb-1">
                                        Drop your resume here or click to browse
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        PDF or Word document (Max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                        {errors.resume && (
                            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.resume}
                            </p>
                        )}
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Cover Letter (Optional)
                        </label>
                        <textarea
                            value={formData.coverLetter}
                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            placeholder="Tell us why you're a great fit for this role..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationModal;
