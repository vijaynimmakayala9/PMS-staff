import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Keyframes injected once ─────────────────────────────── */
const STYLES = `
  @keyframes scanLine {
    0%   { top: 8%;  opacity: 1; }
    45%  { top: 88%; opacity: 1; }
    50%  { top: 88%; opacity: 0; }
    51%  { top: 8%;  opacity: 0; }
    55%  { top: 8%;  opacity: 1; }
    100% { top: 8%;  opacity: 1; }
  }
  @keyframes spinRev {
    to { transform: rotate(-360deg); }
  }
  .scan-line { animation: scanLine 2.4s ease-in-out infinite; }
  .spin-rev  { animation: spinRev 5s linear infinite; }
`;

/* ── Icons ───────────────────────────────────────────────── */
const Icon = ({ d, size = 'w-5 h-5', sw = 2, extra = '' }) => (
  <svg className={`${size} ${extra}`} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

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
const ScanIcon = () => (
  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
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

/* ── Tiny reusables ──────────────────────────────────────── */
const AccentBar = () => (
  <div className="h-1 w-full animate-pulse"
    style={{ background: 'linear-gradient(90deg,#06cabc,#2de8d8,#06cabc)' }} />
);

const Corner = ({ pos }) => (
  <div className={`absolute w-5 h-5 ${pos}`} style={{ borderColor: '#06cabc' }} />
);

const StepDone = ({ lbl }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
      style={{ background: 'rgba(6,202,188,0.15)', color: C.teal }}>✓</div>
    <span className="text-xs font-medium text-gray-400 hidden sm:block">{lbl}</span>
  </div>
);
const StepActive = ({ n, lbl }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
      style={{ background: C.grad, boxShadow: '0 4px 12px rgba(6,202,188,0.45)' }}>{n}</div>
    <span className="text-xs font-semibold hidden sm:block" style={{ color: C.teal }}>{lbl}</span>
  </div>
);
const StepIdle = ({ n, lbl }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-400">{n}</div>
    <span className="text-xs font-medium text-gray-400 hidden sm:block">{lbl}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const LoginPage = () => {
  const navigate = useNavigate();

  const [screen, setScreen] = useState('login'); // login | face | done
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [camState, setCamState] = useState('idle'); // idle | requesting | active | error
  const [captured, setCaptured] = useState(null);
  const [verified, setVerified] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /* ── Camera lifecycle ──────────────────────────────────── */
  const startCamera = useCallback(async () => {
    // Guard: mediaDevices not available (HTTP / sandboxed iframe)
    if (!navigator?.mediaDevices?.getUserMedia) {
      setError('Camera API unavailable. Make sure the page is served over HTTPS or localhost.');
      setCamState('error');
      return;
    }

    setCamState('requesting');
    setError('');

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });
    } catch (err) {
      const msg =
        err.name === 'NotAllowedError' ? 'Camera permission denied. Please click Allow in your browser prompt.' :
          err.name === 'NotFoundError' ? 'No camera found on this device.' :
            err.name === 'NotReadableError' ? 'Camera is in use by another app.' :
              `Camera error: ${err.message}`;
      setError(msg);
      setCamState('error');
      return;
    }

    streamRef.current = stream;

    // Attach stream to video element — must happen AFTER state update
    // so the video element is rendered & ref is populated.
    setCamState('active'); // triggers render → video element appears
  }, []);

  /* Attach stream once video element is in the DOM (camState === 'active') */
  useEffect(() => {
    if (camState === 'active' && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;

      // play() returns a promise — must handle to avoid Unhandled Rejection
      video.play().catch(err => {
        setError(`Could not start video: ${err.message}`);
        setCamState('error');
      });
    }
  }, [camState]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCamState('idle');
  }, []);

  /* Start camera when entering face screen */
  useEffect(() => {
    if (screen === 'face' && !verified) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Capture ───────────────────────────────────────────── */
  const doCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    // Un-mirror the capture (video CSS is scaleX(-1))
    ctx.save();
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore();

    const url = canvas.toDataURL('image/jpeg', 0.92);
    stopCamera();
    setCaptured(url);
    return url;
  };

  /* ── Step 1 — login ────────────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 650));
    if (employeeId.trim() === '1234567890') {
      setScreen('face');
    } else {
      setError('Invalid employee ID. Please check and try again.');
    }
    setLoading(false);
  };

  /* ── Step 2 — capture / verify ─────────────────────────── */
  const handleCaptureOrVerify = () => {
    if (!captured) {
      if (camState !== 'active') {
        setError('Camera is not ready yet. Please wait or refresh.');
        return;
      }
      const img = doCapture();
      if (!img) setError('Could not capture frame. Please try again.');
    } else {
      setLoading(true);
      setTimeout(() => {
        setVerified(true);
        setLoading(false);
        setTimeout(() => navigate('/dashboard'), 1500);
      }, 2600);
    }
  };

  const retake = () => {
    setCaptured(null);
    startCamera();
  };

  /* ── Input focus styles ────────────────────────────────── */
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

  /* ════════════════════ DONE SCREEN ════════════════════════ */
  if (screen === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10" style={pageBg}>
        <style>{STYLES}</style>
        <div className="w-full max-w-md rounded-2xl overflow-hidden bg-white"
          style={{ border: `1px solid ${C.border}`, boxShadow: C.card }}>
          <AccentBar />
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: C.grad, boxShadow: C.glowLg }}>
              <CheckIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Access Granted</h2>
            <p className="text-sm text-gray-500">Welcome back. Redirecting to your dashboard…</p>
            <div className="mt-6 w-full h-1.5 rounded-full overflow-hidden bg-gray-100">
              <div className="h-full rounded-full w-full animate-pulse" style={{ background: C.grad }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════ FACE SCREEN ════════════════════════ */
  if (screen === 'face') {
    const camActive = camState === 'active';

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10" style={pageBg}>
        <style>{STYLES}</style>

        <div className="w-full max-w-md rounded-2xl overflow-hidden bg-white"
          style={{ border: `1px solid ${C.border}`, boxShadow: C.card }}>
          <AccentBar />

          <div className="p-7">
            {/* Steps */}
            <div className="flex items-center gap-1.5 mb-6">
              <StepDone lbl="ID Verified" />
              <div className="flex-1 h-px" style={{ background: C.border }} />
              <StepActive n="2" lbl="Face Scan" />
              <div className="flex-1 h-px bg-gray-200" />
              <StepIdle n="3" lbl="Access" />
            </div>

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
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                {verified ? 'Identity Confirmed' : 'Face Verification'}
              </h2>
              <p className="text-sm text-gray-500 mt-1 text-center max-w-xs leading-relaxed">
                {verified
                  ? 'Access granted — redirecting…'
                  : captured
                    ? 'Photo ready. Confirm or retake.'
                    : camState === 'requesting'
                      ? 'Requesting camera permission…'
                      : camState === 'error'
                        ? 'Could not access camera.'
                        : 'Centre your face in the oval and hold still.'}
              </p>
            </div>

            {/* ── Camera / captured box ── */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 border-2"
              style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,#e2fffe,#cff8f5)', borderColor: C.border }}>

              {/* Live feed — only rendered when camState === 'active' */}
              {!captured && camActive && (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}   /* mirror so it feels like a mirror */
                />
              )}

              {/* Placeholder while requesting / error / idle */}
              {!captured && !camActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {camState === 'requesting'
                    ? <><Spinner dark /><span className="text-sm font-medium" style={{ color: C.teal }}>Requesting camera…</span></>
                    : <><CamIcon /><span className="text-sm font-medium text-gray-500">{camState === 'error' ? 'Camera unavailable' : 'Starting…'}</span></>
                  }
                </div>
              )}

              {/* Scan overlay on live feed */}
              {!captured && camActive && (
                <>
                  <Corner pos="absolute top-3 left-3  border-t-2 border-l-2" />
                  <Corner pos="absolute top-3 right-3 border-t-2 border-r-2" />
                  <Corner pos="absolute bottom-3 left-3  border-b-2 border-l-2" />
                  <Corner pos="absolute bottom-3 right-3 border-b-2 border-r-2" />
                  <div className="scan-line absolute left-3 right-3 h-0.5 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg,transparent,#06cabc,transparent)', boxShadow: '0 0 10px rgba(6,202,188,0.7)' }} />
                  {/* face guide oval */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full border-2 border-dashed"
                      style={{ width: '52%', height: '72%', borderColor: 'rgba(6,202,188,0.5)' }} />
                  </div>
                </>
              )}

              {/* Captured photo */}
              {captured && (
                <>
                  <img src={captured} alt="Captured" className="w-full h-full object-cover" />
                  <Corner pos="absolute top-3 left-3  border-t-2 border-l-2" />
                  <Corner pos="absolute top-3 right-3 border-t-2 border-r-2" />
                  <Corner pos="absolute bottom-3 left-3  border-b-2 border-l-2" />
                  <Corner pos="absolute bottom-3 right-3 border-b-2 border-r-2" />
                  {verified && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(6,202,188,0.2)' }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckIcon />
                      </div>
                    </div>
                  )}
                </>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Buttons */}
            {!verified && (
              <div className="flex gap-3">
                {captured && (
                  <button onClick={retake} disabled={loading}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:opacity-80 disabled:opacity-40"
                    style={{ background: C.soft, borderColor: C.border, color: '#2d7a73' }}>
                    ↩ Retake
                  </button>
                )}
                <button
                  onClick={handleCaptureOrVerify}
                  disabled={loading || (camState === 'requesting') || (camState === 'error' && !captured)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: C.grad, boxShadow: C.glow }}>
                  {loading
                    ? <><Spinner />{captured ? 'Verifying…' : 'Capturing…'}</>
                    : captured
                      ? '✓ Confirm & Verify'
                      : '📸 Capture Photo'}
                </button>
              </div>
            )}

            {/* Retry button when camera errors */}
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
          </div>

          <div className="px-7 py-4 border-t border-gray-100 text-center text-xs text-gray-400"
            style={{ background: 'linear-gradient(135deg,#f0fdfc,#f8fffe)' }}>
            🔒 Biometric data processed locally · Never stored
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════ LOGIN SCREEN ═══════════════════════ */
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={pageBg}>
      <style>{STYLES}</style>

      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ transform: 'translate(35%,-35%)', background: 'radial-gradient(circle,rgba(6,202,188,0.12) 0%,transparent 70%)' }} />
      <div className="fixed bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ transform: 'translate(-35%,35%)', background: 'radial-gradient(circle,rgba(6,202,188,0.09) 0%,transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden bg-white"
        style={{ border: `1px solid ${C.border}`, boxShadow: C.card }}>
        <AccentBar />

        <div className="p-8 pb-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="relative w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{ background: C.grad, boxShadow: C.glow }}
            >
              {/* glass shine */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.22),transparent 55%)" }}
              />

              {/* LOGO */}
              <img
                src="/logo.png"   // put your logo in public folder
                alt="logo"
                className="relative z-10 w-7 h-7 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-none tracking-tight">Pixelmindsolutions </h1>
              <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: C.teal }}>Staff Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1.5">Sign in with your Employee ID to continue</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 mb-5 rounded-xl text-sm text-red-600 bg-red-50 border border-red-100">
              <AlertIcon /><span>{error}</span>
            </div>
          )}

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
                  onFocus={onFocus}
                  onBlur={onBlur}
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
      </div>
    </div>
  );
};

export default LoginPage;