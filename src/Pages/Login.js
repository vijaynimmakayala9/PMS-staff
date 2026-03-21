import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Keyframes ───────────────────────────────────────────── */
const STYLES = `
  @keyframes scanLine {
    0%   { top: 8%;  opacity: 1; }
    45%  { top: 88%; opacity: 1; }
    50%  { top: 88%; opacity: 0; }
    51%  { top: 8%;  opacity: 0; }
    55%  { top: 8%;  opacity: 1; }
    100% { top: 8%;  opacity: 1; }
  }
  @keyframes spinRev { to { transform: rotate(-360deg); } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  .scan-line  { animation: scanLine 2.4s ease-in-out infinite; }
  .spin-rev   { animation: spinRev 5s linear infinite; }
  .fade-up    { animation: fadeUp 0.35s ease both; }
`;

/* ── Icons ───────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const EyeIcon = ({ off }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {off
      ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
    }
  </svg>
);
const ScanIcon = () => (
  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const KeyIcon = () => (
  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-8 h-8" style={{ color: '#06cabc' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const AlertIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const WarnIcon = () => (
  <svg className="w-8 h-8" style={{ color: '#f59e0b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const CamIcon = () => (
  <svg className="w-12 h-12" style={{ color: '#06cabc', opacity: 0.35 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
  </svg>
);
const Spinner = ({ dark = false }) => (
  <svg className="w-4 h-4 animate-spin flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={dark ? 'rgba(6,202,188,0.25)' : 'rgba(255,255,255,0.3)'} strokeWidth="4" />
    <path fill={dark ? '#06cabc' : 'white'} d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

/* ── Design tokens ───────────────────────────────────────── */
const C = {
  grad: 'linear-gradient(135deg,#06cabc,#04b0a3)',
  glow: '0 8px 24px rgba(6,202,188,0.42)',
  glowLg: '0 12px 36px rgba(6,202,188,0.52)',
  card: '0 24px 64px rgba(6,202,188,0.16),0 4px 20px rgba(0,0,0,0.07)',
  border: 'rgba(6,202,188,0.22)',
  soft: 'rgba(6,202,188,0.08)',
  teal: '#06cabc',
  dark: '#04a899',
};

const pageBg = {
  background:
    'radial-gradient(ellipse 80% 60% at 15% 10%,rgba(6,202,188,0.14) 0%,transparent 60%),' +
    'radial-gradient(ellipse 60% 50% at 85% 90%,rgba(6,202,188,0.09) 0%,transparent 60%),' +
    'linear-gradient(160deg,#e8fffe,#f4fffe,#eafffe)',
};

/* ── Shared small components ─────────────────────────────── */
const AccentBar = () => (
  <div className="h-1 w-full animate-pulse"
    style={{ background: 'linear-gradient(90deg,#06cabc,#2de8d8,#06cabc)' }} />
);

const Corner = ({ pos }) => (
  <div className={`absolute w-5 h-5 ${pos}`} style={{ borderColor: '#06cabc' }} />
);

const PageWrap = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-10" style={pageBg}>
    <style>{STYLES}</style>
    {/* Ambient blobs */}
    <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
      style={{ transform: 'translate(35%,-35%)', background: 'radial-gradient(circle,rgba(6,202,188,0.12) 0%,transparent 70%)' }} />
    <div className="fixed bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
      style={{ transform: 'translate(-35%,35%)', background: 'radial-gradient(circle,rgba(6,202,188,0.09) 0%,transparent 70%)' }} />
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden bg-white"
    style={{ border: `1px solid ${C.border}`, boxShadow: C.card }}>
    <AccentBar />
    {children}
  </div>
);

const Logo = () => (
  <div className="flex items-center gap-3 mb-8">
    <div className="relative w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: C.grad, boxShadow: C.glow }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.22),transparent 55%)' }} />
      <ShieldIcon />
    </div>
    <div>
      <h1 className="text-lg font-bold text-gray-800 leading-none tracking-tight">SecureAccess</h1>
      <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: C.teal }}>Staff Portal</p>
    </div>
  </div>
);

