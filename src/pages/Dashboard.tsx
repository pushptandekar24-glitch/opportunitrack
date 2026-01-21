import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Bell,
  Calendar,
  TrendingUp,
  Clock,
  Bookmark,
  CheckCircle,
  XCircle,
  User,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

// ---------------- STATS (STATIC FOR NOW) ----------------
const stats = [
  { icon: Bookmark, label: "Saved", value: 12, color: "primary" },
  { icon: CheckCircle, label: "Applied", value: 8, color: "success" },
  { icon: Clock, label: "Pending", value: 4, color: "warning" },
  { icon: XCircle, label: "Missed", value: 3, color: "urgent" },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [opportunities, setOpportunities] = useState<any[]>([]);

  const categories = [
    { id: "all", label: "All" },
    { id: "internship", label: "Internships" },
    { id: "hackathon", label: "Hackathons" },
    { id: "scholarship", label: "Scholarships" },
    { id: "competition", label: "Competitions" },
    { id: "workshop", label: "Workshops" },
  ];

  // ---------------- FETCH FROM BACKEND ----------------
  useEffect(() => {
    api
      .get("/opportunities")
      .then((res) => setOpportunities(res.data))
      .catch((err) => console.error("Failed to fetch opportunities", err));
  }, []);

  // ---------------- FILTER LOGIC ----------------
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || opp.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // ---------------- UPCOMING DEADLINES ----------------
  const upcomingDeadlines = opportunities
    .filter((opp) => new Date(opp.deadline) > new Date())
    .sort(
      (a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Welcome back, Student! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your active and missed opportunities easily.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* MAIN */}
            <div className="lg:col-span-2">
              {/* Search */}
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search opportunities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border rounded-xl"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4" /> Filters
                  </Button>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg ${
                        activeCategory === category.id
                          ? "bg-primary text-white"
                          : "bg-secondary"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity._id}
                    opportunity={opportunity}
                  />
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <div className="bg-card border rounded-2xl p-5">
                <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
                {upcomingDeadlines.map((opp) => {
                  const daysLeft = Math.ceil(
                    (new Date(opp.deadline).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={opp._id}
                      className="flex justify-between mb-2"
                    >
                      <span>{opp.title}</span>
                      <span>{daysLeft}d</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
