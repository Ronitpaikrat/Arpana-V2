import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  Search, 
  CreditCard, 
  FileText, 
  AlertTriangle,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 px-4", 
          active && "text-dishit-orange border-b-2 border-dishit-orange"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const MobileNavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button variant="ghost" className="w-full flex items-center justify-start gap-2 px-4">
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface NavbarProps {
  currentRoute: string;
}

const Navbar = ({ currentRoute }: NavbarProps) => {
  const isMobile = useIsMobile();

  const navItems = [
    { to: "/profile", icon: <User size={20} />, label: "Profile" },
    { to: "/search", icon: <Search size={20} />, label: "Search" },
    { to: "/payment", icon: <CreditCard size={20} />, label: "Payment" },
    { to: "/posts", icon: <FileText size={20} />, label: "Posts" },
    { to: "/complaints", icon: <AlertTriangle size={20} />, label: "Complaints" }
  ];

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-dishit-orange">Arpan</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 pt-8">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="sticky top-0 bg-white border-b z-50">
      <div className="container flex items-center justify-between py-2">
        <h1 className="text-xl font-bold text-dishit-orange">Arpan</h1>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={currentRoute === item.to}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
