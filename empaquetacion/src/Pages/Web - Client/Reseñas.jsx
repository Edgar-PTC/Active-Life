import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

import CardReseña from '../../Components/CardReseña';


// Componente principal con todas las reviews
const Reseñas = () => {
  // Datos de ejemplo
  const reviews = [
    {
      id: 1,
      author: "Edgar Ariel Pineda Ramirez",
      rating: 4,
      date: "15 de enero, 2024",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      helpfulCount: 30
    },
    {
      id: 2,
      author: "María González",
      rating: 5,
      date: "10 de enero, 2024",
      content: "Excelente producto, superó todas mis expectativas. La calidad es increíble y el servicio al cliente fue excepcional. Definitivamente lo recomendaría a mis amigos y familiares.",
      helpfulCount: 45
    },
    {
      id: 3,
      author: "Carlos Rodríguez",
      rating: 3,
      date: "5 de enero, 2024",
      content: "Buen producto en general, pero podría mejorar en algunos aspectos. La entrega fue rápida y el empaque llegó en perfectas condiciones.",
      helpfulCount: 12
    }
  ];

  const handleHelpful = (reviewId) => {
    console.log(`Marcado como útil el comentario ${reviewId}`);
    // Aquí iría la lógica para actualizar el contador
  };

  const handleReply = (reviewId) => {
    console.log(`Responder al comentario ${reviewId}`);
    // Aquí iría la lógica para abrir el modal de respuesta
  };

  // Calcular estadísticas
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header con estadísticas */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Reseñas</h1>
        
        {/* Rating general */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex items-center gap-1 mt-2">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Reseñado por {totalReviews} {totalReviews === 1 ? 'persona' : 'personas'}
              </div>
            </div>
            
            {/* Distribución de ratings */}
            <div className="flex-1 min-w-[200px]">
              {[5,4,3,2,1].map(rating => {
                const count = ratingDistribution[rating];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <div className="w-12 text-sm text-gray-600">{rating} ★</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-gray-600">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map(review => (
          <CardReseña
            key={review.id}
            author={review.author}
            rating={review.rating}
            date={review.date}
            content={review.content}
            helpfulCount={review.helpfulCount}
            onHelpful={() => handleHelpful(review.id)}
            onReply={() => handleReply(review.id)}
          />
        ))}
      </div>
      
      {/* Botón para escribir reseña */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          Escribe tu propia reseña
        </button>
      </div>
    </div>
  );
};

export default Reseñas;