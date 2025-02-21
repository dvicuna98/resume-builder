import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { PersonalInfo, AboutMe, Education, Experience, Skill, Project, Certificate, Language } from '../types';
import { Link } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

function ResumePreview() {
  const sections = useResumeStore((state) => state.sections);
  const { t } = useLanguageStore();

  const renderPersonalInfo = (content: PersonalInfo) => (
    <div className="mb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{content.fullName}</h1>
      <div className="text-xs text-gray-600 flex flex-wrap gap-x-4 mb-2">
        {content.email && <div>{content.email}</div>}
        {content.phone && <div>Mobile: {content.phone}</div>}
        {content.location && <div>{content.location}</div>}
      </div>
      {content.links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 text-xs">
          {content.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Link className="h-3 w-3 mr-1" />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const renderAbout = (content: AboutMe) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'about')}
      </h2>
      <p className="text-xs text-gray-700 whitespace-pre-wrap">{content.description}</p>
    </div>
  );

  const renderEducation = (content: Education[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'education')}
      </h2>
      {content.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-baseline text-xs">
            <div>
              <div className="font-semibold text-gray-900">{edu.school}</div>
              <div className="text-gray-700">{edu.degree}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-600">{edu.location}</div>
              <div className="text-gray-600">{edu.date}</div>
            </div>
          </div>
          {edu.gpa && (
            <div className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</div>
          )}
          {edu.points && edu.points.length > 0 && (
            <ul className="list-disc list-outside ml-4 mt-2 text-xs text-gray-700 space-y-1">
              {edu.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const renderExperience = (content: Experience[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'experience')}
      </h2>
      {content.map((exp, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-baseline text-xs">
            <div>
              <div className="font-semibold text-gray-900">{exp.title}</div>
              <div className="text-gray-700">{exp.company}</div>
            </div>
            <div className="text-right whitespace-nowrap">
              <div className="text-gray-600">{exp.date}</div>
              <div className="text-gray-600">{exp.location}</div>
            </div>
          </div>
          {exp.points && exp.points.length > 0 && (
            <ul className="list-disc list-outside ml-4 mt-2 text-xs text-gray-700 space-y-1">
              {exp.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const renderSkills = (content: Skill[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'skills')}
      </h2>
      {content.map((skill, index) => (
        <div key={index} className="mb-2">
          <div className="text-xs">
            <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
            <span className="text-gray-700">
              {skill.items.join(', ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProject = (content: Project[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'projects')}
      </h2>
      {content.map((project, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between items-baseline text-xs">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900">{project.name}</span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <Link className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="text-gray-600 ml-2">{project.date}</div>
          </div>
          <div className="text-xs text-gray-700">{project.description}</div>
          {project.technologies && project.technologies.length > 0 && (
            <div className="text-xs text-gray-600">
              {t('labels', 'technologies')}: {project.technologies.join(', ')}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCertificate = (content: Certificate[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'certificates')}
      </h2>
      {content.map((cert, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between items-baseline text-xs">
            <div>
              <span className="font-semibold text-gray-900">{cert.name}</span>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <Link className="h-3 w-3" />
                </a>
              )}
              <div className="text-gray-700">{cert.issuer}</div>
            </div>
            <div className="text-gray-600 ml-2">{cert.date}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguages = (content: Language[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'languages')}
      </h2>
      {content.map((language) => (
        <div key={language.id} className="mb-2">
          <div className="text-xs">
            <span className="font-semibold text-gray-900">{language.name}:</span>{' '}
            <span className="text-gray-700">{language.level}</span>
            {language.description && (
              <span className="text-gray-600"> • {language.description}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReferences = (content: Reference[]) => (
    <div>
      <h2 className="text-sm font-bold text-gray-900 uppercase mb-2 border-b border-gray-300 pb-1">
        {t('sections', 'references')}
      </h2>
      {content.map((ref) => (
        <div key={ref.id} className="mb-3">
          <div className="text-xs">
            <div className="font-semibold text-gray-900">{ref.name}</div>
            <div className="text-gray-700">{ref.title} at {ref.company}</div>
            <div className="text-gray-600">
              {ref.email}
              {ref.phone && ` • ${ref.phone}`}
            </div>
            <div className="text-gray-600 italic">{ref.relationship}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection = (section) => {
    switch (section.type) {
      case 'personal':
        return renderPersonalInfo(section.content as PersonalInfo);
      case 'about':
        return renderAbout(section.content as AboutMe);
      case 'education':
        return renderEducation(section.content as Education[]);
      case 'experience':
        return renderExperience(section.content as Experience[]);
      case 'skills':
        return renderSkills(section.content as Skill[]);
      case 'projects':
        return renderProject(section.content as Project[]);
      case 'certificates':
        return renderCertificate(section.content as Certificate[]);
      case 'languages':
        return renderLanguages(section.content as Language[]);
      case 'references':
        return renderReferences(section.content as Reference[]);
      default:
        return null;
    }
  };

  // Create an array of A4 pages
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;
  const A4_HEIGHT_MM = 297; // A4 height in mm
  const PAGE_MARGIN_MM = 20; // Margin in mm
  const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - (2 * PAGE_MARGIN_MM); // Available content height

  sections.forEach((section) => {
    const sectionElement = (
      <div key={section.id} className="mb-4">
        {renderSection(section)}
      </div>
    );

    // Improved height estimation
    let estimatedHeight = 0;
    switch (section.type) {
      case 'personal':
        estimatedHeight = 25;
        break;
      case 'about':
        estimatedHeight = 20 + Math.ceil((section.content.description?.length || 0) / 200) * 15;
        break;
      case 'education':
      case 'experience': {
        const items = section.content as any[];
        estimatedHeight = 20; // Header
        items.forEach(item => {
          estimatedHeight += 20; // Basic info
          if (item.points?.length) {
            estimatedHeight += item.points.length * 8; // Points
          }
        });
        break;
      }
      case 'skills':
        estimatedHeight = 20 + Math.ceil((section.content as Skill[]).length * 10);
        break;
      case 'projects': {
        const projects = section.content as Project[];
        estimatedHeight = 20 + projects.length * 25;
        break;
      }
      case 'certificates':
        estimatedHeight = 20 + (section.content as Certificate[]).length * 15;
        break;
      case 'languages':
        estimatedHeight = 20 + (section.content as Language[]).length * 10;
        break;
      default:
        estimatedHeight = 30;
    }

    // Add some buffer to prevent tight fits
    estimatedHeight += 10;

    if (currentHeight + estimatedHeight > CONTENT_HEIGHT_MM) {
      pages.push(currentPage);
      currentPage = [sectionElement];
      currentHeight = estimatedHeight;
    } else {
      currentPage.push(sectionElement);
      currentHeight += estimatedHeight;
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return (
    <div className="p-6 w-full bg-gray-100 overflow-x-hidden">
      <div className="max-w-[210mm] mx-auto">
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`relative bg-white mb-8 p-[20mm] ${
              pageIndex < pages.length - 1 ? 'pb-[40mm]' : ''
            }`}
            style={{
              minHeight: '297mm',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              pageBreakAfter: 'always'
            }}
          >
            {page}
            {pageIndex < pages.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 text-center text-xs text-gray-400 py-2">
                Page {pageIndex + 1} of {pages.length}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumePreview;