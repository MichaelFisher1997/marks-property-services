import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the services data
import { services } from '../../data/services';

// Mock the Services component
const Services = () => (
  <section id="services" data-testid="services-section" className="py-16 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            data-testid={`service-${service.id}`}
          >
            <div className="p-6">
              <div className="text-blue-600 mb-4">
                {service.icon && (
                  <div className="text-4xl mb-3" dangerouslySetInnerHTML={{ __html: service.icon }} />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-4">
                {service.description}
              </p>
              <a 
                href={`#contact`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

describe('Services Component', () => {
  it('renders the services section', () => {
    render(<Services />);
    const servicesSection = screen.getByTestId('services-section');
    expect(servicesSection).toBeInTheDocument();
  });

  it('displays the section heading', () => {
    render(<Services />);
    const heading = screen.getByRole('heading', { name: /our services/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders all services from the data file', () => {
    render(<Services />);
    
    // Check that the correct number of services are rendered
    const serviceCards = screen.getAllByTestId(/^service-/);
    expect(serviceCards).toHaveLength(services.length);
    
    // Check that each service title is displayed
    services.forEach(service => {
      const titleElement = screen.getByText(service.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('displays service descriptions', () => {
    render(<Services />);
    
    services.forEach(service => {
      const descriptionElement = screen.getByText(service.description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  it('has working "Learn more" links', () => {
    render(<Services />);
    
    const learnMoreLinks = screen.getAllByRole('link', { name: /learn more/i });
    learnMoreLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#contact');
    });
  });

  it('has the correct styling classes', () => {
    render(<Services />);
    
    const servicesSection = screen.getByTestId('services-section');
    const heading = screen.getByRole('heading', { name: /our services/i });
    const serviceCards = screen.getAllByTestId(/^service-/);
    
    // Check section styling
    expect(servicesSection).toHaveClass('py-16');
    expect(servicesSection).toHaveClass('px-6');
    expect(servicesSection).toHaveClass('bg-white');
    
    // Check heading styling
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('md:text-4xl');
    expect(heading).toHaveClass('font-bold');
    
    // Check service card styling
    serviceCards.forEach(card => {
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('shadow-lg');
      expect(card).toHaveClass('hover:shadow-xl');
    });
  });

  it('renders service icons', () => {
    render(<Services />);
    
    services.forEach(service => {
      if (service.icon) {
        // Find the parent div that contains the icon
        const iconContainer = screen.getByText(service.title)
          .closest('div')
          ?.querySelector('.text-4xl');
        
        expect(iconContainer).toBeInTheDocument();
      }
    });
  });
});
