import React, { useState, useRef } from 'react';
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
  const [studentData, setStudentData] = useState(INITIAL_STUDENT_DATA);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [cardOrientation, setCardOrientation] = useState('vertical');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const cardRef = useRef(null);

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
              Digital<span className="brand-accent">ID</span>
            </span>
          </Link>

          <div className="navbar-actions">
            <Link to="/" className="btn btn-outline btn-sm">
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
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
