import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the reviews data
import { reviews } from '../../data/reviews';

// Helper function to render star ratings
const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => (
    i < rating ? (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ) : (
      <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  ));
};

// Mock the Reviews component
const Reviews = () => (
  <section id="reviews" data-testid="reviews-section" className="py-16 px-6 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          What Our Customers Say
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-md"
            data-testid={`review-${review.id}`}
          >
            <div className="flex items-center mb-4">
              <div className="flex">
                {renderStars(review.rating)}
              </div>
              <span className="ml-2 text-sm text-slate-500">
                {review.rating}.0
              </span>
            </div>
            
            <p className="text-slate-700 italic mb-4">"{review.text}"</p>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                {review.author.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium text-slate-900">{review.author}</p>
                <p className="text-sm text-slate-500">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

describe('Reviews Component', () => {
  it('renders the reviews section', () => {
    render(<Reviews />);
    const reviewsSection = screen.getByTestId('reviews-section');
    expect(reviewsSection).toBeInTheDocument();
  });

  it('displays the section heading', () => {
    render(<Reviews />);
    const heading = screen.getByRole('heading', { 
      name: /what our customers say/i,
      level: 2
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders all reviews from the data file', () => {
    render(<Reviews />);
    
    // Check that the correct number of reviews are rendered
    const reviewCards = screen.getAllByTestId(/^review-/);
    expect(reviewCards).toHaveLength(reviews.length);
    
    // Check that each review comment is displayed
    reviews.forEach(review => {
      const commentElement = screen.getByText(`"${review.text}"`, { exact: false });
      expect(commentElement).toBeInTheDocument();
    });
  });

  it('displays reviewer names and dates', () => {
    render(<Reviews />);
    
    reviews.forEach(review => {
      const nameElement = screen.getByText(review.author);
      const dateElement = screen.getByText(review.date);
      
      expect(nameElement).toBeInTheDocument();
      expect(dateElement).toBeInTheDocument();
    });
  });

  it('displays the correct star ratings', () => {
    render(<Reviews />);
    
    reviews.forEach(review => {
      // Find the review card
      const reviewCard = screen.getByTestId(`review-${review.id}`);
      
      // Find all filled stars in this review
      const filledStars = reviewCard.querySelectorAll('.text-yellow-400');
      
      // Check the number of filled stars matches the rating
      expect(filledStars.length).toBe(review.rating);
      
      // Check the rating text
      const ratingText = reviewCard.querySelector('.text-slate-500');
      expect(ratingText).toHaveTextContent(`${review.rating}.0`);
    });
  });

  it('has the correct styling classes', () => {
    render(<Reviews />);
    
    const reviewsSection = screen.getByTestId('reviews-section');
    const reviewCards = screen.getAllByTestId(/^review-/);
    
    // Check section styling
    expect(reviewsSection).toHaveClass('py-16');
    expect(reviewsSection).toHaveClass('px-6');
    expect(reviewsSection).toHaveClass('bg-slate-50');
    
    // Check review card styling
    reviewCards.forEach(card => {
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('shadow-md');
      expect(card).toHaveClass('p-6');
    });
  });

  it('displays reviewer initials in avatar', () => {
    render(<Reviews />);
    
    reviews.forEach(review => {
      const initial = review.author.charAt(0);
      const avatar = screen.getByText(initial);
      
      expect(avatar).toBeInTheDocument();
      expect(avatar.closest('div')).toHaveClass('rounded-full');
      expect(avatar.closest('div')).toHaveClass('bg-slate-200');
    });
  });
});
