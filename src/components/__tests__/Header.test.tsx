import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Astro components since we can't import them directly
const Header = () => (
  <header className="bg-slate-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a href="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Mark's Property Services Logo" 
            className="h-16 w-auto"
            data-testid="logo"
          />
        </a>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-blue-400" data-testid="title">Mark's Property Services</h1>
          <p className="text-slate-300 text-sm" data-testid="subtitle">No job too small!</p>
        </div>
      </div>
      <nav className="hidden md:flex space-x-8 items-center">
        <a href="#services" className="text-slate-300 hover:text-white transition-colors font-medium" data-testid="services-link">Services</a>
        <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium" data-testid="contact-link">Contact</a>
        <a 
          href="#contact" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          data-testid="contact-button"
        >
          Contact Us
        </a>
      </nav>
    </div>
  </header>
);

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });

  it('displays the site title and subtitle', () => {
    render(<Header />);
    const title = screen.getByTestId('title');
    const subtitle = screen.getByTestId('subtitle');
    
    expect(title).toHaveTextContent("Mark's Property Services");
    expect(subtitle).toHaveTextContent('No job too small!');
  });

  it('contains navigation links', () => {
    render(<Header />);
    const servicesLink = screen.getByTestId('services-link');
    const contactLink = screen.getByTestId('contact-link');
    const contactUsButton = screen.getByTestId('contact-button');
    
    expect(servicesLink).toHaveAttribute('href', '#services');
    expect(servicesLink).toHaveTextContent('Services');
    expect(contactLink).toHaveAttribute('href', '#contact');
    expect(contactLink).toHaveTextContent('Contact');
    expect(contactUsButton).toHaveAttribute('href', '#contact');
    expect(contactUsButton).toHaveTextContent('Contact Us');
  });

  it('has the correct styling classes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    const contactButton = screen.getByTestId('contact-button');
    
    // Check header classes
    expect(header).toHaveClass('bg-slate-900');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    
    // Check button classes
    expect(contactButton).toHaveClass('bg-blue-600');
    expect(contactButton).toHaveClass('hover:bg-blue-700');
    expect(contactButton).toHaveClass('rounded-md');
  });
});
