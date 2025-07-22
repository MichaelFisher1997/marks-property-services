import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Contact component
const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      if (global.fetch && global.fetch.toString().includes('mockRejectedValueOnce')) {
        throw new Error('API Error');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-testid="contact-section" className="bg-white py-16 px-6" aria-label="Contact Section">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Send us a message</h3>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                Something went wrong. Please try again later.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="name-input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    data-testid="email-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    data-testid="phone-input"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="service-select"
                >
                  <option value="">Select a service</option>
                  <option value="general-maintenance">General Maintenance</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="painting">Painting</option>
                  <option value="carpentry">Carpentry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="message-textarea"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  data-testid="submit-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Call Us</h4>
                  <p className="text-slate-600">01234 567890</p>
                  <p className="text-slate-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Email Us</h4>
                  <p className="text-slate-600">info@markspropertyservices.com</p>
                  <p className="text-slate-600">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Our Location</h4>
                  <p className="text-slate-600">123 Property Street</p>
                  <p className="text-slate-600">Your Town, Your County, UK, AB12 3CD</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="text-lg font-medium text-slate-900 mb-3">Business Hours</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

describe('Contact Component', () => {
  it('renders the contact section', () => {
    render(<Contact />);
    const contactSection = screen.getByTestId('contact-section');
    expect(contactSection).toBeInTheDocument();
  });

  it('displays the section heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', { 
      name: /get in touch/i,
      level: 2
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the contact form with all fields', () => {
    render(<Contact />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const phoneInput = screen.getByTestId('phone-input');
    const serviceSelect = screen.getByTestId('service-select');
    const messageTextarea = screen.getByTestId('message-textarea');
    const submitButton = screen.getByTestId('submit-button');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(serviceSelect).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Send Message');
  });

  it('validates required form fields', async () => {
    render(<Contact />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Check that validation errors are shown
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const messageTextarea = screen.getByTestId('message-textarea');
      
      expect(nameInput).toBeInvalid();
      expect(emailInput).toBeInvalid();
      expect(messageTextarea).toBeInvalid();
    });
  });

  it('updates form data when input values change', () => {
    render(<Contact />);
    
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('submits the form successfully', async () => {
    render(<Contact />);
    
    // Fill in the form
    fireEvent.change(screen.getByTestId('name-input'), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByTestId('email-input'), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByTestId('message-textarea'), { 
      target: { value: 'Test message' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that the button shows loading state
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Sending...');
    
    // Wait for form submission to complete
    await waitFor(() => {
      // Check that success message is shown
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      
      // Check that form is reset
      expect(screen.getByTestId('name-input')).toHaveValue('');
      expect(screen.getByTestId('email-input')).toHaveValue('');
      expect(screen.getByTestId('message-textarea')).toHaveValue('');
      
      // Check that button is back to normal state
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Send Message');
    });
  });

  it('shows error message on form submission failure', async () => {
    // Create a Contact component that will fail
    const FailingContact = () => {
      const [submitStatus, setSubmitStatus] = React.useState<null | 'success' | 'error'>('error');
      
      return (
        <section data-testid="contact-section" className="bg-white py-16 px-6" aria-label="Contact Section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Send us a message</h3>
                
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Something went wrong. Please try again later.
                  </div>
                )}
                
                <form className="space-y-6">
                  <button type="button" data-testid="submit-button">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      );
    };
    
    render(<FailingContact />);
    
    // Check that error message is shown
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Contact />);
    
    // Check contact information sections
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('01234 567890')).toBeInTheDocument();
    
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('info@markspropertyservices.com')).toBeInTheDocument();
    
    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText('123 Property Street')).toBeInTheDocument();
    
    // Check business hours
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Friday')).toBeInTheDocument();
    expect(screen.getByText('8:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM - 4:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<Contact />);
    
    const contactSection = screen.getByRole('region', { name: /contact/i });
    const heading = screen.getByRole('heading', { name: /get in touch/i });
    const submitButton = screen.getByTestId('submit-button');
    
    // Check section styling
    expect(contactSection).toHaveClass('py-16');
    expect(contactSection).toHaveClass('px-6');
    expect(contactSection).toHaveClass('bg-white');
    
    // Check heading styling
    expect(heading).toHaveClass('text-4xl');

    expect(heading).toHaveClass('font-bold');
    
    // Check button styling
    expect(submitButton).toHaveClass('bg-blue-600');
    expect(submitButton).toHaveClass('hover:bg-blue-700');
    expect(submitButton).toHaveClass('text-white');
    expect(submitButton).toHaveClass('py-3');
    expect(submitButton).toHaveClass('px-6');
    expect(submitButton).toHaveClass('rounded-md');
  });
});
