"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import { ProfileData } from "@/data/profileData";
import { ServiceItem } from "@/data/servicesData";
import { TestimonialItem } from "@/data/testimonialsData";
import { FaqItem } from "@/data/faqsData";
import { BlogItem } from "@/data/blogsData";
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  FolderKanban,
  UserCheck,
  Code,
  Copy,
  Check,
  Sparkles,
  Eye,
  Share2,
  Briefcase,
  Layout,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Star,
  Mail,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "projects" | "hero" | "about" | "socials" | "services" | "testimonials" | "faqs" | "blogs" | "inbox" | "supabase"
  >("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Partial<ProfileData>>({});
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [messages, setMessages] = useState<Array<{ id: string; name: string; email: string; service: string; message: string; created_at: string }>>([]);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Edit Project Modal state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [base64ImagePreview, setBase64ImagePreview] = useState<string>("");

  // Edit Service / Testimonial / FAQ / Blog state
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogItem> | null>(null);

  // SQL Schema Modal/Copy state
  const [sqlSchema, setSqlSchema] = useState<string>("");
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("nivi_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("nivi_admin_auth", "true");
        fetchData();
      } else {
        setLoginError(data.message || "Invalid Password");
      }
    } catch {
      setLoginError("Failed to authenticate");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("nivi_admin_auth");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, profRes, svcRes, testRes, faqRes, blogRes, msgRes, seedRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/profile"),
        fetch("/api/services"),
        fetch("/api/testimonials"),
        fetch("/api/faqs"),
        fetch("/api/blogs"),
        fetch("/api/contact"),
        fetch("/api/seed"),
      ]);

      const projData = await projRes.json();
      const profData = await profRes.json();
      const svcData = await svcRes.json();
      const testData = await testRes.json();
      const faqData = await faqRes.json();
      const blogData = await blogRes.json();
      const msgData = await msgRes.json();
      const seedData = await seedRes.json();

      if (projData.success) setProjects(projData.data);
      if (profData.success) setProfile(profData.data);
      if (svcData.success) setServices(svcData.data);
      if (testData.success) setTestimonials(testData.data);
      if (faqData.success) setFaqs(faqData.data);
      if (blogData.success) setBlogs(blogData.data);
      if (msgData.success) setMessages(msgData.data);
      if (seedData.sqlSchema) setSqlSchema(seedData.sqlSchema);
    } catch (err) {
      console.error("Fetch data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openNewProjectModal = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: "",
      subtitle: "",
      category: "UI/UX Design",
      tag: "Featured Project",
      image: "/images/realestate_preview.png",
      figmaUrl: "https://www.figma.com/",
      role: "UI/UX Designer",
      timeline: "3 Weeks",
      tools: ["Figma", "Photoshop"],
      summary: "",
      problemStatement: "",
      solution: "",
      researchHighlights: [],
      keyFeatures: [],
      colorPalette: [
        { name: "Primary Dark", hex: "#0F1115" },
        { name: "Accent Blue", hex: "#6366F1" },
      ],
      figmaEmbedUrl: "",
      interactivePreviewType: "figma",
    });
    setIsProjectModalOpen(true);
  };

  // Convert uploaded image file to Base64 Data URL string
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        callback(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Handlers for each section
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;
    setStatusMsg(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Project saved successfully to Supabase DB!" });
        setIsProjectModalOpen(false);
        fetchData();
      } else {
        setStatusMsg({ type: "error", msg: data.error || "Failed to save project" });
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error saving project" });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Profile & Section data saved to Supabase!" });
      } else {
        setStatusMsg({ type: "error", msg: data.error || "Failed to save profile" });
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error saving profile" });
    }
  };

  const handleSaveService = async (serviceItem: Partial<ServiceItem>) => {
    setStatusMsg(null);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceItem),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Service item saved to DB!" });
        setEditingService(null);
        fetchData();
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Failed to save service" });
    }
  };

  const handleSaveTestimonial = async (testItem: Partial<TestimonialItem>) => {
    setStatusMsg(null);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testItem),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Testimonial saved to DB!" });
        setEditingTestimonial(null);
        fetchData();
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Failed to save testimonial" });
    }
  };

  const handleSaveFaq = async (faqItem: Partial<FaqItem>) => {
    setStatusMsg(null);
    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqItem),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "FAQ saved to DB!" });
        setEditingFaq(null);
        fetchData();
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Failed to save FAQ" });
    }
  };

  const handleSaveBlog = async (blogItem: Partial<BlogItem>) => {
    setStatusMsg(null);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogItem),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Blog article saved to DB!" });
        setEditingBlog(null);
        fetchData();
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Failed to save blog" });
    }
  };

  const handleSeedDatabase = async () => {
    setStatusMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: data.message });
        fetchData();
      } else {
        setStatusMsg({
          type: "error",
          msg: data.error || "Please run the SQL DDL script in Supabase SQL Editor to create tables.",
        });
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error executing DB sync" });
    } finally {
      setLoading(false);
    }
  };

  // Password Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115] flex items-center justify-center p-4 selection:bg-indigo-600 selection:text-white">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-black uppercase text-center tracking-tight font-display text-[#0F1115]">
            ADMIN PORTAL LOGIN
          </h1>
          <p className="text-xs text-gray-500 text-center mt-1 font-medium">
            Nivetha Velusamy Portfolio Management
          </p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-[#0F1115] focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-2xl bg-[#0F1115] hover:bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Access Dashboard
            </button>

            <Link
              href="/"
              className="text-center text-xs font-semibold text-gray-500 hover:text-indigo-600 mt-2 transition-colors"
            >
              ← Back to Live Portfolio Website
            </Link>
          </form>
        </div>
      </div>
    );
  }


  // Authenticated Admin Dashboard UI (Full Light Theme)
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115] selection:bg-indigo-600 selection:text-white flex flex-col">
      
      {/* Top Light Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#0F1115] text-white flex items-center justify-center font-black text-xs shadow-sm">
            ✦
          </div>
          <div>
            <h1 className="text-base font-black text-[#0F1115] font-display tracking-tight leading-tight">
              FULL SITE ADMIN CONTROL PANEL
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Supabase DB: <span className="text-indigo-600 font-bold">https://iowejpqoezjjfrecqiip.supabase.co</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0F1115] text-xs font-bold transition-all border border-gray-200"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all border border-red-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-grow">
        
        {/* Status Notification Banner */}
        {statusMsg && (
          <div
            className={`mb-6 p-4 rounded-2xl border text-xs font-bold flex items-center justify-between shadow-sm ${
              statusMsg.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{statusMsg.msg}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-gray-500 hover:text-black font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Section Tabs Navigation (Light Theme) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "projects", label: `Projects (${projects.length})`, icon: FolderKanban },
              { id: "hero", label: "Hero Section", icon: Layout },
              { id: "about", label: "About Section", icon: UserCheck },
              { id: "socials", label: "Social Links", icon: Share2 },
              { id: "services", label: `Services (${services.length})`, icon: Briefcase },
              { id: "testimonials", label: `Testimonials (${testimonials.length})`, icon: Star },
              { id: "faqs", label: `FAQs (${faqs.length})`, icon: HelpCircle },
              { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
              { id: "inbox", label: `Inquiries (${messages.length})`, icon: MessageSquare },
              { id: "supabase", label: "Supabase DB Setup", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#0F1115] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === "projects" && (
            <button
              onClick={openNewProjectModal}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>


        {/* TAB 1: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={project.image || "/images/realestate_preview.png"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-black backdrop-blur-md shadow-sm">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-[#0F1115] line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.id}`}
                      target="_blank"
                      className="text-xs text-indigo-600 hover:underline font-extrabold"
                    >
                      Preview Page ↗
                    </Link>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditProjectModal(project)}
                        className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors shadow-xs"
                      >
                        <Edit2 className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 transition-colors shadow-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* TAB 2: HERO SECTION */}
        {activeTab === "hero" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Hero Section Management</h2>
                <p className="text-xs text-gray-500">Edit headline, intro subtitle, tagline, and avatar picture.</p>
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase">
                Save Hero Section
              </button>
            </div>

            <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm shrink-0">
                {profile.avatar && (
                  <Image src={profile.avatar} alt="Avatar" fill className="object-cover" />
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Upload Profile Avatar (Base64 Auto-Convert)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileUpload(e, (base64) => setProfile({ ...profile, avatar: base64 }))}
                  className="text-xs text-gray-600 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={profile.heroTagline || ""}
                  onChange={(e) => setProfile({ ...profile, heroTagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={profile.heroTitle || ""}
                  onChange={(e) => setProfile({ ...profile, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Hero Subtitle Description</label>
                <textarea
                  rows={3}
                  value={profile.heroSubtitle || ""}
                  onChange={(e) => setProfile({ ...profile, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>
            </div>
          </form>
        )}


        {/* TAB 3: ABOUT SECTION */}
        {activeTab === "about" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">About & Bio Management</h2>
                <p className="text-xs text-gray-500">Edit full name, professional title, bio statement, and skills lists.</p>
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase">
                Save About Section
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Title</label>
                <input
                  type="text"
                  value={profile.title || ""}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Bio Statement</label>
                <textarea
                  rows={4}
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>
            </div>
          </form>
        )}


        {/* TAB 4: SOCIAL LINKS & CONTACT */}
        {activeTab === "socials" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Social Links & Contact Details</h2>
                <p className="text-xs text-gray-500">Edit LinkedIn, GitHub, Behance, Instagram, Email, and Phone.</p>
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase">
                Save Social Links
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={profile.socials?.linkedin || ""}
                  onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } as ProfileData["socials"] })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={profile.socials?.github || ""}
                  onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } as ProfileData["socials"] })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>
            </div>
          </form>
        )}


        {/* TAB 5: SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-lg font-black text-[#0F1115]">Services Offered ({services.length})</h2>
              <button
                onClick={() => setEditingService({ id: `0${services.length + 1}`, title: "", items: [], image: "" })}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase"
              >
                + Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((svc) => (
                <div key={svc.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <h4 className="font-extrabold text-sm text-[#0F1115]">{svc.title}</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {svc.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setEditingService(svc)}
                    className="mt-2 text-indigo-600 font-bold hover:underline"
                  >
                    Edit Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* TAB 9: INQUIRIES INBOX */}
        {activeTab === "inbox" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="pb-4 border-b border-gray-200">
              <h2 className="text-lg font-black text-[#0F1115]">Contact Form Inquiries ({messages.length})</h2>
              <p className="text-xs text-gray-500">Submissions received directly from website visitors.</p>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400">No contact messages received yet.</div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-indigo-600 text-sm">{msg.name} ({msg.email})</span>
                      <span className="text-[10px] text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{msg.message}</p>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      Topic: {msg.service}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* TAB 10: SUPABASE DB SETUP */}
        {activeTab === "supabase" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115] flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-600" />
                  <span>Supabase Database Table Setup</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Database: <code className="text-indigo-600 font-bold">https://iowejpqoezjjfrecqiip.supabase.co</code>
                </p>
              </div>

              <button
                onClick={handleSeedDatabase}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Create & Sync Database Tables</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-600" />
                  <span>Supabase Table DDL SQL Script</span>
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sqlSchema);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2000);
                  }}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0F1115] text-xs font-bold flex items-center gap-1.5 transition-colors border border-gray-200"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? "Copied!" : "Copy SQL DDL"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-gray-950 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed shadow-inner">
                {sqlSchema}
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base">Edit Service Item</h3>
            <div>
              <label className="block text-xs font-bold mb-1">Service Title</label>
              <input
                type="text"
                value={editingService.title || ""}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full p-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Items (Comma separated)</label>
              <textarea
                rows={3}
                value={editingService.items ? editingService.items.join(", ") : ""}
                onChange={(e) => setEditingService({ ...editingService, items: e.target.value.split(",").map(i => i.trim()) })}
                className="w-full p-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingService(null)} className="px-4 py-2 rounded-full bg-gray-100 text-xs font-bold">Cancel</button>
              <button onClick={() => handleSaveService(editingService)} className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold">Save Service</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD PROJECT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
              <h2 className="text-lg font-black text-[#0F1115]">
                {editingProject.id?.startsWith("project-") ? "Add New Project" : "Edit Project"}
              </h2>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-gray-400 hover:text-black text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project ID / Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.id || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                />
              </div>

              {/* IMAGE UPLOAD & BASE64 CONVERTER */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <label className="block font-bold text-indigo-700 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Upload Image (Auto-Converts to Base64 for Supabase)</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileUpload(e, (base64) => setEditingProject({ ...editingProject, image: base64 }))}
                  className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md active:scale-95"
                >
                  Save Project to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
