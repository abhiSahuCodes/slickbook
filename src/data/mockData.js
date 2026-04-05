export const MOCK_USERS = [
  { id: 'u1', name: 'User One', email: 'user1@test.com', password: 'password123' },
  { id: 'u2', name: 'User Two', email: 'user2@test.com', password: 'password123' },
  { id: 'u3', name: 'User Three', email: 'user3@test.com', password: 'password123' },
];

export const generateSlots = (providerId) => {
  const slots = [];
  const today = new Date();
  
  for (let i = 0; i < 6; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    
    // Default morning, afternoon, evening times
    const times = [
      { hour: 9, min: 0 },
      { hour: 13, min: 0 },
      { hour: 17, min: 0 },
    ];
    
    times.forEach(t => {
      const slotDate = new Date(currentDate);
      slotDate.setHours(t.hour, t.min, 0, 0);
      
      const timeLabel = slotDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      const dateLabel = slotDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      
      slots.push({
        id: `${providerId}-${slotDate.toISOString().split('T')[0]}-${t.hour}${t.min}`,
        datetime: slotDate.toISOString(),
        label: `${dateLabel} • ${timeLabel}`,
        isBooked: false,
      });
    });
  }
  
  return slots;
};

export const MOCK_PROVIDERS = [
  {
    id: 'p1',
    name: 'Dr. John Doe',
    category: 'Doctor',
    image: 'https://i.pravatar.cc/150?img=1',
    bio: 'Experienced general practitioner. Specializes in preventive care and internal medicine.',
    rating: 4.8,
    experience: '15 years',
    availableSlots: generateSlots('p1')
  },
  {
    id: 'p2',
    name: 'Sarah Smith',
    category: 'Salon',
    image: 'https://i.pravatar.cc/150?img=2',
    bio: 'Professional hair stylist and color expert. Turning your dream looks into reality.',
    rating: 4.9,
    experience: '8 years',
    availableSlots: generateSlots('p2')
  },
  {
    id: 'p3',
    name: 'Mike Johnson',
    category: 'Fitness Trainer',
    image: 'https://i.pravatar.cc/150?img=3',
    bio: 'Certified personal trainer focused on strength and conditioning. Helps you achieve your fitness goals.',
    rating: 4.7,
    experience: '6 years',
    availableSlots: generateSlots('p3')
  },
  {
    id: 'p4',
    name: 'Dr. Emily Chen',
    category: 'Dentist',
    image: 'https://i.pravatar.cc/150?img=4',
    bio: 'Gentle family dentist providing comprehensive oral care. Expertise in cosmetic dentistry.',
    rating: 4.9,
    experience: '12 years',
    availableSlots: generateSlots('p4')
  },
  {
    id: 'p5',
    name: 'Dr. Alan Turing',
    category: 'Therapist',
    image: 'https://i.pravatar.cc/150?img=5',
    bio: 'Licensed clinical psychologist. Specializing in cognitive behavioral therapy and mindfulness.',
    rating: 4.6,
    experience: '10 years',
    availableSlots: generateSlots('p5')
  },
  {
    id: 'p6',
    name: 'Lisa Wong',
    category: 'Nutritionist',
    image: 'https://i.pravatar.cc/150?img=6',
    bio: 'Registered dietitian helping clients build sustainable eating habits. Focuses on holistic wellness.',
    rating: 4.5,
    experience: '5 years',
    availableSlots: generateSlots('p6')
  },
  {
    id: 'p7',
    name: 'Emma Watson',
    category: 'Salon',
    image: 'https://i.pravatar.cc/150?img=7',
    bio: 'Expert nail technician and aesthetician. Making sure you look your best for any occasion.',
    rating: 4.8,
    experience: '4 years',
    availableSlots: generateSlots('p7')
  },
  {
    id: 'p8',
    name: 'Dr. Robert Bruce',
    category: 'Doctor',
    image: 'https://i.pravatar.cc/150?img=8',
    bio: 'Board-certified pediatrician. Dedicated to providing compassionate care for children of all ages.',
    rating: 5.0,
    experience: '20 years',
    availableSlots: generateSlots('p8')
  }
];
