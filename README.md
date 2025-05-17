# JobSort AI - Intelligent Resume Shortlisting Platform

JobSort AI is a modern web application that uses artificial intelligence to automate and optimize the resume screening process. The platform analyzes job descriptions and candidate resumes to provide detailed match scores, helping recruiters efficiently identify the most qualified candidates.

![JobSort AI](https://via.placeholder.com/800x400?text=JobSort+AI+Platform)

## Features

- **AI-Powered Matching**: Automatically analyze job descriptions and resumes to generate compatibility scores
- **Multiple Input Methods**: Upload files or paste text directly for both job descriptions and resumes
- **Detailed Analysis**: View comprehensive breakdowns of skill matches, experience, education, and more
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Real-time Processing**: See live progress as documents are analyzed
- **Dark/Light Mode**: Support for user preference and system themes

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State Management**: React Hooks and Context API
- **File Handling**: Client-side JavaScript APIs
- **UI Components**: Custom components with accessibility focus

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobsort-ai.git
   cd jobsort-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
jobsort-ai/
├── public/             # Static files
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Home page component
│   └── components/     # Reusable components
│       ├── FileDropBox.tsx  # File upload component
│       ├── LoadingScreen.tsx # Processing indicator
│       └── ResultsView.tsx   # Results display
├── CLAUDE.md           # Claude AI assistance guidelines
├── PRD.md              # Product Requirements Document
├── README.md           # Project documentation
└── package.json        # Project dependencies
```

## Usage

1. **Upload or Enter Job Description**: Start by uploading a job description file or pasting the text directly.
2. **Upload or Enter Resume**: Add a candidate's resume by uploading a file or pasting the content.
3. **Analyze Match**: Click the "Analyze Match" button to process the documents.
4. **Review Results**: Explore the detailed match analysis and recommendations.

## Development Roadmap

- **Phase 1 (Current)**: Basic file upload and text input, client-side processing, results display
- **Phase 2**: Enhanced analysis algorithms, user accounts, and result saving
- **Phase 3**: Backend integration, multi-user support, and ATS integrations
- **Phase 4**: Advanced AI features, predictive analytics, and candidate sourcing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- OpenAI and Anthropic for AI technology inspiration
