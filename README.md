# 🗒️ Sticky Notes Extension

> **Status:** 🚧 Work in Progress - Building in Public

A Chrome extension that allows users to send private sticky notes to friends through a secure, real-time messaging system.

## ✨ Features (Planned/In Development)

- 📝 Create and send sticky notes to friends
- 🔐 Secure authentication system
- 💾 Cloud storage with Supabase backend
- 🎨 Clean, intuitive popup interface
- 🔄 Real-time note delivery

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Backend:** Supabase (Database + Authentication)
- **Platform:** Chrome Extension (Manifest V3)

## 📦 Project Structure

```
sticky_note_extension/
├── manifest.json      # Extension manifest
├── popup.html         # Main popup interface
├── popup.js          # Popup logic and UI interactions
├── background.js     # Background service worker
├── styles.css        # Styling
├── config.js         # Configuration (Supabase keys)
├── supabase.js       # Supabase client library
└── images/           # Extension icons
```

## 🚀 Current Development Status

This project is currently in active development. Features being worked on:

- [x] Basic extension structure
- [x] Supabase integration setup
- [x] Authentication system foundation
- [ ] Note creation and storage
- [ ] Friend system
- [ ] Note delivery mechanism
- [ ] UI/UX improvements

## 🔧 Development Setup

1. Clone this repository
2. Set up your Supabase project
3. Copy `config.example.js` to `config.js` and add your actual Supabase keys
4. Load as unpacked extension in Chrome Developer Mode

### Environment Variables (Production)

For production deployment, use environment variables instead of hardcoded keys:

```javascript
// Use environment variables in production
const SUPABASE_URL = process.env.SUPABASE_URL || "your-fallback-url";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "your-fallback-key";
```

## ⚠️ Security Notice

**IMPORTANT:** 
- `config.js` is ignored by git and contains your actual API keys
- Never commit real API keys to the repository
- Use `config.example.js` as a template for new developers
- For production, use environment variables or secure key management

## 🤝 Contributing

This is a learning project built in public! Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Share feedback

## 📄 License

ISC License

---

**Note:** This extension is in early development. Features and functionality may change frequently as the project evolves.