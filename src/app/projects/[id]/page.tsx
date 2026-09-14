import { projects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
