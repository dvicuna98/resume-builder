import React, { useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/useResumeStore';
import { Project } from '../../types';
import SortableList from '../SortableList';

interface ProjectsEditorProps {
  id: string;
  content: Project[];
}

function ProjectItem({ project, index, id }: { project: Project; index: number; id: string }) {
  const { updateSection, removeEntry } = useResumeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof Project, value: string | string[]) => {
    updateSection(id, (prevContent: Project[]) => {
      const newContent = [...prevContent];
      newContent[index] = { ...newContent[index], [field]: value };
      return newContent;
    });
  };

  const handleTechnologies = (value: string) => {
    handleChange('technologies', value.split(',').map(tech => tech.trim()));
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={project.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              value={project.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              placeholder="e.g., Jan 2024"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={project.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies</label>
            <input
              type="text"
              value={(project.technologies || []).join(', ')}
              onChange={(e) => handleTechnologies(e.target.value)}
              placeholder="e.g., React, TypeScript, Node.js"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Separate technologies with commas</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
            <input
              type="url"
              value={project.link || ''}
              onChange={(e) => handleChange('link', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-gray-700 text-gray-400"
          >
            ⋮⋮
          </button>
          <button
            type="button"
            onClick={() => removeEntry(id, index)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectsEditor({ id, content }: ProjectsEditorProps) {
  const { addEntry } = useResumeStore();

  const handleReorder = useCallback((newContent: Project[]) => {
    useResumeStore.getState().updateSection(id, newContent);
  }, [id]);

  return (
    <div className="space-y-6">
      <SortableList
        items={content}
        onChange={handleReorder}
        renderItem={(project, index) => (
          <ProjectItem key={project.id} project={project} index={index} id={id} />
        )}
        keyExtractor={(item) => item.id}
      />

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </button>
    </div>
  );
}

export default ProjectsEditor;