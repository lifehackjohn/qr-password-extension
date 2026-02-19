# QR Password Fill

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-red.svg)](LICENSE)

A Chrome extension that enables secure password autofill by scanning QR codes from an air-gapped device. Your credentials never touch the network — they're transmitted optically via your webcam.

## How It Works

Traditional password managers store credentials in the cloud or on the same device that browses the web. QR Password Fill takes a different approach:

1. **Your passwords live on a separate, offline device** (phone, tablet, or air-gapped computer)
2. **When you need to log in**, the offline device displays a QR code containing your credentials
3. **Click the extension icon** → your webcam scans the QR code
4. **Credentials are filled** into the login form automatically

The air gap ensures that even if your main computer is compromised, your password vault remains physically isolated.

## Screenshots

<!-- TODO: Add screenshots of the extension in action -->

*Coming soon*

## Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/lifehackjohn/qr-password-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `extension/` folder from the cloned repository
6. The QR Password Fill icon will appear in your toolbar

### Standalone QR Generator

A standalone QR code generator is included for creating QR codes on your air-gapped device:

1. Copy the `qr-generator/` folder to your offline device
2. Open [`qr-generator/index.html`](qr-generator/index.html) in any browser — no internet required
3. Enter your credentials and generate a QR code to scan

## Usage

1. Navigate to a login page in Chrome
2. Click the **QR Password Fill** extension icon in your toolbar
3. Grant camera access when prompted (first time only)
4. Hold your air-gapped device's QR code in front of your webcam
5. The extension detects the QR code, reads the credentials, and fills the login form

## Privacy

**QR Password Fill is completely local.** No data is ever sent anywhere.

- ✅ All QR scanning happens locally in your browser
- ✅ No analytics, telemetry, or tracking
- ✅ No network requests — the extension only uses the `activeTab` permission
- ✅ Camera access is used solely for QR code scanning
- ✅ No credentials are stored by the extension

See the full [Privacy Policy](store-listing/privacy-policy.md).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

If you discover a security vulnerability, please see [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) — see [LICENSE](LICENSE) for details.
