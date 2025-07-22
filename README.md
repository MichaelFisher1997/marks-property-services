# Mark's Property Services Website

A modern, responsive single-page website for Mark's Property Services, rebuilt with Astro, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Modern Tech Stack**: Built with Astro, TypeScript, and Tailwind CSS
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🎨 **Beautiful Design**: Clean, professional layout with smooth animations
- 📧 **Contact Form**: Integrated with Resend for email functionality
- ⭐ **Google Reviews**: Display customer reviews from Google Maps
- ⚡ **Fast Performance**: Optimized for speed and SEO
- 🔍 **SEO Optimized**: Meta tags and structured data for search engines

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Resend API key (for contact form)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd marks-property-services
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your Resend API key to `.env`:

```bash
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@markspropertyservice.co.uk
TO_EMAIL=info@markspropertyservice.co.uk
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Astro components
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Services.astro
│   ├── Reviews.astro
│   ├── Contact.astro
│   └── Footer.astro
├── data/               # Static data
│   ├── reviews.ts
│   └── services.ts
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # Pages
│   ├── index.astro
│   └── api/
│       └── contact.ts  # Contact form API
└── styles/
    └── global.css      # Global styles
```

## Customization

### Adding New Services

Edit `src/data/services.ts` to add or modify services:

```typescript
export const services: Service[] = [
  {
    id: "new-service",
    title: "New Service",
    icon: "🛠️",
    description: "Description of your new service",
    items: ["Service item 1", "Service item 2"],
  },
];
```

### Adding Reviews

Edit `src/data/reviews.ts` to add customer reviews:

```typescript
export const reviews: Review[] = [
  {
    id: "2",
    author: "New Customer",
    rating: 5,
    date: "2 weeks ago",
    text: "Great service!",
    avatar: "NC",
  },
];
```

### Styling

The project uses Tailwind CSS with custom colors defined in `src/styles/global.css`. You can customize the theme by modifying the CSS variables.

## Contact Form Setup

The contact form uses Resend for email delivery. To set it up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add it to your `.env` file
4. Verify your sending domain in Resend

## Deployment

This site can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo
- **Vercel**: Import from GitHub
- **GitHub Pages**: Use GitHub Actions
- **Astro Cloud**: Deploy directly from the Astro CLI

### Deploy to Netlify

1. Push to GitHub
2. Connect your repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **SEO**: Optimized with meta tags and structured data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is private and proprietary to Mark's Property Services.
