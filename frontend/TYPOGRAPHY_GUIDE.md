# Typography Guide

This guide explains the typography system used in the learning platform.

## Font Families

### Sans-Serif (Body Text)
Used for all UI text, headings, and body content.

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

**Tailwind class:** `font-sans` (default)

### Monospace (Code)
Used for code blocks, code samples, and technical content.

```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 
  "Liberation Mono", "Courier New", monospace;
```

**Tailwind class:** `font-mono`

## Typography Scale

### Headings

#### H1 - Page Titles
```tsx
<h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
  Page Title
</h1>
```
- Size: 36px (mobile) → 48px (desktop)
- Weight: 600 (semibold)
- Line height: 1.1
- Letter spacing: -0.02em

#### H2 - Section Titles
```tsx
<h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
  Section Title
</h2>
```
- Size: 30px (mobile) → 36px (desktop)
- Weight: 600 (semibold)
- Line height: 1.2
- Letter spacing: -0.02em

#### H3 - Subsection Titles
```tsx
<h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
  Subsection Title
</h3>
```
- Size: 24px (mobile) → 30px (desktop)
- Weight: 600 (semibold)
- Line height: 1.25
- Letter spacing: -0.02em

#### H4 - Card Titles
```tsx
<h4 className="text-xl md:text-2xl font-semibold tracking-tight">
  Card Title
</h4>
```
- Size: 20px (mobile) → 24px (desktop)
- Weight: 600 (semibold)
- Line height: 1.3
- Letter spacing: -0.02em

### Body Text

#### Regular Paragraph
```tsx
<p className="text-base leading-relaxed">
  Body text content goes here.
</p>
```
- Size: 16px
- Weight: 400 (regular)
- Line height: 1.625
- Letter spacing: -0.01em

#### Small Text
```tsx
<p className="text-sm leading-relaxed">
  Small text content.
</p>
```
- Size: 14px
- Weight: 400 (regular)
- Line height: 1.5

#### Large Text
```tsx
<p className="text-lg leading-relaxed">
  Large text content.
</p>
```
- Size: 18px
- Weight: 400 (regular)
- Line height: 1.75

### Code Text

#### Inline Code
```tsx
<code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded font-mono">
  console.log()
</code>
```
- Font: Monospace
- Size: 14px
- Background: Gray-100
- Padding: 6px horizontal, 2px vertical

#### Code Block
```tsx
<pre className="font-mono text-sm leading-relaxed">
  const example = "code block";
</pre>
```
- Font: Monospace
- Size: 14px
- Line height: 1.625

## Font Weights

| Weight | Value | Tailwind Class | Usage |
|--------|-------|----------------|-------|
| Regular | 400 | `font-normal` | Body text, descriptions |
| Medium | 500 | `font-medium` | Emphasized text, buttons |
| Semibold | 600 | `font-semibold` | Headings, important text |
| Bold | 700 | `font-bold` | Very important text |

## Text Colors

### Primary Text
```tsx
<p className="text-gray-900">Main content</p>
```

### Secondary Text
```tsx
<p className="text-gray-600">Supporting text</p>
```

### Muted Text
```tsx
<p className="text-gray-500">Less important text</p>
```

### Accent Text
```tsx
<p className="text-primary-600">Links and accents</p>
```

### Code Text
```tsx
<code className="text-gray-800">Code content</code>
```

## Line Heights

| Type | Value | Tailwind Class | Usage |
|------|-------|----------------|-------|
| Tight | 1.25 | `leading-tight` | Large headings |
| Normal | 1.5 | `leading-normal` | Default |
| Relaxed | 1.625 | `leading-relaxed` | Body text, paragraphs |
| Loose | 2 | `leading-loose` | Spacious content |

## Letter Spacing

| Type | Value | Tailwind Class | Usage |
|------|-------|----------------|-------|
| Tighter | -0.05em | `tracking-tighter` | Very large headings |
| Tight | -0.02em | `tracking-tight` | Headings (default) |
| Normal | 0 | `tracking-normal` | Body text |
| Wide | 0.025em | `tracking-wide` | Uppercase text |

