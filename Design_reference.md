# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations


### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Elevated surfaces for depth

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# BUILD: Implement frontend Authentication Provider and token flow

## Priority: HIGH | Estimated Time: 1 week

---

## Feature Overview

**Scope Item:** User Authentication (feature)
**Type:** FEATURE
**Status:** Missing or Incomplete


### Description
Create a client-side AuthProvider, central auth service, and protected-route wrapper so the UI can show/hide pages by authentication state. This is essential because many flows (dashboard, decisions, user management) depend on knowing who is signed in and their role. Implement client-side token storage (httpOnly cookie recommended in production) with a refresh endpoint call and automatic refresh on 401.

### Key Requirements
- Implement according to project scope
- Follow existing code patterns
- Ensure proper integration with current features


---

## User Story

**As a** user
**I want to** frontend authentication provider and token flow
**So that** Create a client-side AuthProvider, central auth service, and protected-route wrapper so the UI can show/hide pages by authentication state

### User Flows Affected
This feature enables core user workflows as defined in the project scope.

---

## Current State

### What's Missing
Create a client-side AuthProvider, central auth service, and protected-route wrapper so the UI can show/hide pages by authentication state. This is essential because many flows (dashboard, decisions, user management) depend on knowing who is signed in and their role. Implement client-side token storage (httpOnly cookie recommended in production) with a refresh endpoint call and automatic refresh on 401.

### Impact
- **User Impact:** Users cannot complete essential workflows without this feature
- **Business Impact:** Critical for product functionality
- **Technical Impact:** Feature implementation incomplete

### Files to Create/Modify
- `Create: src/services/auth.ts`
- `Create: src/context/AuthProvider.tsx`
- `Modify: src/App.tsx (wrap routes with AuthProvider)`
- `Create: src/components/ProtectedRoute.tsx`

---

## Implementation Details

### Component Structure

**Feature Components:**
- Create reusable components in `src/components/`
- Implement business logic in `src/services/`
- Add custom hooks in `src/hooks/` if needed
- Integrate with existing state management


### Related Scope Items
See project scope documentation for complete context

### Data Model
- Determine if new database tables/columns are needed
- Ensure proper data validation
- Implement type-safe data structures

### Integration Points

- **Existing Features:** Ensure compatibility with current codebase
- **Services:** Integrate with existing service layer
- **Components:** Reuse and extend existing components
- **State:** Connect to application state management


---

## Acceptance Criteria

### Functional Requirements
- [ ] Implement frontend Authentication Provider and token flow is fully implemented according to scope
- [ ] All required elements are present and functional

- [ ] User flows work end-to-end without errors
- [ ] Proper error handling and user feedback

### Technical Requirements
- [ ] Code follows project conventions and patterns
- [ ] TypeScript types are properly defined
- [ ] No console errors or warnings
- [ ] Responsive design (if UI component)



### Testing
- [ ] Component/function works as expected
- [ ] Edge cases are handled
- [ ] Error scenarios are tested
- [ ] User flows are verified end-to-end

### Integration
- [ ] No breaking changes to existing features
- [ ] All related user flows still work
- [ ] Proper integration with existing codebase
- [ ] Documentation updated if needed

---

## Additional Context

**Project:** Choose & Build — Client Decision & Project Hub for Architecture Firms
**Project Description:** Build a Client Decision + Project Hub for architecture firms: one place to run a project from kickoff to handover while keeping every client choice, approval, and deliverable organized. The app combines a clean project timeline (phases like concept, schematic, DD, permitting, construction admin) with a structured “decision log” where the team publishes options (materials, layouts, fixtures) as simple comparison cards with images, PDFs, cost impacts, and recommendations. Clients can approve, request changes, or ask questions directly on each item, with automatic versioning so the firm can always prove what was chosen, when, and by whom—reducing scope creep and “I never approved that” moments.

On the communication side, the app replaces scattered email threads with contextual messaging tied to tasks, drawings, and decisions, plus a single client portal that feels polished and easy to use. It supports automated weekly updates (“what changed, what’s next, what we need from you”), meeting agendas and notes, shared files with access control, and lightweight e-sign approvals. Internally, the firm gets templates for recurring workflows (residential remodel, commercial fit-out), role-based permissions for team members/contractors, and basic reporting (pending approvals, delays, RFIs, and change requests) so projects move faster with fewer misunderstandings.

**Why This Matters:** Create a client-side AuthProvider, central auth service, and protected-route wrapper so the UI can show/hide pages by authentication state. This is essential because many flows (dashboard, decisions, user management) depend on knowing who is signed in and their role. Implement client-side token storage (httpOnly cookie recommended in production) with a refresh endpoint call and automatic refresh on 401.

**Next Steps After Completion:**
1. Test the implementation thoroughly
2. Verify all acceptance criteria are met
3. Ensure user flows work end-to-end
4. Update project documentation
5. Mark this task as complete in project tracker


## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in RGB format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
