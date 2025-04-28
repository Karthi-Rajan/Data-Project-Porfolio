import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['All', 'PowerBI', 'SQL', 'Tableau', 'Excel'];

const rawPortfolioItems = [
  {
    id: 1,
    type: 'PowerBI',
    src: './assets/SCML THUMP .png',
    description: 'Supply-Chain-and-Logistics-Analysis-Dashboard.',
    images: [
      './assets/SCML 1.png',
      './assets/SCML 2.png',
      './assets/SCML 3.png',
      './assets/SCML 4.png',
    ],
    videoUrl: '',
    repoUrl: 'https://github.com/Karthi-Rajan/Supply-Chain-and-Logistics-Analysis-Dashboard',
  },

  {
    id: 2,
    type: 'PowerBI',
    src: './assets/LSS THUMP.png',
    description: 'LSS-Operational-Process-Chart',
    images: [
      './assets/LSS 1.png',
      './assets/LSS 2.png',
    ],
    videoUrl: '',
    repoUrl: 'https://github.com/Karthi-Rajan/LSS-Operational-Process-Chart',
  },

  {
    id: 10,
    type: 'SQL',
    src: './assets/COVIDS.png',
    name: 'Covid_19-SQL-Data-Analysis',
    repoUrl: 'https://github.com/Karthi-Rajan/Covid_19-SQL-Data-Analysis',
  },

  {
    id: 12,
    type: 'Tableau',
    src: './assets/tableau-thumb.webp',
    description: 'Sales Performance Analysis Dashboard built using Tableau.',
    images: [
      './assets/Tableau1.png',
      './assets/Tableau2.png',
      './assets/Tableau3.png',
    ],
    videoUrl: '',
    repoUrl: 'https://github.com/your-username/tableau-project-1',
  },
  
  {
    id: 13,
    type: 'Excel',
    src: './assets/excel-thumb.webp',
    name: 'Excel Analysis 1',
    repoUrl: 'https://github.com/your-username/excel-project-1',
  },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);

  const portfolioItems = useMemo(() => {
    if (filter === 'All') return rawPortfolioItems;
    return rawPortfolioItems.filter(item => item.type === filter);
  }, [filter]);

  const openLinkInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleItemClick = (item) => {
    if (item.type === 'PowerBI' || item.type === 'Tableau') {
      setSelectedItem(item);
    } else {
      openLinkInNewTab(item.repoUrl);
    }
  };

  const renderItemContent = (item) => (
    <div className="portfolio-card-content">
      <img src={item.src} alt={item.name || "Project"} loading="lazy" />
      {item.name && <h4>{item.name}</h4>}
    </div>
  );

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

      {/* Modal for PowerBI and Tableau */}
      <AnimatePresence>
        {selectedItem && (selectedItem.type === 'PowerBI' || selectedItem.type === 'Tableau') && (
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
              {selectedItem.images && (
                <div className="portfolio-modal-gallery">
                  {selectedItem.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
                  ))}
                </div>
              )}

              {/* Video */}
              {selectedItem.videoUrl && (
                <div className="portfolio-modal-video">
                  <iframe
                    src={selectedItem.videoUrl}
                    title="Project Video"
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
