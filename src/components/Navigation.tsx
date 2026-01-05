import React from "react";
import { cn } from "@/lib/utils";
import { Sprout, PenLine, Library } from "lucide-react";

export type NavTab = "garden" | "today" | "gallery";

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { id: NavTab; icon: any; label: string }[] = [
  { id: "garden", icon: Sprout, label: "Garden" },
  { id: "today", icon: PenLine, label: "Journal" },
  { id: "gallery", icon: Library, label: "Collection" },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 bg-background/90 border border-border shadow-lg shadow-primary/5 rounded-full backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300",
                isActive 
                  ? "bg-primary text-background shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "stroke-[2]" : "stroke-[1.5]")} />
              
              {/* Label: Visible on active or hover, or always visible if you prefer clarity over minimalism */}
              <span className={cn(
                "text-xs font-medium font-mono transition-all duration-300",
                isActive ? "opacity-100 max-w-[100px]" : "hidden sm:block sm:max-w-0 sm:opacity-0 sm:group-hover:max-w-[100px] sm:group-hover:opacity-100"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};