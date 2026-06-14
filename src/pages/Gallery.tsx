import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

const categories = ['All', 'Annual Exhibition (Saraswati Puja)', 'Drawing Competition', 'Award Ceremony', 'Workshop', 'Student Artwork', 'Special Events'];

const defaultImages: GalleryItem[] = [
  { id: '1', title: 'Watercolor Landscape', category: 'Student Artwork', image_url: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Beautiful landscape painting' },
  { id: '2', title: 'Pencil Sketch', category: 'Student Artwork', image_url: 'https://images.pexels.com/photos/1194255/pexels-photo-1194255.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Detailed pencil sketch work' },
  { id: '3', title: 'Abstract Art', category: 'Annual Exhibition (Saraswati Puja)', image_url: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Abstract expression piece' },
  { id: '4', title: 'Nature Study', category: 'Workshop', image_url: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Nature observation study' },
  { id: '5', title: 'Portrait Drawing', category: 'Drawing Competition', image_url: 'https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Award-winning portrait' },
  { id: '6', title: 'Oil Painting', category: 'Award Ceremony', image_url: 'https://images.pexels.com/photos/1389360/pexels-photo-1389360.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Oil on canvas painting' },
  { id: '7', title: 'Still Life', category: 'Student Artwork', image_url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Still life composition' },
  { id: '8', title: 'Festival Art', category: 'Special Events', image_url: 'https://images.pexels.com/photos/1157608/pexels-photo-1157608.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Festival themed artwork' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState<GalleryItem[]>(defaultImages);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('gallery_items').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setItems([...data, ...defaultImages]);
    });
  }, []);

  const filtered = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-blue-100 text-xl">Explore our artistic journey through images</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Google Drive Link */}
        <div className="text-center mb-12">
          <p className="italic text-lg text-gray-600 mb-4">enjoy going through our work environments</p>
          <a
            href="https://drive.google.com/drive/folders/1XHVTBJYhiGBDHCjcFQQyjHillkUGbfWN?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-royal-600 text-white font-semibold rounded-xl hover:bg-royal-700 transition-colors shadow-md hover:shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            View Full Gallery on Google Drive
          </a>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-royal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <div
              key={item.id + i}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer aspect-square"
              onClick={() => openLightbox(i)}
            >
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <p className="text-blue-200 text-xs">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No images found in this category</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-4xl max-h-[80vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightboxIndex].image_url} alt={filtered[lightboxIndex].title} className="max-w-full max-h-[75vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <h3 className="text-white font-display text-xl">{filtered[lightboxIndex].title}</h3>
              <p className="text-blue-200 text-sm">{filtered[lightboxIndex].category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
