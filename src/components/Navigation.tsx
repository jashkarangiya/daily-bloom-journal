import React from "react";
import { cn } from "@/lib/utils";
import { Sprout, PenLine, Grid3X3, Settings } from "lucide-react";

export type NavTab = "garden" | "today" | "gallery" | "settings";

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "garden", label: "Garden", icon: Sprout },
  { id: "today", label: "Write", icon: PenLine },
  { id: "gallery", label: "Gallery", icon: Grid3X3 },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  isActive
                    ? "text-primary bg-garden-ink-light"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-70"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
