// Enterprise Perishable Food Rescue & Logistics Data Model

export const ENTERPRISE_DONORS = [
  {
    id: 'donor-1',
    name: 'The Grand Rajputana Palace Hotel',
    orgType: 'Luxury Hospitality & Banqueting',
    locationName: 'Statue Circle, C-Scheme, Jaipur',
    lat: 26.9124,
    lng: 75.8056,
    gstin: '08AAAAA0000A1Z5',
    category: 'Cooked Meals',
    foodItem: 'Royal Thali Spread: Paneer Lababdar, Dal Makhani & Jeera Pulao',
    quantityKg: 62,
    mealsEquivalent: 155,
    preparedAt: '2 hours ago',
    safeHoursRemaining: 2.5,
    holdingTempC: 64, // Hot holding >60C (HACCP verified)
    dietary: 'Pure Veg',
    allergens: ['Dairy'],
    urgency: 'HIGH',
    status: 'SURPLUS_AVAILABLE',
    contactPerson: 'Chef Devendra Singh',
    contact: '+91 98290 11234',
    tag: 'HOTEL',
    certEligible: true,
    estimatedValueInr: 18600
  },
  {
    id: 'donor-2',
    name: 'Spice Courtyard Premium Dining',
    orgType: 'Fine Dine Restaurant',
    locationName: 'Vaishali Nagar, Sector 4, Jaipur',
    lat: 26.9028,
    lng: 75.7423,
    gstin: '08BBBBB1111B2Z6',
    category: 'Cooked Meals',
    foodItem: 'Dum Biryani, Dal Tadka & Fresh Tandoori Rotis',
    quantityKg: 38,
    mealsEquivalent: 95,
    preparedAt: '1.5 hours ago',
    safeHoursRemaining: 2.8,
    holdingTempC: 62,
    dietary: 'Pure Veg',
    allergens: ['Gluten', 'Dairy'],
    urgency: 'HIGH',
    status: 'SURPLUS_AVAILABLE',
    contactPerson: 'Manager Rakesh Gupta',
    contact: '+91 98290 44556',
    tag: 'RESTAURANT',
    certEligible: true,
    estimatedValueInr: 11400
  },
  {
    id: 'donor-3',
    name: 'Jaipur Bakers Guild & Patisserie',
    orgType: 'Commercial Bakery Chain',
    locationName: 'Malviya Nagar, Calgiri Marg, Jaipur',
    lat: 26.8530,
    lng: 75.8190,
    gstin: '08CCCCC2222C3Z7',
    category: 'Bakery & Bread',
    foodItem: 'Multigrain Loaves, Brioche & Savory Pastries',
    quantityKg: 24,
    mealsEquivalent: 60,
    preparedAt: '3 hours ago',
    safeHoursRemaining: 5.5,
    holdingTempC: 22,
    dietary: 'Veg / Bakery',
    allergens: ['Gluten'],
    urgency: 'SAFE',
    status: 'SURPLUS_AVAILABLE',
    contactPerson: 'Megha Agarwal',
    contact: '+91 94140 99881',
    tag: 'BAKERY',
    certEligible: true,
    estimatedValueInr: 7200
  },
  {
    id: 'donor-4',
    name: 'Infosys IT Park Food Court',
    orgType: 'Corporate Food Services',
    locationName: 'Mahindra World City, SEZ, Jaipur',
    lat: 26.8285,
    lng: 75.6322,
    gstin: '08DDDDD3333D4Z8',
    category: 'Cooked Meals',
    foodItem: 'Executive Lunch Buffet Surplus: Mixed Veg & Steamed Rice',
    quantityKg: 48,
    mealsEquivalent: 120,
    preparedAt: '2.5 hours ago',
    safeHoursRemaining: 1.8,
    holdingTempC: 61,
    dietary: 'Vegetarian',
    allergens: ['Dairy'],
    urgency: 'CRITICAL',
    status: 'SURPLUS_AVAILABLE',
    contactPerson: 'Anand Verma',
    contact: '+91 98280 44321',
    tag: 'CORPORATE',
    certEligible: true,
    estimatedValueInr: 14400
  },
  {
    id: 'donor-5',
    name: 'Metro Hypermarket Fresh Mart',
    orgType: 'Retail Supermarket Chain',
    locationName: 'Tonk Road, Durgapura, Jaipur',
    lat: 26.8510,
    lng: 75.7900,
    gstin: '08EEEEE4444E5Z9',
    category: 'Raw Produce & Dairy',
    foodItem: 'Fresh Apples, Carrots, Paneer Blocks & Milk Pouches',
    quantityKg: 55,
    mealsEquivalent: 135,
    preparedAt: 'Packaged Today',
    safeHoursRemaining: 6.0,
    holdingTempC: 4,
    dietary: 'Pure Veg',
    allergens: ['Dairy'],
    urgency: 'SAFE',
    status: 'SURPLUS_AVAILABLE',
    contactPerson: 'Suresh Singhania',
    contact: '+91 98299 12340',
    tag: 'SUPERMARKET',
    certEligible: true,
    estimatedValueInr: 12100
  }
];