## Usage Examples

### Project Title Page
```tsx
<div className="space-y-4">
  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
    Simple FastAPI Server
  </h1>
  <p className="text-xl text-gray-600 leading-relaxed">
    Learn HTTP server basics with your first FastAPI application
  </p>
</div>
```

### Card Component
```tsx
<div className="bg-white rounded-lg p-6">
  <h3 className="text-2xl font-semibold tracking-tight mb-3">
    Learning Objectives
  </h3>
  <p className="text-gray-700 leading-relaxed">
    Understand HTTP server basics and build your first API endpoint.
  </p>
</div>
```

### Code Sample
```tsx
<div className="bg-gray-900 rounded-lg p-4">
  <h4 className="text-sm font-semibold text-gray-200 mb-2">
    Example Code
  </h4>
  <pre className="font-mono text-sm text-gray-300 leading-relaxed">
    <code>
      {`print("Hello, World!")`}
    </code>
  </pre>
</div>
```

### Button Text
```tsx
<button className="font-medium text-sm px-4 py-2">
  Run Code
</button>
```

## Best Practices

### 1. Heading Hierarchy
Always maintain proper heading hierarchy (h1 → h2 → h3 → h4).

```tsx
// ✅ Good
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

// ❌ Bad - skipping levels
<h1>Page Title</h1>
  <h3>Section</h3>
```

### 2. Line Length
Keep line length readable (45-75 characters for optimal readability).

```tsx
// ✅ Good
<div className="max-w-2xl">
  <p>Readable text content...</p>
</div>
```

### 3. Contrast
Ensure sufficient contrast between text and background (WCAG AA minimum).

```tsx
// ✅ Good - 4.5:1 ratio
<p className="text-gray-900 bg-white">High contrast</p>

// ❌ Bad - low contrast
<p className="text-gray-400 bg-gray-300">Low contrast</p>
```

### 4. Code Blocks
Always use monospace font for code and technical content.

```tsx
// ✅ Good
<code className="font-mono">code</code>

// ❌ Bad
<code className="font-sans">code</code>
```

### 5. Responsive Typography
Use responsive font sizes for better mobile experience.

```tsx
// ✅ Good
<h1 className="text-3xl md:text-4xl lg:text-5xl">Title</h1>

// ❌ Bad - fixed size
<h1 className="text-5xl">Title</h1>
```

## Accessibility

### 1. Text Contrast
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum

### 2. Focus States
All interactive text elements have visible focus states:

```tsx
<a className="focus:outline-none focus:ring-2 focus:ring-primary-500">
  Link text
</a>
```

### 3. Text Selection
Custom selection colors for better UX:

```css
::selection {
  background-color: #bae6fd; /* primary-200 */
  color: #0c4a6e; /* primary-900 */
}
```

## Implementation Notes

1. **System Fonts First**: We use system fonts for faster loading and native feel.
2. **No Font Downloads**: No web fonts = faster page loads.
3. **Font Features**: OpenType features enabled (`kern`, `liga`, `calt`).
4. **Antialiasing**: Enabled for smoother rendering.
5. **Smooth Scrolling**: Enabled globally for better UX.

## Tailwind Utilities

Quick reference for common typography utilities:

```tsx
// Font family
font-sans      // System sans-serif
font-mono      // Monospace for code

// Font size
text-xs        // 12px
text-sm        // 14px
text-base      // 16px
text-lg        // 18px
text-xl        // 20px
text-2xl       // 24px
text-3xl       // 30px
text-4xl       // 36px
text-5xl       // 48px

// Font weight
font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700

// Line height
leading-tight    // 1.25
leading-normal   // 1.5
leading-relaxed  // 1.625
leading-loose    // 2

// Letter spacing
tracking-tight   // -0.02em
tracking-normal  // 0
tracking-wide    // 0.025em

// Text alignment
text-left
text-center
text-right
text-justify

// Text color
text-gray-900    // Primary
text-gray-600    // Secondary
text-primary-600 // Accent
```

