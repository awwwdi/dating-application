export const mockUsers = [
  {
    _id: '1',
    profile: {
      firstName: 'Sarah',
      age: 25,
      photos: [
        'https://picsum.photos/400/600?random=1',
        'https://picsum.photos/400/600?random=2',
      ],
      bio: 'Love traveling and photography',
      occupation: 'Photographer',
      education: 'Art Institute',
      location: { city: 'New York' },
      interests: ['Photography', 'Travel', 'Art'],
    },
  },
  {
    _id: '2',
    profile: {
      firstName: 'Emma',
      age: 28,
      photos: [
        'https://picsum.photos/400/600?random=3',
        'https://picsum.photos/400/600?random=4',
      ],
      bio: 'Software engineer by day, musician by night',
      occupation: 'Software Engineer',
      education: 'MIT',
      location: { city: 'San Francisco' },
      interests: ['Coding', 'Music', 'Gaming'],
    },
  },
  {
    _id: '3',
    profile: {
      firstName: 'Olivia',
      age: 26,
      photos: [
        'https://picsum.photos/400/600?random=5',
        'https://picsum.photos/400/600?random=6',
      ],
      bio: 'Yoga instructor and wellness enthusiast',
      occupation: 'Yoga Instructor',
      education: 'Health Sciences',
      location: { city: 'Los Angeles' },
      interests: ['Yoga', 'Meditation', 'Fitness'],
    },
  },
];

export const mockMatches = [
  {
    _id: 'm1',
    user1: { _id: 'current', profile: { firstName: 'You' } },
    user2: mockUsers[0],
    lastMessage: {
      content: 'Hey, how are you?',
      createdAt: new Date().toISOString(),
    },
  },
]; 