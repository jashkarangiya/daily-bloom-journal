import React from "react";
import { cn } from "@/lib/utils";
import { Sprout, PenLine } from "lucide-react";

export type NavTab = "garden" | "today";

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { id: NavTab; icon: any; label: string }[] = [
  { id: "garden", icon: Sprout, label: "Garden" },
  { id: "today", icon: PenLine, label: "Journal" },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 bg-background/90 border border-border shadow-xl shadow-primary/5 rounded-full backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 group",
                isActive 
                  ? "bg-primary text-background shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "stroke-[2]" : "stroke-[1.5]")} />
              
              {/* Label: Slightly larger and always visible on desktop for better clarity now that there are only 2 items */}
              <span className={cn(
                "text-sm font-medium font-mono transition-all duration-300 overflow-hidden whitespace-nowrap",
                isActive 
                  ? "w-auto opacity-100 ml-2" 
                  : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2"
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