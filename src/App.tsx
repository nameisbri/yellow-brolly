import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Approach = lazy(() => import('./pages/Approach').then((m) => ({ default: m.Approach })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const CaseStudies = lazy(() => import('./pages/CaseStudies').then((m) => ({ default: m.CaseStudies })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const WhyYellowBrolly = lazy(() => import('./pages/WhyYellowBrolly').then((m) => ({ default: m.WhyYellowBrolly })));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-yellow-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-medium-gray">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/why-yellowbrolly" element={<WhyYellowBrolly />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
