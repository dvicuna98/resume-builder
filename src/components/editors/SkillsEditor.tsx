import React, { useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/useResumeStore';
import { Skill } from '../../types';
import SortableList from '../SortableList';

interface SkillsEditorProps {
  id: string;
  content: Skill[];
}

function SkillItem({ skill, index, id }: { skill: Skill; index: number; id: string }) {
  const { updateSection, removeEntry } = useResumeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof Skill, value: string | string[]) => {
    updateSection(id, (prevContent: Skill[]) => {
      const newContent = [...prevContent];
      newContent[index] = { ...newContent[index], [field]: value };
      return newContent;
    });
  };

  const addSkill = () => {
    updateSection(id, (prevContent: Skill[]) => {
      const newContent = [...prevContent];
      newContent[index] = {
        ...newContent[index],
        items: [...newContent[index].items, ''],
      };
      return newContent;
    });
  };

  const updateSkillItem = (skillIndex: number, value: string) => {
    updateSection(id, (prevContent: Skill[]) => {
      const newContent = [...prevContent];
      const items = [...newContent[index].items];
      items[skillIndex] = value;
      newContent[index] = { ...newContent[index], items };
      return newContent;
    });
  };

  const removeSkill = (skillIndex: number) => {
    updateSection(id, (prevContent: Skill[]) => {
      const newContent = [...prevContent];
      const items = newContent[index].items.filter((_, i) => i !== skillIndex);
      newContent[index] = { ...newContent[index], items };
      return newContent;
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={skill.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="e.g., Programming Languages"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </button>
            </div>
            <div className="space-y-2">
              {skill.items.map((item, skillIndex) => (
                <div key={skillIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateSkillItem(skillIndex, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(skillIndex)}
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

function SkillsEditor({ id, content }: SkillsEditorProps) {
  const { addEntry } = useResumeStore();

  const handleReorder = useCallback((newContent: Skill[]) => {
    useResumeStore.getState().updateSection(id, newContent);
  }, [id]);

  return (
    <div className="space-y-6">
      <SortableList
        items={content}
        onChange={handleReorder}
        renderItem={(skill, index) => (
          <SkillItem key={skill.id} skill={skill} index={index} id={id} />
        )}
        keyExtractor={(item) => item.id}
      />

      <button
        type="button"
        onClick={() => addEntry(id)}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </button>
    </div>
  );
}

export default SkillsEditor;