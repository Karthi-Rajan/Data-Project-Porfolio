import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['all', 'PowerBI', 'SQL', 'Tableau', 'Excel'];

const rawPortfolioItems = [
  {
    id: 1,
    type: 'PowerBI',
    src: './assets/Imagerender1.webp',
    description: 'This is a PowerBI project description for item 1.',
    images: [
      './assets/Imagerender1.webp',
      './assets/Imagerender2.webp',
      './assets/Imagerender3.webp',
    ],
    videoUrl: 'https://www.youtube.com/embed/tZc1T28Oe20',
    repoUrl: 'https://github.com/your-username/powerbi-project-1', // <-- ADD THIS
  },
  
  {
    id: 1,
    type: 'PowerBI',
    src: './assets/Imagerender1.webp',
    description: 'Supply-Chain-and-Logistics-Analysis-Dashboard',
    images: [
      './assets/Imagerender1.webp',
      './assets/Imagerender2.webp',
      './assets/Imagerender3.webp',
    ],
    videoUrl: 'https://www.youtube.com/embed/tZc1T28Oe20',
    repoUrl: 'https://github.com/Karthi-Rajan/Supply-Chain-and-Logistics-Analysis-Dashboard', // <-- ADD THIS
  },
  
  {
    id: 10,
    type: 'SQL',
    name: 'Covid_19-SQL-Data-Analysis',
    repoUrl: 'https://github.com/Karthi-Rajan/Covid_19-SQL-Data-Analysis',
  },
  {
    id: 11,
    type: 'SQL',
    name: 'SQL Project 2',
    repoUrl: 'https://github.com/your-username/sql-project-2',
  },
  {
    id: 12,
    type: 'Tableau',
    name: 'Tableau Dashboard 1',
    repoUrl: 'https://github.com/your-username/tableau-project-1',
  },
  {
    id: 13,
    type: 'Excel',
    name: 'Excel Analysis 1',
    repoUrl: 'https://github.com/your-username/excel-project-1',
  },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);

  const portfolioItems = useMemo(() => {
    if (filter === 'all') return rawPortfolioItems;
    return rawPortfolioItems.filter(item => item.type === filter);
  }, [filter]);

  const openLinkInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleItemClick = (item) => {
    if (item.type === 'PowerBI') {
      setSelectedItem(item);
    } else {
      openLinkInNewTab(item.repoUrl);
    }
  };

  const renderItemContent = (item) => {
    if (item.type === 'PowerBI') {
      return <img src={item.src} alt="PowerBI Project" loading="lazy" />;
    }
    return (
      <div className="portfolio-card-text">
        <h4>{item.name}</h4>
      </div>
    );
  };

  return (
    <motion.div
      className="portfolio-modern-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Filter Bar */}
      <div className="portfolio-filter-bar">
        {FILTERS.map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div className="portfolio-grid">
        <AnimatePresence>
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              className="portfolio-card"
              onClick={() => handleItemClick(item)}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {renderItemContent(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal for PowerBI only */}
      <AnimatePresence>
  {selectedItem && selectedItem.type === 'PowerBI' && (
    <motion.div
      className="portfolio-modal-overlay"
      onClick={() => setSelectedItem(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="portfolio-modal-inner"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="portfolio-modal-description">
          <h2>Description</h2>
          <p>{selectedItem.description}</p>
        </div>

        {/* Images */}
        <div className="portfolio-modal-gallery">
          {selectedItem.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
          ))}
        </div>

        {/* Video */}
        {selectedItem.videoUrl && (
          <div className="portfolio-modal-video">
            <iframe
              src={selectedItem.videoUrl}
              title="PowerBI Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* GitHub Repo Button */}
        {selectedItem.repoUrl && (
          <div className="portfolio-modal-repo-button">
            <button
              onClick={() => openLinkInNewTab(selectedItem.repoUrl)}
              className="github-button"
            >
              View GitHub Repo
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </motion.div>
  );
};

export default PortfolioSection;
