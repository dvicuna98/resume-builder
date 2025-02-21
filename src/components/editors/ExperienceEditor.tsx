import React, { useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Experience } from '../../types';
import SortableList from '../SortableList';

interface ExperienceEditorProps {
  id: string;
  content: Experience[];
}

function ExperienceItem({ experience, index, id }: { experience: Experience; index: number; id: string }) {
  const { updateSection, removeEntry } = useResumeStore();
  const { t } = useLanguageStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof Experience, value: string) => {
    updateSection(id, (prevContent: Experience[]) => {
      const newContent = [...prevContent];
      newContent[index] = { ...newContent[index], [field]: value };
      return newContent;
    });
  };

  const addPoint = () => {
    updateSection(id, (prevContent: Experience[]) => {
      const newContent = [...prevContent];
      newContent[index] = {
        ...newContent[index],
        points: [...(newContent[index].points || []), '']
      };
      return newContent;
    });
  };

  const updatePoint = (pointIndex: number, value: string) => {
    updateSection(id, (prevContent: Experience[]) => {
      const newContent = [...prevContent];
      const points = [...(newContent[index].points || [])];
      points[pointIndex] = value;
      newContent[index] = { ...newContent[index], points };
      return newContent;
    });
  };

  const removePoint = (pointIndex: number) => {
    updateSection(id, (prevContent: Experience[]) => {
      const newContent = [...prevContent];
      const points = [...(newContent[index].points || [])];
      points.splice(pointIndex, 1);
      newContent[index] = { ...newContent[index], points };
      return newContent;
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'title')}</label>
            <input
              type="text"
              value={experience.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'company')}</label>
            <input
              type="text"
              value={experience.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'date')}</label>
            <input
              type="text"
              value={experience.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              placeholder="e.g., Jan 2020 - Present"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'location')}</label>
            <input
              type="text"
              value={experience.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{t('labels', 'points')}</label>
              <button
                type="button"
                onClick={addPoint}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('labels', 'addPoint')}
              </button>
            </div>
            <div className="space-y-2">
              {(experience.points || []).map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updatePoint(pointIndex, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removePoint(pointIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
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

function ExperienceEditor({ id, content }: ExperienceEditorProps) {
  const { addEntry } = useResumeStore();
  const { t } = useLanguageStore();

  const handleReorder = useCallback((newContent: Experience[]) => {
    useResumeStore.getState().updateSection(id, newContent);
  }, [id]);

  return (
    <div className="space-y-6">
      <SortableList
        items={content}
        onChange={handleReorder}
        renderItem={(experience, index) => (
          <ExperienceItem key={experience.id} experience={experience} index={index} id={id} />
        )}
        keyExtractor={(item) => item.id}
      />

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('buttons', 'addExperience')}
      </button>
    </div>
  );
}

export default ExperienceEditor;