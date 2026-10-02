import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  FileText,
  Gamepad2,
  Home,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

const navItems = [
  { label: "HOME", icon: Home },
  { label: "ABOUT", icon: CircleUserRound },
  { label: "TIMELINE", icon: CalendarDays },
  { label: "RULES", icon: FileText },
  { label: "ROUNDS", icon: Gamepad2 },
  { label: "FINAL ROUND", icon: ShieldCheck },
  { label: "PRIZES", icon: Trophy },
  { label: "SCHEDULE", icon: CalendarDays },
  { label: "FAQ", icon: Sparkles },
  { label: "CONTACT", icon: Mail },
];

export default function MainNavigation() {
  return (
    <header className="dex-nav">

      <div className="dex-nav-inner">

        <div className="pokedex-logo">
          <div className="pokedex-ring">
            <div className="pokedex-center" />
          </div>
        </div>

        <nav className="dex-nav-links">
          {navItems.map(({ label, icon: Icon }) => (
            <a
              href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
              key={label}
            >
              <Icon size={11} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="dex-nav-register">
          <a href="#register">
            REGISTER NOW
            <ChevronRight size={17} />
          </a>
        </div>

        <button className="dex-mobile-menu">
          <Menu size={22} />
        </button>

      </div>

    </header>
  );
}