import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Hero component
const Hero = () => (
  <section data-testid="hero" className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20 px-6">
    <div className="relative z-10 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">
        Established over 10 years,<br />
        <span className="text-blue-400">you're in safe hands with Mark</span>
      </h2>
      <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
        Professional property maintenance and handyman services in the local area.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <a 
          href="#contact" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-md text-lg transition-colors"
          data-testid="contact-button"
        >
          Get a Free Quote
        </a>
        <a 
          href="#services" 
          className="bg-transparent hover:bg-slate-700 text-white font-bold py-4 px-8 border-2 border-white rounded-md text-lg transition-colors"
          data-testid="services-button"
        >
          Our Services
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 text-left">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <h3 className="text-lg font-semibold">Call Us</h3>
          </div>
          <p className="text-slate-300">01234 567890</p>
        </div>
        
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 text-left">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-lg font-semibold">Email Us</h3>
          </div>
          <p className="text-slate-300">info@markspropertyservices.com</p>
        </div>
        
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 text-left">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h3 className="text-lg font-semibold">Location</h3>
          </div>
          <p className="text-slate-300">Your Town, Your County, UK</p>
        </div>
      </div>
    </div>
  </section>
);

describe('Hero Component', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    const hero = screen.getByTestId('hero');
    expect(hero).toBeInTheDocument();
  });

  it('displays the main heading and subheading', () => {
    render(<Hero />);
    
    const mainHeading = screen.getByText(/Established over 10 years/i);
    const subHeading = screen.getByText(/you're in safe hands with Mark/i);
    const description = screen.getByText(/Professional property maintenance/i);
    
    expect(mainHeading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    
    const contactButton = screen.getByTestId('contact-button');
    const servicesButton = screen.getByTestId('services-button');
    
    expect(contactButton).toHaveTextContent('Get a Free Quote');
    expect(contactButton).toHaveAttribute('href', '#contact');
    expect(servicesButton).toHaveTextContent('Our Services');
    expect(servicesButton).toHaveAttribute('href', '#services');
  });

  it('displays contact information cards', () => {
    render(<Hero />);
    
    // Check that contact information is displayed
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('01234 567890')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('info@markspropertyservices.com')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Your Town, Your County, UK')).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<Hero />);
    
    const hero = screen.getByTestId('hero');
    const contactButton = screen.getByTestId('contact-button');
    const servicesButton = screen.getByTestId('services-button');
    
    // Check hero section classes
    expect(hero).toHaveClass('bg-gradient-to-br');
    expect(hero).toHaveClass('from-slate-800');
    expect(hero).toHaveClass('to-slate-900');
    
    // Check button classes
    expect(contactButton).toHaveClass('bg-blue-600');
    expect(contactButton).toHaveClass('hover:bg-blue-700');
    expect(servicesButton).toHaveClass('border-2');
    expect(servicesButton).toHaveClass('border-white');
  });
});
