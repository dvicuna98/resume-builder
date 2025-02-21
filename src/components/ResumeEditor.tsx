import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { PersonalInfo, AboutMe, Education, Experience, Skill, Project, Certificate, Language, Reference } from '../types';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import AboutEditor from './editors/AboutEditor';
import EducationEditor from './editors/EducationEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import CertificatesEditor from './editors/CertificatesEditor';
import LanguagesEditor from './editors/LanguagesEditor';
import ReferencesEditor from './editors/ReferencesEditor';

function ResumeEditor() {
  const sections = useResumeStore((state) => state.sections);

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <SortableSection key={section.id} section={section} />
      ))}
    </div>
  );
}

function SortableSection({ section }) {
  const { removeSection } = useResumeStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderEditor = () => {
    switch (section.type) {
      case 'personal':
        return <PersonalInfoEditor id={section.id} content={section.content as PersonalInfo} />;
      case 'about':
        return <AboutEditor id={section.id} content={section.content as AboutMe} />;
      case 'education':
        return <EducationEditor id={section.id} content={section.content as Education[]} />;
      case 'experience':
        return <ExperienceEditor id={section.id} content={section.content as Experience[]} />;
      case 'skills':
        return <SkillsEditor id={section.id} content={section.content as Skill[]} />;
      case 'projects':
        return <ProjectsEditor id={section.id} content={section.content as Project[]} />;
      case 'certificates':
        return <CertificatesEditor id={section.id} content={section.content as Certificate[]} />;
      case 'languages':
        return <LanguagesEditor id={section.id} content={section.content as Language[]} />;
      case 'references':
        return <ReferencesEditor id={section.id} content={section.content as Reference[]} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-4 mb-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab hover:text-gray-700 text-gray-400"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 capitalize">
            {section.type.replace(/-/g, ' ')}
          </h3>
        </div>
        <button
          onClick={() => removeSection(section.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4">
        {renderEditor()}
      </div>
    </div>
  );
}

export default ResumeEditor;