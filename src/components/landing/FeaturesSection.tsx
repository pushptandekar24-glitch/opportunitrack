import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Trophy,
  GraduationCap,
  Calendar,
  Bell,
  BarChart3,
  Sparkles,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Internship Tracking",
    description:
      "Discover and track internship opportunities from top companies worldwide.",
    color: "internship",
    link: "/internships",
  },
  {
    icon: Trophy,
    title: "Hackathon Alerts",
    description:
      "Never miss a hackathon. Get notified about upcoming events matching your skills.",
    color: "hackathon",
    link: "/hackathons",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Finder",
    description:
      "Find scholarships tailored to your academic profile and financial needs.",
    color: "scholarship",
    link: "/scholarships",
  },
  {
    icon: Calendar,
    title: "Deadline Management",
    description:
      "Visual countdown timers and calendar sync to keep you on track.",
    color: "competition",
    link: "/deadlines",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Get timely email and push notifications before application deadlines.",
    color: "workshop",
    link: "/deadlines",
  },
  {
    icon: BarChart3,
    title: "Missed Analytics",
    description:
      "Understand patterns in missed opportunities and improve your application rate.",
    color: "primary",
    link: "/analytics",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Powerful Features
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From discovery to application, we've got you covered with tools
            designed specifically for ambitious students.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link to={feature.link} className="block">
                <div className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lifted cursor-pointer">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                      feature.color === "internship"
                        ? "bg-internship/10 text-internship"
                        : feature.color === "hackathon"
                        ? "bg-hackathon/10 text-hackathon"
                        : feature.color === "scholarship"
                        ? "bg-scholarship/10 text-scholarship"
                        : feature.color === "competition"
                        ? "bg-competition/10 text-competition"
                        : feature.color === "workshop"
                        ? "bg-workshop/10 text-workshop"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>

                  <p className="mt-4 text-sm text-primary font-medium">
                    Explore →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border shadow-soft">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">
              Join{" "}
              <span className="font-semibold text-foreground">5,000+</span>{" "}
              students already tracking their opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
