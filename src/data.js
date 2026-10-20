import alumni from './assets/alumni.webp'
import bombay from './assets/bombay.webp'
import pms from './assets/pms.webp'
import book from './assets/book.webp'

// All site content lives here. Source: Yash_Naiya_Resume_Software.pdf (Oct 2026).

export const profile = {
  name: 'Yash Naiya',
  role: 'Software Developer',
  study: 'M.Tech in Data Analytics, NIT Tiruchirappalli',
  location: 'Tiruchirappalli, Tamil Nadu',
  relocation: 'Open to relocation',
  email: 'yashnaiya16@gmail.com',
  phone: '+91 90818 19007',
  phoneHref: 'tel:+919081819007',
  links: {
    github: 'https://github.com/yashNaiya',
    linkedin: 'https://www.linkedin.com/in/yashnaiya/',
  },
  resume: '/Yash-Naiya-Resume.pdf',
  formspreeId: 'mrgrqoyk',
}

// Projects sit on the bookshelf: `shelf: 'recent'` on the top shelf, `'earlier'` below.
// `short` is the text printed on the book spine.
// TODO: replace each `link: '#'` with the real project URL (GitHub repo or live demo).
export const projects = [
  {
    shelf: 'recent',
    title: 'Lightweight LLM-Driven SQL Query Generation',
    short: 'Text-to-SQL LLM',
    dates: 'May – Jun 2026',
    stack: ['Python', 'PyTorch', 'Hugging Face', 'PEFT (LoRA)', 'DuckDB'],
    points: [
      'A lightweight Text-to-SQL system built by fine-tuning Llama-3.2-3B-Instruct with parameter-efficient LoRA.',
      'Fine-tuned first on the Spider benchmark for general SQL reasoning, then on an Olist e-commerce dataset for domain-specific schemas, using teacher-generated question–SQL pairs.',
      'Evaluated execution accuracy, SQL validity, BLEU, ROUGE-L and inference latency in an isolated DuckDB environment.',
    ],
    link: '#',
    color: '#65745b',
    height: 96,
    width: 64,
  },
  {
    shelf: 'recent',
    title: 'Codebase RAG & Software Engineering Assistant',
    short: 'Codebase RAG',
    dates: 'Mar – Apr 2026',
    stack: ['Python', 'LLMs', 'RAG', 'Embeddings', 'Vector search'],
    points: [
      "An AI assistant that answers software engineering questions from a repository's own source code using retrieval-augmented generation.",
      'Code parsing, chunking, embeddings and vector similarity search retrieve the most relevant snippets as context for the LLM.',
      'A question-answering interface that helps developers understand code structure and find where things are implemented.',
    ],
    link: '#',
    color: '#a58a6a',
    height: 88,
    width: 58,
  },
  {
    shelf: 'recent',
    title: 'Social Networking Platform',
    short: 'Social Network',
    dates: 'Mar – Apr 2026',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Cloudinary'],
    points: [
      'A community discussion board where people create posts, comment and vote inside forums.',
      'Hot, Top and Controversial ranking, pagination, full-text search and Redux state management for better content discovery.',
      'MongoDB schemas designed with Mongoose and Cloudinary for image uploads.',
    ],
    link: '#',
    color: '#34352f',
    height: 92,
    width: 60,
  },
  {
    shelf: 'earlier',
    title: 'Chrome extension for LeetCode',
    short: 'LeetCode Extension',
    dates: '',
    stack: ['JavaScript', 'Chrome Extensions API', 'Google Programmable Search'],
    points: [
      'Gives quick access to related challenges while you solve a problem on LeetCode.',
      "Uses Google's programmable search API to return personalised, relevant results.",
      'Lets you explore similar problems without leaving the LeetCode page.',
    ],
    link: '#',
    color: '#c2b49c',
    height: 84,
    width: 54,
  },
  {
    shelf: 'earlier',
    title: 'Project Management System',
    short: 'Project Management',
    dates: '',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    points: [
      'A system for a small business to track projects and the work under each one.',
      'Employee, manager and admin modules for updating tasks, starting projects and managing users.',
      'Real-time progress tracking that improved the accuracy of project information by about 25%.',
    ],
    image: pms,
    link: 'https://github.com/yashNaiya/pmsFront',
    color: '#4e5a46',
    height: 98,
    width: 62,
  },
  {
    shelf: 'earlier',
    title: 'E-commerce website for a restaurant',
    short: 'Restaurant Ordering',
    dates: '',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    points: [
      'Online ordering for a pickup restaurant, with an admin side for running the business.',
      'A flexible payment system and a recommendation system that lifted average order value.',
      'One admin interface to manage and track every part of the business.',
    ],
    image: bombay,
    link: 'https://github.com/yashNaiya/restaurant',
    color: '#8a6f52',
    height: 90,
    width: 58,
  },
  {
    shelf: 'earlier',
    title: 'Book-E-Sell',
    short: 'Book-E-Sell',
    dates: 'May – Jun 2022',
    stack: ['React', '.NET (C#)'],
    points: [
      'An online marketplace for buying books from a large catalogue, built during my internship at TatvaSoft.',
      'React front end integrated with a .NET back end, with keyword search and filters.',
    ],
    image: book,
    link: 'https://github.com/yashNaiya/E-BookSell-Project',
    color: '#7f8c73',
    height: 80,
    width: 52,
  },
  {
    shelf: 'earlier',
    title: 'Alumni portal for college',
    short: 'Alumni Portal',
    dates: '',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    points: [
      'A portal where alumni chat with each other in real time.',
      'A job board where alumni share openings with current students.',
    ],
    image: alumni,
    link: 'https://github.com/yashNaiya/bry',
    color: '#ddd2bf',
    height: 94,
    width: 60,
  },
]

