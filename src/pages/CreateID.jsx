import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import IDCard from '../components/IDCard';
import ThemeSelector from '../components/ThemeSelector';
import ActionToolbar from '../components/ActionToolbar';
import Footer from '../components/Footer';

import { CARD_THEMES } from '../data/themes';
import { SAMPLE_STUDENTS } from '../data/sampleData';
import { validateAllFields } from '../utils/validation';
import { downloadCardAsImage, printCard } from '../utils/downloadCard';
import { CheckCircle2, Sparkles, CreditCard, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useAgent } from '../context/AgentContext';
import '../App.css';

const INITIAL_STUDENT_DATA = {
  fullName: 'Harshavardhan',
  rollNumber: '21B91A0582',
  collegeName: 'National Institute of Technology',
  branch: 'Computer Science & Engineering',
  year: '4th Year (Senior)',
  section: 'A',
  email: 'harshavardhan@college.edu',
  phone: '+91 98765 43210',
  dob: '2003-08-14',
  bloodGroup: 'O+',
  address: 'Hyderabad, Telangana',
  photoUrl: ''
};

const BLANK_STUDENT_DATA = {
  fullName: '',
  rollNumber: '',
  collegeName: '',
  branch: '',
  year: '',
  section: '',
  email: '',
  phone: '',
  dob: '',
  bloodGroup: '',
  address: '',
  photoUrl: ''
};

