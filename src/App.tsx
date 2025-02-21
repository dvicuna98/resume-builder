import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Download, Globe, Plus, X } from 'lucide-react';
import { useResumeStore } from './store/useResumeStore';
import { useLanguageStore } from './store/useLanguageStore';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import { generatePDF } from './utils/pdfGenerator';
import { ResumeSection } from './types';
import { Language } from './i18n/translations';

function App() {
  const { sections, reorderSections, addSection } = useResumeStore();
  const { t, currentLanguage, setLanguage } = useLanguageStore();
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over.id);

      const newSections = [...sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);

      reorderSections(newSections);
    }
  };

  const handleAddSection = (type: ResumeSection['type']) => {
    const newSection: ResumeSection = {
      id: crypto.randomUUID(),
      type,
      content: {},
    };
    addSection(newSection);
    setShowSectionMenu(false);
  };

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    setShowLanguageMenu(false);
  };

  const sectionTypes: { type: ResumeSection['type']; label: string }[] = [
    { type: 'personal', label: t('sections', 'personal') },
    { type: 'about', label: t('sections', 'about') },
    { type: 'education', label: t('sections', 'education') },
    { type: 'experience', label: t('sections', 'experience') },
    { type: 'skills', label: t('sections', 'skills') },
    { type: 'projects', label: t('sections', 'projects') },
    { type: 'certificates', label: t('sections', 'certificates') },
    { type: 'languages', label: t('sections', 'languages') },
    { type: 'references', label: t('sections', 'references') }, // Added references section
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Globe className="h-4 w-4 mr-2" />
                {currentLanguage.toUpperCase()}
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Español
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => generatePDF()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('buttons', 'downloadPDF')}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <DndContext onDragEnd={handleDragEnd}>
              <div className="relative flex flex-col h-full max-h-full overflow-hidden bg-gray-50">
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-6 pb-20">
                    <ResumeEditor />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50">
                  <div className="relative">
                    <button
                      onClick={() => setShowSectionMenu(true)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center bg-white"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {t('buttons', 'addSection')}
                    </button>

                    {showSectionMenu && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b">
                          <h3 className="font-medium text-gray-900">
                            {t('labels', 'chooseSection')}
                          </h3>
                          <button
                            onClick={() => setShowSectionMenu(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          {sectionTypes.map(({ type, label }) => (
                            <button
                              key={type}
                              onClick={() => handleAddSection(type)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DndContext>
            <div className="bg-white shadow-lg rounded-lg overflow-auto h-full">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;