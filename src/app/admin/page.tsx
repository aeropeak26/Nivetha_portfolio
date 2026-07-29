"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projectsData";
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
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "profile" | "supabase">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
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

      if (projData.success) setProjects(projData.data);
      if (profData.success) setProfile(profData.data);
      if (seedData.sqlSchema) setSqlSchema(seedData.sqlSchema);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Convert uploaded image file to Base64 string
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Image size should be less than 8MB");
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
        setStatusMsg({ type: "success", msg: "Profile updated in Supabase Database!" });
      } else {
        setStatusMsg({ type: "error", msg: data.error || "Failed to update profile" });
      }
    } catch {
      setStatusMsg({ type: "error", msg: "Error updating profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm("Sync current website data into Supabase database?")) return;
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
          msg: data.projectsError || data.profileError || "Failed to seed DB",
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
      <div className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-black uppercase text-center tracking-tight font-display">
            ADMIN PORTAL LOGIN
          </h1>
          <p className="text-xs text-gray-400 text-center mt-1">
            Nivetha Velusamy Portfolio Dashboard
          </p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              Access Dashboard
            </button>

            <Link
              href="/"
              className="text-center text-xs font-semibold text-gray-500 hover:text-gray-300 mt-2"
            >
              ← Back to Live Portfolio Website
            </Link>
          </form>
        </div>
      </div>
    );
  }


  // Authenticated Admin Dashboard UI
  return (
    <div className="min-h-screen bg-[#0F1115] text-white selection:bg-indigo-600 selection:text-white flex flex-col">
      
      {/* Top Admin Header */}
      <header className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            ✦
          </div>
          <div>
            <h1 className="text-base font-black text-white font-display tracking-tight">
              ADMIN CONTROL PANEL
            </h1>
            <p className="text-[11px] text-gray-400">
              Supabase Connected: <span className="text-emerald-400 font-semibold">https://iowejpqoezjjfrecqiip.supabase.co</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all border border-gray-700"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-bold transition-all border border-red-800"
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
            className={`mb-6 p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${
              statusMsg.type === "success"
                ? "bg-emerald-950/70 border-emerald-800 text-emerald-300"
                : "bg-red-950/70 border-red-800 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.msg}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "projects"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Profile & Credentials</span>
            </button>

            <button
              onClick={() => setActiveTab("supabase")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "supabase"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase DB Sync & Schema</span>
            </button>
          </div>

          {activeTab === "projects" && (
            <button
              onClick={openNewProjectModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
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
              <div className="text-center py-20 text-gray-400 text-xs">
                Loading projects from Supabase...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-3xl p-8">
                <FolderKanban className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-gray-300">No Projects Found in DB</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Click "Sync Website Data to Supabase DB" or "Add New Project" to populate.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={handleSeedDatabase}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                  >
                    Sync Current Website Data to DB
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-colors shadow-lg"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/9] w-full bg-gray-950 overflow-hidden">
                        <Image
                          src={project.image || "/images/realestate_preview.png"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-[10px] font-bold text-white backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="text-base font-extrabold text-white line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {project.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tools?.slice(0, 3).map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px] font-semibold"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-gray-800/80 bg-gray-950/40 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.id}`}
                        target="_blank"
                        className="text-xs text-indigo-400 hover:underline font-bold"
                      >
                        Preview Page ↗
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditProjectModal(project)}
                          className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 transition-colors"
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


        {/* TAB 2: PROFILE MANAGER */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-extrabold text-white">Edit Profile & Resume Info</h2>
                <p className="text-xs text-gray-400">Updates live bio, credentials, contact information, and avatar image.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                Save Profile to DB
              </button>
            </div>

            {/* Avatar Upload */}
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-950 border border-gray-800">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 shrink-0">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar as string}
                    alt="Avatar Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-200 mb-1">
                  Upload Profile Avatar (Base64 Auto-Convert)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
                <p className="text-[10px] text-gray-500 mt-1">Converts image file to Base64 string directly stored in database.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={(profile.name as string) || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Primary Title</label>
                <input
                  type="text"
                  value={(profile.title as string) || ""}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={(profile.email as string) || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={(profile.phone as string) || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={(profile.location as string) || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-300 mb-1">Bio Summary</label>
                <textarea
                  rows={4}
                  value={(profile.bio as string) || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                Save Profile to Database
              </button>
            </div>
          </form>
        )}


        {/* TAB 3: SUPABASE DB SYNC & SCHEMA */}
        {activeTab === "supabase" && (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <span>Supabase Sync & Database DDL</span>
                </h2>
                <p className="text-xs text-gray-400">
                  Target Database: <code className="text-indigo-300">https://iowejpqoezjjfrecqiip.supabase.co</code>
                </p>
              </div>

              <button
                onClick={handleSeedDatabase}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sync Current Website Data to DB</span>
              </button>
            </div>

            {/* SQL DDL Script Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span>Supabase SQL Table Schema DDL Script</span>
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sqlSchema);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2000);
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL DDL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
                {sqlSchema}
              </pre>

              <p className="text-[11px] text-gray-400">
                💡 <strong>Instructions:</strong> Open your Supabase Dashboard → SQL Editor → Paste the SQL script above → Run to automatically create the <code className="text-indigo-300">projects</code> and <code className="text-indigo-300">profile</code> database tables!
              </p>
            </div>
          </div>
        )}

      </div>


      {/* EDIT / ADD PROJECT MODAL */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
              <h2 className="text-lg font-extrabold text-white">
                {editingProject.id?.startsWith("project-") ? "Add New Project" : "Edit Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Project ID / Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.id || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* IMAGE UPLOAD & BASE64 CONVERTER */}
              <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
                <label className="block font-bold text-indigo-400 flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image (Auto-Converts to Base64 for Supabase)</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />

                {base64ImagePreview && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-800">
                    <Image
                      src={base64ImagePreview}
                      alt="Base64 Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-emerald-400">
                      Base64 Image Ready
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Figma URL</label>
                  <input
                    type="text"
                    value={editingProject.figmaUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Figma Embed URL</label>
                  <input
                    type="text"
                    value={editingProject.figmaEmbedUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaEmbedUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Summary</label>
                <textarea
                  rows={3}
                  value={editingProject.summary || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Problem Statement</label>
                <textarea
                  rows={3}
                  value={editingProject.problemStatement || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Design Solution</label>
                <textarea
                  rows={3}
                  value={editingProject.solution || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 font-bold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-lg active:scale-95"
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
