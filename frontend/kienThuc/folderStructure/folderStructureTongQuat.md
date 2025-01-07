src/
├── assets/               # Static files like images, fonts, global CSS
│   ├── images/
│   ├── fonts/
│   └── styles/
│
├── components/          # Reusable UI components
│       ├── Auth/
│       └── Dashboard/
│
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   └── useForm.js
│
├── layouts/            # Layout components
│   ├── MainLayout.jsx
│   └── AuthLayout.jsx
│
├── config/               # Third-party library configurations
│   ├── axios.js
│   └── redux.js
│
├── pages/             # Route components/pages
│   ├── auth/
│   ├── dashboard/
│   └── settings/
│
├── redux/             # Redux related files
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       └── userSlice.js
│
├── services/          # API calls and business logic
│   ├── api.js
│   └── auth.js
│
├── utils/             # Helper functions and constants
│   ├── constants.js
│   ├── formatters.js
│   └── validators.js
│
├── App.jsx
├── main.jsx
└── vite.config.js