import { Check } from "lucide-react";
import { motion } from "motion/react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for exploring the power of AI voice cloning.",
      features: ["3 Cloned Voices", "10,000 Characters / Month", "29+ Languages", "Standard Support"],
      button: "Get Started Free",
      highlight: false
    },
    {
      name: "Pro",
      price: "29",
      description: "Ideal for content creators and professionals.",
      features: ["Unlimited Cloned Voices", "100,000 Characters / Month", "Premium Emotion Tuning", "Priority Support", "Bulk Export"],
      button: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "99+",
      description: "Custom solutions for teams and large-scale operations.",
      features: ["Unlimited Usage", "Custom API Access", "Dedicated Account Manager", "White-label Options", "SLA Guarantee"],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Choose the perfect plan for your voice needs. No hidden fees, cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 flex flex-col ${plan.highlight ? 'neon-border border-accent-purple ring-1 ring-accent-purple/50' : 'border-white/5'}`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl font-bold">${plan.price}</span>
              <span className="text-gray-500 ml-2">/mo</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/20' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
