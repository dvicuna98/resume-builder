import React, { useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/useResumeStore';
import { Certificate } from '../../types';
import SortableList from '../SortableList';

interface CertificatesEditorProps {
  id: string;
  content: Certificate[];
}

function CertificateItem({ certificate, index, id }: { certificate: Certificate; index: number; id: string }) {
  const { updateSection, removeEntry } = useResumeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: certificate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof Certificate, value: string) => {
    updateSection(id, (prevContent: Certificate[]) => {
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
            <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
            <input
              type="text"
              value={certificate.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issuer</label>
            <input
              type="text"
              value={certificate.issuer || ''}
              onChange={(e) => handleChange('issuer', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              value={certificate.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              placeholder="e.g., March 2024"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
            <input
              type="url"
              value={certificate.link || ''}
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

function CertificatesEditor({ id, content }: CertificatesEditorProps) {
  const { addEntry } = useResumeStore();

  const handleReorder = useCallback((newContent: Certificate[]) => {
    useResumeStore.getState().updateSection(id, newContent);
  }, [id]);

  return (
    <div className="space-y-6">
      <SortableList
        items={content}
        onChange={handleReorder}
        renderItem={(certificate, index) => (
          <CertificateItem key={certificate.id} certificate={certificate} index={index} id={id} />
        )}
        keyExtractor={(item) => item.id}
      />

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certificate
      </button>
    </div>
  );
}

export default CertificatesEditor;