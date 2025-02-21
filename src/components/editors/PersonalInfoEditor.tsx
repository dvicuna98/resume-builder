import React from 'react';
import { Plus, X } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { PersonalInfo, Link } from '../../types';

interface PersonalInfoEditorProps {
  id: string;
  content: PersonalInfo;
}

function PersonalInfoEditor({ id, content }: PersonalInfoEditorProps) {
  const updateSection = useResumeStore((state) => state.updateSection);

  const handleChange = (field: keyof PersonalInfo, value: string | Link[]) => {
    updateSection(id, {
      ...content,
      [field]: value,
    });
  };

  const addLink = () => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      label: '',
      url: '',
    };
    handleChange('links', [...content.links, newLink]);
  };

  const updateLink = (linkId: string, field: keyof Link, value: string) => {
    const updatedLinks = content.links.map((link) =>
      link.id === linkId ? { ...link, [field]: value } : link
    );
    handleChange('links', updatedLinks);
  };

  const removeLink = (linkId: string) => {
    const updatedLinks = content.links.filter((link) => link.id !== linkId);
    handleChange('links', updatedLinks);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={content.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={content.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={content.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={content.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Links</label>
          <button
            type="button"
            onClick={addLink}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Link
          </button>
        </div>
        <div className="space-y-2">
          {content.links.map((link) => (
            <div key={link.id} className="flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                placeholder="Label (e.g., LinkedIn)"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoEditor;