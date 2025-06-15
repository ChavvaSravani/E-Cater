<<<<<<< HEAD
# Plate Palooza Catering Platform

A modern, full-featured catering management platform built with React, TypeScript, and Tailwind CSS. This application provides comprehensive catering services management, order tracking, and booking functionality.

## 🚀 Features

### Order Tracking System
- **Detailed Order Information**
  - Comprehensive item details with prices and totals
  - Payment status and transaction information
  - Vendor and customer contact details
  - Special instructions and dietary requirements
  - Real-time order status updates

- **Live Location Tracking**
  - OpenStreetMap integration for real-time delivery tracking
  - Detailed tracking history
  - Visual progress indicators
  - Status updates and estimated delivery times

### Booking Management
- **Interactive Booking Interface**
  - User-friendly booking form
  - Date and time selection
  - Menu customization
  - Location selection with map integration
  - Special requirements input

- **Location Services**
  - OpenStreetMap integration for location selection
  - Service area visualization
  - Distance calculation
  - Delivery zone verification

## 🎨 Component Customization

All components support:
- Tailwind CSS customization
- Theme-based styling
- Responsive design
- Accessibility features
- Dark/Light mode

## 🎨 Technical Stack

### Core Technologies
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Styling**: 
  - Tailwind CSS 3.4.11
  - Tailwind Merge for class composition
  - Tailwind Animate for animations
- **Maps Integration**: OpenStreetMap
- **Build Tool**: Vite 5.4.1
- **Package Manager**: npm/bun
- **State Management**: 
  - React Context/Hooks
  - TanStack React Query for API state
- **Routing**: React Router 6.26.2

### UI Components and Design
- **Component Library**: 
  - Radix UI primitives for accessible components
  - Shadcn UI components
- **Icons**: Lucide React
- **Date Handling**: 
  - date-fns
  - react-day-picker
- **Form Management**:
  - React Hook Form
  - Zod for validation
- **Data Visualization**: Recharts

### Development Tools
- **TypeScript**: Version 5.5.3
- **ESLint**: Version 9.9.0
- **PostCSS**: Version 8.4.47
- **Autoprefixer**: Version 10.4.20
- **SWC**: Via @vitejs/plugin-react-swc for fast compilation

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components and routes
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## 🔑 Key Components

### Core Business Components

#### OrderTracking
- Handles comprehensive order tracking functionality
- Displays detailed order information
- Integrates with OpenStreetMap for live tracking
- Manages order status updates and history
- Features:
  - Real-time order status
  - Payment information display
  - Contact details section
  - Special instructions handling
  - Interactive map integration

#### BookingDetails
- Manages booking creation and modification
- Integrates location services with OpenStreetMap
- Handles user input validation
- Processes booking submissions
- Features:
  - Interactive booking form
  - Location selection via map
  - Date and time picker integration
  - Menu customization interface
  - Validation and error handling

### UI Component Library

#### Layout Components
- **Navigation**: Responsive navigation menu with dropdown support
- **Sidebar**: Collapsible sidebar for admin/user dashboard
- **Layout**: Flexible layout components for consistent page structure

#### Form Components
- **Input Fields**: Text, number, and specialized input types
- **Select**: Dropdown selection with search capability
- **Radio/Checkbox**: Selection controls with custom styling
- **Form**: Form handling with validation integration
- **Calendar**: Date picker for booking management
- **OTP Input**: One-time password input for verification

#### Feedback Components
- **Toast**: Non-intrusive notifications
- **Alert**: Important system messages
- **Progress**: Visual progress indicators
- **Dialog**: Modal dialogs for important actions
- **Drawer**: Slide-out panels for additional content

#### Data Display
- **Table**: Data grid for order and booking management
- **Card**: Information cards for menu items and orders
- **Chart**: Data visualization for analytics
- **Avatar**: User profile images
- **Badge**: Status indicators

#### Interactive Elements
- **Button**: Action buttons with various states
- **Toggle**: State toggles for settings
- **Accordion**: Collapsible content sections
- **Tabs**: Content organization
- **Tooltip**: Contextual help information

### Utility Components
- **ThemeProvider**: Application-wide theme management
- **SearchCommand**: Global search functionality
- **ResizablePanel**: Adjustable layout sections

## 🔄 State Management

The application uses React's Context API and custom hooks for state management, providing:
- Order state management
- Booking state management
- User authentication state
- Location tracking state

## 📡 API Integration

### Authentication Flow
- Clerk integration for secure authentication
- JWT token management
- Protected routes and API endpoints
- Role-based access control (RBAC)

### Data Management
- TanStack React Query for API state
- Optimistic updates for better UX
- Efficient caching strategies
- Error boundary handling

### Real-time Features
- Live order tracking updates
- Real-time status notifications
- Location tracking integration
- Instant booking confirmations

### Core Endpoints
```typescript
/api/orders     // Order management
/api/bookings   // Booking management
/api/users      // User management
/api/tracking   // Location tracking
/api/menu       // Menu management
```

## 🔒 Security

### Authentication Security
- Secure session management
- Protected API endpoints
- Token-based authentication
- Secure password handling

### Data Protection
- HTTPS encryption
- XSS protection
- CSRF protection
- Input validation

### API Security
- Rate limiting
- Request validation
- Error handling
- Audit logging

## 🗺️ Maps Integration

The platform uses OpenStreetMap for:
- Live order tracking
- Service area visualization
- Location selection in bookings
- Distance calculations

## 🚀 Deployment

The application can be built for production using:
```bash
npm run build
# or
bun run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact [support email/contact information]

# Welcome to your My project


# Step : Install the necessary dependencies.
npm i

# Step : Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces*

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?


Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Vercel Deployment https://vercel.com/docs
=======
# E-Cater
>>>>>>> c2fd1c573d11dfa85992d327d669819882745ed5
