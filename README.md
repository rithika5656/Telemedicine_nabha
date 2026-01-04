# 🏥 Telemedicine Nabha

> **Problem Statement ID:** 25018 | **Theme:** MedTech / HealthTech | **Government of Punjab**

## Problem Statement

Nabha and its surrounding 173 rural villages face significant healthcare challenges:
- Civil Hospital operates at <50% staff capacity (11 doctors for 23 posts)
- Patients travel long distances, missing work
- Specialists often unavailable, medicines out of stock
- Only 31% of rural Punjab households have internet access

---

# 📱 SIMPLE FRONTEND IMPLEMENTATION

**Core Principle: Minimum screens, minimum clicks, maximum clarity**

## 📁 Project Structure

```
Telemedicine_nabha/
├── mobile-app/                    # React Native Patient/ASHA App
│   ├── App.tsx                    # Main app entry
│   ├── package.json
│   └── src/
│       ├── components/            # Reusable UI components
│       │   ├── Button.tsx         # Large accessible button (60px height)
│       │   ├── Card.tsx           # Simple card container
│       │   ├── Checkbox.tsx       # Large checkbox for forms
│       │   ├── StatusBar.tsx      # Network status indicator
│       │   └── TextInput.tsx      # Large text input
│       ├── constants/
│       │   ├── theme.ts           # Colors, sizes, fonts
│       │   └── translations.ts    # Tamil, Hindi, English
│       ├── hooks/
│       │   └── useTranslation.ts  # Translation helper
│       ├── screens/
│       │   ├── LanguageSelectScreen.tsx  # Screen 1: Language
│       │   ├── HomeScreen.tsx            # Screen 2: Dashboard
│       │   ├── AddSymptomsScreen.tsx     # Screen 3: Symptoms
│       │   ├── RecordsScreen.tsx         # Screen 4: Records
│       │   ├── ConsultationScreen.tsx    # Screen 5: Call
│       │   └── MedicineScreen.tsx        # Screen 6: Medicine
│       ├── services/
│       │   ├── api.ts             # REST API calls
│       │   ├── database.ts        # SQLite local DB
│       │   └── sync.ts            # Background sync
│       └── store/
│           └── appStore.ts        # Zustand state management
│
└── doctor-web/                    # React.js Doctor Portal
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── styles/global.css      # Simple CSS, no animations
        ├── pages/
        │   ├── LoginPage.tsx      # Doctor login
        │   ├── DashboardPage.tsx  # Patient queue (priority sorted)
        │   ├── PatientDetailPage.tsx  # Patient info + call button
        │   └── PrescriptionPage.tsx   # Write prescription
        └── store/
            ├── authStore.ts       # Auth state
            └── patientStore.ts    # Patient data
```

---

## 📱 Patient/ASHA Mobile App

### Technology Stack
| Tech | Purpose |
|------|---------|
| React Native | Cross-platform mobile |
| Zustand | Simple state management |
| SQLite | Offline database |
| AsyncStorage | Key-value storage |

### Screens

| # | Screen | Purpose | Offline |
|---|--------|---------|---------|
| 1 | Language Select | Tamil/Hindi/English | ✅ Yes |
| 2 | Home Dashboard | 4 main action buttons | ✅ Yes |
| 3 | Add Symptoms | Checklist + photo + voice | ✅ Yes |
| 4 | Records | Timeline of consultations | ✅ Cached |
| 5 | Consultation | Upcoming call details | ❌ Call only |
| 6 | Medicine | Availability at pharmacy | ✅ Cached |

### Screen Flow
```
┌─────────────────┐
│ Language Select │ → Saved locally, no API
└────────┬────────┘
         ▼
┌─────────────────┐
│  Home Dashboard │
│ ┌─────┐ ┌─────┐ │
│ │🩺   │ │📄   │ │
│ │Add  │ │View │ │
│ │Symp │ │Rec  │ │
│ └─────┘ └─────┘ │
│ ┌─────┐ ┌─────┐ │
│ │📞   │ │💊   │ │
│ │Call │ │Meds │ │
│ └─────┘ └─────┘ │
└─────────────────┘
```

