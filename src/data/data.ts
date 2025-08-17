export const categories = [
  {
    name: "Textiles & Apparel",
    count: "4,523 Suppliers",
    description: "Garments, Fabrics, Traditional Wear",
    image:
      "https://images.unsplash.com/photo-1524404794194-16bae22718c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGV4dGlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Handicrafts",
    count: "2,891 Suppliers",
    description: "Artisan Products, Home Decor",
    image:
      "https://plus.unsplash.com/premium_photo-1679811675652-2302bf23c9f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGFuZGljcmFmdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Spices & Foods",
    count: "3,127 Suppliers",
    description: "Organic Spices, Processed Foods",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3BpY2VzJTIwJTI2JTIwRm9vZHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Jewelry",
    count: "1,892 Suppliers",
    description: "Gold, Silver, Precious Stones",
    image:
      "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SmV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const featuredProducts = [
  {
    id: 1,
    title: "Premium Basmati Rice",
    description: "Long-grain aromatic rice, aged 2 years. APEDA certified.",
    location: "Punjab, India",
    minOrder: "20 MT",
    price: "$950-1200/MT",
    rating: 4.8,
    reviews: 245,
    images: [
      "https://plus.unsplash.com/premium_photo-1674654419403-1a80edb26881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UHJlbWl1bSUyMEJhc21hdGklMjBSaWNlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1591382560480-380d0c27f2de",
      "https://images.unsplash.com/photo-1604005764230-cfb0765b2199",
    ],
    featured: true,
    badges: ["Best Seller", "Verified Supplier"],
    certifications: ["ISO 22000", "HACCP", "Organic"],
    supplier: {
      name: "Punjab Agro Exports Ltd",
      verified: true,
      yearsActive: 12,
      responseTime: "≤ 24h",
    },
  },
  {
    id: 2,
    title: "Handwoven Silk Sarees",
    description: "Traditional Banarasi Silk with pure zari work",
    location: "Varanasi, India",
    minOrder: "50 pieces",
    price: "$120-180/piece",
    rating: 4.9,
    reviews: 189,
    images: [
      "https://img.freepik.com/premium-photo/full-frame-shot-multi-colored-sarees-store_1048944-4901983.jpg?ga=GA1.1.1815739075.1710174282&semt=ais_hybrid",
      "https://images.unsplash.com/photo-1600072871852-b797ff5cc17a",
      "https://images.unsplash.com/photo-1602571375128-e8c9e5c631fe",
    ],
    featured: true,
    badges: ["Premium", "GI Tagged"],
    certifications: ["Handloom Mark", "Silk Mark"],
    supplier: {
      name: "Varanasi Silks",
      verified: true,
      yearsActive: 15,
      responseTime: "≤ 36h",
    },
  },
  {
    id: 3,
    title: "Organic Turmeric Powder",
    description: "High Curcumin Content (5%+), USDA & EU Certified",
    location: "Kerala, India",
    minOrder: "500 kg",
    price: "$3.5-5/kg",
    rating: 4.7,
    reviews: 312,
    images: [
      "https://img.freepik.com/free-photo/spoon-heap-spices-table_144627-10974.jpg?ga=GA1.1.1815739075.1710174282&semt=ais_hybrid",
      "https://images.unsplash.com/photo-1593505878275-61ee2315e209",
      "https://images.unsplash.com/photo-1553384944-d58bfa420fae",
    ],
    featured: true,
    badges: ["Organic Certified", "Export Quality"],
    certifications: ["USDA Organic", "EU Organic"],
    supplier: {
      name: "Kerala Organic Exports",
      verified: true,
      yearsActive: 8,
      responseTime: "≤ 24h",
    },
  },
];

export const normalProducts = [
  {
    title: "Cotton T-Shirts Bulk",
    description: "180 GSM Pure Cotton, Multiple Colors",
    location: "Tirupur, India",
    minOrder: "1000 pieces",
    price: "$2.5-3.5/piece",
    rating: 4.3,
    reviews: 156,
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1574771410428-379502a3f707",
    ],
    certifications: ["OEKO-TEX"],
  },
  {
    title: "Brass Door Handles",
    description: "Premium Finish, Traditional Designs",
    location: "Moradabad, India",
    minOrder: "500 pieces",
    price: "$8-12/piece",
    rating: 4.4,
    reviews: 89,
    images: [
      "https://img.freepik.com/premium-photo/close-up-door-handle_1048944-6149013.jpg?ga=GA1.1.1815739075.1710174282&semt=ais_hybrid",
      "https://images.unsplash.com/photo-1604534737582-bf1c15f592ee",
    ],
    certifications: ["ISO 9001"],
  },
  {
    title: "Leather Wallets",
    description: "Genuine Leather, Custom Design",
    location: "Kanpur, India",
    minOrder: "200 pieces",
    price: "$15-20/piece",
    rating: 4.5,
    reviews: 167,
    images: [
      "https://img.freepik.com/premium-photo/high-angle-view-wooden-table_1048944-11767453.jpg?ga=GA1.1.1815739075.1710174282&semt=ais_hybrid",
      "https://images.unsplash.com/photo-1546181279-5fd7b459cf1d",
    ],
    certifications: ["LWG Certified"],
  },
];

export const topSuppliers = [
  {
    name: "Rajasthan Textiles Ltd",
    location: "Jaipur, India",
    rating: 4.9,
    reviews: 1245,
    productsSold: "50,000+",
    topCategories: ["Bedding", "Curtains", "Cushion Covers"],
    responseRate: "98%",
    yearEstablished: 2008,
    certifications: ["ISO 9001", "GOTS", "Fair Trade"],
  },
  {
    name: "Gujarat Chemical Industries",
    location: "Ahmedabad, India",
    rating: 4.8,
    reviews: 987,
    productsSold: "75,000+",
    topCategories: ["Dyes", "Pigments", "Industrial Chemicals"],
    responseRate: "95%",
    yearEstablished: 2005,
    certifications: ["ISO 14001", "REACH", "GMP"],
  },
  {
    name: "South Indian Spices Co",
    location: "Kochi, India",
    rating: 4.9,
    reviews: 1567,
    productsSold: "100,000+",
    topCategories: ["Black Pepper", "Cardamom", "Turmeric"],
    responseRate: "99%",
    yearEstablished: 2010,
    certifications: ["FSSC 22000", "Organic", "HACCP"],
  },
];
