import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

// You can customize/add more categories if needed
const category = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Graphic Designer',
  'Data Scientist',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/Jobs');
  };
  
  

  return (
    <div className="bg-[#f5f7fa] py-12 px-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Explore Jobs by Category
      </h2>

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="flex justify-center">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="ghost"
                  className="w-full py-4 text-sm font-medium border border-gray-300 rounded-xl hover:bg-[#6A38C2]/10 transition"
                >
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
