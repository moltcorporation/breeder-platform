export interface BreederPageData {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whatToLook: {
    title: string;
    items: { heading: string; text: string }[];
  };
  pricing: {
    range: string;
    details: string[];
  };
  healthTesting: {
    intro: string;
    tests: { name: string; description: string }[];
  };
  faqs: { question: string; answer: string }[];
  relatedBreederPages: string[];
}

export const BREEDER_PAGES: Record<string, BreederPageData> = {
  "golden-retriever": {
    slug: "golden-retriever",
    name: "Golden Retriever",
    h1: "Golden Retriever Breeders",
    metaTitle: "Golden Retriever Breeders — Find Reputable Breeders Near You | PawPage",
    metaDescription:
      "Find trusted Golden Retriever breeders across the US. Learn what health tests to require, typical pricing, and how to spot a responsible breeder before buying a puppy.",
    intro:
      "Golden Retrievers are America's third most popular breed — friendly, intelligent, and famously patient with children. Finding a reputable breeder is the single most important decision you will make when adding a Golden to your family. A well-bred puppy from health-tested parents starts life with better hips, clearer eyes, and a calmer temperament than one from an untested litter. Use this guide to know exactly what to look for, then browse breeders by state below.",
    whatToLook: {
      title: "What to Look for in a Golden Retriever Breeder",
      items: [
        {
          heading: "OFA or PennHIP hip and elbow clearances",
          text: "Golden Retrievers have one of the highest dysplasia rates among large breeds. Both parents should have passing OFA hip and elbow scores or PennHIP evaluations. Ask to see the certificates — a responsible breeder will share them before you even ask.",
        },
        {
          heading: "Cardiac and eye clearances",
          text: "Subvalvular aortic stenosis (SAS) is a congenital heart condition in Goldens. Both parents need a cardiac clearance from a board-certified cardiologist. Annual ophthalmologist eye exams screen for progressive retinal atrophy (PRA) and pigmentary uveitis.",
        },
        {
          heading: "Cancer awareness and pedigree transparency",
          text: "Golden Retrievers have a higher cancer rate than most breeds — up to 60% in some studies. A good breeder tracks cancer incidence in their lines, can discuss longevity in their pedigrees, and often participates in research like the Morris Animal Foundation's Golden Retriever Lifetime Study.",
        },
        {
          heading: "Socialization and puppy-raising practices",
          text: "Look for breeders who raise litters in the home (not a kennel building) and follow early neurological stimulation (ENS) protocols. Puppies should be exposed to household sounds, children, and varied surfaces before 8 weeks. Ask about their socialization checklist.",
        },
        {
          heading: "Written health guarantee and take-back policy",
          text: "Reputable Golden Retriever breeders offer a 2-year health guarantee covering genetic conditions and a lifetime take-back policy. If you ever cannot keep the dog, the breeder takes it back — no questions asked. This is the hallmark of a breeder who cares about their puppies for life.",
        },
      ],
    },
    pricing: {
      range: "$1,500–$3,500",
      details: [
        "Pet-quality puppies from health-tested parents: $1,500–$2,500",
        "Show or breeding-prospect puppies with titled parents: $2,500–$3,500",
        "Field-trial lines with proven hunting pedigrees: $2,000–$3,500",
        "English Cream Golden Retrievers (same breed, lighter color): similar pricing — avoid breeders charging a premium solely for coat shade",
      ],
    },
    healthTesting: {
      intro:
        "The Golden Retriever Club of America (GRCA) recommends these minimum health clearances for all breeding stock. Do not buy from a breeder who skips any of them.",
      tests: [
        {
          name: "Hip evaluation (OFA or PennHIP)",
          description:
            "X-rays evaluated by the Orthopedic Foundation for Animals or PennHIP. Both parents must have passing scores.",
        },
        {
          name: "Elbow evaluation (OFA)",
          description:
            "Screens for elbow dysplasia, fragmented coronoid process, and osteochondritis. Both parents should be OFA-cleared.",
        },
        {
          name: "Cardiac exam",
          description:
            "Auscultation by a board-certified veterinary cardiologist. Screens for subvalvular aortic stenosis.",
        },
        {
          name: "Eye exam (annual)",
          description:
            "CERF or OFA eye exam by a veterinary ophthalmologist within the last 12 months. Screens for PRA, pigmentary uveitis, and cataracts.",
        },
        {
          name: "Ichthyosis DNA test",
          description:
            "A simple DNA test identifies carriers of this genetic skin condition that causes dark, flaky scales. Both parents should be tested.",
        },
        {
          name: "PRA DNA test",
          description:
            "Progressive retinal atrophy DNA panel confirms clear, carrier, or affected status. At least one parent must be clear.",
        },
      ],
    },
    faqs: [
      {
        question: "How do I find a reputable Golden Retriever breeder near me?",
        answer:
          "Start with the Golden Retriever Club of America (GRCA) breeder referral directory. Ask for OFA hip, elbow, cardiac, and eye clearances on both parents. Visit the litter in person, meet at least one parent, and confirm the breeder offers a written health guarantee. PawPage lists verified breeders by state — browse your state below to find breeders with available litters.",
      },
      {
        question: "How much should I pay for a Golden Retriever puppy?",
        answer:
          "Expect to pay $1,500 to $3,500 from a health-tested breeder. Puppies under $1,000 often come from breeders who skip health testing — the savings disappear quickly if hip surgery or cancer treatment is needed later. The most important factor is not price but the health clearances behind it.",
      },
      {
        question: "What health tests should Golden Retriever breeders perform?",
        answer:
          "At minimum: OFA or PennHIP hip and elbow evaluations, a cardiac exam by a board-certified cardiologist, an annual ophthalmologist eye exam, and DNA tests for PRA and ichthyosis. These are the GRCA-recommended clearances. Any breeder who dismisses or skips them is not worth your money.",
      },
      {
        question: "Are Golden Retrievers good family dogs?",
        answer:
          "Golden Retrievers are consistently rated among the best family breeds. They are patient with children, gentle with other pets, and eager to please. Their soft mouth and calm temperament make them natural therapy dogs. They do need 60-90 minutes of daily exercise and shed heavily, so they are best for active households.",
      },
      {
        question: "What is the difference between English Cream and American Golden Retrievers?",
        answer:
          "They are the same breed. English Cream Goldens tend to have lighter coats, blockier heads, and stockier builds. American Goldens are often leaner with darker gold coats. Health testing standards are identical for both. Avoid breeders who market English Creams as rare or charge a premium solely for the lighter color.",
      },
      {
        question: "How long is the waitlist for Golden Retriever puppies?",
        answer:
          "Most reputable Golden Retriever breeders have waitlists of 6 to 18 months. This is normal and a good sign — it means the breeder is not overproducing litters to meet demand. Place your deposit early, ask about expected litter dates, and use the wait time to prepare your home.",
      },
      {
        question: "Should I get a male or female Golden Retriever?",
        answer:
          "Males tend to be larger (65-75 lbs) and slightly more playful and attention-seeking. Females (55-65 lbs) are often more independent and mature faster. Both are equally affectionate and trainable. Choose based on your preference for size and energy level rather than assuming one sex is better.",
      },
    ],
    relatedBreederPages: ["french-bulldog", "goldendoodle", "labrador-retriever"],
  },

  "french-bulldog": {
    slug: "french-bulldog",
    name: "French Bulldog",
    h1: "French Bulldog Breeders",
    metaTitle: "French Bulldog Breeders — Find Reputable Breeders Near You | PawPage",
    metaDescription:
      "Find trusted French Bulldog breeders across the US. Learn what BOAS grading means, typical Frenchie pricing by color, and the health tests every breeder should provide.",
    intro:
      "French Bulldogs are the most popular breed in America — compact, low-maintenance, and packed with personality. But their explosive demand has attracted more irresponsible breeders than almost any other breed. Breathing problems, spinal issues, and skin infections are common in poorly bred Frenchies, and veterinary bills can easily exceed the purchase price. This guide covers exactly what to look for in a French Bulldog breeder so you bring home a healthy puppy, not a lifetime of vet visits.",
    whatToLook: {
      title: "What to Look for in a French Bulldog Breeder",
      items: [
        {
          heading: "BOAS grading on both parents",
          text: "Brachycephalic obstructive airway syndrome is the number one health concern in French Bulldogs. A responsible breeder will have both parents BOAS-graded by a veterinarian. Ask to hear the parents breathe at rest — if either snorts or labors, the breeder is not selecting for respiratory health.",
        },
        {
          heading: "Moderate facial structure over extreme flatness",
          text: "The flattest-faced Frenchies are the most likely to need corrective airway surgery ($3,000–$5,000). Good breeders select for open nostrils, a visible muzzle, and clear breathing. A slightly longer nose does not make a less beautiful dog — it makes a healthier one.",
        },
        {
          heading: "Spinal evaluation for hemivertebrae",
          text: "French Bulldogs are prone to hemivertebrae (malformed spine bones) that can cause pain, incontinence, or paralysis. Breeders should X-ray the spines of breeding dogs and remove affected animals from their program. Ask to see spinal evaluation results.",
        },
        {
          heading: "DNA panel covering color-linked conditions",
          text: "If you are buying a blue, lilac, merle, or fluffy Frenchie, color-linked DNA testing is essential. Double-merle breeding produces deaf and blind puppies. Dilution alopecia can affect blue dogs. A responsible color breeder tests for every gene they are working with.",
        },
        {
          heading: "Transparent breeding practices",
          text: "Most French Bulldogs require artificial insemination and cesarean delivery. A good breeder limits each dam to one litter per year, allows full recovery between litters, and retires dams by age 5-6. Ask how many litters the dam has produced and how they manage her health.",
        },
      ],
    },
    pricing: {
      range: "$2,500–$5,000+",
      details: [
        "Standard colors (brindle, fawn, cream, white): $2,500–$5,000",
        "Blue French Bulldogs (dilution gene): $4,000–$7,000",
        "Lilac French Bulldogs (blue + chocolate): $5,000–$8,000",
        "Merle French Bulldogs: $4,000–$8,000 — only buy from breeders who DNA-test for merle and never breed merle-to-merle",
        "Fluffy French Bulldogs (recessive long-hair gene): $8,000–$15,000+",
      ],
    },
    healthTesting: {
      intro:
        "French Bulldogs need more health screening than most breeds due to their brachycephalic anatomy. These are the minimum tests a breeder should provide.",
      tests: [
        {
          name: "BOAS grading",
          description:
            "Veterinary assessment of airway obstruction severity. Both parents should have open airways with no exercise intolerance.",
        },
        {
          name: "Hip evaluation (OFA or PennHIP)",
          description:
            "Screens for hip dysplasia. French Bulldogs have one of the highest dysplasia rates among small breeds.",
        },
        {
          name: "Patella (knee) evaluation",
          description:
            "OFA patella exam checks for luxating patellas — a common issue in French Bulldogs that can require surgical correction.",
        },
        {
          name: "Spinal evaluation",
          description:
            "X-ray assessment for hemivertebrae and other spinal malformations. Breeding dogs with spinal issues should be removed from the program.",
        },
        {
          name: "Cardiac clearance",
          description:
            "Heart exam by a veterinarian or cardiologist to screen for congenital defects.",
        },
        {
          name: "DNA panel",
          description:
            "Covers degenerative myelopathy (DM), hereditary cataracts, and color-linked genes (d-locus for blue, cocoa for chocolate, merle). Essential for non-standard color breeding.",
        },
      ],
    },
    faqs: [
      {
        question: "How do I find a reputable French Bulldog breeder?",
        answer:
          "Look for BOAS grading on both parents, OFA hip and patella evaluations, spinal X-rays, and DNA testing. Visit the litter in person and listen to the parents breathe — labored breathing at rest is a red flag. Check the French Bull Dog Club of America breeder directory. PawPage lists verified Frenchie breeders by state below.",
      },
      {
        question: "How much does a French Bulldog puppy cost?",
        answer:
          "Standard-color Frenchies from health-tested parents cost $2,500 to $5,000. Rare colors (blue, lilac, merle, fluffy) range from $4,000 to $15,000+. The higher cost reflects expensive breeding (most require AI and C-sections). Avoid puppies significantly under $2,000 — that price usually means skipped health testing.",
      },
      {
        question: "What is BOAS and why does it matter?",
        answer:
          "BOAS (brachycephalic obstructive airway syndrome) is a breathing disorder caused by the French Bulldog's flat face. Symptoms range from snoring to life-threatening breathing emergencies. Corrective surgery costs $3,000 to $5,000. A breeder who BOAS-grades both parents and selects for open airways dramatically reduces your puppy's risk.",
      },
      {
        question: "Are French Bulldogs good apartment dogs?",
        answer:
          "Yes — Frenchies are one of the best apartment breeds. They need only two 15-20 minute walks per day, rarely bark excessively, and weigh 16-28 lbs. Their low exercise needs and calm indoor demeanor make them ideal for city living. Just ensure adequate air conditioning — Frenchies overheat easily.",
      },
      {
        question: "Are blue and merle French Bulldogs healthy?",
        answer:
          "Blue Frenchies can be healthy if bred responsibly, though some carry dilution alopecia (hair loss). Merle Frenchies carry additional risk: breeding two merle dogs together can produce deaf and blind puppies. Only buy from breeders who DNA-test for the merle gene and never breed merle-to-merle. Standard colors carry the fewest color-linked health risks.",
      },
      {
        question: "How long is the waitlist for a French Bulldog puppy?",
        answer:
          "Reputable French Bulldog breeders typically have waitlists of 3 to 12 months. Because Frenchies have small litters (3-4 puppies) and most dams only have one litter per year, supply from responsible breeders is limited. Place your deposit early and be patient — a well-bred Frenchie is worth the wait.",
      },
    ],
    relatedBreederPages: ["golden-retriever", "goldendoodle", "bulldog"],
  },

  goldendoodle: {
    slug: "goldendoodle",
    name: "Goldendoodle",
    h1: "Goldendoodle Breeders",
    metaTitle: "Goldendoodle Breeders — Find Reputable Breeders Near You | PawPage",
    metaDescription:
      "Find trusted Goldendoodle breeders across the US. Understand F1 vs F1B generations, health testing requirements, pricing by size, and how to choose a responsible breeder.",
    intro:
      "Goldendoodles are one of the most popular hybrid breeds in America — a Golden Retriever–Poodle cross that combines friendly temperament with a low-shedding coat. But the breed's popularity means the market is flooded with breeders cutting corners on health testing. Because Goldendoodles can inherit health problems from both parent breeds, choosing a responsible breeder is even more critical than with purebreds. This guide covers exactly what to ask, what tests to require, and what to expect when searching for a Goldendoodle breeder.",
    whatToLook: {
      title: "What to Look for in a Goldendoodle Breeder",
      items: [
        {
          heading: "Health testing on BOTH parent breeds",
          text: "Goldendoodles inherit risks from Golden Retrievers (hip dysplasia, cancer, eye disease) and Poodles (PRA, von Willebrand disease, Addison's disease). A responsible breeder tests both parents for conditions specific to their breed — not just one parent. Ask for OFA hip/elbow scores, eye exams, and DNA panels for both the Golden and Poodle parent.",
        },
        {
          heading: "Clear generation and size labeling",
          text: "F1 (Golden × Poodle), F1B (F1 × Poodle), F2, and multigen all produce different coat types and shedding levels. A good breeder explains exactly what generation they are producing and why. If allergies are your concern, F1B or multigenerational Goldendoodles are the most consistently low-shedding.",
        },
        {
          heading: "Accurate size predictions",
          text: "Goldendoodles range from 15 lbs (miniature) to 90 lbs (standard). Size depends on the Poodle parent — Standard, Moyen, or Miniature. A responsible breeder will tell you the exact size of both parents and give you a realistic adult weight range, not just the smallest possible number.",
        },
        {
          heading: "Early socialization and temperament testing",
          text: "The best Goldendoodle breeders raise litters in the home with early neurological stimulation (ENS), exposure to household sounds and children, and individual temperament assessments. Puppy Culture or Avidog protocols indicate a breeder who invests in behavioral development, not just coat color.",
        },
        {
          heading: "Contract with health guarantee and return policy",
          text: "A responsible breeder provides a written contract with a 2-year genetic health guarantee, requires spay/neuter for pet puppies, and offers a lifetime take-back policy. They will also ask you questions — where you live, your experience with dogs, your daily schedule. If a breeder does not screen buyers, they do not care where their puppies end up.",
        },
      ],
    },
    pricing: {
      range: "$2,000–$4,000",
      details: [
        "Standard Goldendoodles (50-90 lbs): $2,000–$3,000",
        "Medium Goldendoodles (30-50 lbs): $2,500–$3,500",
        "Miniature Goldendoodles (15-35 lbs): $3,000–$4,000+",
        "F1B and multigenerational (most hypoallergenic): typically $500-$1,000 more than F1",
        "Premium coat colors (red, apricot, parti): may add $500–$1,000 to base price",
      ],
    },
    healthTesting: {
      intro:
        "Because Goldendoodles are a hybrid, both parent breeds must be tested for their specific conditions. A breeder who only tests one parent is cutting corners.",
      tests: [
        {
          name: "Hip and elbow evaluation (OFA or PennHIP)",
          description:
            "Both Golden Retrievers and Standard Poodles are at risk for hip and elbow dysplasia. Both parents must have passing scores.",
        },
        {
          name: "Eye exam (OFA or CERF)",
          description:
            "Annual ophthalmologist exam screens for progressive retinal atrophy, cataracts, and other inherited eye conditions in both parent breeds.",
        },
        {
          name: "PRA DNA test",
          description:
            "Progressive retinal atrophy is present in both Goldens and Poodles. At least one parent must be DNA-tested PRA-clear to ensure no affected puppies.",
        },
        {
          name: "Von Willebrand disease (vWD) DNA test",
          description:
            "A bleeding disorder found in both breeds. The Poodle parent especially should be DNA-tested. Carrier-to-carrier breeding produces affected puppies.",
        },
        {
          name: "Cardiac clearance",
          description:
            "Screens for heart conditions including subvalvular aortic stenosis, more common in Golden Retrievers. Both parents should be evaluated.",
        },
        {
          name: "Ichthyosis DNA test (Golden parent)",
          description:
            "A genetic skin condition in Golden Retrievers. The Golden parent should be tested — carriers can pass the gene to Goldendoodle puppies.",
        },
      ],
    },
    faqs: [
      {
        question: "How do I find a reputable Goldendoodle breeder near me?",
        answer:
          "Look for breeders who health-test both the Golden Retriever and Poodle parent — OFA hips/elbows, eye exams, PRA DNA, vWD DNA, and cardiac clearance. Visit the litter in person, meet both parents if possible, and confirm a written health guarantee. The Goldendoodle Association of North America (GANA) lists breeders who meet testing standards. PawPage lists breeders by state below.",
      },
      {
        question: "How much does a Goldendoodle puppy cost?",
        answer:
          "Goldendoodle puppies from health-tested parents typically cost $2,000 to $4,000. Mini Goldendoodles are more expensive than standards. F1B generations (more hypoallergenic) often cost more than F1. Premium colors like red and parti add $500-$1,000. Avoid puppies under $1,500 — low prices usually mean skipped health testing.",
      },
      {
        question: "What is the difference between F1, F1B, and F2 Goldendoodles?",
        answer:
          "F1 = Golden Retriever × Poodle (50/50 mix, most genetic diversity, variable coats). F1B = F1 Goldendoodle × Poodle (75% Poodle, most consistently low-shedding). F2 = F1 × F1 (50/50 but less predictable coats). For allergy sufferers, F1B or multigenerational Goldendoodles are the best choice.",
      },
      {
        question: "Do Goldendoodles shed?",
        answer:
          "It depends on generation and coat type. F1 Goldendoodles have variable coats — some shed moderately, others hardly at all. F1B Goldendoodles (75% Poodle) are the most consistently low-shedding. Curly coats shed the least but require the most grooming (brushing every 1-2 days). No dog is truly hypoallergenic, but F1B Goldendoodles come close.",
      },
      {
        question: "How big do Goldendoodles get?",
        answer:
          "Size depends on the Poodle parent. Standard Goldendoodles (Standard Poodle cross) weigh 50-90 lbs. Medium Goldendoodles (Moyen Poodle cross) weigh 30-50 lbs. Miniature Goldendoodles (Mini Poodle cross) weigh 15-35 lbs. Ask the breeder for the exact weight of both parents for the most accurate prediction.",
      },
      {
        question: "Are Goldendoodles good family dogs?",
        answer:
          "Goldendoodles are excellent family dogs. They inherit the Golden Retriever's patience and friendliness with the Poodle's intelligence and low-shedding coat. They are great with children, typically friendly with other dogs, and highly trainable. They do need 30-90 minutes of daily exercise depending on size.",
      },
      {
        question: "How much grooming does a Goldendoodle need?",
        answer:
          "Wavy and curly-coated Goldendoodles need brushing every 1-2 days and professional grooming every 6-8 weeks. Matting behind ears and in armpits is common if brushing is skipped. Many owners choose a 'teddy bear' clip at 1-2 inches for easier maintenance. Budget $60-$100 per grooming appointment depending on size.",
      },
    ],
    relatedBreederPages: ["golden-retriever", "french-bulldog", "labrador-retriever"],
  },
};

export function getBreederPageData(slug: string): BreederPageData | undefined {
  return BREEDER_PAGES[slug];
}
