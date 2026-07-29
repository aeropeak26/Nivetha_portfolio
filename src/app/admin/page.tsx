"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import { ProfileData } from "@/data/profileData";
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
  Sparkle,
  Briefcase,
  Layout,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "projects" | "hero" | "about" | "socials" | "services" | "supabase"
  >("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Partial<ProfileData>>({});
  const [loading, setLoading] = useState(false);
  const [tableExists, setTableExists] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Edit / Add Project Modal state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64ImagePreview, setBase64ImagePreview] = useState<string>("");

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
      const [projRes, profRes, seedRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/profile"),
        fetch("/api/seed"),
      ]);

      const projData = await projRes.json();
      const profData = await profRes.json();
      const seedData = await seedRes.json();

      if (projData.success) {
        setProjects(projData.data);
        if (projData.tableExists === false) setTableExists(false);
      }
      if (profData.success) {
        setProfile(profData.data);
        if (profData.tableExists === false) setTableExists(false);
      }
      if (seedData.sqlSchema) setSqlSchema(seedData.sqlSchema);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Convert uploaded image file to Base64 Data URL string
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Image file size should be less than 8MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64ImagePreview(result);
        if (editingProject) {
          setEditingProject({ ...editingProject, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile Avatar Base64 Upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfile({ ...profile, avatar: result });
      };
      reader.readAsDataURL(file);
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
    setBase64ImagePreview("");
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setBase64ImagePreview(project.image || "");
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    setStatusMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Project saved successfully to Database!" });
        setIsModalOpen(false);
        fetchData();
      } else {
        setStatusMsg({ type: "error", msg: data.error || "Failed to save project" });
        if (data.tableExists === false) setTableExists(false);
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error saving project" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setStatusMsg(null);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Project deleted from Database" });
        fetchData();
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Failed to delete project" });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", msg: "Profile & Website sections updated successfully!" });
      } else {
        setStatusMsg({ type: "error", msg: data.error || "Failed to update profile" });
        if (data.tableExists === false) setTableExists(false);
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error updating profile" });
    } finally {
      setLoading(false);
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
        setTableExists(true);
        fetchData();
      } else {
        setStatusMsg({
          type: "error",
          msg: data.error || "Database tables do not exist in Supabase yet. Please run the SQL DDL script below.",
        });
        if (data.tableMissing) setTableExists(false);
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error executing DB sync" });
    } finally {
      setLoading(false);
    }
  };

  // Password Login Screen (Light Theme)
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
              ADMIN CONTROL PANEL
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
        
        {/* Table None / Missing Check & Status Alert */}
        {!tableExists && (
          <div className="mb-6 p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-amber-950 block text-sm">
                  Supabase Tables Need Setup ('projects' & 'profile')
                </strong>
                <span>
                  The Supabase database tables have not been created yet. Click below to copy the SQL script and run it in your Supabase SQL Editor.
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("supabase")}
              className="px-5 py-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs shrink-0 shadow-sm"
            >
              Setup Database Tables Now →
            </button>
          </div>
        )}

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

        {/* Navigation Tabs (Full Light Theme) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "projects"
                  ? "bg-[#0F1115] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <FolderKanban className="w-4 h-4 text-indigo-400" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "hero"
                  ? "bg-[#0F1115] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Layout className="w-4 h-4 text-indigo-400" />
              <span>Hero Section</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "about"
                  ? "bg-[#0F1115] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>About & Credentials</span>
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "socials"
                  ? "bg-[#0F1115] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Social Links & Contact</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "services"
                  ? "bg-[#0F1115] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Services</span>
            </button>

            <button
              onClick={() => setActiveTab("supabase")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "supabase"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase DB & Table Fix</span>
            </button>
          </div>

          {activeTab === "projects" && (
            <button
              onClick={openNewProjectModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>


        {/* TAB 1: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-20 text-gray-500 text-xs font-medium">
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <FolderKanban className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Projects Found</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Click "Sync Website Data to Supabase DB" or "Add New Project".
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={handleSeedDatabase}
                    className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-extrabold shadow-sm"
                  >
                    Sync Website Projects to DB
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {/* Image Thumbnail */}
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

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="text-base font-extrabold text-[#0F1115] line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                          {project.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tools?.slice(0, 3).map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-semibold"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
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
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 transition-colors shadow-xs"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* TAB 2: HERO SECTION MANAGER */}
        {activeTab === "hero" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Edit Hero Section</h2>
                <p className="text-xs text-gray-500">Update main display title, hero profile picture, taglines, and intro text.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Hero Section
              </button>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white border-2 border-white shadow-md shrink-0">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar as string}
                    alt="Hero Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                )}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <label className="block text-xs font-bold text-gray-800">
                  Upload Hero Profile Picture (Base64 Auto-Convert)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
                <p className="text-[10px] text-gray-400">Converts uploaded image to Base64 data string saved in Supabase database.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Hero Top Tagline</label>
                <input
                  type="text"
                  value={profile.heroTagline || "NIVETHA VELUSAMY — PORTFOLIO"}
                  onChange={(e) => setProfile({ ...profile, heroTagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Hero Display Title</label>
                <input
                  type="text"
                  value={profile.heroTitle || "UI / UX DESIGNER"}
                  onChange={(e) => setProfile({ ...profile, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1.5">Hero Subtitle Description</label>
                <textarea
                  rows={3}
                  value={profile.heroSubtitle || ""}
                  onChange={(e) => setProfile({ ...profile, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Hero Section
              </button>
            </div>
          </form>
        )}


        {/* TAB 3: ABOUT & CREDENTIALS MANAGER */}
        {activeTab === "about" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Edit About & Credentials</h2>
                <p className="text-xs text-gray-500">Update personal bio, education details, certification, and skills lists.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save About Section
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={profile.title || ""}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1.5">Full Bio Statement</label>
                <textarea
                  rows={4}
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1.5">
                  Core Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={profile.skills ? profile.skills.join(", ") : ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1.5">
                  Technical Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={profile.technicalSkills ? profile.technicalSkills.join(", ") : ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      technicalSkills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save About Section
              </button>
            </div>
          </form>
        )}


        {/* TAB 4: SOCIAL LINKS & CONTACT MANAGER */}
        {activeTab === "socials" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Edit Social Links & Contact Details</h2>
                <p className="text-xs text-gray-500">Update LinkedIn, GitHub, Behance, Email, Phone, and Location.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Social Links
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={profile.socials?.linkedin || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socials: { ...profile.socials, linkedin: e.target.value } as ProfileData["socials"],
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">GitHub Profile URL</label>
                <input
                  type="text"
                  value={profile.socials?.github || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socials: { ...profile.socials, github: e.target.value } as ProfileData["socials"],
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Behance Portfolio URL</label>
                <input
                  type="text"
                  value={profile.socials?.behance || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socials: { ...profile.socials, behance: e.target.value } as ProfileData["socials"],
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Instagram Profile URL</label>
                <input
                  type="text"
                  value={profile.socials?.instagram || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socials: { ...profile.socials, instagram: e.target.value } as ProfileData["socials"],
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115] focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Social Links
              </button>
            </div>
          </form>
        )}


        {/* TAB 5: SERVICES MANAGER */}
        {activeTab === "services" && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115]">Edit Services Offered</h2>
                <p className="text-xs text-gray-500">Update service titles, descriptions, and feature tags.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Services
              </button>
            </div>

            <div className="space-y-4">
              {profile.services?.map((svc, idx) => (
                <div key={svc.id || idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Service Title</label>
                      <input
                        type="text"
                        value={svc.title}
                        onChange={(e) => {
                          const updated = [...(profile.services || [])];
                          updated[idx].title = e.target.value;
                          setProfile({ ...profile, services: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-[#0F1115]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Tags (Comma separated)</label>
                      <input
                        type="text"
                        value={svc.tags ? svc.tags.join(", ") : ""}
                        onChange={(e) => {
                          const updated = [...(profile.services || [])];
                          updated[idx].tags = e.target.value.split(",").map((t) => t.trim());
                          setProfile({ ...profile, services: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-[#0F1115]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => {
                          const updated = [...(profile.services || [])];
                          updated[idx].description = e.target.value;
                          setProfile({ ...profile, services: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-[#0F1115]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Save Services
              </button>
            </div>
          </form>
        )}


        {/* TAB 6: SUPABASE DB SETUP & TABLE FIX */}
        {activeTab === "supabase" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-black text-[#0F1115] flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-600" />
                  <span>Supabase Database Setup & Table Fix</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Supabase URL: <code className="text-indigo-600 font-bold">https://iowejpqoezjjfrecqiip.supabase.co</code>
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

            {/* SQL DDL Script Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-600" />
                  <span>Supabase SQL Table DDL Script (Run in Supabase Dashboard)</span>
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sqlSchema);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2000);
                  }}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0F1115] text-xs font-bold flex items-center gap-1.5 transition-colors border border-gray-200"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL DDL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-gray-950 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed shadow-inner">
                {sqlSchema}
              </pre>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 leading-relaxed font-medium">
                💡 <strong>Step-by-Step Table Setup:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-xs">
                  <li>Click <strong>Copy SQL DDL</strong> above.</li>
                  <li>Open your <a href="https://supabase.com/dashboard/project/iowejpqoezjjfrecqiip/sql" target="_blank" rel="noreferrer" className="underline font-bold text-indigo-700">Supabase SQL Editor</a>.</li>
                  <li>Paste the SQL script into the editor and click <strong>RUN</strong>.</li>
                  <li>Click <strong>Auto-Create & Sync Database Tables</strong> above to push all portfolio content directly into Supabase!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

      </div>


      {/* EDIT / ADD PROJECT MODAL (Light Theme) */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
              <h2 className="text-lg font-black text-[#0F1115]">
                {editingProject.id?.startsWith("project-") ? "Add New Project" : "Edit Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
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

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
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
                  onChange={handleImageFileUpload}
                  className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />

                {base64ImagePreview && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src={base64ImagePreview}
                      alt="Base64 Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/80 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                      ✓ Base64 Image Encoded
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Figma URL</label>
                  <input
                    type="text"
                    value={editingProject.figmaUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Figma Embed URL</label>
                  <input
                    type="text"
                    value={editingProject.figmaEmbedUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaEmbedUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Summary</label>
                <textarea
                  rows={3}
                  value={editingProject.summary || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Problem Statement</label>
                <textarea
                  rows={3}
                  value={editingProject.problemStatement || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Design Solution</label>
                <textarea
                  rows={3}
                  value={editingProject.solution || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F1115]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
