# Real Content & Assets

**Revision note:** the earlier version of this file told Claude Code to
"pull full text from the source PDF, page X" for several sections instead
of providing the actual text. The live-site audit found that instruction
itself shipped as literal on-page copy (e.g. "TODO: MD pull-quote — source
PDF p.3"). This version fixes that: every section below is the actual final
text, verbatim from the client's company profile. **Nothing in this file
should ever be copy-pasted as a placeholder — it *is* the copy.** If a
future field is genuinely still missing, use an empty/draft CMS state (like
the existing blog empty state), never a sentence describing what should go
there.

## Company basics
- Legal/trading name: **Eleven Star Gold**
- Brand mark: **ESG Engineering Services — "We Build For You"**
- Address: Street No. 05, Ghang Road, Sheikhupura, Punjab, Pakistan
- Web: www.elevenstar.pk
- Email: info@elevenstar.pk
- Phone: +92 333 6288862, +92 345 6342284
- CEO: Asif Nemat
- Co-Partner: Atif Naimat

## MD message — full text (use in full on `/about`)

> Since its establishment, ELEVEN STAR GOLD has been successfully managing
> ambitious projects across Pakistan. The company's prominent position in
> the construction industry is a direct result of our unwavering dedication
> and commitment to meeting our clients' needs. Our extensive and diverse
> experience in the construction sector has made ELEVEN STAR GOLD synonymous
> with quality and professionalism.
>
> Our primary objective is to provide our clients with the best professional
> services at competitive rates, ensuring complete satisfaction. To foster
> creativity and job satisfaction, we offer our employees opportunities for
> personal development, limited only by their ability and ambition. We view
> this as a key strategy in achieving our corporate goals.
>
> By continuously improving our performance, we aim to generate earnings
> that will secure a prosperous future for the company. ELEVEN STAR GOLD has
> always strived to act as a responsible corporate citizen within the
> construction industry.
>
> Our current strategy is focused on becoming Pakistan's leading Engineering
> and Project Management Organization. To achieve this, we are placing
> significant emphasis on strengthening our organizational structure,
> developing human resources, leveraging information technology, and
> adopting the latest project management techniques.
>
> As we move forward, I am confident that our dedicated team of
> professionals at ELEVEN STAR GOLD will elevate the company to new heights
> of success.
>
> **Asif Nemat**
> CEO

**Homepage short pull-quote** (already in the mockup, keep using this
excerpt only — not the full letter — in the hero and MD-section preview):
> "Our current strategy is focused on becoming Pakistan's leading Engineering
> and Project Management Organization — built on quality, safety, and
> complete conformance to client requirements."

This short quote and the full letter above are **the same underlying
field** — store the full letter once in the CMS/content source, and have
both the homepage pull-quote and the `/about` full text pull from it (the
homepage can either use a manually curated excerpt field or simply the first
paragraph) so an edit in one place updates both, per the original
instruction in `04-homepage-sections.md`.

## Mission Statement — full text (use verbatim on `/about`)

> Our mission is to provide active, value-added services to our customers
> without compromising on quality. We aim to achieve this by:
>
> - Ensuring that quality means complete conformance to agreed customer
>   requirements and the latest international standards and techniques.
> - Recognizing that quality is the responsibility of every individual in
>   the organization.
>
> We commit to putting forth our best efforts to complete projects on time,
> while never compromising on quality or safety.
>
> We empower our customers to stay competitive, enhance the company's value
> to create new opportunities, and embrace corporate responsibility to
> positively impact society.
>
> Every member of our team must be dedicated to this mission. Our reputation
> is built on working together to satisfy and retain the most important
> person in business — our client.

## Vision — full text (use verbatim on `/about`)

> ELEVEN STAR GOLD's vision is to become a benchmark civil contractor in the
> fields of building construction, road infrastructure, and industries such
> as food, chemicals, and real estate development. We aim to set new
> standards of excellence, innovation, and sustainability in these sectors,
> delivering high-quality projects that meet the evolving needs of our
> clients and contribute to the growth and development of communities.
> Through our commitment to superior craftsmanship, cutting-edge technology,
> and a customer-centric approach, we aspire to be the preferred partner in
> shaping a better future.

## Services — full descriptions (all 9 — use verbatim on `/services`)

Intro line: "ELEVEN STAR GOLD provides a comprehensive range of construction
services, delivering high-quality solutions to meet the diverse needs of our
clients. Our services include:"

1. **Building Construction** — Residential, commercial, and industrial
   buildings execution with precision and expertise.
2. **Road Construction** — Full-scale road and highway development,
   including paving, grading, and infrastructure.
3. **Project Management** — End-to-end project management, ensuring timely
   completion, cost control, and quality assurance.
4. **Civil Engineering** — Structural, geotechnical, and infrastructure
   implementation as per design.
5. **Renovation & Remodeling** — Revitalizing and upgrading existing
   structures to meet modern standards and client specifications.
6. **Interior and Exterior Finishing** — Comprehensive interior and exterior
   work, including painting, flooring, and facades.
7. **Industrial Construction** — Specialized construction services for
   industries such as food, chemicals, and manufacturing facilities.
8. **Real Estate Development** — Land acquisition, planning, and
   development of residential, commercial, and mixed-use properties.
9. **Maintenance & Repairs** — Ongoing building maintenance and repairs to
   ensure safety and longevity.

Closing line: "ELEVEN STAR GOLD prides itself on providing cost-effective,
sustainable, and innovative solutions, ensuring every project exceeds
expectations and is delivered on time."

## Division & Area of Expertise (use on `/about`, optional supporting section)

**Project Planning** — an independent planning section of qualified
engineers current on the latest planning techniques: Cost Estimation, Risk
Assessment, Scheduling, Tender Pricing, Execution of Projects. Uses computer
technology for construction project scheduling, monitoring and management.

**Civil Construction Section** — two cells:
- *Planning Cell* — prepares work to run smoothly, on time, and in order
  before execution begins.
- *Execution Cell* — covers Construction Management, Site Supervision,
  Store Section, Quality Assurance Section, and HSE Section.

**Site Supervision** sub-sections: Formwork, Steel, Concrete/Masonry,
Survey, Monitoring, and Finishes Control.

**Quality Assurance Section** — experienced personnel working with
recognized agencies on: Concrete Test, Steel Test, Crush Test, Sand Test,
Cement Test, Water Test, Soil Test, and Geo-tech Investigation.

## Certifications
- PEC — Pakistan Engineering Council
- PRA — Punjab Revenue Authority
- FBR — Federal Board of Revenue
- Professional Tax Certificate
- Chamber of Commerce Membership Certificate

Certificate scan images are in the source PDF but are low-quality
photocopies — **request fresh scans or clear photos of the originals from
the client.** Until supplied, the `/certifications` page should show each
certification's name and issuing body with a clearly-styled "certificate
image pending" placeholder — never an invented description of the
certificate's contents, and never visible text asking the client for it (that
instruction is for whoever's populating the CMS, not for the public page).

## HSE Policy — full text (use verbatim on `/safety`, do not summarize)

> ELEVEN STAR GOLD management will conduct its business in a manner that
> assures health, safety and security for its employees and avoids damage to
> company assets.
>
> The management will strive to prevent accidents, injuries and occupational
> illnesses through the active participation of each employee. The
> management will put continuous efforts to identify and eliminate safety
> risks associated with each work area.
>
> ELEVEN STAR GOLD management will implement this policy by:
> - Providing a safe and secure working environment for all persons employed
>   and associated with the project.
> - Compliance with all HSE statutory regulations enforced by the law of the
>   land.
> - Ensuring active participation of all persons employed on the project
>   team to achieve the highest practicable standards of health, hygiene,
>   accident prevention and security.
>
> Adherence to our HSE policy is to achieve:
> - **Zero Accident**
> - **Zero Injury**
> - **Zero Property Damage**

## Staff overview (use on `/about`, e.g. an "Our Team" or "Capacity"
sub-section — present as a summary, not necessarily a literal reproduction
of the table)

**Office staff:** General Manager (1), Legal Officer (1), HR Officer (1),
Admin/Accounts Officer (1), Purchase Officer (2), Store In-Charge (1).

**Site staff:** Chief Engineer/Project Manager (1), Construction Manager
(1), Quantity Surveyor (1), Quality Checker (1), Site Engineer (1), Site
Supervisor (4), General Foreman (8), Store In-Charge (1), Purchase Officer
(2).

**Machinery & equipment (selected):** Auto Level Set, Laser Level Set,
Concrete Mixer Machines, Concrete Vibrators, Wheel Barrows, Lift Machines,
Shuttering Plates (10,000 sft), Scaffolding Pipes (1,200) and Joints
(2,000), Dewatering Pumps, Generator Sets, Plate Compactors, and full PPE
stock (helmets, gloves, safety boots, first aid kits, dust masks/
respirators, fire extinguishers). This is a good candidate for a short
"Our Capacity" section on `/about` — a few highlights, not the full
inventory table.

## Headline stats — compute these, don't hardcode them

The audit found "contracts delivered" and "largest single contract" broken
(rendering as blank/em dash) on every page that shows the ledger/stat strip.
**Do not fix this by typing in a fixed number** — the client's project list
already has ~100 historical entries across several internal categories
(Schools & Colleges, PESSI, PHE, TMA, HUBCO, and a general list) with some
overlap between them, so any manually-entered total will drift out of date
and risks double-counting. Instead:

- `contracts_delivered` = a live `COUNT` of published rows in the Projects
  table (status = completed).
- `largest_single_contract` = a live `MAX(cost)` across the same rows.
- Both values should update automatically as projects are added via the
  admin panel — never re-typed by hand in Site Settings.
- Seed the Projects table initially with the highest-value, most
  presentable projects (the table below); add the remaining historical
  projects from the source data over time — the stat strip will simply
  reflect however many are currently entered, which is correct behavior,
  not a bug.

## Seed project data (enter these first — highest-value / most presentable)

| Project | Client | Cost (₨) | Year | Category |
|---|---|---|---|---|
| Campus Center Building at FCCU (A Chartered University), Lahore | FCCU | 560,000,000 | 2023 | Education |
| Construction of the Archer High School, Sheikhupura | The Archer High School | 113,750,215 | 2025–26 | Education |
| Construction of Building, Kids' Education Centre | Kids' Education Centre | 96,540,230 | 2024 | Education |
| Frame Work Contract for Repair & Maintenance of Genset & UPS's | HISDU | 120,000,000 | 2023–24 | Government |
| Frame Contract for Provision of Mechanical, Electrical & Plumbing Services for P&SHD | HISDU | 60,000,000 | 2023–24 | Government |
| Frame Work Contract for Procurement of Horticulture | HISDU | 15,000,000 | 2023–24 | Government |
| Rehabilitation of Social Security Hospital, Jauharabad | PESSI | 31,015,432 | 2025–26 | Healthcare |
| Addition/Alteration and Up-Gradation of Sahiwal | PESSI | 32,962,664 | In progress | Government |
| Civil Work for Repair & Maintenance of Infectious Diseases Hospital, Bilal Ganj, Lahore | PHFMC | 21,526,939 | 2023–24 | Healthcare |
| Civil & Elect. Work, Govt. Eye & General Hospital Swaminagar (Package II) | PHFMC | 14,209,477 | 2023–24 | Healthcare |
| Civil & Elect. Work, Govt. Hospital Shahdara Town (Package I) | PHFMC | 10,145,453 | 2023–24 | Healthcare |
| Repair Works of Damaged Gabion, Mirpur, Azad Kashmir | HUBCO / Laraib Energy | 14,505,422 | 2025–26 | Government |
| MS HVAC Pipeline, Deen Textile, Lahore | Deen Textile | 9,721,934 | 2020 | Industrial |
| Chill HD PE Water Line, Master Textile, Lahore | Master Textile | 15,138,602 | 2021 | Industrial |
| Infrastructure Works of Palm Village Housing Scheme, Faisalabad | Palm Village | 29,317,532 | 2019 | Housing |
| Infrastructure Works of Palm Villas Phase-I (Extension), Jhung | Palm Villas | 7,305,467 | 2020 | Housing |
| Infrastructure Works of Sandal Garden Housing Scheme, Lahore | Sandal Garden | 12,445,862 | 2019 | Housing |
| Civil & Renovation Work, Sacred Heart School | Sacred Heart School | 5,696,179 | 2023 | Education |
| Special Repair of W.W School Girls, Muzafargarh (roof/washroom treatment) | PWWF | 5,843,946 | 2025–26 | Education |
| Annual Maintenance, Workers Welfare Schools, Bhagtanwala (boys & girls) | PWWF | 3,884,535 | 2025–26 | Education |

Every other row in the source data (PESSI's older hospital repair jobs, the
PHE drainage/soling schemes, the TMA street/sewerage works, the general
list's church/BHU/school jobs, and the 5 currently in-progress PESSI
contracts) can be entered the same way — same five fields each time: title,
client, cost, year, category. Treat the numbering across the source PDF's
separate tables as informal — several entries appear in more than one table;
de-duplicate by project description when entering, don't assume every row is
unique.

## Photography
Real site photos exist in the source PDF's "Project Gallery" section for:
FCCU Campus Center, Deen Textile HVAC line, Palm Village/Palm Villas
infrastructure, the Gabion repair, the Archer High School, Kids Education
Centre, Sacred Heart School, and several PESSI/PWWF school and hospital
repair jobs. Notes:

- They're compressed inside a CorelDRAW-exported PDF — re-request the
  original photo files from the client for better resolution wherever
  possible.
- A long run of pages is flagged "CamScanner" (scanned documents, not
  project photos) — **do not use these as gallery images**; they are
  completion certificates or measurement sheets and belong in internal
  project records, not the public gallery.
- Where no usable photo exists yet for a project, launch that project card
  with its data and a neutral, on-brand placeholder (per `01-design-system.md`)
  rather than holding up the page — photos can be added later via the CMS.
- Placeholder imagery used in the meantime (hero, cards) should be
  royalty-free stock photography, never invented/AI-generated construction
  scenes and never a competitor's photography — see `01-design-system.md`.

## Trust bar client names
PESSI, FCCU, PWWF, HISDU, PHFMC, HUBCO, TMA, PHE — request permission and,
where possible, an official logo file from each before using their name or
mark publicly (several are government bodies with their own logo usage
policies).
