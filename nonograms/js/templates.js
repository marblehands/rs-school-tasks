const templates = [
  [
    {
      size: 5,
      level: 'easy',
      name: 'hash',
      map: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
      ],
      matrix: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
      ],
    },
    {
      size: 5,
      level: 'easy',
      name: 'smile',
      map: [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      matrix: [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
    },
    {
      size: 5,
      level: 'easy',
      name: 'star',
      map: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
      ],
      matrix: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
      ],
    },
    {
      size: 5,
      level: 'easy',
      name: 'dog',
      map: [
        [0, 0, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ],
      matrix: [
        [0, 0, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ],
    },
    {
      size: 5,
      level: 'easy',
      name: 'cat',
      map: [
        [0, 0, 1, 0, 1],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
      ],
      matrix: [
        [0, 0, 1, 0, 1],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
      ],
    },
  ],
  [
    {
      size: '10',
      level: 'medium',
      name: 'mushroom',
      map: [
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      matrix: [
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      size: '10',
      level: 'medium',
      name: 'yacht',
      map: [
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
      ],
    },
    {
      size: '10',
      level: 'medium',
      name: 'mouse',
      map: [
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
      matrix: [
        [0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
    },
    {
      size: '10',
      level: 'medium',
      name: 'cherry',
      map: [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
      ],
    },
    {
      size: '10',
      level: 'medium',
      name: 'rock star',
      map: [
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
      ],
      matrix: [
        [1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      ],
    },
  ],
  [
    {
      size: '15',
      level: 'hard',
      name: 'peach',
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
      ],
    },
    {
      size: '15',
      level: 'hard',
      name: 'ship',
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      ],
    },
    {
      size: '15',
      level: 'hard',
      name: 'ezhik',
      map: [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
      ],
    },
    {
      size: '15',
      level: 'hard',
      name: 'Sorting Hat',
      map: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
      matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
    },
    {
      size: '15',
      level: 'hard',
      name: 'Cherry Blossom',
      map: [
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1],
        [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      ],
      matrix: [
        [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
      ],
    },
  ],
];

export default templates;
