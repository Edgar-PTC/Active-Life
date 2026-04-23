import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

const CardReseña = ({ 
  author, 
  rating = 5, 
  date,
  content, 
  helpfulCount = 0,
  onHelpful,
  onReply 
}) => {
  // Renderizar estrellas según el rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Encabezado con información del autor */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {author.charAt(0).toUpperCase()}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{author}</h3>
            {date && (
              <p className="text-sm text-gray-500">{date}</p>
            )}
          </div>
        </div>
        
        {/* Rating en estrellas */}
        <div className="flex items-center gap-1">
          {renderStars()}
          <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Contenido del comentario */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
      
      {/* Botones de acción */}
      <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
        <button 
          onClick={onHelpful}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
        >
          <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm">
            Te ha resultado útil? {helpfulCount > 0 && `(${helpfulCount})`}
          </span>
        </button>
        
        <button 
          onClick={onReply}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
        >
          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm">Responder</span>
        </button>
      </div>
    </div>
  );
};

export default CardReseña;