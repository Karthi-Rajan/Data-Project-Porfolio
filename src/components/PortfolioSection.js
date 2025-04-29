import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['All', 'Power BI', 'SQL', 'Tableau'];

const rawPortfolioItems = [
  {
    id: 1,
    type: 'Power BI',
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
    type: 'Power BI',
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
    repoUrl: 'https://github.com/Karthi-Rajan/Covid_19-SQL-Data-Analysis',
  },
  {
    id: 12,
    type: 'Tableau',
    src: './assets/COVIDDAS.jpeg',
    description: 'Covid-Analysis-Dashboard',
    images: [
      './assets/Covidtab.png',
    ],
    videoUrl: '',
    publishedUrl: 'https://public.tableau.com/app/profile/karthi.rajan.g/viz/CovidAnalaysisDashboard/Dashboard1?publish=yes',
    repoUrl: 'https://github.com/Karthi-Rajan/Covid-Analysis-Dashboard/tree/main',
     // ← your published viz link
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
    if (item.type === 'Power BI' || item.type === 'Tableau') {
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
        {FILTERS.map(type => (
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
          {portfolioItems.map(item => (
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

      {/* Modal for Power BI and Tableau */}
      <AnimatePresence>
        {selectedItem && (selectedItem.type === 'Power BI' || selectedItem.type === 'Tableau') && (
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
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Description */}
              <div className="portfolio-modal-description">
                <h2>Description</h2>
                <p>{selectedItem.description || selectedItem.name}</p>
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

              {/* Action Buttons */}
              <div className="portfolio-modal-buttons">
                {/* GitHub Repo */}
                {selectedItem.repoUrl && (
                  <button
                    className="modal-action-button"
                    onClick={() => openLinkInNewTab(selectedItem.repoUrl)}
                  >
                    View GitHub repo
                  </button>
                )}
                {/* Tableau Published */}
                {selectedItem.type === 'Tableau' && selectedItem.publishedUrl && (
                  <button
                    className="modal-action-button"
                    onClick={() => openLinkInNewTab(selectedItem.publishedUrl)}
                  >
                    View Tableau Public
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioSection;
