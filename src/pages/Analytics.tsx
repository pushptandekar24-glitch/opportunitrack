import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const missedByCategory = [
  { name: "Internships", missed: 5, total: 20, color: "hsl(200, 75%, 50%)" },
  { name: "Hackathons", missed: 3, total: 12, color: "hsl(280, 70%, 55%)" },
  { name: "Scholarships", missed: 2, total: 8, color: "hsl(145, 65%, 45%)" },
  { name: "Competitions", missed: 4, total: 15, color: "hsl(35, 90%, 55%)" },
  { name: "Workshops", missed: 1, total: 10, color: "hsl(175, 70%, 40%)" },
];

const weeklyActivity = [
  { week: "Week 1", applications: 2, saved: 5 },
  { week: "Week 2", applications: 4, saved: 8 },
  { week: "Week 3", applications: 3, saved: 6 },
  { week: "Week 4", applications: 5, saved: 10 },
  { week: "Week 5", applications: 4, saved: 7 },
  { week: "Week 6", applications: 6, saved: 12 },
];

const skillMismatch = [
  { skill: "Machine Learning", gap: 85 },
  { skill: "System Design", gap: 70 },
  { skill: "AWS", gap: 65 },
  { skill: "Docker", gap: 55 },
  { skill: "GraphQL", gap: 40 },
];

const deadlineAnalysis = [
  { name: "On Time", value: 65, color: "hsl(160, 70%, 40%)" },
  { name: "Last Minute", value: 25, color: "hsl(40, 95%, 55%)" },
  { name: "Missed", value: 10, color: "hsl(15, 85%, 55%)" },
];

const Analytics = () => {
  const totalMissed = missedByCategory.reduce((acc, cat) => acc + cat.missed, 0);
  const totalOpportunities = missedByCategory.reduce((acc, cat) => acc + cat.total, 0);
  const successRate = Math.round(((totalOpportunities - totalMissed) / totalOpportunities) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Understand your opportunity tracking patterns and improve your success rate.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Success Rate</span>
              </div>
              <div className="text-3xl font-bold font-display text-success">
                {successRate}%
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-urgent/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-urgent" />
                </div>
                <span className="text-sm text-muted-foreground">Total Missed</span>
              </div>
              <div className="text-3xl font-bold font-display">{totalMissed}</div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Tracked</span>
              </div>
              <div className="text-3xl font-bold font-display">{totalOpportunities}</div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <span className="text-sm text-muted-foreground">Avg. Days Early</span>
              </div>
              <div className="text-3xl font-bold font-display">3.2</div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Missed by Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Missed Opportunities by Category
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={missedByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="missed" fill="hsl(var(--urgent))" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} opacity={0.3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Deadline Behavior */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Application Timing
              </h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deadlineAnalysis}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deadlineAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {deadlineAnalysis.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Activity
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="saved"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      stackId="2"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success))"
                      fillOpacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skill Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Skills to Develop
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                These skills appear frequently in missed opportunities:
              </p>
              <div className="space-y-4">
                {skillMismatch.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-muted-foreground">{skill.gap}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-warning to-urgent rounded-full transition-all duration-500"
                        style={{ width: `${skill.gap}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-br from-primary/10 to-info/10 rounded-2xl border border-primary/20 p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Key Insights
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-success mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Improving Trend</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your application rate increased by 25% this month compared to last month.
                </p>
              </div>
              <div className="bg-card/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Attention Needed</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You tend to miss internship deadlines. Set reminders 5 days earlier.
                </p>
              </div>
              <div className="bg-card/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">Recommendation</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Focus on hackathons this month - 5 matching your profile are open.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
