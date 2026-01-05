import React from "react";
import { cn } from "@/lib/utils";
import { Sprout, PenLine, Grid3X3 } from "lucide-react";

export type NavTab = "garden" | "today" | "gallery" | "settings";

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { id: NavTab; icon: React.FC<{ className?: string }> }[] = [
  { id: "garden", icon: Sprout },
  { id: "today", icon: PenLine },
  { id: "gallery", icon: Grid3X3 },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-primary rounded-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "p-3 rounded-xl transition-all duration-200",
                "focus:outline-none",
                isActive
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
