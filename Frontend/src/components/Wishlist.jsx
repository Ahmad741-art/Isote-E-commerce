import React from 'react';

// ULTRA MINIMAL TEST COMPONENT
// If this doesn't show, your routing is broken

const WishlistTest = () => {
  return (
    <div style={{
      padding: '100px',
      textAlign: 'center',
      fontSize: '24px',
      background: 'yellow',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        ✅ WISHLIST ROUTE IS WORKING!
      </h1>
      <p>If you can see this yellow page, your route is set up correctly.</p>
      <p style={{ marginTop: '20px' }}>
        Current URL: {window.location.pathname}
      </p>
      <p style={{ marginTop: '20px' }}>
        LocalStorage wishlist: {localStorage.getItem('wishlist') || 'empty'}
      </p>
    </div>
  );
};

export default WishlistTest;

/*
INSTRUCTIONS:
1. Copy this file to: Frontend/src/pages/WishlistTest.jsx
2. In App.js, change the route to:
   <Route path="/wishlist" element={<WishlistTest />} />
3. Go to: http://localhost:3000/wishlist
4. Do you see the YELLOW page with "WISHLIST ROUTE IS WORKING"?
   
   YES? → Your routing works! The problem is with the real Wishlist component
   NO? → Your routing is broken. You need to fix App.js

After testing, you can switch back to the real Wishlist component.
*/