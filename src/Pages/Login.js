import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const navigate = useNavigate();

  // Refs for video and canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera when face recognition screen opens
  useEffect(() => {
    if (showFaceRecognition && !faceVerified) {
      startCamera();
    }
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, [showFaceRecognition, faceVerified]);

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' // Use front camera
        } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      setError('Camera access denied. Please allow camera permissions.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image as data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // Stop camera after capture
      stopCamera();
      
      return imageDataUrl;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (employeeId === '1234567890') {
        setShowFaceRecognition(true);
      } else {
        throw new Error('Invalid employee ID');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceVerification = () => {
    // Capture image first
    const image = captureImage();
    
    if (!image) {
      setError('Failed to capture image. Please try again.');
      return;
    }

    // Simulate face recognition process
    setIsLoading(true);
    setTimeout(() => {
      setFaceVerified(true);
      setIsLoading(false);
      
      // Navigate to dashboard after successful verification
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 3000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (showFaceRecognition) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            {/* Animated Face Recognition Icon */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              {/* Scanning Animation */}
              <div className="absolute -inset-4 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Face Recognition</h2>
            <p className="text-gray-600 text-center mb-6">
              {faceVerified 
                ? 'Face verified successfully!' 
                : capturedImage 
                  ? 'Is this photo okay?' 
                  : 'Please look directly at the camera'}
            </p>

            {/* Camera Preview */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              {!capturedImage ? (
                <>
                  {/* Live Camera Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraActive ? '' : 'hidden'}`}
                  />
                  
                  {/* Camera Loading/Error State */}
                  {!cameraActive && (
                    <div className="text-gray-500 text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p>{error ? 'Camera Error' : 'Starting Camera...'}</p>
                    </div>
                  )}
                </>
              ) : (
                /* Captured Image Preview */
                <div className="w-full h-full relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {faceVerified && (
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center rounded-lg">
                      <div className="text-green-500 text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-semibold">Verified!</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Action Buttons */}
            {!faceVerified && (
              <div className="w-full space-y-3">
                {!capturedImage ? (
                  <button
                    onClick={handleFaceVerification}
                    disabled={isLoading || !cameraActive}
                    className={`w-full py-3 text-white text-sm font-medium rounded-md bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition duration-300 ${
                      isLoading || !cameraActive ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Capturing...
                      </div>
                    ) : (
                      'Capture Image'
                    )}
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={retakePhoto}
                      className="flex-1 py-3 text-gray-700 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
                    >
                      Retake Photo
                    </button>
                    <button
                      onClick={handleFaceVerification}
                      disabled={isLoading}
                      className={`flex-1 py-3 text-white text-sm font-medium rounded-md bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition duration-300 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Verifying...
                        </div>
                      ) : (
                        'Verify Face'
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {faceVerified && (
              <div className="w-full py-3 text-green-600 text-sm font-medium rounded-md bg-green-100 text-center">
                Redirecting to Dashboard...
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-md text-sm w-full text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Rest of your original login form remains the same...
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        
        {/* Animated Header */}
        <div className="p-8 pb-6">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {/* Pulsing Ring */}
              <div className="absolute -inset-2 border-2 border-blue-400 rounded-full animate-ping"></div>
            </div>
            
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
              SecureAccess
            </h1>
            <p className="text-gray-600 text-sm">Staff Login Portal</p>
          </div>

          {error && (
            <div className="p-3 text-red-600 bg-red-100 rounded-md shadow-sm text-sm mb-4 animate-shake">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="employeeId">
                Employee ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your employee ID"
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition duration-300 shadow-lg ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-3 bg-blue-50 rounded-md text-xs text-blue-600 text-center">
            <p>Demo: Use Employee ID <strong>1234567890</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Secure staff authentication with face recognition technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;