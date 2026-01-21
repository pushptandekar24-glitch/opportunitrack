import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, TrendingUp, Bell } from "lucide-react";

const floatingCards = [
  {
    icon: Clock,
    title: "Deadline in 2 days",
    subtitle: "Google STEP Internship",
    color: "urgent",
  },
  {
    icon: TrendingUp,
    title: "95% Match",
    subtitle: "Based on your skills",
    color: "success",
  },
  {
    icon: Bell,
    title: "New Opportunity",
    subtitle: "MLH Hackathon 2024",
    color: "info",
  },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Never miss an opportunity again
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Track, Apply &{" "}
              <span className="text-gradient">Succeed</span> in Your Career
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Your intelligent companion for internships, hackathons, scholarships,
              and more. Get personalized recommendations and never miss a deadline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Explore Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "10K+", label: "Opportunities" },
                { value: "5K+", label: "Students" },
                { value: "98%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className={`absolute glass rounded-2xl p-5 shadow-elevated border border-border/50 ${
                    index === 0
                      ? "top-8 left-0 animate-float"
                      : index === 1
                      ? "top-1/3 right-0 animate-float"
                      : "bottom-12 left-1/4 animate-float"
                  }`}
                  style={{
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        card.color === "urgent"
                          ? "bg-urgent/10 text-urgent"
                          : card.color === "success"
                          ? "bg-success/10 text-success"
                          : "bg-info/10 text-info"
                      }`}
                    >
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {card.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Central Illustration Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-info/20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
