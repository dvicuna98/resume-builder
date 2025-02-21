import { create } from 'zustand';
import { ResumeSection } from '../types';

interface ResumeStore {
  sections: ResumeSection[];
  addSection: (section: ResumeSection) => void;
  updateSection: (id: string, contentOrUpdater: any | ((prev: any) => any)) => void;
  reorderSections: (sections: ResumeSection[]) => void;
  removeSection: (id: string) => void;
  addEntry: (sectionId: string) => void;
  removeEntry: (sectionId: string, entryIndex: number) => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  sections: [],
  addSection: (section) => {
    const initialContent = (() => {
      switch (section.type) {
        case 'personal':
          return { fullName: '', email: '', phone: '', location: '', links: [] };
        case 'about':
          return { description: '' };
        case 'education':
        case 'experience':
        case 'skills':
        case 'projects':
        case 'certificates':
        case 'languages':
        case 'references':
          return [];
        default:
          return {};
      }
    })();

    set((state) => ({
      sections: [...state.sections, { ...section, content: initialContent }],
    }));
  },
  updateSection: (id, contentOrUpdater) => {
    set((state) => {
      const sectionIndex = state.sections.findIndex((s) => s.id === id);
      if (sectionIndex === -1) return state;

      const newSections = [...state.sections];
      const currentContent = newSections[sectionIndex].content;
      
      const newContent = typeof contentOrUpdater === 'function'
        ? contentOrUpdater(currentContent)
        : contentOrUpdater;

      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        content: newContent
      };

      return { sections: newSections };
    });
  },
  reorderSections: (sections) => set({ sections: [...sections] }),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
  addEntry: (sectionId) =>
    set((state) => {
      const sectionIndex = state.sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const newEntry = (() => {
        switch (section.type) {
          case 'education':
            return { id: crypto.randomUUID(), school: '', degree: '', date: '', location: '', points: [] };
          case 'experience':
            return { id: crypto.randomUUID(), title: '', company: '', date: '', location: '', points: [] };
          case 'skills':
            return { id: crypto.randomUUID(), category: '', items: [] };
          case 'projects':
            return { id: crypto.randomUUID(), name: '', date: '', description: '', technologies: [] };
          case 'certificates':
            return { id: crypto.randomUUID(), name: '', issuer: '', date: '' };
          case 'languages':
            return { id: crypto.randomUUID(), name: '', level: '', description: '' };
          case 'references':
            return { id: crypto.randomUUID(), name: '', title: '', company: '', email: '', phone: '', relationship: '' };
          default:
            return {};
        }
      })();

      const newSections = [...state.sections];
      newSections[sectionIndex] = {
        ...section,
        content: Array.isArray(section.content)
          ? [...section.content, newEntry]
          : section.content,
      };

      return { sections: newSections };
    }),
  removeEntry: (sectionId, entryIndex) =>
    set((state) => {
      const sectionIndex = state.sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      if (!Array.isArray(section.content)) return state;

      const newSections = [...state.sections];
      newSections[sectionIndex] = {
        ...section,
        content: section.content.filter((_, index) => index !== entryIndex),
      };

      return { sections: newSections };
    }),
}));