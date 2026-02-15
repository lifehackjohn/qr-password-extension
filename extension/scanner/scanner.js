// QR Password Scanner - Simple version
// Scan → Show → Copy

const video = document.getElementById('camera-preview');
const canvas = document.getElementById('scan-canvas');
const cameraBox = document.getElementById('camera-box');
const status = document.getElementById('status');
const resultBox = document.getElementById('result-box');
const passwordText = document.getElementById('password-text');
const btnToggle = document.getElementById('btn-toggle');
const btnCopy = document.getElementById('btn-copy');
const btnAgain = document.getElementById('btn-again');
const btnClose = document.getElementById('btn-close');

let videoStream = null;
let scanInterval = null;
let scannedValue = null;
let isVisible = false;

// Start on load
document.addEventListener('DOMContentLoaded', startCamera);

// Events
btnToggle.addEventListener('click', toggleVisibility);
btnCopy.addEventListener('click', copyToClipboard);
btnAgain.addEventListener('click', scanAgain);
btnClose.addEventListener('click', () => window.close());

async function startCamera() {
  status.textContent = 'Starting camera...';
  status.className = 'status';
  
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 } }
    });
    
    video.srcObject = videoStream;
    video.onloadedmetadata = () => {
      video.play();
      status.textContent = 'Point at QR code';
      startScanning();
    };
  } catch (err) {
    status.textContent = 'Camera error: ' + err.message;
    status.className = 'status error';
  }
}

function startScanning() {
  const ctx = canvas.getContext('2d');
  
  scanInterval = setInterval(() => {
    if (video.readyState !== video.HAVE_ENOUGH_DATA) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      
      if (code && code.data) {
        onCodeScanned(code.data);
      }
    } catch (e) {}
  }, 100);
}

function stopCamera() {
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = null;
  }
  if (videoStream) {
    videoStream.getTracks().forEach(t => t.stop());
    videoStream = null;
  }
}

function onCodeScanned(data) {
  stopCamera();
  scannedValue = data;
  isVisible = false;
  
  // Update UI
  cameraBox.classList.add('hidden');
  resultBox.classList.add('visible');
  status.textContent = '✓ Scanned! Copy and paste into login.';
  status.className = 'status success';
  
  updateDisplay();
}

function updateDisplay() {
  if (isVisible) {
    passwordText.textContent = scannedValue;
    btnToggle.textContent = '🙈';
  } else {
    passwordText.textContent = '•'.repeat(Math.min(scannedValue.length, 24));
    btnToggle.textContent = '👁️';
  }
}

function toggleVisibility() {
  isVisible = !isVisible;
  updateDisplay();
}

async function copyToClipboard() {
  if (!scannedValue) return;
  
  try {
    await navigator.clipboard.writeText(scannedValue);
    status.textContent = '✓ Copied! Paste with Ctrl+V';
    status.className = 'status success';
    btnCopy.textContent = '✓';
    setTimeout(() => { btnCopy.textContent = '📋'; }, 1500);
  } catch (err) {
    status.textContent = 'Copy failed';
    status.className = 'status error';
  }
}

function scanAgain() {
  scannedValue = null;
  isVisible = false;
  
  cameraBox.classList.remove('hidden');
  resultBox.classList.remove('visible');
  
  startCamera();
}
