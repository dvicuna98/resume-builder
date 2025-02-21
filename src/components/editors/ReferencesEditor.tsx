import React, { useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/useResumeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Reference } from '../../types';
import SortableList from '../SortableList';

interface ReferencesEditorProps {
  id: string;
  content: Reference[];
}

function ReferenceItem({ reference, index, id }: { reference: Reference; index: number; id: string }) {
  const { updateSection, removeEntry } = useResumeStore();
  const { t } = useLanguageStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: reference.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof Reference, value: string) => {
    updateSection(id, (prevContent: Reference[]) => {
      const newContent = [...prevContent];
      newContent[index] = { ...newContent[index], [field]: value };
      return newContent;
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'refName')}</label>
            <input
              type="text"
              value={reference.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'refTitle')}</label>
            <input
              type="text"
              value={reference.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'company')}</label>
            <input
              type="text"
              value={reference.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'email')}</label>
            <input
              type="email"
              value={reference.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'phone')}</label>
            <input
              type="tel"
              value={reference.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('labels', 'relationship')}</label>
            <input
              type="text"
              value={reference.relationship || ''}
              onChange={(e) => handleChange('relationship', e.target.value)}
              placeholder="e.g., Former Manager, Colleague"
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

function ReferencesEditor({ id, content }: ReferencesEditorProps) {
  const { addEntry } = useResumeStore();
  const { t } = useLanguageStore();

  const handleReorder = useCallback((newContent: Reference[]) => {
    useResumeStore.getState().updateSection(id, newContent);
  }, [id]);

  return (
    <div className="space-y-6">
      <SortableList
        items={content}
        onChange={handleReorder}
        renderItem={(reference, index) => (
          <ReferenceItem key={reference.id} reference={reference} index={index} id={id} />
        )}
        keyExtractor={(item) => item.id}
      />

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('buttons', 'addReference')}
      </button>
    </div>
  );
}

export default ReferencesEditor