export const experience = [
  {
    role: 'Software Developer Intern',
    org: 'BISAG-N, Govt. of India',
    place: 'Gandhinagar',
    dates: 'Jan – May 2023',
    points: [
      'Built a project management tool for software teams on the MERN stack: 10 React screens backed by Node.js and MongoDB.',
      'Designed REST APIs and split the app into employee, manager and admin modules with role-based access control, following MVC.',
      'Added real-time task chat and a team management panel for assigning tasks and tracking progress.',
      'Shipped across 8 agile sprints with daily standups and iterative releases; debugged issues found in integration testing.',
    ],
  },
  {
    role: 'Software Developer Intern',
    org: 'TatvaSoft',
    place: 'Ahmedabad',
    dates: 'May – Jun 2022',
    points: [
      'Built Book-E-Sell, an online book marketplace, from scratch with a React front end and a .NET (C#) back end.',
      'Wrote unit tests throughout, fixed bugs found in testing and worked through team code reviews.',
    ],
  },
]

export const education = [
  {
    degree: 'M.Tech in Data Analytics',
    school: 'National Institute of Technology, Tiruchirappalli',
    dates: '2025 – 2027 (expected)',
    score: '7.90',
    note: 'CGPA out of 10, up to 2nd semester. Admitted through GATE.',
  },
  {
    degree: 'B.Tech in Computer Engineering',
    school: 'Birla Vishwakarma Mahavidyalaya, Anand',
    dates: '2019 – 2023',
    score: '7.81',
    note: 'CGPA out of 10',
  },
  {
    degree: 'Class XII (GSEB)',
    school: 'Shree Swaminarayan Gurukul, Bhavnagar',
    dates: '2019',
    score: '71.53%',
    note: 'Board exam',
  },
  {
    degree: 'Class X (GSEB)',
    school: 'Shree Swaminarayan Gurukul, Bhavnagar',
    dates: '2017',
    score: '91.33%',
    note: 'Board exam',
  },
]

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'C#', 'JavaScript', 'Python', 'SQL'] },
  {
    group: 'Web development',
    items: ['React', 'Redux', 'Node.js', 'Express.js', '.NET', 'REST APIs', 'Mongoose', 'MVC'],
  },
  {
    group: 'AI / ML',
    items: ['PyTorch', 'Hugging Face Transformers', 'PEFT (LoRA)', 'RAG', 'Embeddings', 'Vector search'],
  },
  { group: 'Databases', items: ['MongoDB', 'MongoDB Atlas', 'DuckDB'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Jupyter Notebook', 'VS Code'] },
  {
    group: 'Core CS',
    items: ['DBMS', 'Operating Systems', 'Computer Networks', 'Object-Oriented Design', 'Agile / Scrum'],
  },
]
