import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { AboutMe } from '../../types';

interface AboutEditorProps {
  id: string;
  content: AboutMe;
}

function AboutEditor({ id, content }: AboutEditorProps) {
  const updateSection = useResumeStore((state) => state.updateSection);

  const handleChange = (value: string) => {
    updateSection(id, {
      description: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">About Me</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => handleChange(e.target.value)}
          rows={4}
          placeholder="Write a brief description about yourself..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
}

export default AboutEditor;