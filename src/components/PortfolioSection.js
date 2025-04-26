import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 
const FILTERS = ['all', 'PowerBI'];
 
const portfolioItems = [
  {
    id: 1,
    type: 'PowerBI',
    src: './assets/Imagerender1.webp',
    description: 'This is an image description for item 1.',
    images: [
      './assets/Imagerender1.webp',
      './assets/Imagerender2.webp',
      './assets/Imagerender3.webp', // More images for the item
    ],
    videoUrl: 'https://www.youtube.com/embed/tZc1T28Oe20', // Video URL for item 1
  },
  {
    id: 5,
    type: 'PowerBI',
    src: './assets/Imagerender2.webp',
    description: 'This is an image description for item 2.',
    images: [
      './assets/Imagerender2.webp',
      './assets/Imagerender4.webp', // More images for the item
    ],
    videoUrl: 'https://www.youtube.com/embed/EVWK63G3Lf8', // Video URL for item 2
  },
  {
    id: 6,
    type: 'PowerBI',
    src: './assets/Imagerender2.webp',
    description: 'This is an image description for item 3.',
    images: [
      './assets/Imagerender2.webp',
      './assets/Imagerender5.webp', // More images for the item
    ],
    videoUrl: 'https://www.youtube.com/embed/8fPSmTUGj1Q', // Video URL for item 3
  },
  {
    id: 7,
    type: 'PowerBI',
    src: './assets/Imagerender2.webp',
    description: 'This is an image description for item 4.',
    images: [
      './assets/Imagerender2.webp',
      './assets/Imagerender6.webp', // More images for the item
    ],
    videoUrl: 'https://www.youtube.com/embed/tZc1T28Oe20', // Video URL for item 4
  },
];
 
const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
 
  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);
 
  const filteredItems = useMemo(
    () => (filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.type === filter)),
    [filter]
  );
 
  const renderItemContent = (item) => (
    <img src={item.src} alt={`${item.type} preview`} loading="lazy" />
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
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
 
      {/* Grid Items */}
      <motion.div
        className="portfolio-grid"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              className="portfolio-card"
              onClick={() => setSelectedItem(item)}
              variants={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.95 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {renderItemContent(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
 
      <AnimatePresence>
        {selectedItem && (
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
              {/* Description */}
              <div className="portfolio-modal-description">
                <h2>Description</h2>
                <p>{selectedItem.description}</p>
              </div>
 
              {/* Gallery of Images */}
              <div className="portfolio-modal-gallery">
                {selectedItem.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
              </div>
 
              {/* Video */}
              {selectedItem.videoUrl && (
                <div className="portfolio-modal-video">
                  <iframe
                    src={selectedItem.videoUrl}
                    title="Related Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
 

 