const ErrorBox = ({ msg }) => msg ? (
  <div className="flex items-start gap-2 p-3 mb-5 rounded-xl text-sm text-red-600 bg-red-50 border border-red-100 fade-up">
    <AlertIcon /><span>{msg}</span>
  </div>
) : null;

/* Step indicators */
const Steps = ({ active }) => {
  // active: 1=ID, 2=Face, 3=Password, 4=Done
  const done = n => n < active;
  const isActive = n => n === active;

  const Dot = ({ n, lbl }) => (
    <div className="flex items-center gap-1.5">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
        ${done(n) ? 'text-teal-600' : isActive(n) ? 'text-white' : 'text-gray-400 bg-gray-100'}`}
        style={done(n)
          ? { background: 'rgba(6,202,188,0.15)', color: C.teal }
          : isActive(n)
            ? { background: C.grad, boxShadow: '0 4px 12px rgba(6,202,188,0.45)' }
            : {}}>
        {done(n) ? '✓' : n}
      </div>
      <span className={`text-xs font-medium hidden sm:block ${isActive(n) ? 'font-semibold' : 'text-gray-400'}`}
        style={isActive(n) ? { color: C.teal } : {}}>
        {lbl}
      </span>
    </div>
  );

  const Line = ({ done: d }) => (
    <div className="flex-1 h-px transition-all duration-500"
      style={{ background: d ? C.border : '#e5e7eb' }} />
  );

  return (
    <div className="flex items-center gap-1.5 mb-6">
      <Dot n={1} lbl="Employee ID" />
      <Line done={active > 1} />
      <Dot n={2} lbl="Face Scan" />
      <Line done={active > 2} />
      <Dot n={3} lbl="Password" />
      <Line done={active > 3} />
      <Dot n={4} lbl="Access" />
    </div>
  );
};

/* ── Input helper ────────────────────────────────────────── */
const onFocus = e => {
  e.target.style.borderColor = '#06cabc';
  e.target.style.background = '#fff';
  e.target.style.boxShadow = '0 0 0 4px rgba(6,202,188,0.12)';
};
const onBlur = e => {
  e.target.style.borderColor = 'transparent';
  e.target.style.background = 'rgba(6,202,188,0.07)';
  e.target.style.boxShadow = 'none';
};

const delay = ms => new Promise(r => setTimeout(r, ms));

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   Screens: 'login' → 'face' → 'password' (face failed) | 'done'
═══════════════════════════════════════════════════════════ */
const LoginPage = () => {
  const navigate = useNavigate();

  const [screen, setScreen] = useState('login');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Camera
  const [camState, setCamState] = useState('idle'); // idle|requesting|active|error
  const [captured, setCaptured] = useState(null);
  const [faceOk, setFaceOk] = useState(null);   // null|true|false

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /* ── Camera ──────────────────────────────────────────── */
  const startCamera = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setError('Camera API unavailable. Ensure the page is on HTTPS or localhost.');
      setCamState('error');
      return;
    }
    setCamState('requesting');
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      setCamState('active');
    } catch (err) {
      const msg =
        err.name === 'NotAllowedError' ? 'Camera permission denied. Please click Allow in your browser.' :
          err.name === 'NotFoundError' ? 'No camera found on this device.' :
            err.name === 'NotReadableError' ? 'Camera is in use by another app.' :
              `Camera error: ${err.message}`;
      setError(msg);
      setCamState('error');
    }
  }, []);

  // Attach stream once <video> is in the DOM
  useEffect(() => {
    if (camState === 'active' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(err => {
        setError(`Could not start video: ${err.message}`);
        setCamState('error');
      });
    }
  }, [camState]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamState('idle');
  }, []);

  useEffect(() => {
    if (screen === 'face') startCamera();
    return () => stopCamera();
  }, [screen]); // eslint-disable-line

  /* ── Capture frame ───────────────────────────────────── */
  const doCapture = () => {
    const video = videoRef.current, canvas = canvasRef.current;
    if (!video || !canvas) return null;
    const w = video.videoWidth || 640, h = video.videoHeight || 480;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.save(); ctx.translate(w, 0); ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore();
    const url = canvas.toDataURL('image/jpeg', 0.92);
    stopCamera();
    setCaptured(url);
    return url;
  };

  /* ── Step 1: Employee ID ─────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await delay(650);
    if (employeeId.trim() === '1234567890') {
      setScreen('face');
    } else {
      setError('Invalid employee ID. Please check and try again.');
    }
    setLoading(false);
  };

  /* ── Step 2: Face capture → verify ──────────────────── */
  const handleCaptureOrVerify = () => {
    if (!captured) {
      if (camState !== 'active') { setError('Camera not ready. Please wait.'); return; }
      const img = doCapture();
      if (!img) setError('Could not capture frame. Please try again.');
    } else {
      setLoading(true);
      // Simulate face recognition — randomly succeed/fail for demo
      // In production, send `captured` to your face API here
      delay(2600).then(() => {
        const success = true; // change to: await faceAPI.verify(captured)
        setFaceOk(success);
        setLoading(false);
        if (success) {
          delay(1200).then(() => {
            setScreen('done')
            navigate('/dashboard');
          });
        } else {
          delay(1200).then(() => {
            setError('');
            setScreen('password');
          });
        }
      });
    }
  };

  const retake = () => { setCaptured(null); startCamera(); };

  /* ── Step 3: Password fallback ───────────────────────── */
  const handlePassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await delay(800);
    if (password === '123456') {
      // setScreen('done');
      navigate('/dashboard')
    } else {
      setError('Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  /* ── Simulate face verification failure for demo ─────── */
  const simulateFaceFail = () => {
    if (!captured) {
      if (camState !== 'active') { setError('Camera not ready.'); return; }
      const img = doCapture();
      if (!img) return;
    }
    setLoading(true);
    delay(2600).then(() => {
      setFaceOk(false);
      setLoading(false);
      delay(1200).then(() => { setError(''); setScreen('password'); });
    });
  };

  /* ════════════════════ DONE SCREEN ════════════════════ */
  if (screen === 'done') {
    return (
      <PageWrap>
        <Card>
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: C.grad, boxShadow: C.glowLg }}>
              <CheckIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Access Granted</h2>
            <p className="text-sm text-gray-500 mb-6">Welcome back. Redirecting to your dashboard…</p>
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-100">
              <div className="h-full rounded-full w-full animate-pulse" style={{ background: C.grad }} />
            </div>
          </div>
        </Card>
      </PageWrap>
    );
  }

  /* ════════════════════ PASSWORD SCREEN ════════════════ */
  if (screen === 'password') {
    return (
      <PageWrap>
        <Card>
          <div className="p-7">
            <Steps active={3} />

            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative flex items-center justify-center mb-4" style={{ width: 90, height: 90 }}>
                <div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin"
                  style={{ borderColor: 'rgba(245,158,11,0.4)', borderTopColor: 'transparent' }} />
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 8px 24px rgba(245,158,11,0.4)' }}>
                  <KeyIcon />
                </div>
              </div>

              {/* Face failed badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
                <WarnIcon />
                <span className="text-xs font-semibold" style={{ color: '#d97706' }}>Face verification failed</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Enter Your Password</h2>
              <p className="text-sm text-gray-500 mt-1 text-center max-w-xs leading-relaxed">
                Face recognition could not verify your identity. Please sign in with your password to continue.
              </p>
            </div>

            <ErrorBox msg={error} />

            <form onSubmit={handlePassword} className="space-y-4">
              {/* Employee ID (readonly, pre-filled) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><UserIcon /></span>
                  <input
                    type="text" readOnly value={employeeId}
                    className="w-full pl-10 pr-4 py-3.5 text-sm text-gray-500 rounded-xl border-2 border-transparent cursor-not-allowed"
                    style={{ background: 'rgba(6,202,188,0.05)' }} />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button type="button" className="text-xs font-medium hover:opacity-80 transition-opacity"
                    style={{ color: C.teal }}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><LockIcon /></span>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3.5 text-sm text-gray-800 rounded-xl border-2 border-transparent outline-none transition-all duration-200"
                    style={{ background: 'rgba(6,202,188,0.07)' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <EyeIcon off={showPwd} />
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: C.grad, boxShadow: C.glow }}>
                {loading ? <><Spinner />Signing in…</> : 'Sign In →'}
              </button>
            </form>

            {/* Try face again */}
            <button onClick={() => { setCaptured(null); setFaceOk(null); setError(''); setScreen('face'); }}
              className="mt-3 w-full py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 hover:opacity-80"
              style={{ background: C.soft, borderColor: C.border, color: C.dark }}>
              🔄 Try Face Verification Again
            </button>

            {/* Demo hint */}
            <div className="mt-5 flex items-center gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(6,202,188,0.07)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: C.teal }} />
              <p className="text-xs text-gray-500">Demo password: <strong style={{ color: C.dark }}>123456</strong></p>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-gray-100 text-center text-xs text-gray-400"
            style={{ background: 'linear-gradient(135deg,#f0fdfc,#f8fffe)' }}>
            🔒 All login attempts are encrypted and logged
          </div>
        </Card>
      </PageWrap>
    );
  }

  /* ════════════════════ FACE SCREEN ════════════════════ */
  if (screen === 'face') {
    const camActive = camState === 'active';
    const verifying = loading && captured;

    return (
      <PageWrap>
        <Card>
          <div className="p-7">
            <Steps active={2} />

            {/* Header */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative flex items-center justify-center mb-4" style={{ width: 90, height: 90 }}>
                <div className="absolute inset-0 rounded-full animate-spin border-2"
                  style={{ borderColor: 'rgba(6,202,188,0.4)', borderTopColor: 'transparent' }} />
                <div className="absolute rounded-full border border-dashed spin-rev"
                  style={{ inset: -10, borderColor: 'rgba(6,202,188,0.2)' }} />
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                  style={{ background: C.grad, boxShadow: C.glow }}>
                  <ScanIcon />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Face Verification</h2>
              <p className="text-sm text-gray-500 mt-1 text-center max-w-xs leading-relaxed">
                {faceOk === false
                  ? 'Verification failed — redirecting to password…'
                  : captured
                    ? verifying ? 'Analysing your face…' : 'Photo ready. Confirm or retake.'
                    : camState === 'requesting' ? 'Requesting camera permission…'
                      : camState === 'error' ? 'Could not access camera.'
                        : 'Centre your face in the oval and hold still.'}
              </p>
            </div>

            {/* Camera box */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 border-2"
              style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,#e2fffe,#cff8f5)', borderColor: C.border }}>

              {!captured && camActive && (
                <video ref={videoRef} playsInline muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }} />
              )}

              {!captured && !camActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {camState === 'requesting'
                    ? <><Spinner dark /><span className="text-sm font-medium" style={{ color: C.teal }}>Requesting camera…</span></>
                    : <><CamIcon /><span className="text-sm font-medium text-gray-500">{camState === 'error' ? 'Camera unavailable' : 'Starting…'}</span></>}
                </div>
              )}

              {!captured && camActive && (
                <>
                  <Corner pos="absolute top-3 left-3  border-t-2 border-l-2" />
                  <Corner pos="absolute top-3 right-3 border-t-2 border-r-2" />
                  <Corner pos="absolute bottom-3 left-3  border-b-2 border-l-2" />
                  <Corner pos="absolute bottom-3 right-3 border-b-2 border-r-2" />
                  <div className="scan-line absolute left-3 right-3 h-0.5 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg,transparent,#06cabc,transparent)', boxShadow: '0 0 10px rgba(6,202,188,0.7)' }} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full border-2 border-dashed"
                      style={{ width: '52%', height: '72%', borderColor: 'rgba(6,202,188,0.5)' }} />
                  </div>
                </>
              )}

              {captured && (
                <>
                  <img src={captured} alt="Captured" className="w-full h-full object-cover" />
                  <Corner pos="absolute top-3 left-3  border-t-2 border-l-2" />
                  <Corner pos="absolute top-3 right-3 border-t-2 border-r-2" />
                  <Corner pos="absolute bottom-3 left-3  border-b-2 border-l-2" />
                  <Corner pos="absolute bottom-3 right-3 border-b-2 border-r-2" />
                  {/* Verifying overlay */}
                  {verifying && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                      style={{ background: 'rgba(6,202,188,0.12)' }}>
                      <Spinner dark />
                      <span className="text-sm font-semibold" style={{ color: C.dark }}>Verifying…</span>
                    </div>
                  )}
                  {/* Success overlay */}
                  {faceOk === true && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(6,202,188,0.2)' }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckIcon />
                      </div>
                    </div>
                  )}
                  {/* Fail overlay */}
                  {faceOk === false && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(245,158,11,0.15)' }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <WarnIcon />
                      </div>
                    </div>
                  )}
                </>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Buttons */}
            {faceOk === null && (
              <div className="flex gap-3">
                {captured && !loading && (
                  <button onClick={retake}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:opacity-80"
                    style={{ background: C.soft, borderColor: C.border, color: '#2d7a73' }}>
                    ↩ Retake
                  </button>
                )}
                <button
                  onClick={handleCaptureOrVerify}
                  disabled={loading || camState === 'requesting' || (camState === 'error' && !captured)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: C.grad, boxShadow: C.glow }}>
                  {loading
                    ? <><Spinner />{captured ? 'Verifying…' : 'Capturing…'}</>
                    : captured ? '✓ Confirm & Verify' : '📸 Capture Photo'}
                </button>
              </div>
            )}

            {/* Demo: simulate face fail */}
            {!captured && camActive && (
              <button onClick={simulateFaceFail}
                className="mt-3 w-full py-2 rounded-xl text-xs font-medium border transition-all duration-200 hover:opacity-70"
                style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.3)', color: '#d97706' }}>
                Demo: Simulate Face Failure → Password Screen
              </button>
            )}

            {camState === 'error' && !captured && (
              <button onClick={startCamera}
                className="mt-3 w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:opacity-80"
                style={{ background: C.soft, borderColor: C.border, color: C.dark }}>
                🔄 Retry Camera
              </button>
            )}

            {error && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl text-xs text-red-600 bg-red-50 border border-red-100">
                <AlertIcon /><span>{error}</span>
              </div>
            )}

            {/* Skip to password */}
            <p className="mt-4 text-center text-xs text-gray-400">
              Having trouble?{' '}
              <button onClick={() => { stopCamera(); setFaceOk(false); setScreen('password'); }}
                className="font-semibold hover:opacity-80 transition-opacity"
                style={{ color: C.teal }}>
                Use password instead
              </button>
            </p>
          </div>

          <div className="px-7 py-4 border-t border-gray-100 text-center text-xs text-gray-400"
            style={{ background: 'linear-gradient(135deg,#f0fdfc,#f8fffe)' }}>
            🔒 Biometric data processed locally · Never stored
          </div>
        </Card>
      </PageWrap>
    );
  }

  /* ════════════════════ LOGIN SCREEN ══════════════════════ */
  return (
    <PageWrap>
      <Card>
        <div className="p-8 pb-6">
          <Logo />

          <Steps active={1} />

          <div className="mb-7">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1.5">Enter your Employee ID to begin</p>
          </div>

          <ErrorBox msg={error} />

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="eid" className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <UserIcon />
                </span>
                <input
                  id="eid" type="text" required autoComplete="off"
                  value={employeeId}
                  onChange={e => setEmployeeId(e.target.value)}
                  placeholder="Enter your 10-digit employee ID"
                  className="w-full pl-10 pr-4 py-3.5 text-sm text-gray-800 rounded-xl border-2 border-transparent outline-none transition-all duration-200"
                  style={{ background: 'rgba(6,202,188,0.07)' }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: C.grad, boxShadow: C.glow }}>
              {loading ? <><Spinner />Authenticating…</> : 'Continue →'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(6,202,188,0.07)' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: C.teal }} />
            <p className="text-xs text-gray-500">
              Demo — Employee ID: <strong style={{ color: C.dark }}>1234567890</strong>
            </p>
          </div>
        </div>

        <div className="px-8 py-4 border-t border-gray-100 text-center text-xs text-gray-400"
          style={{ background: 'linear-gradient(135deg,#f0fdfc,#f8fffe)' }}>
          🔒 End-to-end encrypted · Biometric face verification
        </div>
      </Card>
    </PageWrap>
  );
};

export default LoginPage;