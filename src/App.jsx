import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CARS = [
  { id: 1, name: "Maruti Swift", brand: "Maruti Suzuki", price: 699000, type: "Hatchback", fuel: "Petrol", transmission: "Manual", mileage: "23.2 kmpl", engine: "1.2L K-Series", power: "89 bhp", torque: "113 Nm", seats: 5, color: ["Red", "White", "Blue", "Grey"], rating: 4.4, reviews: 2341, img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80", badge: "Best Seller", year: 2024, category: "new" },
  { id: 2, name: "Hyundai Creta", brand: "Hyundai", price: 1099000, type: "SUV", fuel: "Petrol", transmission: "Automatic", mileage: "16.8 kmpl", engine: "1.5L MPi", power: "113 bhp", torque: "144 Nm", seats: 5, color: ["White", "Black", "Silver", "Red"], rating: 4.6, reviews: 3120, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80", badge: "Top Rated", year: 2024, category: "new" },
  { id: 3, name: "Tata Nexon EV", brand: "Tata Motors", price: 1449000, type: "Electric SUV", fuel: "Electric", transmission: "Automatic", mileage: "465 km range", engine: "30.2 kWh Battery", power: "143 bhp", torque: "215 Nm", seats: 5, color: ["Blue", "White", "Grey"], rating: 4.5, reviews: 1890, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", badge: "EV Pick", year: 2024, category: "new" },
  { id: 4, name: "Honda City", brand: "Honda", price: 1199000, type: "Sedan", fuel: "Petrol", transmission: "CVT", mileage: "17.8 kmpl", engine: "1.5L i-VTEC", power: "119 bhp", torque: "145 Nm", seats: 5, color: ["Silver", "White", "Red", "Blue"], rating: 4.5, reviews: 2780, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80", badge: "Premium", year: 2024, category: "new" },
  { id: 5, name: "Kia Seltos", brand: "Kia", price: 1099000, type: "SUV", fuel: "Diesel", transmission: "DCT", mileage: "18.3 kmpl", engine: "1.5L CRDi", power: "113 bhp", torque: "250 Nm", seats: 5, color: ["Black", "White", "Red", "Grey"], rating: 4.7, reviews: 2100, img: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&q=80", badge: "Award Winner", year: 2024, category: "new" },
  { id: 6, name: "Toyota Fortuner", brand: "Toyota", price: 3299000, type: "SUV", fuel: "Diesel", transmission: "Automatic", mileage: "14.2 kmpl", engine: "2.8L GD", power: "201 bhp", torque: "500 Nm", seats: 7, color: ["White", "Silver", "Black"], rating: 4.8, reviews: 1560, img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", badge: "Luxury", year: 2024, category: "new" },
  { id: 7, name: "Maruti Alto K10", brand: "Maruti Suzuki", price: 349000, type: "Hatchback", fuel: "Petrol", transmission: "Manual", mileage: "24.9 kmpl", engine: "1.0L K10C", power: "66 bhp", torque: "89 Nm", seats: 5, color: ["White", "Red", "Grey", "Blue"], rating: 4.1, reviews: 3400, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", badge: "Budget Pick", year: 2023, category: "used" },
  { id: 8, name: "BMW 3 Series", brand: "BMW", price: 4699000, type: "Sedan", fuel: "Petrol", transmission: "Automatic", mileage: "13.7 kmpl", engine: "2.0L TwinPower", power: "252 bhp", torque: "350 Nm", seats: 5, color: ["Black", "White", "Blue", "Grey"], rating: 4.9, reviews: 890, img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", badge: "Premium Luxury", year: 2024, category: "new" },
];

const BRANDS = ["All", "Maruti Suzuki", "Hyundai", "Tata Motors", "Honda", "Kia", "Toyota", "BMW"];
const TYPES = ["All", "Hatchback", "Sedan", "SUV", "Electric SUV"];
const FUELS = ["All", "Petrol", "Diesel", "Electric"];

const USERS_DB = [
  { id: 1, email: "admin@carsarthi.in", password: "admin123", name: "Admin", role: "admin", avatar: "A" },
  { id: 2, email: "user@example.com", password: "user123", name: "Rahul Sharma", role: "user", avatar: "R", wishlist: [1, 3], testdrives: [] },
];

const AI_SYSTEM = `You are CarSarthi's AI car advisor for India. Help users pick the right car. Be concise, friendly, and suggest specific cars from this list: Maruti Swift (₹6.99L, hatchback), Hyundai Creta (₹10.99L, SUV), Tata Nexon EV (₹14.49L, electric), Honda City (₹11.99L, sedan), Kia Seltos (₹10.99L, SUV), Toyota Fortuner (₹32.99L, SUV), Maruti Alto K10 (₹3.49L, budget), BMW 3 Series (₹46.99L, luxury). Ask about budget, usage (city/highway), family size, fuel preference. Keep responses under 100 words.`;

// ─── STYLES ──────────────────────────────────────────────────────────────────
const G = {
  red: "#E63946",
  dark: "#0A0A0F",
  darker: "#050508",
  card: "#111118",
  border: "#1E1E2E",
  text: "#E8E8F0",
  muted: "#6B6B80",
  accent: "#FF4D5E",
  gold: "#FFD166",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  html { scroll-behavior: smooth; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${G.darker};
    color: ${G.text};
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${G.darker}; }
  ::-webkit-scrollbar-thumb { background: ${G.red}; border-radius: 4px; }

  .syne { font-family: 'Syne', sans-serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 70px;
    background: rgba(5,5,8,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${G.border};
    transition: all 0.3s;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    color: white;
    display: flex; align-items: center; gap: 8px;
    cursor: pointer;
  }
  .nav-logo span { color: ${G.red}; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link {
    font-size: 13px; font-weight: 500; letter-spacing: 0.5px;
    color: ${G.muted}; cursor: pointer;
    transition: color 0.2s; text-transform: uppercase;
    background: none; border: none;
  }
  .nav-link:hover, .nav-link.active { color: white; }
  .nav-cta {
    background: ${G.red}; color: white;
    padding: 8px 20px; border-radius: 6px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.2s;
  }
  .nav-cta:hover { background: ${G.accent}; transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    background: radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.12) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(230,57,70,0.06) 0%, transparent 50%),
                ${G.darker};
  }
  .hero-bg-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(${G.border} 1px, transparent 1px),
                      linear-gradient(90deg, ${G.border} 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.3;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  }
  .hero-content {
    position: relative; z-index: 2;
    text-align: center; padding: 0 20px;
    max-width: 900px;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(230,57,70,0.1); border: 1px solid rgba(230,57,70,0.3);
    color: ${G.red}; padding: 6px 16px; border-radius: 20px;
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 28px;
    animation: fadeUp 0.8s ease both;
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 7vw, 88px); font-weight: 800;
    line-height: 1.0; letter-spacing: -2px;
    color: white; margin-bottom: 20px;
    animation: fadeUp 0.8s 0.1s ease both;
  }
  .hero-title .highlight { color: ${G.red}; }
  .hero-sub {
    font-size: 18px; color: ${G.muted}; max-width: 520px; margin: 0 auto 40px;
    line-height: 1.6; animation: fadeUp 0.8s 0.2s ease both;
  }
  .hero-btns {
    display: flex; gap: 16px; justify-content: center;
    animation: fadeUp 0.8s 0.3s ease both;
  }
  .btn-primary {
    background: ${G.red}; color: white;
    padding: 14px 32px; border-radius: 8px;
    font-size: 15px; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.3s;
    box-shadow: 0 0 30px rgba(230,57,70,0.3);
  }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(230,57,70,0.5); }
  .btn-outline {
    background: transparent; color: white;
    padding: 14px 32px; border-radius: 8px;
    font-size: 15px; font-weight: 600; cursor: pointer;
    border: 1px solid ${G.border}; transition: all 0.3s;
  }
  .btn-outline:hover { border-color: white; transform: translateY(-3px); }

  .hero-stats {
    position: relative; z-index: 2;
    display: flex; gap: 60px; margin-top: 80px;
    animation: fadeUp 0.8s 0.4s ease both;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 36px; font-weight: 800; color: white;
  }
  .stat-num span { color: ${G.red}; }
  .stat-label { font-size: 12px; color: ${G.muted}; text-transform: uppercase; letter-spacing: 1px; }

  /* FLOATING CARS */
  .floating-car {
    position: absolute; z-index: 1;
    animation: floatCar 8s ease-in-out infinite;
    opacity: 0.07;
    font-size: 200px;
  }
  .floating-car:nth-child(1) { top: 10%; left: -5%; animation-delay: 0s; }
  .floating-car:nth-child(2) { bottom: 10%; right: -5%; animation-delay: 3s; font-size: 150px; }

  /* CAROUSEL */
  .carousel-section {
    padding: 100px 0; overflow: hidden;
    background: ${G.dark};
  }
  .section-header {
    text-align: center; margin-bottom: 60px; padding: 0 40px;
  }
  .section-label {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: ${G.red}; font-weight: 600; margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(30px, 4vw, 52px); font-weight: 800;
    color: white; letter-spacing: -1px;
  }
  .section-title em { color: ${G.red}; font-style: normal; }

  .carousel-track {
    display: flex; gap: 24px;
    animation: scroll 30s linear infinite;
    width: max-content;
  }
  .carousel-track:hover { animation-play-state: paused; }

  .carousel-card {
    width: 320px; flex-shrink: 0;
    background: ${G.card}; border: 1px solid ${G.border};
    border-radius: 16px; overflow: hidden;
    transition: all 0.4s; cursor: pointer;
    position: relative;
  }
  .carousel-card:hover {
    transform: translateY(-8px) rotateX(2deg);
    border-color: ${G.red};
    box-shadow: 0 20px 60px rgba(230,57,70,0.2);
  }
  .car-img-wrap { height: 200px; overflow: hidden; position: relative; }
  .car-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
  .carousel-card:hover .car-img-wrap img { transform: scale(1.1); }
  .car-badge {
    position: absolute; top: 12px; left: 12px;
    background: ${G.red}; color: white;
    font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
    padding: 4px 10px; border-radius: 4px; text-transform: uppercase;
  }
  .car-info { padding: 20px; }
  .car-brand { font-size: 11px; color: ${G.red}; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .car-name { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: white; margin: 4px 0 12px; }
  .car-specs { display: flex; gap: 16px; margin-bottom: 16px; }
  .car-spec { font-size: 12px; color: ${G.muted}; }
  .car-spec span { display: block; color: white; font-weight: 500; font-size: 13px; }
  .car-footer { display: flex; align-items: center; justify-content: space-between; }
  .car-price { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: white; }
  .car-price small { font-size: 13px; color: ${G.muted}; font-family: 'DM Sans', sans-serif; font-weight: 400; }
  .car-rating { display: flex; align-items: center; gap: 4px; font-size: 13px; color: ${G.gold}; font-weight: 600; }

  /* LISTINGS */
  .listings-section {
    padding: 80px 40px;
    background: ${G.darker};
  }
  .filters {
    display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;
    align-items: center;
  }
  .filter-group { display: flex; flex-direction: column; gap: 4px; }
  .filter-label { font-size: 11px; color: ${G.muted}; text-transform: uppercase; letter-spacing: 1px; }
  .filter-select {
    background: ${G.card}; border: 1px solid ${G.border}; color: white;
    padding: 8px 14px; border-radius: 8px; font-size: 13px;
    cursor: pointer; min-width: 140px; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s; appearance: none;
  }
  .filter-select:focus { outline: none; border-color: ${G.red}; }
  .search-bar {
    flex: 1; min-width: 220px;
    background: ${G.card}; border: 1px solid ${G.border}; color: white;
    padding: 10px 18px; border-radius: 8px; font-size: 14px;
    font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
  }
  .search-bar:focus { outline: none; border-color: ${G.red}; }
  .search-bar::placeholder { color: ${G.muted}; }

  .cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
  .car-card {
    background: ${G.card}; border: 1px solid ${G.border};
    border-radius: 16px; overflow: hidden;
    transition: all 0.4s; cursor: pointer;
  }
  .car-card:hover {
    transform: translateY(-6px);
    border-color: ${G.red};
    box-shadow: 0 16px 50px rgba(230,57,70,0.15);
  }
  .wishlist-btn {
    position: absolute; top: 12px; right: 12px;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(0,0,0,0.5); border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; transition: all 0.2s;
    backdrop-filter: blur(4px);
  }
  .wishlist-btn:hover { transform: scale(1.15); }

  /* DETAIL PAGE */
  .detail-page { padding: 90px 40px 60px; max-width: 1200px; margin: 0 auto; }
  .detail-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 60px; }
  .detail-img { border-radius: 20px; overflow: hidden; }
  .detail-img img { width: 100%; height: 400px; object-fit: cover; }
  .detail-info-title {
    font-family: 'Syne', sans-serif;
    font-size: 42px; font-weight: 800; color: white; margin-bottom: 8px;
  }
  .detail-brand { font-size: 14px; color: ${G.red}; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
  .detail-price { font-family: 'Syne', sans-serif; font-size: 38px; font-weight: 800; color: white; margin-bottom: 24px; }
  .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .spec-item {
    background: rgba(255,255,255,0.03); border: 1px solid ${G.border};
    border-radius: 10px; padding: 16px;
  }
  .spec-key { font-size: 11px; color: ${G.muted}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .spec-val { font-size: 16px; font-weight: 600; color: white; }

  /* COMPARE */
  .compare-table { width: 100%; border-collapse: collapse; margin-top: 32px; }
  .compare-table th, .compare-table td {
    padding: 14px 20px; text-align: left;
    border-bottom: 1px solid ${G.border}; font-size: 14px;
  }
  .compare-table th { color: ${G.red}; font-weight: 700; background: rgba(230,57,70,0.05); }
  .compare-table td { color: ${G.text}; }
  .compare-table tr:hover td { background: rgba(255,255,255,0.02); }

  /* AUTH */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 80px 20px;
    background: radial-gradient(ellipse at center, rgba(230,57,70,0.1) 0%, transparent 70%), ${G.darker};
  }
  .auth-card {
    background: ${G.card}; border: 1px solid ${G.border};
    border-radius: 20px; padding: 50px; width: 100%; max-width: 440px;
  }
  .auth-title {
    font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
    color: white; margin-bottom: 6px;
  }
  .auth-sub { color: ${G.muted}; font-size: 14px; margin-bottom: 36px; }
  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 13px; color: ${G.muted}; font-weight: 500; margin-bottom: 8px; display: block; }
  .form-input {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid ${G.border};
    color: white; padding: 12px 16px; border-radius: 10px;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
  }
  .form-input:focus { outline: none; border-color: ${G.red}; }
  .form-input::placeholder { color: ${G.muted}; }
  .auth-err { color: ${G.red}; font-size: 13px; margin-bottom: 16px; }
  .auth-switch { text-align: center; margin-top: 24px; color: ${G.muted}; font-size: 14px; }
  .auth-switch button { background: none; border: none; color: ${G.red}; cursor: pointer; font-weight: 600; }

  /* ADMIN */
  .admin-layout { display: flex; min-height: 100vh; }
  .admin-sidebar {
    width: 240px; flex-shrink: 0;
    background: ${G.card}; border-right: 1px solid ${G.border};
    padding: 80px 0 24px; position: fixed; top: 0; bottom: 0;
    overflow-y: auto;
  }
  .admin-content { margin-left: 240px; padding: 90px 40px 60px; flex: 1; }
  .sidebar-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 24px; cursor: pointer;
    color: ${G.muted}; font-size: 14px; font-weight: 500;
    transition: all 0.2s; border: none; background: none; width: 100%;
  }
  .sidebar-item:hover, .sidebar-item.active { color: white; background: rgba(230,57,70,0.1); border-left: 3px solid ${G.red}; }
  .admin-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
  .admin-stat {
    background: ${G.card}; border: 1px solid ${G.border}; border-radius: 14px; padding: 24px;
    position: relative; overflow: hidden;
  }
  .admin-stat::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${G.red};
  }
  .admin-stat-icon { font-size: 28px; margin-bottom: 12px; }
  .admin-stat-val { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: white; }
  .admin-stat-label { font-size: 12px; color: ${G.muted}; margin-top: 4px; }

  /* AI CHAT */
  .chat-fab {
    position: fixed; bottom: 32px; right: 32px; z-index: 999;
    width: 60px; height: 60px; border-radius: 50%;
    background: ${G.red}; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; box-shadow: 0 8px 32px rgba(230,57,70,0.5);
    transition: all 0.3s;
    animation: pulse 3s ease-in-out infinite;
  }
  .chat-fab:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(230,57,70,0.7); }
  .chat-window {
    position: fixed; bottom: 108px; right: 32px; z-index: 999;
    width: 360px; height: 520px;
    background: ${G.card}; border: 1px solid ${G.border};
    border-radius: 20px; display: flex; flex-direction: column;
    box-shadow: 0 24px 80px rgba(0,0,0,0.8);
    animation: slideUp 0.3s ease;
    overflow: hidden;
  }
  .chat-header {
    background: ${G.red}; padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .chat-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .chat-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: white; }
  .chat-subtitle { font-size: 11px; color: rgba(255,255,255,0.7); }
  .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .chat-msg { max-width: 80%; font-size: 13px; line-height: 1.5; }
  .chat-msg.ai { align-self: flex-start; }
  .chat-msg.user { align-self: flex-end; }
  .chat-bubble {
    padding: 10px 14px; border-radius: 12px;
    line-height: 1.5; font-size: 13px;
  }
  .chat-msg.ai .chat-bubble { background: rgba(255,255,255,0.06); color: ${G.text}; border-radius: 4px 12px 12px 12px; }
  .chat-msg.user .chat-bubble { background: ${G.red}; color: white; border-radius: 12px 4px 12px 12px; }
  .chat-typing { display: flex; gap: 4px; padding: 10px 14px; }
  .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: ${G.muted}; animation: typing 1.2s ease-in-out infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  .chat-input-wrap {
    padding: 12px 16px; border-top: 1px solid ${G.border};
    display: flex; gap: 8px;
  }
  .chat-input {
    flex: 1; background: rgba(255,255,255,0.06); border: 1px solid ${G.border};
    color: white; padding: 10px 14px; border-radius: 10px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
  }
  .chat-input:focus { outline: none; border-color: ${G.red}; }
  .chat-input::placeholder { color: ${G.muted}; }
  .chat-send {
    background: ${G.red}; border: none; color: white;
    padding: 10px 16px; border-radius: 10px; cursor: pointer;
    font-size: 16px; transition: all 0.2s;
  }
  .chat-send:hover { background: ${G.accent}; }

  /* PROFILE */
  .profile-page { padding: 90px 40px 60px; max-width: 900px; margin: 0 auto; }
  .profile-header {
    display: flex; align-items: center; gap: 24px; margin-bottom: 48px;
    background: ${G.card}; border: 1px solid ${G.border}; border-radius: 20px; padding: 32px;
  }
  .avatar-circle {
    width: 80px; height: 80px; border-radius: 50%;
    background: ${G.red}; display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: white;
    flex-shrink: 0;
  }
  .profile-name { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: white; }
  .profile-email { color: ${G.muted}; font-size: 14px; }

  /* TOAST */
  .toast {
    position: fixed; top: 80px; right: 24px; z-index: 9999;
    background: ${G.card}; border: 1px solid ${G.border};
    border-left: 3px solid ${G.red};
    padding: 14px 20px; border-radius: 10px;
    font-size: 14px; color: white;
    animation: slideInRight 0.3s ease, fadeOut 0.3s 2.5s ease forwards;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  /* TABS */
  .tabs { display: flex; gap: 4px; margin-bottom: 32px; background: ${G.card}; padding: 4px; border-radius: 10px; width: fit-content; }
  .tab {
    padding: 8px 20px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 600; transition: all 0.2s;
    background: none; border: none; color: ${G.muted};
  }
  .tab.active { background: ${G.red}; color: white; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes floatCar {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-30px) rotate(-3deg); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 8px 32px rgba(230,57,70,0.5); }
    50% { box-shadow: 0 8px 48px rgba(230,57,70,0.8), 0 0 0 8px rgba(230,57,70,0.1); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes typing {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(-4px); opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes spin3d {
    from { transform: perspective(600px) rotateY(0deg); }
    to { transform: perspective(600px) rotateY(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* 3D CARD */
  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }
  .card-3d:hover {
    transform: perspective(800px) rotateX(4deg) rotateY(-4deg) scale(1.02);
  }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    padding: 80px 40px; background: ${G.dark};
  }
  .feature-card {
    background: ${G.card}; border: 1px solid ${G.border};
    border-radius: 16px; padding: 32px;
    transition: all 0.4s;
  }
  .feature-card:hover { border-color: ${G.red}; transform: translateY(-4px); }
  .feature-icon { font-size: 40px; margin-bottom: 20px; }
  .feature-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: white; margin-bottom: 8px; }
  .feature-desc { font-size: 14px; color: ${G.muted}; line-height: 1.6; }

  /* FOOTER */
  .footer {
    background: ${G.card}; border-top: 1px solid ${G.border};
    padding: 60px 40px 30px;
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
  .footer-brand { font-size: 13px; color: ${G.muted}; line-height: 1.7; margin-top: 16px; }
  .footer-heading { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: white; margin-bottom: 16px; }
  .footer-link { display: block; font-size: 13px; color: ${G.muted}; margin-bottom: 10px; cursor: pointer; transition: color 0.2s; background: none; border: none; }
  .footer-link:hover { color: white; }
  .footer-bottom { border-top: 1px solid ${G.border}; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 12px; color: ${G.muted}; }

  /* SHIMMER LOADING */
  .shimmer {
    background: linear-gradient(90deg, ${G.card} 25%, rgba(255,255,255,0.05) 50%, ${G.card} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero-title { font-size: 40px; }
    .hero-stats { gap: 30px; }
    .detail-hero { grid-template-columns: 1fr; }
    .admin-sidebar { display: none; }
    .admin-content { margin-left: 0; }
    .admin-stat-grid { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr; padding: 40px 20px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .listings-section { padding: 60px 20px; }
  }

  .page { min-height: 100vh; }
  .tag { display: inline-block; background: rgba(255,255,255,0.06); color: ${G.muted}; padding: 4px 10px; border-radius: 4px; font-size: 12px; margin: 2px; }
  .tag.electric { background: rgba(0,200,150,0.1); color: #00C896; }
  .divider { height: 1px; background: ${G.border}; margin: 32px 0; }
  .text-red { color: ${G.red}; }
  .text-muted { color: ${G.muted}; }
  .text-white { color: white; }
  .fw-800 { font-family: 'Syne', sans-serif; font-weight: 800; }
  .mt16 { margin-top: 16px; }
  .mb24 { margin-bottom: 24px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap8 { gap: 8px; }
  .gap16 { gap: 16px; }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => `₹${(n / 100000).toFixed(2)}L`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return <div className="toast">{msg}</div>;
}

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? G.gold : G.border, fontSize: 14 }}>★</span>
      ))}
      <span style={{ fontSize: 13, color: G.muted, marginLeft: 4 }}>{rating}</span>
    </div>
  );
}

function CarCard({ car, onView, onWishlist, isWishlisted }) {
  return (
    <div className="car-card card-3d" onClick={() => onView(car)}>
      <div className="car-img-wrap" style={{ position: "relative" }}>
        <img src={car.img} alt={car.name} loading="lazy" />
        {car.badge && <div className="car-badge">{car.badge}</div>}
        <button className="wishlist-btn" onClick={e => { e.stopPropagation(); onWishlist(car.id); }}>
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="car-info">
        <div className="car-brand">{car.brand}</div>
        <div className="car-name">{car.name}</div>
        <div className="car-specs">
          <div className="car-spec"><span>{car.fuel}</span>Fuel</div>
          <div className="car-spec"><span>{car.transmission}</span>Trans.</div>
          <div className="car-spec"><span>{car.mileage}</span>Mileage</div>
        </div>
        <div className="car-footer">
          <div className="car-price">{fmt(car.price)} <small>onwards</small></div>
          <div className="car-rating">★ {car.rating} <span style={{ color: G.muted, fontSize: 11 }}>({car.reviews})</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── AI CHAT ─────────────────────────────────────────────────────────────────
function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "ai", text: "👋 Hi! I'm CarSarthi AI. Tell me your budget and needs, and I'll find your perfect car!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = msgs.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AI_SYSTEM,
          messages: [...history, { role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't process that.";
      setMsgs(m => [...m, { role: "ai", text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "ai", text: "Oops! Connection issue. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div>
              <div className="chat-title">CarSarthi AI</div>
              <div className="chat-subtitle">● Online • Car Expert</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 20, cursor: "pointer" }}>×</button>
          </div>
          <div className="chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg ai">
                <div className="chat-bubble">
                  <div className="chat-typing">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-wrap">
            <input
              className="chat-input" placeholder="Ask about cars..."
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <button className="chat-send" onClick={send}>➤</button>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(o => !o)}>
        {open ? "✕" : "🤖"}
      </button>
    </>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <div className="hero">
      <div className="hero-bg-grid" />
      <div style={{ position: "absolute", top: "15%", left: "-8%", fontSize: 220, opacity: 0.04, transform: "rotate(-15deg)", pointerEvents: "none" }}>🚗</div>
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", fontSize: 160, opacity: 0.04, transform: "rotate(10deg)", pointerEvents: "none" }}>🚙</div>
      <div className="hero-content">
        <div className="hero-badge">🇮🇳 India's Smartest Car Platform</div>
        <h1 className="hero-title">
          Find Your<br /><span className="highlight">Perfect Car</span><br />in Minutes
        </h1>
        <p className="hero-sub">Compare specs, prices & reviews across 10,000+ cars in India. Powered by AI to match you with the right vehicle.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("listings")}>Browse Cars →</button>
          <button className="btn-outline" onClick={() => setPage("compare")}>Compare Cars</button>
        </div>
      </div>
      <div className="hero-stats">
        {[["10K+", "Cars Listed"], ["500+", "Brands"], ["2M+", "Happy Users"], ["99%", "Satisfaction"]].map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num.replace("+", "")}<span>{num.includes("+") ? "+" : "%"}</span></div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Carousel({ onView }) {
  const doubled = [...CARS, ...CARS];
  return (
    <div className="carousel-section">
      <div className="section-header">
        <div className="section-label">Explore</div>
        <h2 className="section-title">Trending <em>Cars</em> in India</h2>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="carousel-track">
          {doubled.map((car, i) => (
            <div key={i} className="carousel-card" onClick={() => onView(car)}>
              <div className="car-img-wrap">
                <img src={car.img} alt={car.name} loading="lazy" />
                {car.badge && <div className="car-badge">{car.badge}</div>}
              </div>
              <div className="car-info">
                <div className="car-brand">{car.brand}</div>
                <div className="car-name">{car.name}</div>
                <div className="car-specs">
                  <div className="car-spec"><span>{car.type}</span>Type</div>
                  <div className="car-spec"><span>{car.fuel}</span>Fuel</div>
                </div>
                <div className="car-footer">
                  <div className="car-price">{fmt(car.price)} <small>onwards</small></div>
                  <div className="car-rating">★ {car.rating}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    { icon: "🔍", title: "Smart Search & Filters", desc: "Filter by brand, type, fuel, budget, transmission and find your perfect match instantly." },
    { icon: "⚖️", title: "Side-by-Side Compare", desc: "Compare up to 3 cars simultaneously with detailed spec sheets and price breakdowns." },
    { icon: "🤖", title: "AI Car Advisor", desc: "Our AI understands your lifestyle and recommends the best car for your needs and budget." },
    { icon: "📊", title: "Detailed Specifications", desc: "Get complete engine data, performance figures, safety ratings and ownership costs." },
    { icon: "🛡️", title: "Verified Reviews", desc: "Read 2M+ authentic user reviews and expert ratings to make informed decisions." },
    { icon: "🏎️", title: "New & Used Cars", desc: "Browse certified used cars alongside brand-new models with transparent pricing." },
  ];
  return (
    <div className="features-grid">
      {features.map(f => (
        <div className="feature-card card-3d" key={f.title}>
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-title">{f.title}</div>
          <div className="feature-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function Listings({ user, setPage, setSelectedCar, toast }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [cat, setCat] = useState("all");
  const [wishlist, setWishlist] = useState(user?.wishlist || []);
  const [sort, setSort] = useState("default");

  const filtered = CARS.filter(c =>
    (brand === "All" || c.brand === brand) &&
    (type === "All" || c.type === type) &&
    (fuel === "All" || c.fuel === fuel) &&
    (cat === "all" || c.category === cat) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) =>
    sort === "price-asc" ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price :
        sort === "rating" ? b.rating - a.rating : 0
  );

  const toggleWishlist = (id) => {
    if (!user) { toast("Please login to save to wishlist!"); return; }
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    toast(wishlist.includes(id) ? "Removed from wishlist" : "❤️ Added to wishlist!");
  };

  return (
    <div className="listings-section">
      <div className="section-header" style={{ padding: 0, marginBottom: 40 }}>
        <div className="section-label">Browse</div>
        <h2 className="section-title">All <em>Cars</em></h2>
      </div>

      <div className="tabs">
        {[["all", "All Cars"], ["new", "New"], ["used", "Used"]].map(([v, l]) => (
          <button key={v} className={`tab ${cat === v ? "active" : ""}`} onClick={() => setCat(v)}>{l}</button>
        ))}
      </div>

      <div className="filters">
        <input className="search-bar" placeholder="Search cars, brands..." value={search} onChange={e => setSearch(e.target.value)} />
        {[["Brand", BRANDS, brand, setBrand], ["Type", TYPES, type, setType], ["Fuel", FUELS, fuel, setFuel]].map(([label, opts, val, setter]) => (
          <div className="filter-group" key={label}>
            <div className="filter-label">{label}</div>
            <select className="filter-select" value={val} onChange={e => setter(e.target.value)}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div className="filter-group">
          <div className="filter-label">Sort by</div>
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 24, color: G.muted, fontSize: 14 }}>{filtered.length} cars found</div>

      <div className="cars-grid">
        {filtered.map(car => (
          <CarCard
            key={car.id} car={car}
            onView={c => { setSelectedCar(c); setPage("detail"); }}
            onWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(car.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0", color: G.muted }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, color: "white", marginBottom: 8 }}>No cars found</div>
            <div>Try adjusting your filters</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ car, setPage, toast, user }) {
  const [activeTab, setActiveTab] = useState("specs");
  const [booked, setBooked] = useState(false);

  if (!car) return null;

  const specs = [
    ["Engine", car.engine], ["Power", car.power], ["Torque", car.torque],
    ["Fuel Type", car.fuel], ["Transmission", car.transmission], ["Mileage", car.mileage],
    ["Seating", `${car.seats} Persons`], ["Year", car.year], ["Body Type", car.type],
  ];

  return (
    <div className="detail-page page">
      <button onClick={() => setPage("listings")} style={{ background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 32, fontSize: 13 }}>
        ← Back to Listings
      </button>

      <div className="detail-hero">
        <div className="detail-img" style={{ position: "relative" }}>
          <img src={car.img} alt={car.name} />
          {car.badge && <div className="car-badge" style={{ top: 16, left: 16 }}>{car.badge}</div>}
        </div>
        <div>
          <div className="detail-brand">{car.brand}</div>
          <div className="detail-info-title">{car.name}</div>
          <StarRating rating={car.rating} />
          <div style={{ color: G.muted, fontSize: 13, marginBottom: 20, marginTop: 4 }}>{car.reviews.toLocaleString()} reviews</div>
          <div className="detail-price">{fmt(car.price)} <small style={{ fontSize: 16, color: G.muted, fontFamily: "DM Sans" }}>onwards</small></div>

          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            <span className={`tag ${car.fuel === "Electric" ? "electric" : ""}`}>{car.fuel}</span>
            <span className="tag">{car.transmission}</span>
            <span className="tag">{car.type}</span>
            <span className="tag">{car.seats} Seats</span>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => { setBooked(true); toast("🎉 Test drive booked! Our team will contact you."); }}>
              {booked ? "✓ Booked!" : "Book Test Drive"}
            </button>
            <button className="btn-outline" onClick={() => { toast("💬 Connecting to dealer..."); }}>Get Quote</button>
            <button className="btn-outline" onClick={() => { setPage("compare"); toast("Added to compare!"); }}>+ Compare</button>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, color: G.muted, marginBottom: 8 }}>Available Colors</div>
            <div style={{ display: "flex", gap: 8 }}>
              {car.color.map(c => (
                <div key={c} title={c} style={{
                  width: 28, height: 28, borderRadius: "50%", cursor: "pointer",
                  border: `2px solid ${G.border}`,
                  background: { Red: "#E63946", White: "#F8F9FA", Blue: "#3B82F6", Grey: "#6B7280", Silver: "#C0C0C0", Black: "#1A1A1A" }[c] || G.border,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {[["specs", "Specifications"], ["features", "Features"], ["emi", "EMI Calculator"]].map(([v, l]) => (
          <button key={v} className={`tab ${activeTab === v ? "active" : ""}`} onClick={() => setActiveTab(v)}>{l}</button>
        ))}
      </div>

      {activeTab === "specs" && (
        <div className="spec-grid">
          {specs.map(([k, v]) => (
            <div className="spec-item" key={k}>
              <div className="spec-key">{k}</div>
              <div className="spec-val">{v}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "features" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {["ABS + EBD", "Airbags (6)", "Reverse Camera", "Cruise Control", "Sunroof", "Wireless Charging", "Android Auto", "Apple CarPlay", "Auto Climate Control", "TPMS", "Hill Hold Assist", "Lane Departure Warning"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, background: G.card, borderRadius: 10, border: `1px solid ${G.border}`, fontSize: 14 }}>
              <span style={{ color: "#00C896" }}>✓</span> {f}
            </div>
          ))}
        </div>
      )}

      {activeTab === "emi" && <EmiCalc price={car.price} />}
    </div>
  );
}

function EmiCalc({ price }) {
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [rate, setRate] = useState(8.5);
  const [months, setMonths] = useState(60);

  const loan = price - down;
  const r = rate / 12 / 100;
  const emi = Math.round(loan * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1));
  const total = emi * months;
  const interest = total - loan;

  return (
    <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, padding: 32 }}>
      <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 28 }}>EMI Calculator</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {[
          ["Down Payment (₹)", down, setDown, price * 0.1, price * 0.5, 10000],
          ["Interest Rate (%)", rate, setRate, 6, 18, 0.1],
          ["Loan Tenure (months)", months, setMonths, 12, 84, 12],
        ].map(([label, val, setter, min, max, step]) => (
          <div key={label}>
            <div style={{ fontSize: 13, color: G.muted, marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>
              {label.includes("₹") ? `₹${val.toLocaleString()}` : label.includes("%") ? `${val}%` : `${val} months`}
            </div>
            <input type="range" min={min} max={max} step={step} value={val}
              onChange={e => setter(Number(e.target.value))}
              style={{ width: "100%", accentColor: G.red }} />
          </div>
        ))}
      </div>
      <div style={{ background: `rgba(230,57,70,0.1)`, border: `1px solid rgba(230,57,70,0.2)`, borderRadius: 12, padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[["Monthly EMI", `₹${emi.toLocaleString()}`], ["Total Interest", `₹${(interest / 100000).toFixed(2)}L`], ["Total Amount", `₹${(total / 100000).toFixed(2)}L`]].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: 12, color: G.muted, marginBottom: 6 }}>{k}</div>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: k === "Monthly EMI" ? G.red : "white" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Compare({ toast }) {
  const [selected, setSelected] = useState([CARS[0], CARS[1]]);
  const [adding, setAdding] = useState(null);

  const toggleCar = (car) => {
    if (selected.find(c => c.id === car.id)) {
      setSelected(s => s.filter(c => c.id !== car.id));
    } else if (selected.length < 3) {
      setSelected(s => [...s, car]);
    } else {
      toast("Max 3 cars can be compared at once");
    }
    setAdding(null);
  };

  const fields = [
    ["Price", c => fmt(c.price)],
    ["Engine", c => c.engine],
    ["Power", c => c.power],
    ["Torque", c => c.torque],
    ["Fuel Type", c => c.fuel],
    ["Transmission", c => c.transmission],
    ["Mileage", c => c.mileage],
    ["Seats", c => c.seats],
    ["Rating", c => `★ ${c.rating}`],
    ["Type", c => c.type],
    ["Year", c => c.year],
  ];

  return (
    <div className="listings-section page">
      <div className="section-header" style={{ padding: 0, marginBottom: 40 }}>
        <div className="section-label">Analysis</div>
        <h2 className="section-title">Compare <em>Cars</em></h2>
      </div>

      <div style={{ display: "flex", gap: 20, marginBottom: 40, flexWrap: "wrap" }}>
        {selected.map(car => (
          <div key={car.id} style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 16, minWidth: 250 }}>
            <img src={car.img} style={{ width: 80, height: 56, borderRadius: 8, objectFit: "cover" }} alt={car.name} />
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, color: "white" }}>{car.name}</div>
              <div style={{ fontSize: 13, color: G.red }}>{fmt(car.price)}</div>
            </div>
            <button onClick={() => toggleCar(car)} style={{ marginLeft: "auto", background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
        ))}
        {selected.length < 3 && (
          <div>
            <button onClick={() => setAdding(true)} style={{ background: "none", border: `2px dashed ${G.border}`, color: G.muted, padding: "20px 32px", borderRadius: 14, cursor: "pointer", fontSize: 14 }}>
              + Add Car
            </button>
            {adding && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 20, padding: 32, maxWidth: 600, width: "90%", maxHeight: "70vh", overflowY: "auto" }}>
                  <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Select a Car</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {CARS.filter(c => !selected.find(s => s.id === c.id)).map(car => (
                      <div key={car.id} onClick={() => toggleCar(car)}
                        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`, borderRadius: 10, padding: 16, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
                        <img src={car.img} style={{ width: 60, height: 42, borderRadius: 6, objectFit: "cover" }} alt={car.name} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "white" }}>{car.name}</div>
                          <div style={{ fontSize: 12, color: G.red }}>{fmt(car.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setAdding(null)} style={{ marginTop: 20, background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "8px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {selected.length >= 2 && (
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: 150 }}>Feature</th>
                {selected.map(c => <th key={c.id}>{c.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {fields.map(([label, fn]) => (
                <tr key={label}>
                  <td style={{ color: G.muted, fontSize: 13 }}>{label}</td>
                  {selected.map(c => <td key={c.id} style={{ fontWeight: 500 }}>{fn(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AuthPage({ setUser, setPage }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = () => {
    setErr("");
    if (mode === "login") {
      const u = USERS_DB.find(u => u.email === form.email && u.password === form.password);
      if (!u) { setErr("Invalid email or password."); return; }
      setUser(u);
      setPage(u.role === "admin" ? "admin" : "home");
    } else {
      if (!form.name || !form.email || !form.password) { setErr("All fields required."); return; }
      if (form.password.length < 6) { setErr("Password must be 6+ characters."); return; }
      const newUser = { id: Date.now(), ...form, role: "user", avatar: form.name[0].toUpperCase(), wishlist: [], testdrives: [] };
      USERS_DB.push(newUser);
      setUser(newUser);
      setPage("home");
    }
  };

  return (
    <div className="auth-page page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "white" }}>Car<span style={{ color: G.red }}>Sarthi</span></div>
        </div>
        <div className="auth-title">{mode === "login" ? "Welcome Back" : "Create Account"}</div>
        <div className="auth-sub">{mode === "login" ? "Sign in to your CarSarthi account" : "Join CarSarthi to find your dream car"}</div>

        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>

        {err && <div className="auth-err">⚠ {err}</div>}

        <button className="btn-primary" style={{ width: "100%", padding: "14px", marginBottom: 16 }} onClick={submit}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div style={{ textAlign: "center", fontSize: 13, color: G.muted, marginBottom: 16 }}>
          Demo: admin@carsarthi.in / admin123
        </div>

        <div className="auth-switch">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setMode(m => m === "login" ? "signup" : "login"); setErr(""); }}>
            {mode === "login" ? " Sign Up" : " Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile({ user, setPage, setUser }) {
  const [tab, setTab] = useState("overview");
  if (!user) { setPage("auth"); return null; }
  const wishlistCars = CARS.filter(c => (user.wishlist || []).includes(c.id));

  return (
    <div className="profile-page page">
      <div className="profile-header">
        <div className="avatar-circle">{user.avatar}</div>
        <div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div style={{ marginTop: 8 }}>
            <span className="tag" style={{ background: user.role === "admin" ? "rgba(230,57,70,0.2)" : "rgba(255,255,255,0.06)", color: user.role === "admin" ? G.red : G.muted }}>
              {user.role === "admin" ? "👑 Admin" : "👤 User"}
            </span>
          </div>
        </div>
        <button onClick={() => { setUser(null); setPage("home"); }} style={{ marginLeft: "auto", background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
          Sign Out
        </button>
      </div>

      <div className="tabs">
        {[["overview", "Overview"], ["wishlist", "Wishlist"], ["settings", "Settings"]].map(([v, l]) => (
          <button key={v} className={`tab ${tab === v ? "active" : ""}`} onClick={() => setTab(v)}>{l}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[["❤️", "Wishlist", wishlistCars.length], ["🚗", "Test Drives", 0], ["⭐", "Reviews", 0]].map(([icon, label, val]) => (
            <div key={label} className="admin-stat">
              <div className="admin-stat-icon">{icon}</div>
              <div className="admin-stat-val">{val}</div>
              <div className="admin-stat-label">{label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "wishlist" && (
        wishlistCars.length === 0
          ? <div style={{ textAlign: "center", padding: 60, color: G.muted }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💔</div>
            <div>No cars in wishlist yet. Browse and save cars!</div>
          </div>
          : <div className="cars-grid">
            {wishlistCars.map(car => <CarCard key={car.id} car={car} onView={() => { }} onWishlist={() => { }} isWishlisted />)}
          </div>
      )}

      {tab === "settings" && (
        <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800, color: "white", marginBottom: 24 }}>Account Settings</h3>
          {["Full Name", "Email", "Phone"].map(f => (
            <div className="form-group" key={f}>
              <label className="form-label">{f}</label>
              <input className="form-input" defaultValue={f === "Full Name" ? user.name : f === "Email" ? user.email : "+91 98765 43210"} />
            </div>
          ))}
          <button className="btn-primary">Save Changes</button>
        </div>
      )}
    </div>
  );
}

function Admin({ user, setPage }) {
  const [tab, setTab] = useState("dashboard");
  if (!user || user.role !== "admin") { setPage("home"); return null; }

  const stats = [
    { icon: "🚗", val: CARS.length, label: "Total Listings" },
    { icon: "👥", val: USERS_DB.length, label: "Registered Users" },
    { icon: "📋", val: 142, label: "Test Drive Requests" },
    { icon: "💰", val: "₹2.4Cr", label: "Revenue This Month" },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div style={{ padding: "0 24px", marginBottom: 32 }}>
          <div style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 800, color: "white" }}>Admin Panel</div>
          <div style={{ fontSize: 12, color: G.red }}>CarSarthi CMS</div>
        </div>
        {[["📊", "dashboard", "Dashboard"], ["🚗", "cars", "Manage Cars"], ["👥", "users", "Users"], ["📋", "bookings", "Bookings"], ["📢", "ads", "Promotions"], ["⚙️", "settings", "Settings"]].map(([icon, id, label]) => (
          <button key={id} className={`sidebar-item ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            <span>{icon}</span> {label}
          </button>
        ))}
        <div style={{ padding: "24px", marginTop: "auto" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, width: "100%" }}>
            ← Back to Site
          </button>
        </div>
      </div>

      <div className="admin-content">
        {tab === "dashboard" && (
          <>
            <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "white", marginBottom: 8 }}>Dashboard</div>
            <div style={{ color: G.muted, marginBottom: 32, fontSize: 14 }}>Welcome back, {user.name}</div>
            <div className="admin-stat-grid">
              {stats.map(s => (
                <div className="admin-stat" key={s.label}>
                  <div className="admin-stat-icon">{s.icon}</div>
                  <div className="admin-stat-val">{s.val}</div>
                  <div className="admin-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, color: "white", marginBottom: 20 }}>Recent Listings</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Car", "Brand", "Price", "Type", "Status"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, color: G.muted, borderBottom: `1px solid ${G.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CARS.map(car => (
                    <tr key={car.id}>
                      <td style={{ padding: "12px 16px", fontSize: 14, color: "white", borderBottom: `1px solid ${G.border}` }}>{car.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: 14, color: G.muted, borderBottom: `1px solid ${G.border}` }}>{car.brand}</td>
                      <td style={{ padding: "12px 16px", fontSize: 14, color: G.red, borderBottom: `1px solid ${G.border}` }}>{fmt(car.price)}</td>
                      <td style={{ padding: "12px 16px", fontSize: 14, color: G.muted, borderBottom: `1px solid ${G.border}` }}>{car.type}</td>
                      <td style={{ padding: "12px 16px", borderBottom: `1px solid ${G.border}` }}>
                        <span style={{ background: "rgba(0,200,150,0.1)", color: "#00C896", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "cars" && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "white" }}>Manage Cars</div>
              <button className="btn-primary">+ Add New Car</button>
            </div>
            <div className="cars-grid">
              {CARS.map(car => (
                <div key={car.id} className="car-card">
                  <div className="car-img-wrap">
                    <img src={car.img} alt={car.name} />
                    {car.badge && <div className="car-badge">{car.badge}</div>}
                  </div>
                  <div className="car-info">
                    <div className="car-brand">{car.brand}</div>
                    <div className="car-name">{car.name}</div>
                    <div className="car-footer" style={{ marginTop: 16 }}>
                      <div className="car-price">{fmt(car.price)}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Edit</button>
                        <button style={{ background: "rgba(230,57,70,0.1)", border: `1px solid rgba(230,57,70,0.2)`, color: G.red, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "users" && (
          <>
            <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "white", marginBottom: 32 }}>Users</div>
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["User", "Email", "Role", "Status", "Action"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "14px 20px", fontSize: 12, color: G.muted, background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${G.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS_DB.map(u => (
                    <tr key={u.id}>
                      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${G.border}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.red, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 13, color: "white" }}>{u.avatar}</div>
                          <span style={{ fontSize: 14, color: "white" }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: G.muted, borderBottom: `1px solid ${G.border}` }}>{u.email}</td>
                      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${G.border}` }}>
                        <span style={{ background: u.role === "admin" ? "rgba(230,57,70,0.1)" : "rgba(255,255,255,0.06)", color: u.role === "admin" ? G.red : G.muted, padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${G.border}` }}>
                        <span style={{ background: "rgba(0,200,150,0.1)", color: "#00C896", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Active</span>
                      </td>
                      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${G.border}` }}>
                        <button style={{ background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(tab === "bookings" || tab === "ads" || tab === "settings") && (
          <div style={{ textAlign: "center", padding: "100px 0", color: G.muted }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🚧</div>
            <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>Coming Soon</div>
            <div>This section is under development</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800, color: "white" }}>Car<span style={{ color: G.red }}>Sarthi</span></div>
          <div className="footer-brand">India's most trusted car research platform. Find, compare, and buy your perfect car with confidence.</div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {["🐦", "📘", "📷", "▶️"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.06)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, transition: "all 0.2s" }}>{icon}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-heading">Quick Links</div>
          {[["New Cars", "listings"], ["Used Cars", "listings"], ["Compare", "compare"], ["Reviews", "home"]].map(([l, p]) => (
            <button key={l} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>
        <div>
          <div className="footer-heading">Brands</div>
          {["Maruti Suzuki", "Hyundai", "Tata Motors", "Honda", "Kia", "Toyota"].map(b => (
            <button key={b} className="footer-link" onClick={() => setPage("listings")}>{b}</button>
          ))}
        </div>
        <div>
          <div className="footer-heading">Company</div>
          {["About Us", "Advertise", "Contact", "Privacy Policy", "Terms"].map(l => (
            <button key={l} className="footer-link">{l}</button>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 CarSarthi. All rights reserved. Built for India 🇮🇳</div>
        <div className="footer-copy">Made with ❤️</div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => { setToast(msg); }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "New Cars", id: "listings" },
    { label: "Compare", id: "compare" },
    { label: "Used Cars", id: "listings" },
  ];

  const showNav = !["auth"].includes(page);
  const showFooter = !["auth", "admin"].includes(page);

  return (
    <>
      <style>{css}</style>

      {showNav && (
        <nav className="nav">
          <div className="nav-logo" onClick={() => setPage("home")}>
            🚗 Car<span>Sarthi</span>
          </div>
          <div className="nav-links">
            {navLinks.map(l => (
              <button key={l.label} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>{l.label}</button>
            ))}
            {user?.role === "admin" && (
              <button className="nav-link" onClick={() => setPage("admin")}>Admin ⚙️</button>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {user ? (
              <>
                <button className="nav-link" onClick={() => setPage("profile")} style={{ display: "flex", alignItems: "center", gap: 8, color: "white" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: G.red, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 13 }}>{user.avatar}</div>
                  {user.name.split(" ")[0]}
                </button>
              </>
            ) : (
              <>
                <button className="nav-link" onClick={() => setPage("auth")}>Sign In</button>
                <button className="nav-cta" onClick={() => setPage("auth")}>Get Started</button>
              </>
            )}
          </div>
        </nav>
      )}

      <main>
        {page === "home" && (
          <>
            <Hero setPage={setPage} />
            <Carousel onView={c => { setSelectedCar(c); setPage("detail"); }} />
            <Features />
          </>
        )}
        {page === "listings" && <Listings user={user} setPage={setPage} setSelectedCar={setSelectedCar} toast={showToast} />}
        {page === "detail" && <Detail car={selectedCar} setPage={setPage} toast={showToast} user={user} />}
        {page === "compare" && <Compare toast={showToast} />}
        {page === "auth" && <AuthPage setUser={setUser} setPage={setPage} />}
        {page === "profile" && <Profile user={user} setPage={setPage} setUser={setUser} />}
        {page === "admin" && <Admin user={user} setPage={setPage} />}
      </main>

      {showFooter && <Footer setPage={setPage} />}

      <AiChat />

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
}