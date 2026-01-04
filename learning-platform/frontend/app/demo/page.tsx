'use client'

import { useState } from 'react'
import InteractiveExplanation from '@/components/InteractiveExplanation'
import ConceptVisualizer from '@/components/ConceptVisualizer'
import InteractiveCodeBlock from '@/components/InteractiveCodeBlock'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  // Example data for InteractiveExplanation
  const httpSteps = [
    {
      id: 'request',
      title: 'HTTP Request',
      description: 'The client sends an HTTP request to the server containing the method, path, headers, and optionally a body.',
      code: `GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
User-Agent: Mozilla/5.0`,
      details: [
        'GET is the HTTP method indicating we want to retrieve data',
        'The path /api/users specifies which resource we want',
        'Headers provide metadata about the request',
        'No body is needed for GET requests'
      ]
    },
    {
      id: 'server',
      title: 'Server Processing',
      description: 'The server receives the request, processes it, queries the database if needed, and prepares a response.',
      code: `async function getUsers(req, res) {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
}`,
      details: [
        'Server parses the incoming request',
        'Routes the request to the appropriate handler',
        'Performs business logic and database operations',
        'Prepares the response data'
      ]
    },
    {
      id: 'response',
      title: 'HTTP Response',
      description: 'The server sends back an HTTP response with a status code, headers, and the requested data.',
      code: `HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 125

{
  "users": [
    { "id": 1, "name": "John" },
    { "id": 2, "name": "Jane" }
  ]
}`,
      details: [
        '200 OK indicates the request was successful',
        'Content-Type tells the client how to interpret the data',
        'The response body contains the actual data',
        'Client receives and processes the response'
      ]
    }
  ]

  // Example data for ConceptVisualizer
  const restNodes = [
    {
      id: 'client',
      label: 'Client',
      description: 'The client application (browser, mobile app, etc.) that makes HTTP requests to the API.',
      color: '#3b82f6',
      position: { x: 20, y: 50 },
      connections: ['api']
    },
    {
      id: 'api',
      label: 'REST API',
      description: 'The API server that handles requests, implements business logic, and returns responses.',
      color: '#10b981',
      position: { x: 50, y: 50 },
      connections: ['database', 'auth']
    },
    {
      id: 'database',
      label: 'Database',
      description: 'Persistent storage for application data, queried by the API server.',
      color: '#f59e0b',
      position: { x: 80, y: 30 },
    },
    {
      id: 'auth',
      label: 'Auth',
      description: 'Authentication and authorization service to protect resources.',
      color: '#ef4444',
      position: { x: 80, y: 70 },
    }
  ]

  // Example data for InteractiveCodeBlock
  const codeAnnotations = [
    {
      line: 1,
      label: 'Import',
      explanation: 'FastAPI is imported to create the API application instance.',
      color: '#3b82f6'
    },
    {
      line: 3,
      label: 'Instance',
      explanation: 'Create an instance of the FastAPI application that will handle all routes.',
      color: '#10b981'
    },
    {
      line: 5,
      label: 'Decorator',
      explanation: 'The @app.get decorator registers this function as a handler for GET requests to the root path.',
      color: '#f59e0b'
    },
    {
      line: 6,
      label: 'Handler',
      explanation: 'This async function handles the request and returns a JSON response.',
      color: '#ef4444'
    },
    {
      line: 7,
      label: 'Response',
      explanation: 'Return a dictionary that FastAPI automatically converts to JSON.',
      color: '#8b5cf6'
    }
  ]

  const exampleCode = `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}`

  const sections = [
    { id: 'explanations', title: 'Step-by-Step', icon: '🎯' },
    { id: 'visualizer', title: 'Visual Maps', icon: '🗺️' },
    { id: 'code', title: 'Code Annotations', icon: '💻' },
    { id: 'typography', title: 'Typography', icon: '✍️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center text-5xl shadow-2xl">
                  ⚡
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                Interactive Learning
                <br />
                <span className="text-blue-200">Reimagined</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                Experience the future of learning with interactive explanations, 
                visual concept maps, and annotated code examples
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Start Learning
                </Link>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Explore Features
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="relative">
            <svg className="w-full h-16 fill-current text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </div>

        {/* Quick Navigation */}
        <div id="features" className="max-w-7xl mx-auto px-6 -mt-8 mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                    setActiveSection(section.id)
                  }}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-br from-primary-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md hover:scale-102'
                  }`}
                >
                  <div className="text-4xl mb-2">{section.icon}</div>
                  <div className="font-semibold text-sm">{section.title}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-24">

          {/* Section 1: Interactive Explanation */}
          <motion.section
            id="explanations"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  🎯
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Step-by-Step Explanations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Break down complex concepts into digestible, interactive steps with 
                visual progress tracking and detailed explanations
              </p>
            </div>
            <InteractiveExplanation
              title="How HTTP Works"
              steps={httpSteps}
            />
          </motion.section>

          {/* Section 2: Concept Visualizer */}
          <motion.section
            id="visualizer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  🗺️
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Visual Concept Maps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Understand system architectures and component relationships through 
                interactive, clickable visualizations
              </p>
            </div>
            <ConceptVisualizer
              title="REST API Architecture"
              description="Explore the components of a RESTful API system and how they interact with each other."
              nodes={restNodes}
            />
          </motion.section>

          {/* Section 3: Interactive Code Block */}
          <motion.section
            id="code"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  💻
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Annotated Code Examples
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Learn code line-by-line with interactive annotations and detailed 
                explanations for every important concept
              </p>
            </div>
            <InteractiveCodeBlock
              code={exampleCode}
              language="python"
              title="main.py"
              annotations={codeAnnotations}
            />
          </motion.section>

          {/* Section 4: Typography Showcase */}
          <motion.section
            id="typography"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  ✍️
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Professional Typography
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Beautiful, readable fonts optimized for learning with Inter and JetBrains Mono
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Headings */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary-600 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Heading Styles
                </h3>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Heading 1</h1>
                    <p className="text-sm text-gray-500">Hero sections & main titles</p>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Heading 2</h2>
                    <p className="text-sm text-gray-500">Major section headings</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Heading 3</h3>
                    <p className="text-sm text-gray-500">Subsection headings</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Heading 4</h4>
                    <p className="text-sm text-gray-500">Card titles</p>
                  </div>
                </div>
              </motion.div>

              {/* Body Text */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary-600 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Body & Code
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">Large Body Text</p>
                    <p className="text-lg leading-relaxed text-gray-700">
                      Inter font provides excellent readability with advanced OpenType features.
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 mb-2">Regular Body Text</p>
                    <p className="text-base leading-relaxed text-gray-600">
                      Perfect for paragraphs and longer content blocks with clear hierarchy.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Small Text</p>
                    <p className="text-sm text-gray-500">
                      Used for captions, labels, and secondary information.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Inline Code</p>
                    <code className="font-mono text-sm bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg border border-primary-200">
                      const code = "beautiful"
                    </code>
                  </div>
                </div>
              </motion.div>

              {/* Code Blocks */}
              <motion.div
                whileHover={{ y: -4 }}
                className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary-600 mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Code Display - JetBrains Mono
                </h3>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-gray-400 font-mono">example.ts</span>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="font-mono text-sm text-gray-100 leading-relaxed">{`function createApp() {
  // Beautiful code display with ligatures
  const message = "Hello, World!";
  return { message };
}

// Enhanced readability for developers
const app = createApp();
console.log(app);`}</code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Experience This?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your learning journey with our interactive platform and master 
                software development through hands-on projects
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Browse Projects
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