### UI Rules (Implemented)
- ✅ No animations
- ✅ No heavy images
- ✅ Font size minimum 16px
- ✅ Button height 60px
- ✅ High contrast colors
- ✅ Icon + text for every action

---

## 💻 Doctor Web Portal

### Technology Stack
| Tech | Purpose |
|------|---------|
| React.js | Web framework |
| Vite | Build tool |
| Zustand | State management |
| Plain CSS | No frameworks |

### Pages

| Page | Purpose |
|------|---------|
| `/login` | Doctor authentication |
| `/` | Patient queue (urgent first) |
| `/patient/:id` | Patient details + call button |
| `/prescription/:id` | Write prescription form |

### Features
- Patient queue sorted by priority (urgent first)
- Video/Audio call integration
- Simple prescription form with medicines
- Follow-up scheduling

---

## 📴 Offline-First Architecture

```
┌─────────────────────────────────────────────────┐
│                   APP START                      │
└────────────────────┬────────────────────────────┘
                     ▼
              ┌──────────────┐
              │ Check Network│
              └──────┬───────┘
         ┌───────────┴───────────┐
         ▼                       ▼
    ┌─────────┐            ┌──────────┐
    │ ONLINE  │            │ OFFLINE  │
    └────┬────┘            └────┬─────┘
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│ Sync pending    │    │ Load from       │
│ Upload symptoms │    │ SQLite/         │
│ Download cache  │    │ AsyncStorage    │
└─────────────────┘    └─────────────────┘
```

### Sync Logic
```javascript
// Every user action:
1. Save to local DB immediately
2. Mark as "pending_sync"
3. Show "Saved ✓"

// Background (when online):
1. Get all pending items
2. Upload to server
3. Mark as synced
4. Download fresh data
```

---

## 🎨 Design System

### Colors (High Contrast)
```css
--primary:      #2E7D32  /* Green */
--primary-dark: #1B5E20
--secondary:    #1565C0  /* Blue */
--error:        #C62828  /* Red */
--warning:      #F57C00  /* Orange */
--background:   #FFFFFF
--surface:      #F5F5F5
--text:         #212121
```

### Typography
```
Small:   16px
Medium:  20px
Large:   24px
XLarge:  28px
```

### Button Sizes
```
Height:      60px (large touch target)
Min Width:   200px
Padding:     24px horizontal
```

---

## 🌐 Multi-Language Support

| Language | Code | Example |
|----------|------|---------|
| English | `en` | Add Symptoms |
| Tamil | `ta` | அறிகுறிகளை சேர்க்கவும் |
| Hindi | `hi` | लक्षण जोड़ें |

Language saved locally. No API call needed.

---

## ⚠️ Error Messages (User-Friendly)

| Instead of | Show |
|------------|------|
| `ERR_NETWORK` | "Network unavailable" |
| `Error 500` | "Please try later" |
| `Saved to DB` | "Data saved safely" |

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| App Size | < 25 MB |
| Screen Load | < 2 seconds |
| Min Android | 8.0+ |
| Network | Works on 2G (offline-first) |

---

## 🚀 Quick Start

### Mobile App
```bash
cd mobile-app
npm install
npx react-native run-android
```

### Doctor Web
```bash
cd doctor-web
npm install
npm run dev
# Opens at http://localhost:3000
```

---

## ✅ Summary

**Frontend = Forms + Local Storage + Sync + Simple Buttons**

| Aspect | Implementation |
|--------|----------------|
| Technology | React Native + React.js |
| State | Zustand (simple) |
| Offline | SQLite + AsyncStorage |
| UI | Large buttons, no animations |
| Languages | Tamil, Hindi, English |
| Target | Low-end phones, slow network |

**Reliability > Looks**