export default function CreateID() {
  const { updateSafeContext, registerHandlers, unregisterHandlers } = useAgent();
  const [studentData, setStudentData] = useState(INITIAL_STUDENT_DATA);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [cardOrientation, setCardOrientation] = useState('vertical');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const cardRef = useRef(null);

  // Sync safe UI telemetry with Agent (strictly non-sensitive metadata)
  useEffect(() => {
    const requiredKeys = ['fullName', 'rollNumber', 'collegeName', 'branch', 'year', 'section'];
    const completedCount = requiredKeys.filter((k) => !!studentData[k]?.trim()).length;

    updateSafeContext({
      page: '/create',
      requiredFieldsCompleted: completedCount,
      totalRequiredFields: requiredKeys.length,
      photoUploaded: !!studentData.photoUrl,
      selectedTheme: selectedTheme.name,
      cardOrientation,
      hasValidationErrors: Object.keys(formErrors).length > 0,
      isGenerated
    });
  }, [studentData, selectedTheme, cardOrientation, formErrors, isGenerated, updateSafeContext]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhotoUpload = (dataUrl) => {
    setStudentData((prev) => ({
      ...prev,
      photoUrl: dataUrl
    }));
    showToast('Student photograph updated');
  };

  const handlePhotoRemove = () => {
    setStudentData((prev) => ({
      ...prev,
      photoUrl: ''
    }));
    showToast('Photograph removed');
  };

  const handleLoadSample = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_STUDENTS.length);
    const sample = SAMPLE_STUDENTS[randomIndex];
    setStudentData({ ...sample });
    setFormErrors({});
    setIsGenerated(true);
    showToast(`Loaded sample profile for ${sample.fullName}`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form fields?')) {
      setStudentData(BLANK_STUDENT_DATA);
      setFormErrors({});
      setIsGenerated(false);
      showToast('Form reset to blank');
    }
  };

  const handleGenerate = () => {
    const errors = validateAllFields(studentData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix the highlighted required fields');
      return;
    }

    setFormErrors({});
    setIsGenerated(true);
    showToast('ID Card generated successfully!');

    const previewEl = document.getElementById('card-preview-container');
    if (previewEl && window.innerWidth < 1024) {
      previewEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = async () => {
    if (isFlipped) {
      setIsFlipped(false);
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsDownloading(true);
    try {
      const fileName = `${(studentData.fullName || 'student').toLowerCase().replace(/\s+/g, '-')}-id-card.png`;
      await downloadCardAsImage(cardRef.current, fileName);
      showToast('ID Card PNG downloaded successfully!');
    } catch (error) {
      console.error(error);
      showToast('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    printCard();
  };

  // Register real application action handlers with the AI Agent
  useEffect(() => {
    registerHandlers({
      fillStudentForm: (fields) => {
        setStudentData((prev) => ({
          ...prev,
          ...fields
        }));
        setFormErrors((prev) => {
          const next = { ...prev };
          Object.keys(fields).forEach((k) => delete next[k]);
          return next;
        });
        setIsGenerated(true);
        showToast('Form updated by AuntyID');
        return { success: true, updatedFields: Object.keys(fields) };
      },
      updateStudentField: (field, value) => {
        setStudentData((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
        return { success: true };
      },
      validateStudentForm: () => {
        const errors = validateAllFields(studentData);
        setFormErrors(errors);
        return { success: Object.keys(errors).length === 0, errors };
      },
      generateId: () => {
        handleGenerate();
        return { success: true };
      },
      downloadId: async () => {
        await handleDownload();
        return { success: true };
      },
      printId: () => {
        handlePrint();
        return { success: true };
      },
      setIdTheme: (themeName) => {
        if (!themeName) return { success: false, error: 'No theme specified' };
        const q = themeName.toLowerCase().replace(/[-_]/g, ' ');
        let match = CARD_THEMES.find(
          (t) => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
        );
        if (!match) {
          if (q.includes('blue') || q.includes('modern') || q.includes('oxford')) {
            match = CARD_THEMES.find((t) => t.id === 'oxford-blue');
          } else if (q.includes('indigo') || q.includes('violet') || q.includes('royal') || q.includes('purple')) {
            match = CARD_THEMES.find((t) => t.id === 'royal-indigo');
          } else if (q.includes('crimson') || q.includes('red') || q.includes('harvard')) {
            match = CARD_THEMES.find((t) => t.id === 'harvard-crimson');
          } else if (q.includes('emerald') || q.includes('green') || q.includes('mit')) {
            match = CARD_THEMES.find((t) => t.id === 'mit-emerald');
          } else if (q.includes('dark') || q.includes('slate') || q.includes('midnight') || q.includes('black') || q.includes('minimal')) {
            match = CARD_THEMES.find((t) => t.id === 'midnight-slate');
          } else if (q.includes('amber') || q.includes('gold') || q.includes('imperial') || q.includes('sunset') || q.includes('orange')) {
            match = CARD_THEMES.find((t) => t.id === 'amber-gold');
          }
        }
        if (match) {
          setSelectedTheme(match);
          showToast(`Theme changed to ${match.name}`);
          return { success: true, theme: match.name };
        }
        return { success: false, error: 'Theme not found' };
      },
      flipIdCard: () => {
        setIsFlipped((prev) => !prev);
        return { success: true };
      },
      resetForm: () => {
        setStudentData(BLANK_STUDENT_DATA);
        setFormErrors({});
        setIsGenerated(false);
        showToast('Form reset by AuntyID');
        return { success: true };
      }
    });

    return () => {
      unregisterHandlers();
    };
  }, [studentData, isFlipped, registerHandlers, unregisterHandlers]);

  return (
    <div className="digital-id-app">
      {/* Top Creation Header Bar */}
      <header className="navbar-container">
        <div className="navbar-inner">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-wrap">
              <CreditCard className="logo-icon" size={22} />
            </div>
            <span className="brand-text">
              Aunty<span className="brand-accent">ID</span>
            </span>
          </Link>

          <div className="navbar-actions">
            {/* Dark / Light Mode Toggle Button beside Back to Overview */}
            <ThemeToggle />

            <Link to="/" className="btn btn-outline btn-sm back-to-overview-btn">
              <ArrowLeft size={16} />
              <span className="back-btn-text">Back to Overview</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Main ID Generator Section */}
        <section id="generator" className="generator-section">
          <div className="section-container">
            <div className="section-header text-center">
              <div className="section-subtitle-pill">
                <Sparkles size={14} />
                <span>Identity Studio</span>
              </div>
              <h1 className="section-title">Create Your Digital College ID</h1>
              <p className="section-desc">
                Fill in student academic credentials on the left and see the credential render instantaneously on the right.
              </p>
            </div>

            <div className="generator-layout">
              {/* Left Column: Student Information Form */}
              <div className="generator-form-col">
                <StudentForm
                  formData={studentData}
                  errors={formErrors}
                  onChange={handleInputChange}
                  onPhotoUpload={handlePhotoUpload}
                  onPhotoRemove={handlePhotoRemove}
                  onLoadSample={handleLoadSample}
                  onReset={handleReset}
                />
              </div>

              {/* Right Column: Live ID Preview & Controls */}
              <div id="card-preview-container" className="generator-preview-panel">
                <div className="preview-panel-header">
                  <h3 className="preview-title">
                    <CreditCard size={20} />
                    <span>Live ID Preview</span>
                  </h3>
                  <div className="live-indicator">
                    <span className="live-dot"></span>
                    <span>REALTIME SYNC</span>
                  </div>
                </div>

                {/* Live ID Card Component */}
                <IDCard
                  ref={cardRef}
                  student={studentData}
                  theme={selectedTheme}
                  orientation={cardOrientation}
                  isFlipped={isFlipped}
                />

                {/* Theme & Orientation Customizer */}
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onThemeChange={setSelectedTheme}
                  orientation={cardOrientation}
                  onOrientationChange={setCardOrientation}
                  isFlipped={isFlipped}
                  onToggleFlip={() => setIsFlipped(!isFlipped)}
                />

                {/* Actions Toolbar */}
                <ActionToolbar
                  onGenerate={handleGenerate}
                  onDownload={handleDownload}
                  onPrint={handlePrint}
                  onFlip={() => setIsFlipped(!isFlipped)}
                  isFlipped={isFlipped}
                  isGenerated={isGenerated}
                  isDownloading={isDownloading}
                  hasValidationErrors={Object.keys(formErrors).length > 0}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="toast-container" role="status">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
