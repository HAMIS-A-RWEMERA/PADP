import React, { useState } from 'react';
import { X, Trophy, Users, Swords, BookOpen, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { AfricanRegion, DebateFormatCode, DeliveryMode, Eligibility, OrgType } from '../../types';

export const SubmitModal: React.FC = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, submitModalType, setSubmitModalType, createSubmission, currentUser } = usePlatform();

  // Form states for Submissions
  const [submitterName, setSubmitterName] = useState(currentUser.name || '');
  const [submitterEmail, setSubmitterEmail] = useState(currentUser.email || '');
  const [submitterRole, setSubmitterRole] = useState(currentUser.role || 'debater');

  // Tournament Payload
  const [tTitle, setTTitle] = useState('');
  const [tOrganizer, setTOrganizer] = useState('');
  const [tCountry, setTCountry] = useState('Rwanda');
  const [tCity, setTCity] = useState('Kigali');
  const [tRegion, setTRegion] = useState<AfricanRegion>('East Africa');
  const [tMode, setTMode] = useState<DeliveryMode>('In-Person');
  const [tVenue, setTVenue] = useState('');
  const [tStartDate, setTStartDate] = useState('2026-10-15');
  const [tEndDate, setTEndDate] = useState('2026-10-17');
  const [tRegDeadline, setTRegDeadline] = useState('2026-10-01');
  const [tFormat, setTFormat] = useState<DebateFormatCode>('BP');
  const [tEligibility, setTEligibility] = useState<Eligibility>('University');
  const [tRegLink, setTRegLink] = useState('https://');
  const [tRegFee, setTRegFee] = useState('Free / 0 USD');
  const [tTeamCap, setTTeamCap] = useState(40);
  const [tDescription, setTDescription] = useState('');

  // Society Payload
  const [sName, setSName] = useState('');
  const [sOrgType, setSOrgType] = useState<OrgType>('University Society');
  const [sCountry, setSCountry] = useState('Kenya');
  const [sCity, setSCity] = useState('Nairobi');
  const [sInstitution, setSInstitution] = useState('');
  const [sFoundedYear, setSFoundedYear] = useState(2022);
  const [sFormats, setSFormats] = useState<DebateFormatCode[]>(['BP']);
  const [sWebsite, setSWebsite] = useState('');
  const [sContactEmail, setSContactEmail] = useState('');
  const [sDescription, setSDescription] = useState('');

  // Practice Payload
  const [pTitle, setPTitle] = useState('');
  const [pHostOrg, setPHostOrg] = useState('');
  const [pDate, setPDate] = useState('2026-09-15');
  const [pTimeUTC, setPTimeUTC] = useState('15:00 UTC (17:00 CAT)');
  const [pFormat, setPFormat] = useState<DebateFormatCode>('BP');
  const [pPlatform, setPPlatform] = useState<'Google Meet' | 'Discord' | 'Zoom' | 'In-Person'>('Google Meet');
  const [pMeetingLink, setPMeetingLink] = useState('https://meet.google.com/');
  const [pMotionPrompt, setPMotionPrompt] = useState('');

  if (!isSubmitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let payload: any = {};
    if (submitModalType === 'tournament') {
      if (!tTitle || !tOrganizer) return;
      payload = {
        title: tTitle,
        organizer: tOrganizer,
        country: tCountry,
        city: tCity,
        region: tRegion,
        deliveryMode: tMode,
        venue: tVenue,
        startDate: tStartDate,
        endDate: tEndDate,
        registrationDeadline: tRegDeadline,
        format: tFormat,
        eligibility: tEligibility,
        registrationLink: tRegLink,
        registrationFee: tRegFee,
        teamCap: tTeamCap,
        description: tDescription,
      };
    } else if (submitModalType === 'organization') {
      if (!sName) return;
      payload = {
        name: sName,
        orgType: sOrgType,
        country: sCountry,
        city: sCity,
        institution: sInstitution,
        foundedYear: sFoundedYear,
        formats: sFormats,
        websiteUrl: sWebsite,
        contactEmail: sContactEmail || submitterEmail,
        description: sDescription,
      };
    } else if (submitModalType === 'practice') {
      if (!pTitle) return;
      payload = {
        title: pTitle,
        hostOrg: pHostOrg || submitterName,
        sessionDate: pDate,
        timeUTC: pTimeUTC,
        format: pFormat,
        platform: pPlatform,
        meetingLink: pMeetingLink,
        motionPrompt: pMotionPrompt,
        slotsAvailable: 8,
      };
    }

    createSubmission(submitModalType, payload, submitterName, submitterEmail, submitterRole);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
              Contribute to the Pan-African Ecosystem
            </h3>
            <p className="text-xs text-stone-500">
              Submissions enter the moderation queue and are reviewed by PADP administrators.
            </p>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="grid grid-cols-3 p-2 gap-2 bg-stone-100/70 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSubmitModalType('tournament')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              submitModalType === 'tournament'
                ? 'bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Tournament</span>
          </button>
          <button
            type="button"
            onClick={() => setSubmitModalType('organization')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              submitModalType === 'organization'
                ? 'bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Debate Society</span>
          </button>
          <button
            type="button"
            onClick={() => setSubmitModalType('practice')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              submitModalType === 'practice'
                ? 'bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Practice Session</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Submitter Info */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-stone-500 font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
            <div>
              <label className="block text-stone-500 font-medium mb-1">Your Email</label>
              <input
                type="email"
                required
                value={submitterEmail}
                onChange={(e) => setSubmitterEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
            <div>
              <label className="block text-stone-500 font-medium mb-1">Your Role / Affiliation</label>
              <input
                type="text"
                value={submitterRole}
                onChange={(e) => setSubmitterRole(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                placeholder="e.g. Society President, Coach"
              />
            </div>
          </div>

          {/* Tournament Fields */}
          {submitModalType === 'tournament' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  required
                  value={tTitle}
                  onChange={(e) => setTTitle(e.target.value)}
                  placeholder="e.g. East Africa Open 2026 / Lagos BP Championship"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Organizer / Society *</label>
                  <input
                    type="text"
                    required
                    value={tOrganizer}
                    onChange={(e) => setTOrganizer(e.target.value)}
                    placeholder="e.g. Makerere Debating Union"
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Host Country *</label>
                  <select
                    value={tCountry}
                    onChange={(e) => setTCountry(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Pan-African">Pan-African (Online/Multiple)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={tCity}
                    onChange={(e) => setTCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Debate Format</label>
                  <select
                    value={tFormat}
                    onChange={(e) => setTFormat(e.target.value as DebateFormatCode)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="BP">British Parliamentary (BP)</option>
                    <option value="WSDC">World Schools (WSDC)</option>
                    <option value="AP">Asian Parliamentary (AP)</option>
                    <option value="PF">Public Forum (PF)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Delivery Mode</label>
                  <select
                    value={tMode}
                    onChange={(e) => setTMode(e.target.value as DeliveryMode)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Eligibility</label>
                  <select
                    value={tEligibility}
                    onChange={(e) => setTEligibility(e.target.value as Eligibility)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="University">University</option>
                    <option value="High School">High School</option>
                    <option value="Open">Open (All Ages)</option>
                    <option value="Novice">Novice Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={tStartDate}
                    onChange={(e) => setTStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={tEndDate}
                    onChange={(e) => setTEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Registration Deadline</label>
                  <input
                    type="date"
                    value={tRegDeadline}
                    onChange={(e) => setTRegDeadline(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Registration Link / Form URL</label>
                  <input
                    type="url"
                    value={tRegLink}
                    onChange={(e) => setTRegLink(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    placeholder="https://docs.google.com/forms/..."
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Registration Fee / Currency</label>
                  <input
                    type="text"
                    value={tRegFee}
                    onChange={(e) => setTRegFee(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    placeholder="e.g. Free or $30 USD / UGX 100,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Tournament Overview & Details
                </label>
                <textarea
                  rows={3}
                  value={tDescription}
                  onChange={(e) => setTDescription(e.target.value)}
                  placeholder="Provide schedule details, adjudication core highlights, and accommodation notes..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                ></textarea>
              </div>
            </div>
          )}

          {/* Society Fields */}
          {submitModalType === 'organization' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Society / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={sName}
                  onChange={(e) => setSName(e.target.value)}
                  placeholder="e.g. University of Cape Town Debating Union"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Organization Type</label>
                  <select
                    value={sOrgType}
                    onChange={(e) => setSOrgType(e.target.value as OrgType)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="University Society">University Society</option>
                    <option value="School Club">School Club</option>
                    <option value="National Association">National Association</option>
                    <option value="Community Org">Community Org</option>
                    <option value="Debate Academy">Debate Academy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Country *</label>
                  <select
                    value={sCountry}
                    onChange={(e) => setSCountry(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={sCity}
                    onChange={(e) => setSCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  About the Society
                </label>
                <textarea
                  rows={3}
                  value={sDescription}
                  onChange={(e) => setSDescription(e.target.value)}
                  placeholder="Describe your training schedule, competitive history, and open membership policies..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                ></textarea>
              </div>
            </div>
          )}

          {/* Practice Fields */}
          {submitModalType === 'practice' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Practice Session Title *
                </label>
                <input
                  type="text"
                  required
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="e.g. Wednesday Night BP Sparring (Pan-African)"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={pDate}
                    onChange={(e) => setPDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Time & Timezone</label>
                  <input
                    type="text"
                    value={pTimeUTC}
                    onChange={(e) => setPTimeUTC(e.target.value)}
                    placeholder="e.g. 15:00 UTC (17:00 CAT)"
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Platform</label>
                  <select
                    value={pPlatform}
                    onChange={(e) => setPPlatform(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Discord">Discord Room</option>
                    <option value="Zoom">Zoom</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-500 font-medium mb-1">Room Link / Location</label>
                  <input
                    type="text"
                    value={pMeetingLink}
                    onChange={(e) => setPMeetingLink(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Practice Motion (Optional / Prepared)
                </label>
                <input
                  type="text"
                  value={pMotionPrompt}
                  onChange={(e) => setPMotionPrompt(e.target.value)}
                  placeholder="e.g. THBT African central banks should..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Moderated for quality & trust</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Moderation</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
