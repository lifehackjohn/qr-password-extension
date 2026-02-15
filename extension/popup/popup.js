// QR Password Fill - Popup
// Just opens the scanner

document.getElementById('btn-scan').addEventListener('click', async () => {
  const scannerUrl = chrome.runtime.getURL('scanner/scanner.html');
  await chrome.tabs.create({ url: scannerUrl, active: true });
  window.close();
});
