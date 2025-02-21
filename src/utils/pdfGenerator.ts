import { jsPDF } from 'jspdf';
import { useResumeStore } from '../store/useResumeStore';
import { useLanguageStore } from '../store/useLanguageStore';

export function generatePDF() {
  const sections = useResumeStore.getState().sections;
  const { t } = useLanguageStore.getState();
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 20;
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add text and handle overflow
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    pdf.text(lines, margin, yPos);
    yPos += (lines.length * fontSize * 0.3527) + 2; // Convert pt to mm

    // Check if we need a new page
    if (yPos > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      yPos = margin;
    }
  };

  // Helper function to add bullet points
  const addBulletPoint = (text: string, fontSize: number = 10) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'normal');
    
    const bulletIndent = 5;
    const textIndent = 10;
    const maxWidth = contentWidth - textIndent;
    
    // Add bullet point
    pdf.text('•', margin + bulletIndent, yPos);
    
    // Add indented text
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, margin + textIndent, yPos);
    yPos += (lines.length * fontSize * 0.3527) + 3; // Added extra spacing between points

    // Check if we need a new page
    if (yPos > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      yPos = margin;
    }
  };

  // Helper function to add a section header
  const addSectionHeader = (title: string) => {
    yPos += 5;
    addText(title.toUpperCase(), 12, true);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
    yPos += 3;
  };

  sections.forEach((section) => {
    switch (section.type) {
      case 'personal': {
        const personal = section.content;
        addText(personal.fullName, 16, true);
        const contactInfo = [
          personal.email,
          personal.phone && `Mobile: ${personal.phone}`,
          personal.location,
          ...personal.links.map(link => `${link.label}: ${link.url}`)
        ].filter(Boolean).join(' | ');
        addText(contactInfo, 10);
        break;
      }

      case 'about': {
        addSectionHeader(t('sections', 'about'));
        addText(section.content.description, 10);
        break;
      }

      case 'education': {
        addSectionHeader(t('sections', 'education'));
        const educations = section.content;
        educations.forEach((edu) => {
          addText(edu.school, 10, true);
          addText(`${edu.degree}${edu.gpa ? ` - GPA: ${edu.gpa}` : ''}`);
          addText(`${edu.location} | ${edu.date}`);
          if (edu.points && edu.points.length > 0) {
            yPos += 2;
            edu.points.forEach((point) => {
              addBulletPoint(point);
            });
          }
          yPos += 3;
        });
        break;
      }

      case 'experience': {
        addSectionHeader(t('sections', 'experience'));
        const experiences = section.content;
        experiences.forEach((exp) => {
          addText(`${exp.title} - ${exp.company}`, 10, true);
          addText(`${exp.location} | ${exp.date}`);
          if (exp.points && exp.points.length > 0) {
            yPos += 2;
            exp.points.forEach((point) => {
              addBulletPoint(point);
            });
          }
          yPos += 3;
        });
        break;
      }

      case 'skills': {
        addSectionHeader(t('sections', 'skills'));
        const skills = section.content;
        skills.forEach((skill) => {
          addText(`${skill.category}: ${skill.items.join(', ')}`);
        });
        break;
      }

      case 'projects': {
        addSectionHeader(t('sections', 'projects'));
        const projects = section.content;
        projects.forEach((project) => {
          addText(`${project.name} | ${project.date}`, 10, true);
          addText(project.description);
          if (project.technologies.length > 0) {
            addText(`${t('labels', 'technologies')}: ${project.technologies.join(', ')}`);
          }
          if (project.link) {
            addText(`Link: ${project.link}`);
          }
          yPos += 3;
        });
        break;
      }

      case 'certificates': {
        addSectionHeader(t('sections', 'certificates'));
        const certificates = section.content;
        certificates.forEach((cert) => {
          addText(`${cert.name} - ${cert.issuer}`, 10, true);
          addText(cert.date);
          if (cert.link) {
            addText(`Link: ${cert.link}`);
          }
          yPos += 3;
        });
        break;
      }

      case 'languages': {
        addSectionHeader(t('sections', 'languages'));
        const languages = section.content;
        languages.forEach((lang) => {
          const langText = [
            lang.name,
            lang.level,
            lang.description
          ].filter(Boolean).join(' - ');
          addText(langText);
        });
        break;
      }

      case 'references': {
        addSectionHeader(t('sections', 'references'));
        const references = section.content;
        references.forEach((ref) => {
          addText(ref.name, 10, true);
          addText(`${ref.title} at ${ref.company}`);
          addText(`${ref.email}${ref.phone ? ` • ${ref.phone}` : ''}`);
          addText(ref.relationship, 10);
          yPos += 3;
        });
        break;
      }
    }
  });

  pdf.save('resume.pdf');
}