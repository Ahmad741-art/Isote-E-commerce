import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package in real-time."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all items. Products must be unworn, unwashed, and in their original packaging with tags attached. Visit our Returns page for detailed instructions."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 100 countries worldwide. International shipping times vary by location, typically taking 7-14 business days. Customs fees may apply and are the responsibility of the customer."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. Express shipping is available for 1-2 day delivery. International orders typically arrive within 7-14 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay for your convenience."
    },
    {
      question: "How do I know my size?",
      answer: "Each product page includes a detailed size guide. We recommend measuring yourself and comparing to our size charts. If you're between sizes, we suggest sizing up for a comfortable fit."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if you need assistance."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! Gift wrapping is available for $5 per item. You can select this option during checkout. We'll also include a personalized gift message if you provide one."
    }
  ];

  return (
    <div style={{
      minHeight: '80vh',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '3px'
        }}>
          FREQUENTLY ASKED
          <br />
          QUESTIONS
        </h1>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '60px',
          fontSize: '16px'
        }}>
          Find answers to common questions about orders, shipping, and returns
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div style={{
                padding: '28px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}>
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  style={{
                    transition: 'transform 0.3s',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                    color: 'var(--accent)',
                    flexShrink: 0
                  }}
                />
              </div>

              <div style={{
                maxHeight: openIndex === index ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}>
                <div style={{
                  padding: '0 32px 28px 32px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '15px'
                }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{
          marginTop: '60px',
          padding: '40px',
          textAlign: 'center',
          background: 'var(--gradient-1)'
        }}>
          <h3 style={{
            fontSize: '24px',
            marginBottom: '12px',
            color: 'var(--text-dark)'
          }}>
            Still have questions?
          </h3>
          <p style={{
            color: 'var(--text-dark)',
            marginBottom: '24px',
            opacity: 0.8
          }}>
            Our support team is here to help
          </p>
          <a href="/contact" className="btn btn-outline" style={{
            borderColor: 'var(--text-dark)',
            color: 'var(--text-dark)'
          }}>
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;