export const ENTERPRISE_SHELTERS = [
  {
    id: 'shelter-1',
    name: 'Robin Hood Army - Central City Hub',
    regNumber: 'NGO-RAJ-2019-0412',
    locationName: 'Civil Lines Slum Distribution Center, Jaipur',
    lat: 26.9080,
    lng: 75.7890,
    totalCapacityMeals: 180,
    currentNeededMeals: 140,
    activeBeneficiaries: 135,
    dietaryAccepted: ['Pure Veg', 'Vegetarian', 'Bakery'],
    intakeTimeWindow: '11:00 AM - 11:30 PM',
    coldStorageAvailable: true,
    contactPerson: 'Arun Meena (City Lead)',
    phone: '+91 98292 23344',
    priority: 'HIGH',
    handoverPin: '482910'
  },
  {
    id: 'shelter-2',
    name: 'Asha Orphanage Care & Education Home',
    regNumber: 'NGO-RAJ-2015-1189',
    locationName: 'Mansarovar, Sector 7, Jaipur',
    lat: 26.8650,
    lng: 75.7680,
    totalCapacityMeals: 85,
    currentNeededMeals: 70,
    activeBeneficiaries: 65,
    dietaryAccepted: ['Pure Veg', 'Bakery', 'Vegetarian'],
    intakeTimeWindow: '08:00 AM - 09:30 PM',
    coldStorageAvailable: false,
    contactPerson: 'Sunita Sharma (Director)',
    phone: '+91 94142 66778',
    priority: 'MEDIUM',
    handoverPin: '918234'
  },
  {
    id: 'shelter-3',
    name: 'Apna Ghar Elder Haven Sanctuary',
    regNumber: 'NGO-RAJ-2012-0054',
    locationName: 'Raja Park, Lane 4, Jaipur',
    lat: 26.8920,
    lng: 75.8280,
    totalCapacityMeals: 60,
    currentNeededMeals: 45,
    activeBeneficiaries: 42,
    dietaryAccepted: ['Pure Veg', 'Soft Cooked Foods'],
    intakeTimeWindow: '10:00 AM - 09:00 PM',
    coldStorageAvailable: true,
    contactPerson: 'Dr. Ramesh Mathur',
    phone: '+91 98294 88776',
    priority: 'MEDIUM',
    handoverPin: '639102'
  },
  {
    id: 'shelter-4',
    name: 'Annapurna Community Night Relief Kitchen',
    regNumber: 'NGO-RAJ-2021-9921',
    locationName: 'Jaipur Junction Relief Camp, Platform 1 North',
    lat: 26.9200,
    lng: 75.7870,
    totalCapacityMeals: 250,
    currentNeededMeals: 210,
    activeBeneficiaries: 200,
    dietaryAccepted: ['Pure Veg', 'Vegetarian', 'Bakery', 'Produce'],
    intakeTimeWindow: '24 Hours Open',
    coldStorageAvailable: true,
    contactPerson: 'Vikram Joshi (Camp Incharge)',
    phone: '+91 94133 11992',
    priority: 'VERY_HIGH',
    handoverPin: '772183'
  }
];

