export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  link?: string;
}

export const blogsData: BlogItem[] = [
  {
    id: "blog-1",
    title: "5 DESIGN TRENDS THAT WILL DEFINE 2025",
    category: "Insights",
    date: "Apr 30, 2025",
    description: "Explore the top design trends that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
    image: "/images/project_summer_vibes.png",
  },
  {
    id: "blog-2",
    title: "HOW TO STREAMLINE YOUR DESIGN WORKFLOW",
    category: "Tutorials",
    date: "Apr 27, 2025",
    description: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
    image: "/images/agency_workspace.png",
  },
];
