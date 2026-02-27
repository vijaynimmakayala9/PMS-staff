import React, { useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiDollarSign,
  FiAward,
  FiEdit3,
  FiSave,
  FiX,
  FiShield,
  FiStar,
  FiHash,
} from 'react-icons/fi';

const StaffMyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personal: {
      name: 'Raj Sharma',
      employeeId: 'EMP001',
      email: 'raj.sharma@company.com',
      phone: '+91-9876543210',
      address: '123 Main Street, Mumbai, Maharashtra - 400001',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      bloodGroup: 'B+',
    },
    professional: {
      department: 'Sales',
      position: 'Senior Executive',
      manager: 'Priya Patel',
      joinDate: '2022-01-15',
      workSchedule: 'Mon-Fri, 9:00 AM - 6:00 PM',
      employeeType: 'Full Time',
      workLocation: 'Mumbai Office',
    },
    employment: {
      salary: 67000,
      bankAccount: 'XXXX XXXX 1234',
      pfNumber: 'PF/2022/001',
      uanNumber: '123456789012',
      insuranceNumber: 'INS-456789',
    },
    skills: ['Sales Strategy', 'Client Management', 'CRM Software', 'Team Leadership', 'Market Analysis'],
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (section, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const initials = profileData.personal.name.split(' ').map((n) => n[0]).join('');

  // ── Reusable field renderer ──────────────────────────────────────────────────
  const Field = ({ label, value, section, fieldKey, type = 'text', icon, colSpan = '' }) => (
    <div className={colSpan}>
      <label className="block text-[11px] font-semibold text-teal-400 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {isEditing && section ? (
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-300 text-sm pointer-events-none">
              {icon}
            </span>
          )}
          {type === 'textarea' ? (
            <textarea
              value={value}
              onChange={(e) => handleInputChange(section, fieldKey, e.target.value)}
              rows={3}
              className={`w-full border border-teal-200 bg-teal-50/40 rounded-xl text-sm text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition px-3 py-2.5 resize-none ${icon ? 'pl-9' : ''}`}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(section, fieldKey, e.target.value)}
              className={`w-full border border-teal-200 bg-teal-50/40 rounded-xl text-sm text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition px-3 py-2.5 ${icon ? 'pl-9' : ''}`}
            />
          )}
        </div>
      ) : (
        <div className={`flex items-center gap-2 ${icon ? '' : ''}`}>
          {icon && <span className="text-teal-300 text-sm flex-shrink-0">{icon}</span>}
          <p className="text-sm font-semibold text-teal-800">{value}</p>
        </div>
      )}
    </div>
  );

  // ── Static read-only field ───────────────────────────────────────────────────
  const ReadField = ({ label, value, icon }) => (
    <div>
      <label className="block text-[11px] font-semibold text-teal-400 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {icon && <span className="text-teal-300 text-sm flex-shrink-0">{icon}</span>}
        <p className="text-sm font-semibold text-teal-800">{value}</p>
      </div>
    </div>
  );

  // ── Section card wrapper ─────────────────────────────────────────────────────
  const Card = ({ children, className = '' }) => (
    <div className={`bg-white border border-teal-100 rounded-2xl shadow-sm p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );

  // ── Section heading ──────────────────────────────────────────────────────────
  const SectionTitle = ({ icon, title, badge }) => (
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-sm font-bold text-teal-800 flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-500 flex-shrink-0">
          {icon}
        </span>
        {title}
      </h3>
      {badge}
    </div>
  );

  return (
    <div className="min-h-screen bg-teal-50/40 p-3 sm:p-5 lg:p-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-teal-800">My Profile</h1>
            <p className="text-teal-400 text-sm mt-0.5">Manage your personal and professional information</p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-teal-400 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
              >
                <FiEdit3 className="text-base" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-teal-400 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
                >
                  <FiSave className="text-base" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-white border border-teal-200 hover:bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
                >
                  <FiX className="text-base" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Left: Profile Card ─────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-teal-100">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-md">
                  {initials}
                </div>
                <h2 className="text-base font-bold text-teal-800">{profileData.personal.name}</h2>
                <p className="text-teal-500 text-sm">{profileData.professional.position}</p>
                <span className="mt-1.5 inline-block bg-teal-50 text-teal-500 border border-teal-200 rounded-full text-[11px] font-semibold px-3 py-0.5">
                  {profileData.professional.department}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col items-center p-3 bg-teal-50 border border-teal-100 rounded-xl">
                  <FiAward className="text-teal-500 text-lg mb-1" />
                  <p className="text-[10px] text-teal-400 font-medium">Performance</p>
                  <p className="font-bold text-teal-800 text-sm">92%</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-teal-50 border border-teal-100 rounded-xl">
                  <FiCalendar className="text-teal-500 text-lg mb-1" />
                  <p className="text-[10px] text-teal-400 font-medium">Attendance</p>
                  <p className="font-bold text-teal-800 text-sm">95%</p>
                </div>
              </div>

              {/* Employee ID chip */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-center mb-4">
                <p className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest mb-0.5">Employee ID</p>
                <p className="font-bold text-teal-700 text-base">{profileData.personal.employeeId}</p>
              </div>

              {/* Other quick info */}
              <div className="space-y-2.5">
                {[
                  { icon: <FiMail />, val: profileData.personal.email },
                  { icon: <FiPhone />, val: profileData.personal.phone },
                  { icon: <FiMapPin />, val: profileData.professional.workLocation },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-teal-600">
                    <span className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-400 flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ── Right: Detail sections ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Personal Information */}
            <Card>
              <SectionTitle
                icon={<FiUser className="text-sm" />}
                title="Personal Information"
                badge={
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field label="Full Name"     value={profileData.personal.name}        section="personal" fieldKey="name" />
                <Field label="Email"         value={profileData.personal.email}       section="personal" fieldKey="email"       type="email" icon={<FiMail />} />
                <Field label="Phone"         value={profileData.personal.phone}       section="personal" fieldKey="phone"       type="tel"   icon={<FiPhone />} />
                <Field label="Date of Birth" value={profileData.personal.dateOfBirth} section="personal" fieldKey="dateOfBirth" type="date" />
                <ReadField label="Gender"     value={profileData.personal.gender} />
                <ReadField label="Blood Group" value={profileData.personal.bloodGroup} icon={<FiShield />} />
                <div className="sm:col-span-2">
                  <Field label="Address" value={profileData.personal.address} section="personal" fieldKey="address" type="textarea" icon={<FiMapPin />} />
                </div>
              </div>
            </Card>

            {/* Professional Information */}
            <Card>
              <SectionTitle icon={<FiBriefcase className="text-sm" />} title="Professional Information" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <ReadField label="Department"      value={profileData.professional.department} />
                <ReadField label="Position"        value={profileData.professional.position} />
                <ReadField label="Manager"         value={profileData.professional.manager}    icon={<FiUser />} />
                <ReadField label="Join Date"       value={profileData.professional.joinDate}   icon={<FiCalendar />} />
                <ReadField label="Work Schedule"   value={profileData.professional.workSchedule} />
                <ReadField label="Employment Type" value={profileData.professional.employeeType} />
                <ReadField label="Work Location"   value={profileData.professional.workLocation} icon={<FiMapPin />} />
              </div>
            </Card>

            {/* Skills + Employment side by side on lg */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Skills */}
              <Card>
                <SectionTitle icon={<FiStar className="text-sm" />} title="Skills & Expertise" />
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-teal-50 text-teal-600 border border-teal-200 rounded-full text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Employment Details */}
              <Card>
                <SectionTitle icon={<FiDollarSign className="text-sm" />} title="Employment Details" />
                <div className="space-y-3">
                  {[
                    { label: 'Monthly Salary',  value: `₹${profileData.employment.salary.toLocaleString()}`, accent: true },
                    { label: 'Bank Account',    value: profileData.employment.bankAccount },
                    { label: 'PF Number',       value: profileData.employment.pfNumber },
                    { label: 'UAN Number',      value: profileData.employment.uanNumber },
                    { label: 'Insurance No.',   value: profileData.employment.insuranceNumber },
                  ].map((row, i, arr) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? 'border-b border-teal-50' : ''}`}
                    >
                      <span className="text-xs text-teal-500 font-medium">{row.label}</span>
                      <span className={`text-xs font-bold ${row.accent ? 'text-teal-500' : 'text-teal-700'}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMyProfile;