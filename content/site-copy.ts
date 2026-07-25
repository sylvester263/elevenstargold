// Static copy that changes rarely and isn't in the CMS — 08-tech-stack-and-conventions.md.
// Sourced verbatim from 07-real-content-and-assets.md (itself sourced from
// the client's company profile) — 09-launch-fixes.md P0-1/P1.

export const company = {
  name: "Eleven Star Gold",
  tagline: "Engineering Services — We Build For You",
  address: "Street No. 05, Ghang Road, Sheikhupura, Punjab, Pakistan",
  web: "www.elevenstar.pk",
  email: "info@elevenstar.pk",
  phones: ["+92 333 6288862", "+92 345 6342284"],
  md: "Asif Nemat",
};

// The homepage pull-quote and /about full letter read from this one field
// (same underlying source, per 04-homepage-sections.md) — the pull-quote is
// the client-approved short excerpt, not the letter's first paragraph.
export const mdMessage = {
  pullQuote:
    "Our current strategy is focused on becoming Pakistan's leading Engineering and Project Management Organization — built on quality, safety, and complete conformance to client requirements.",
  fullLetter: `Since its establishment, ELEVEN STAR GOLD has been successfully managing ambitious projects across Pakistan. The company's prominent position in the construction industry is a direct result of our unwavering dedication and commitment to meeting our clients' needs. Our extensive and diverse experience in the construction sector has made ELEVEN STAR GOLD synonymous with quality and professionalism.

Our primary objective is to provide our clients with the best professional services at competitive rates, ensuring complete satisfaction. To foster creativity and job satisfaction, we offer our employees opportunities for personal development, limited only by their ability and ambition. We view this as a key strategy in achieving our corporate goals.

By continuously improving our performance, we aim to generate earnings that will secure a prosperous future for the company. ELEVEN STAR GOLD has always strived to act as a responsible corporate citizen within the construction industry.

Our current strategy is focused on becoming Pakistan's leading Engineering and Project Management Organization. To achieve this, we are placing significant emphasis on strengthening our organizational structure, developing human resources, leveraging information technology, and adopting the latest project management techniques.

As we move forward, I am confident that our dedicated team of professionals at ELEVEN STAR GOLD will elevate the company to new heights of success.`,
};

// A short history paragraph derived from the MD letter's opening (per
// 09-launch-fixes.md P1 #6: "use the MD message's opening paragraphs as a
// basis") rather than a separate invented narrative.
export const companyHistory =
  "Since its establishment, Eleven Star Gold has built a prominent position in Pakistan's construction industry, successfully managing ambitious projects for government, institutional, and private clients across the country. That position is a direct result of the company's dedication to meeting client needs — an extensive and diverse track record across building construction, civil engineering, and infrastructure work that has made Eleven Star Gold synonymous with quality and professionalism.";

export const missionVision = {
  mission: `Our mission is to provide active, value-added services to our customers without compromising on quality. We aim to achieve this by:

- Ensuring that quality means complete conformance to agreed customer requirements and the latest international standards and techniques.
- Recognizing that quality is the responsibility of every individual in the organization.

We commit to putting forth our best efforts to complete projects on time, while never compromising on quality or safety.

We empower our customers to stay competitive, enhance the company's value to create new opportunities, and embrace corporate responsibility to positively impact society.

Every member of our team must be dedicated to this mission. Our reputation is built on working together to satisfy and retain the most important person in business — our client.`,
  vision:
    "ELEVEN STAR GOLD's vision is to become a benchmark civil contractor in the fields of building construction, road infrastructure, and industries such as food, chemicals, and real estate development. We aim to set new standards of excellence, innovation, and sustainability in these sectors, delivering high-quality projects that meet the evolving needs of our clients and contribute to the growth and development of communities. Through our commitment to superior craftsmanship, cutting-edge technology, and a customer-centric approach, we aspire to be the preferred partner in shaping a better future.",
};

export const servicesIntro =
  "ELEVEN STAR GOLD provides a comprehensive range of construction services, delivering high-quality solutions to meet the diverse needs of our clients. Our services include:";

export const servicesClosing =
  "ELEVEN STAR GOLD prides itself on providing cost-effective, sustainable, and innovative solutions, ensuring every project exceeds expectations and is delivered on time.";

export const services = [
  {
    name: "Building Construction",
    description:
      "Residential, commercial, and industrial buildings execution with precision and expertise.",
  },
  {
    name: "Road Construction",
    description:
      "Full-scale road and highway development, including paving, grading, and infrastructure.",
  },
  {
    name: "Project Management",
    description:
      "End-to-end project management, ensuring timely completion, cost control, and quality assurance.",
  },
  {
    name: "Civil Engineering",
    description:
      "Structural, geotechnical, and infrastructure implementation as per design.",
  },
  {
    name: "Renovation & Remodeling",
    description:
      "Revitalizing and upgrading existing structures to meet modern standards and client specifications.",
  },
  {
    name: "Interior and Exterior Finishing",
    description:
      "Comprehensive interior and exterior work, including painting, flooring, and facades.",
  },
  {
    name: "Industrial Construction",
    description:
      "Specialized construction services for industries such as food, chemicals, and manufacturing facilities.",
  },
  {
    name: "Real Estate Development",
    description:
      "Land acquisition, planning, and development of residential, commercial, and mixed-use properties.",
  },
  {
    name: "Maintenance & Repairs",
    description:
      "Ongoing building maintenance and repairs to ensure safety and longevity.",
  },
];

export const hsePolicy = {
  headline: "Zero Accident / Zero Injury / Zero Property Damage",
  fullText: `ELEVEN STAR GOLD management will conduct its business in a manner that assures health, safety and security for its employees and avoids damage to company assets.

The management will strive to prevent accidents, injuries and occupational illnesses through the active participation of each employee. The management will put continuous efforts to identify and eliminate safety risks associated with each work area.

ELEVEN STAR GOLD management will implement this policy by:

- Providing a safe and secure working environment for all persons employed and associated with the project.
- Compliance with all HSE statutory regulations enforced by the law of the land.
- Ensuring active participation of all persons employed on the project team to achieve the highest practicable standards of health, hygiene, accident prevention and security.

Adherence to our HSE policy is to achieve:

- Zero Accident
- Zero Injury
- Zero Property Damage`,
};

// Standard-issue PPE and site safety equipment — 07-real-content-and-assets.md's
// machinery/equipment overview.
export const ppe = [
  "Helmets",
  "Gloves",
  "Safety boots",
  "First aid kits",
  "Dust masks / respirators",
  "Fire extinguishers",
];

// "Our Capacity" — a short summary of staff and machinery, not the full
// inventory table (07-real-content-and-assets.md's own guidance).
export const capacity = {
  staff:
    "Our office team covers general management, legal, HR, admin/accounts, purchasing, and store operations. On site, delivery is led by a Chief Engineer / Project Manager and Construction Manager, supported by a Quantity Surveyor, Quality Checker, Site Engineer, a team of Site Supervisors, General Foremen, and dedicated store and purchase staff.",
  machinery:
    "Our equipment includes Auto Level and Laser Level Sets, concrete mixers and vibrators, lift machines, 10,000 sft of shuttering plates, 1,200 scaffolding pipes with 2,000 joints, dewatering pumps, generator sets, and plate compactors — backed by a full PPE stock for every site.",
};
