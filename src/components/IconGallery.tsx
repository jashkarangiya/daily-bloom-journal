import React from "react";
import { allPlantIcons } from "./PlantIcons";

export const IconGallery: React.FC = () => {
  return (
    <div className="page-transition space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-mono text-sm text-foreground">
          365 hand drawn plants,
        </h1>
        <p className="text-muted-foreground text-sm font-mono">
          animals & garden items
        </p>
      </div>

      {/* Dense icon grid like the reference */}
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-2">
        {allPlantIcons.map((PlantIcon, index) => (
          <div
            key={index}
            className="aspect-square flex items-center justify-center p-1 hover:bg-garden-ink-light rounded-md transition-colors cursor-pointer"
          >
            <PlantIcon className="w-full h-full" filled={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
