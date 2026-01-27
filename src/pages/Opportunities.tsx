import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { fetchOpportunities } from "@/services/opportunityService";

import { Button } from "@/components/ui/button";
import { Search, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunity";
import { useLocation } from "react-router-dom";

/**
 * Map ROUTE (plural) -> CATEGORY (singular, DB-safe)
 */
const routeToCategoryMap: Record<string, string> = {
  internships: "internship",
  hackathons: "hackathon",
  scholarships: "scholarship",
  competitions: "competition",
  workshops: "workshop",
};

const Opportunities = () => {
  const location = useLocation();
  const path = location.pathname.replace("/", "");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("deadline");

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  /**
   * 🔥 Sync category from ROUTE
   * /internships -> internship
   */
  useEffect(() => {
    const mappedCategory = routeToCategoryMap[path];

    if (mappedCategory) {
      setActiveCategory(mappedCategory);
    } else {
      setActiveCategory("all");
    }
  }, [path]);

  /**
   * 🔥 REAL API FETCH (filtered by category)
   */
  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await fetchOpportunities(
          activeCategory === "all" ? undefined : activeCategory
        );
        setOpportunities(data);
      } catch (err) {
        console.error("Failed to fetch opportunities", err);
      }
    };

    loadOpportunities();
  }, [activeCategory]);

  const categories = [
    { id: "all", label: "All Opportunities", count: opportunities.length },
    {
      id: "internship",
      label: "Internships",
      count: opportunities.filter((o) => o.category === "internship").length,
    },
    {
      id: "hackathon",
      label: "Hackathons",
      count: opportunities.filter((o) => o.category === "hackathon").length,
    },
    {
      id: "scholarship",
      label: "Scholarships",
      count: opportunities.filter((o) => o.category === "scholarship").length,
    },
    {
      id: "competition",
      label: "Competitions",
      count: opportunities.filter((o) => o.category === "competition").length,
    },
    {
      id: "workshop",
      label: "Workshops",
      count: opportunities.filter((o) => o.category === "workshop").length,
    },
  ];

  const filteredOpportunities = opportunities
    .filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        activeCategory === "all" || opp.category === activeCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return (
          new Date(a.deadline).getTime() -
          new Date(b.deadline).getTime()
        );
      }

      if (sortBy === "match" && a.matchScore && b.matchScore) {
        return b.matchScore - a.matchScore;
      }

      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 capitalize">
              {activeCategory === "all"
                ? "Browse Opportunities"
                : `${activeCategory} Opportunities`}
            </h1>
            <p className="text-muted-foreground text-lg">
              Showing {filteredOpportunities.length} results
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <div className="bg-card rounded-2xl border p-5 sticky top-24">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Categories
                </h3>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className="text-xs">{category.count}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">
              <div className="flex gap-4 mb-6">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border rounded-xl"
                >
                  <option value="deadline">Deadline</option>
                  <option value="match">Match Score</option>
                </select>

                <div className="flex border rounded-xl">
                  <button onClick={() => setViewMode("grid")} className="p-3">
                    <Grid3X3 />
                  </button>
                  <button onClick={() => setViewMode("list")} className="p-3">
                    <List />
                  </button>
                </div>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity._id || opportunity.id}
                    opportunity={opportunity}
                  />
                ))}
              </div>

              {filteredOpportunities.length === 0 && (
                <p className="text-center mt-12 text-muted-foreground">
                  No opportunities found
                </p>
              )}

              {filteredOpportunities.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline">
                    Load More <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Opportunities;
