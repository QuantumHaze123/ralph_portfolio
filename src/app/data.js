export const person = {
  name: 'Ralph H. Lorzano',
  initials: 'RL',
  role: 'Junior Backend Developer',
  tagline: 'I build the APIs that power products — clean, documented, and built to scale.',
  bio: `I'm Ralph, a junior backend developer from the Philippines with a focus on designing and building RESTful APIs that are reliable, well-structured, and easy to integrate.

My experience spans agriculture tech, retail point-of-sale, real-time messaging, and attendance management — each project deepening my understanding of how good backend architecture quietly powers everything users see.

I'm currently sharpening my skills in Node.js, Express, and database design, and actively looking for opportunities where I can contribute, learn from senior engineers, and grow into a well-rounded backend engineer.`,
  location: 'Philippines',
  available: true,
  email: 'ralphlorz0987@gmail.com',
  github: 'https://github.com/QuantumHaze123',
  linkedin: 'https://linkedin.com/in/ralph-lorzano',
  resumeUrl: '/pdf/Ralph Resume.pdf',
}

export const skills = [
  { category: 'Runtime & Frameworks', items: ['Node.js', 'Express.js', 'PHP', 'Laravel'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { category: 'API & Protocols', items: ['REST API', 'JSON', 'WebSocket', 'MQTT'] },
  { category: 'Auth & Security', items: ['JWT', 'OAuth2', 'bcrypt', 'CORS', 'Helmet.js'] },
  { category: 'Tools & DevOps', items: ['Git', 'Postman', 'Docker', 'Linux', 'Nginx'] },
  { category: 'Testing & Docs', items: ['Jest', 'Supertest', 'Swagger/OpenAPI', 'Insomnia'] },
]

export const projects = [
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture System API',
    subtitle: 'Farm data management & monitoring',
    accent: '#00ff88',
    gradient: 'from-green-900/30 to-emerald-900/10',
    border: 'border-green-500/15',
    endpoints: [
      { method: 'GET',  path: '/api/v1/crops',            desc: 'List all crop records' },
      { method: 'POST', path: '/api/v1/harvest',          desc: 'Log harvest entry' },
      { method: 'GET',  path: '/api/v1/weather/forecast', desc: 'Fetch weather data' },
      { method: 'PUT',  path: '/api/v1/fields/:id',       desc: 'Update field metadata' },
    ],
    tech: ['Node.js', 'Express.js', 'MySQL', 'REST API', 'JWT', 'Swagger'],
  },
  {
    id: 'pos',
    icon: '🧾',
    title: 'POS System API',
    subtitle: 'Point-of-sale transaction backend',
    accent: '#00c4ff',
    gradient: 'from-blue-900/30 to-cyan-900/10',
    border: 'border-blue-500/15',
    endpoints: [
      { method: 'POST',  path: '/api/v1/transactions',  desc: 'Process sale transaction' },
      { method: 'GET',   path: '/api/v1/products',      desc: 'Fetch product inventory' },
      { method: 'PATCH', path: '/api/v1/stock/:id',     desc: 'Adjust stock levels' },
      { method: 'GET',   path: '/api/v1/reports/daily', desc: 'Daily sales summary' },
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'JWT', 'Redis'],
  },
  {
    id: 'chat',
    icon: '💬',
    title: 'Chat System API',
    subtitle: 'Real-time messaging backend',
    accent: '#a78bfa',
    gradient: 'from-purple-900/30 to-violet-900/10',
    border: 'border-purple-500/15',
    endpoints: [
      { method: 'POST', path: '/api/v1/messages',          desc: 'Send a message' },
      { method: 'GET',  path: '/api/v1/rooms/:id/history', desc: 'Fetch chat history' },
      { method: 'WS',   path: '/ws/room/:id',              desc: 'Real-time room socket' },
      { method: 'POST', path: '/api/v1/auth/login',        desc: 'Authenticate user' },
    ],
    tech: ['Node.js', 'Express.js', 'WebSocket', 'MongoDB', 'JWT', 'Redis'],
  },
  {
    id: 'attendance',
    icon: '📋',
    title: 'Attendance System API',
    subtitle: 'Employee time & attendance tracking',
    accent: '#fb923c',
    gradient: 'from-orange-900/30 to-amber-900/10',
    border: 'border-orange-500/15',
    endpoints: [
      { method: 'POST', path: '/api/v1/attendance/clock-in',     desc: 'Record clock-in event' },
      { method: 'POST', path: '/api/v1/attendance/clock-out',    desc: 'Record clock-out event' },
      { method: 'GET',  path: '/api/v1/employees/:id/summary',   desc: 'Get attendance summary' },
      { method: 'GET',  path: '/api/v1/reports/monthly',         desc: 'Monthly attendance report' },
    ],
    tech: ['Node.js', 'Express.js', 'MySQL', 'REST API', 'JWT', 'Swagger'],
  },
]

export const methodColors = {
  GET:   { bg: 'rgba(0,255,136,0.1)',   text: '#00ff88', border: 'rgba(0,255,136,0.25)' },
  POST:  { bg: 'rgba(0,196,255,0.1)',   text: '#00c4ff', border: 'rgba(0,196,255,0.25)' },
  PUT:   { bg: 'rgba(251,146,60,0.1)',  text: '#fb923c', border: 'rgba(251,146,60,0.25)' },
  PATCH: { bg: 'rgba(167,139,250,0.1)', text: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
  WS:    { bg: 'rgba(244,114,182,0.1)', text: '#f472b6', border: 'rgba(244,114,182,0.25)' },
}
