import { motion } from "framer-motion";
import { Briefcase, Trophy, GraduationCap, Award, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Briefcase,
    name: "Internships",
    route: "/opportunities/internship",
    count: 2340,
    color: "internship",
    description: "Top tech companies & startups",
  },
  {
    icon: Trophy,
    name: "Hackathons",
    route: "/opportunities/hackathon",
    count: 156,
    color: "hackathon",
    description: "Online & in-person events",
  },
  {
    icon: GraduationCap,
    name: "Scholarships",
    route: "/opportunities/scholarship",
    count: 890,
    color: "scholarship",
    description: "Merit & need-based funding",
  },
  {
    icon: Award,
    name: "Competitions",
    route: "/opportunities/competition",
    count: 234,
    color: "competition",
    description: "Academic & technical challenges",
  },
  {
    icon: Wrench,
    name: "Workshops",
    route: "/opportunities/workshop",
    count: 567,
    color: "workshop",
    description: "Skill-building sessions",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Find opportunities that match your goals
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={category.route}>
                <div className="relative group cursor-pointer rounded-2xl p-6 border border-border bg-card hover:shadow-lifted transition-all duration-300 overflow-hidden">
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      category.color === "internship"
                        ? "bg-gradient-to-br from-internship/5 to-internship/10"
                        : category.color === "hackathon"
                        ? "bg-gradient-to-br from-hackathon/5 to-hackathon/10"
                        : category.color === "scholarship"
                        ? "bg-gradient-to-br from-scholarship/5 to-scholarship/10"
                        : category.color === "competition"
                        ? "bg-gradient-to-br from-competition/5 to-competition/10"
                        : "bg-gradient-to-br from-workshop/5 to-workshop/10"
                    }`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        category.color === "internship"
                          ? "bg-internship/10 text-internship"
                          : category.color === "hackathon"
                          ? "bg-hackathon/10 text-hackathon"
                          : category.color === "scholarship"
                          ? "bg-scholarship/10 text-scholarship"
                          : category.color === "competition"
                          ? "bg-competition/10 text-competition"
                          : "bg-workshop/10 text-workshop"
                      }`}
                    >
                      <category.icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>

                    <div className="text-2xl font-bold text-foreground">
                      {category.count.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        active
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
