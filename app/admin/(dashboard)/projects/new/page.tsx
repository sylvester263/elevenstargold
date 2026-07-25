import { ProjectForm } from "../ProjectForm";

export default function AdminProjectNewPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New Project</h1>
      <div className="mt-8 max-w-3xl">
        <ProjectForm />
      </div>
    </div>
  );
}
