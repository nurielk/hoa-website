import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonialsData: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonialsData }) => {
  return (
    <section id="testimonials" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            {testimonialsData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{testimonialsData.subtitle}</p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid-responsive-3">
          {testimonialsData.items.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Rating & Quote Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <Quote size={24} color="var(--border-subtle)" />
                </div>

                <p
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '24px',
                    fontWeight: 500,
                  }}
                >
                  "{item.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src={item.avatarUrl}
                  alt={`תמונת ${item.author} - ${item.role}`}
                  loading="lazy"
                  width="48"
                  height="48"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(59, 130, 246, 0.4)',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1rem' }}>
                    {item.author}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', fontWeight: 700 }}>
                    {item.role}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.building}, {item.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