export const ENTERPRISE_FLEET = [
  {
    id: 'van-1',
    name: 'Rescue Van 01 (Eco EV Chill)',
    plate: 'RJ-14-EC-4029',
    type: 'Refrigerated Electric Van',
    driverName: 'Vikram Choudhary',
    driverPhone: '+91 99281 22345',
    maxCapacityKg: 150,
    currentLoadKg: 0,
    status: 'ONLINE_IDLE',
    batteryPercent: 88,
    refrigerationTempC: 3.8,
    lat: 26.8850,
    lng: 75.7900,
    completedMissionsToday: 4,
    odometerKm: 42.5
  },
  {
    id: 'van-2',
    name: 'Rescue Van 02 (Rapid Cruiser EV)',
    plate: 'RJ-14-VB-8812',
    type: 'Thermal Insulated EV',
    driverName: 'Kunal Rathore',
    driverPhone: '+91 98299 77612',
    maxCapacityKg: 220,
    currentLoadKg: 48,
    status: 'EN_ROUTE_DELIVERY',
    batteryPercent: 68,
    refrigerationTempC: 5.2,
    lat: 26.8520,
    lng: 75.7920,
    completedMissionsToday: 6,
    odometerKm: 58.2
  }
];

export const AUDIT_TRAIL = [
  {
    id: 'AUD-2026-901',
    timestamp: '2026-09-24 14:15:20',
    donorName: 'The Grand Rajputana Palace Hotel',
    shelterName: 'Robin Hood Army - Central City Hub',
    foodItem: 'Royal Thali Spread',
    quantityKg: 62,
    mealsRescued: 155,
    co2eAvoidedKg: 155.0,
    transitTimeMins: 22,
    handoverVerifiedBy: 'Arun Meena (OTP Verified)',
    haccpStatus: 'PASSED (Temp: 64°C -> 58°C)',
    status: 'COMPLETED'
  },
  {
    id: 'AUD-2026-902',
    timestamp: '2026-09-24 13:42:10',
    donorName: 'Spice Courtyard Dining',
    shelterName: 'Annapurna Community Night Kitchen',
    foodItem: 'Dum Biryani & Dal Tadka',
    quantityKg: 38,
    mealsRescued: 95,
    co2eAvoidedKg: 95.0,
    transitTimeMins: 18,
    handoverVerifiedBy: 'Vikram Joshi (Digital Seal)',
    haccpStatus: 'PASSED (Temp: 62°C -> 57°C)',
    status: 'COMPLETED'
  },
  {
    id: 'AUD-2026-903',
    timestamp: '2026-09-24 11:20:05',
    donorName: 'Jaipur Bakers Guild',
    shelterName: 'Asha Orphanage Care Home',
    foodItem: 'Multigrain Loaves & Pastries',
    quantityKg: 24,
    mealsRescued: 60,
    co2eAvoidedKg: 60.0,
    transitTimeMins: 14,
    handoverVerifiedBy: 'Sunita Sharma (OTP Verified)',
    haccpStatus: 'PASSED (Ambient Clean)',
    status: 'COMPLETED'
  }
];

export const HOURLY_PREDICTIVE_DATA = [
  { hour: '12:00 PM', lunchPeakSurplusKg: 45, actualRescuedKg: 40, predictedTonightKg: 85 },
  { hour: '02:00 PM', lunchPeakSurplusKg: 78, actualRescuedKg: 75, predictedTonightKg: 110 },
  { hour: '04:00 PM', lunchPeakSurplusKg: 25, actualRescuedKg: 22, predictedTonightKg: 95 },
  { hour: '06:00 PM', lunchPeakSurplusKg: 18, actualRescuedKg: 15, predictedTonightKg: 140 },
  { hour: '08:00 PM', lunchPeakSurplusKg: 35, actualRescuedKg: 30, predictedTonightKg: 220 },
  { hour: '10:00 PM', lunchPeakSurplusKg: 95, actualRescuedKg: 90, predictedTonightKg: 310 },
  { hour: '11:30 PM', lunchPeakSurplusKg: 140, actualRescuedKg: 130, predictedTonightKg: 380 }
];

// Heuristic Matching Algorithm with Real Geospatial Distance (Haversine formula)
export function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(1);
}

