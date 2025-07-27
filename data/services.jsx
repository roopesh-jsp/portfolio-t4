import { FaShoppingCart, FaRocket, FaBriefcase } from "react-icons/fa";
export const services = [
  {
    icon: <FaShoppingCart className="text-3xl text-cyan-500" />,
    title: "E-commerce Solutions",
    slug: "ecommerce",
    focus: [
      "Customizable product catalogs",
      "Secure and efficient checkout processes",
      "Intuitive navigation for seamless shopping",
      "Scalable architecture to grow with your business",
    ],
    description:
      "Empower your business with a robust and user-friendly online store. From product display to secure payment gateways, we build e-commerce platforms that not only look great but also drive sales.",
  },
  {
    icon: <FaBriefcase className="text-3xl text-purple-500" />,

    title: "Company Portfolios",
    slug: "portfolio",
    focus: [
      "Clean and modern design",
      "Compelling presentation of your work",
      "Clear calls to action",
      "Responsive layouts for all devices",
    ],
    description:
      "Showcase your brand's strengths and achievements with a professional and impactful portfolio. We highlight your services and success stories, leaving lasting impressions on clients.",
  },
  {
    icon: <FaRocket className="text-3xl text-green-500" />,

    title: "High-Converting Landing Pages",
    slug: "landing",
    focus: [
      "Persuasive copy and engaging visuals",
      "Optimized for lead generation",
      "Fast loading times for better UX",
      "Clear and concise calls to action",
    ],
    description:
      "Capture leads and drive conversions with strategic landing pages. With compelling visuals and CTAs, our pages help your marketing campaigns reach their peak potential.",
  },
];

export const hotServices = [
  {
    id: 1,
    label: "🔥 Hot Service",
    title: "Personal Portfolio Websites for Students",
    description:
      "Launch your digital presence without breaking the bank. We craft stunning, responsive portfolios for students at minimal cost — fully customizable with real-time feedback integration.",
    cta: "Get Yours Now",
    href: "https://wa.me/918897502339?text=Hi!%20I%E2%80%99d%20like%20to%20book%20a%20free%20call%20about%20building%20a%20website%20for%20my%20business.", // or route or modal trigger
    badgeColor: "bg-cyan-900/20 text-cyan-400",
    glowColor: "shadow-[0_0_30px_rgba(0,255,255,0.1)]",
  },

  // You can add more items here in future...
];
