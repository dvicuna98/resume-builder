import React from 'react';
import { Plus, X } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { Language } from '../../types';

interface LanguagesEditorProps {
  id: string;
  content: Language[];
}

function LanguagesEditor({ id, content }: LanguagesEditorProps) {
  const { updateSection, addEntry, removeEntry } = useResumeStore();

  const handleChange = (index: number, field: keyof Language, value: string) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSection(id, updatedContent);
  };

  return (
    <div className="space-y-6">
      {content.map((language, index) => (
        <div key={language.id} className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  value={language.name || ''}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="e.g., English"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                <select
                  value={language.level || ''}
                  onChange={(e) => handleChange(index, 'level', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select level</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Details (Optional)</label>
                <input
                  type="text"
                  value={language.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="e.g., TOEFL Score: 110"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeEntry(id, index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </button>
    </div>
  );
}

export default LanguagesEditor;