export function computeMatchScores(donor, shelters) {
  return shelters.map(shelter => {
    const distanceKm = Math.max(1.2, calculateHaversineDistanceKm(donor.lat, donor.lng, shelter.lat, shelter.lng));

    // Distance Score: closer is better
    const distanceScore = Math.max(10, Math.min(100, 100 - (distanceKm * 7)));

    // Capacity Match Score
    const mealsDonated = donor.mealsEquivalent || (donor.quantityKg * 2.5);
    const needRatio = shelter.currentNeededMeals / mealsDonated;
    let capacityScore = 0;
    if (needRatio >= 0.8 && needRatio <= 1.5) {
      capacityScore = 100;
    } else if (needRatio > 1.5) {
      capacityScore = 85;
    } else {
      capacityScore = Math.max(20, Math.round(needRatio * 100));
    }

    // Urgency Factor (Expiry remaining)
    let urgencyBonus = 50;
    if (donor.safeHoursRemaining <= 2.0) urgencyBonus = 95;
    else if (donor.safeHoursRemaining <= 3.5) urgencyBonus = 75;

    // Shelter Need Priority
    const priorityWeights = {
      'VERY_HIGH': 100,
      'HIGH': 85,
      'MEDIUM': 65,
      'LOW': 40
    };
    const shelterNeedScore = priorityWeights[shelter.priority] || 60;

    // Dietary Compatibility
    const dietaryMatch = shelter.dietaryAccepted.some(d => 
      d.toLowerCase().includes(donor.dietary.toLowerCase()) || 
      donor.dietary.toLowerCase().includes('veg') && d.toLowerCase().includes('veg') ||
      d.toLowerCase().includes('all')
    );
    const dietaryScore = dietaryMatch ? 100 : 25;

    // Weighted Formula: 35% Dist + 30% Capacity + 20% Shelter Need + 15% Dietary & Urgency
    const totalScore = Math.round(
      (distanceScore * 0.35) +
      (capacityScore * 0.30) +
      (shelterNeedScore * 0.20) +
      ((dietaryScore * 0.6 + urgencyBonus * 0.4) * 0.15)
    );

    return {
      shelterId: shelter.id,
      shelterName: shelter.name,
      locationName: shelter.locationName,
      distanceKm,
      distanceScore: Math.round(distanceScore),
      capacityScore: Math.round(capacityScore),
      shelterNeedScore,
      dietaryMatch,
      totalScore,
      mealsNeeded: shelter.currentNeededMeals,
      mealsOffered: Math.round(mealsDonated),
      handoverPin: shelter.handoverPin,
      recommendationReason: totalScore > 80 
        ? 'Optimal Match: High capacity & short transit time'
        : totalScore > 65 
        ? 'Strong Alternative: Moderate distance with high demand'
        : 'Sub-optimal: Lower need or farther travel'
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

// Environmental & ESG Metrics (EPA / WARM / GHG Protocol)
export function calculateImpactMetrics(totalKg) {
  const meals = Math.round(totalKg * 2.5);
  const co2eAvoidedKg = +(totalKg * 2.5).toFixed(1);
  const waterLitersSaved = Math.round(totalKg * 142);
  const treeDaysEquivalent = +((co2eAvoidedKg / 21) * 365).toFixed(0);
  const methaneAvoidedKg = +(totalKg * 0.089).toFixed(2);
  const totalTaxBenefitInr = Math.round(totalKg * 280);

  return {
    totalKg,
    meals,
    co2eAvoidedKg,
    waterLitersSaved,
    treeDaysEquivalent,
    methaneAvoidedKg,
    totalTaxBenefitInr
  };
}

// Audio Synthesizer
export function playChime(type = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'rescue_start') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
        noteGain.gain.setValueAtTime(0.14, now + idx * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        noteOsc.start(now + idx * 0.08);
        noteOsc.stop(now + idx * 0.08 + 0.4);
      });
    } else if (type === 'urgent_alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.linearRampToValueAtTime(350, now + 0.25);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Audio context restriction
  }
}

// CSV Export Utility
export function exportAuditCsv(auditList) {
  const headers = ['Audit ID', 'Timestamp', 'Donor', 'Shelter / NGO', 'Food Item', 'Weight (kg)', 'Meals Rescued', 'CO2e Avoided (kg)', 'Transit Time (mins)', 'HACCP Safety', 'Verified By', 'Status'];
  const rows = auditList.map(item => [
    item.id,
    `"${item.timestamp}"`,
    `"${item.donorName}"`,
    `"${item.shelterName}"`,
    `"${item.foodItem}"`,
    item.quantityKg,
    item.mealsRescued,
    item.co2eAvoidedKg,
    item.transitTimeMins,
    `"${item.haccpStatus}"`,
    `"${item.handoverVerifiedBy}"`,
    item.status
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `RescueTrack_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
