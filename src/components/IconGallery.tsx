import React from "react";
import { allPlantIcons } from "./PlantIcons";

const iconNames = [
  "Seedling", "Flower", "Clover", "Tulip", "Fern",
  "Daisy", "Heart Bloom", "Mushroom Tree", "Lily", "Rose",
  "Hydrangea", "Pine", "Ivy", "Tree", "Bush",
  "Apple Tree", "Star Flower", "Moon Bloom", "Lavender", "Bouquet",
  "Butterfly", "Bee", "Snail", "Ladybug", "Bird",
  "Watering Can", "Sun", "Cloud", "Rain", "Mushroom",
  "Apple", "Cherry", "Carrot", "Pumpkin", "Acorn"
];

export const IconGallery: React.FC = () => {
  return (
    <div className="page-transition space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl text-foreground">
          Garden Gallery
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          A collection of hand-drawn plants, animals & garden items that grow in your journal.
        </p>
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
        {allPlantIcons.map((PlantIcon, index) => (
          <div
            key={index}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-garden-ink-light transition-all duration-300 hover:shadow-garden-sm cursor-pointer"
            style={{
              animationDelay: `${index * 30}ms`,
            }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110">
              <PlantIcon className="w-full h-full" filled={false} />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
              {iconNames[index] || `Plant ${index + 1}`}
            </span>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-lg text-primary">{allPlantIcons.length}</span> unique illustrations
        </p>
      </div>
    </div>
  );
};
