import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Trophy,
  GraduationCap,
  Award,
  Wrench,
  Clock,
  Bookmark,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export interface Opportunity {
  _id?: string;           // MongoDB
  id?: string;            // fallback
  title: string;
  company: string;
  category?: "internship" | "hackathon" | "scholarship" | "competition" | "workshop";
  deadline: string | Date;
  location: string;
  skills: string[];
  description: string;
  link: string;
  matchScore?: number;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSave?: (id: string) => void;
}

const categoryConfig = {
  internship: {
    icon: Briefcase,
    color: "internship",
    label: "Internship",
  },
  hackathon: {
    icon: Trophy,
    color: "hackathon",
    label: "Hackathon",
  },
  scholarship: {
    icon: GraduationCap,
    color: "scholarship",
    label: "Scholarship",
  },
  competition: {
    icon: Award,
    color: "competition",
    label: "Competition",
  },
  workshop: {
    icon: Wrench,
    color: "workshop",
    label: "Workshop",
  },
};

// ---------- helpers ----------
const getDaysUntilDeadline = (deadline: string | Date) => {
  const date = new Date(deadline);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getDeadlineColor = (days: number) => {
  if (days <= 3) return "text-urgent bg-urgent/10";
  if (days <= 7) return "text-warning bg-warning/10";
  return "text-success bg-success/10";
};

export const OpportunityCard = ({ opportunity, onSave }: OpportunityCardProps) => {
  const [saved, setSaved] = useState(false);

  // ✅ SAFE CATEGORY HANDLING
  const config =
    categoryConfig[opportunity.category ?? "internship"] ||
    categoryConfig.internship;

  const CategoryIcon = config.icon;

  const daysLeft = getDaysUntilDeadline(opportunity.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);

  const opportunityId = opportunity._id || opportunity.id || "";

  const handleSave = () => {
    setSaved(!saved);
    if (opportunityId) onSave?.(opportunityId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lifted hover:border-primary/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
            <CategoryIcon className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {config.label}
          </span>
        </div>

        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors ${
            saved
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary">
        {opportunity.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-3">
        {opportunity.company}
      </p>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <MapPin className="w-4 h-4" />
        <span>{opportunity.location}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity.skills?.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${deadlineColor}`}>
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
          </span>
        </div>

        {opportunity.matchScore && (
          <span className="text-sm font-semibold text-success">
            {opportunity.matchScore}% Match
          </span>
        )}

        <Button variant="ghost" size="sm" asChild>
          <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
            Apply <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};
