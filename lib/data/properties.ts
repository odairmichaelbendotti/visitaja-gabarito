export interface PropertyAgent {
  name: string;
  role: string;
  phone: string;
  email: string;
  activeProperties: number;
}

export interface Property {
  slug: string;
  category: string;
  status: "available" | "reserved";
  /** Short address shown on the listing card. */
  address: string;
  /** Full address with unit/complement, shown on the detail page. */
  fullAddress: string;
  price: string;
  priceExtra: string;
  /** Short summary shown on the listing card. */
  details: string;
  /** Full summary shown on the detail page. */
  fullDetails: string;
  features: string[];
  description: string;
  /** Cover photo gradient (also reused as the first gallery photo). */
  gradient: string;
  galleryGradients: string[];
  agent: PropertyAgent;
  stats: {
    visitsThisMonth: number;
    attendanceRate: string;
    publishedAt: string;
  };
  /** One-line neighborhood/city + distance blurb, shown on the public listing page. */
  locationNote: string;
  /** The 4 stat blocks (área útil / dormitórios / vagas / andar) on the public listing page. */
  publicStats: {
    area: string;
    bedrooms: string;
    parking: string;
    floor: string;
  };
}

const MARINA: PropertyAgent = {
  name: "Marina Rocha",
  role: "Administradora",
  phone: "(11) 98421-7730",
  email: "marina@ancoraimoveis.com.br",
  activeProperties: 12,
};

const RAFAEL: PropertyAgent = {
  name: "Rafael Nunes",
  role: "Corretor",
  phone: "(11) 97733-2210",
  email: "rafael@ancoraimoveis.com.br",
  activeProperties: 9,
};

const JULIANA: PropertyAgent = {
  name: "Juliana Prado",
  role: "Corretora",
  phone: "(11) 96622-4481",
  email: "juliana@ancoraimoveis.com.br",
  activeProperties: 7,
};

const CAMILA: PropertyAgent = {
  name: "Camila Duarte",
  role: "Corretora",
  phone: "(51) 99911-3345",
  email: "camila@ancoraimoveis.com.br",
  activeProperties: 6,
};

const DIEGO: PropertyAgent = {
  name: "Diego Ramos",
  role: "Corretor",
  phone: "(11) 98844-7762",
  email: "diego@ancoraimoveis.com.br",
  activeProperties: 5,
};

export const PROPERTIES: Property[] = [
  {
    slug: "oscar-freire-980",
    category: "Apartamento",
    status: "available",
    address: "Rua Oscar Freire, 980 — Jardins",
    fullAddress: "Rua Oscar Freire, 980 · Apto 121 — Jardins, São Paulo/SP",
    price: "R$ 1.150.000",
    priceExtra: "Condomínio R$ 1.480 · IPTU R$ 320/mês",
    details: "98 m² · 3 dorm · 2 vagas",
    fullDetails: "98 m² · 3 dormitórios (1 suíte) · 2 vagas · 8º andar",
    features: [
      "Ar-condicionado",
      "Varanda gourmet",
      "Portaria 24h",
      "Andar alto",
      "Reformado",
      "Aceita pet",
      "Armários planejados",
      "Sol da manhã",
    ],
    description:
      "Apartamento reformado a duas quadras da Rua Oscar Freire, com living ampliado, cozinha integrada e suíte master com closet. Prédio com lazer completo e portaria 24 horas. Pronto para morar.",
    gradient: "from-purple-400 to-purple-600",
    galleryGradients: [
      "from-coral-400 to-pink-600",
      "from-green-500 to-purple-500",
      "from-purple-400 to-pink-500",
      "from-amber-500 to-coral-600",
    ],
    agent: MARINA,
    stats: { visitsThisMonth: 9, attendanceRate: "78%", publishedAt: "14 de agosto de 2026" },
    locationNote: "Jardins, São Paulo/SP · a 2 minutos da Rua Oscar Freire",
    publicStats: { area: "98 m²", bedrooms: "3 (1 suíte)", parking: "2", floor: "8º de 12" },
  },
  {
    slug: "atlantica-2000",
    category: "Cobertura",
    status: "available",
    address: "Av. Atlântica, 2000 — Copacabana, RJ",
    fullAddress: "Av. Atlântica, 2000 · Cobertura duplex — Copacabana, Rio de Janeiro/RJ",
    price: "R$ 3.480.000",
    priceExtra: "Condomínio R$ 2.900 · IPTU R$ 610/mês",
    details: "210 m² · 4 dorm · 3 vagas",
    fullDetails: "210 m² · 4 dormitórios (2 suítes) · 3 vagas · cobertura duplex",
    features: [
      "Vista para o mar",
      "Piscina privativa",
      "Churrasqueira",
      "Portaria 24h",
      "Elevador privativo",
      "Depósito",
    ],
    description:
      "Cobertura duplex a poucos passos da praia de Copacabana, com piscina privativa, terraço gourmet e vista panorâmica para o mar. Prédio com infraestrutura completa de lazer.",
    gradient: "from-coral-400 to-pink-600",
    galleryGradients: [
      "from-purple-400 to-purple-600",
      "from-green-500 to-purple-500",
      "from-amber-500 to-coral-600",
      "from-pink-500 to-purple-600",
    ],
    agent: RAFAEL,
    stats: { visitsThisMonth: 5, attendanceRate: "82%", publishedAt: "2 de julho de 2026" },
    locationNote: "Copacabana, Rio de Janeiro/RJ · a 3 minutos da praia",
    publicStats: { area: "210 m²", bedrooms: "4 (2 suítes)", parking: "3", floor: "Cobertura duplex" },
  },
  {
    slug: "fradique-coutinho-1200",
    category: "Apartamento",
    status: "reserved",
    address: "Rua Fradique Coutinho, 1200 — Pinheiros",
    fullAddress: "Rua Fradique Coutinho, 1200 · Apto 34 — Pinheiros, São Paulo/SP",
    price: "R$ 4.900/mês",
    priceExtra: "Condomínio R$ 650 · IPTU R$ 95/mês",
    details: "72 m² · 2 dorm · 1 vaga",
    fullDetails: "72 m² · 2 dormitórios · 1 vaga · 4º andar",
    features: [
      "Academia no prédio",
      "Salão de festas",
      "Perto do metrô",
      "Reformado",
    ],
    description:
      "Apartamento reformado em rua arborizada de Pinheiros, próximo ao metrô Faria Lima. Prédio com academia e salão de festas.",
    gradient: "from-green-500 to-purple-500",
    galleryGradients: [
      "from-purple-400 to-purple-600",
      "from-coral-400 to-pink-600",
      "from-amber-500 to-coral-600",
      "from-pink-500 to-purple-600",
    ],
    agent: JULIANA,
    stats: { visitsThisMonth: 6, attendanceRate: "70%", publishedAt: "30 de junho de 2026" },
    locationNote: "Pinheiros, São Paulo/SP · a 5 minutos do metrô Faria Lima",
    publicStats: { area: "72 m²", bedrooms: "2", parking: "1", floor: "4º andar" },
  },
  {
    slug: "padre-chagas-415",
    category: "Casa",
    status: "available",
    address: "Rua Padre Chagas, 415 — Moinhos de Vento, POA",
    fullAddress: "Rua Padre Chagas, 415 — Moinhos de Vento, Porto Alegre/RS",
    price: "R$ 8.500/mês",
    priceExtra: "Condomínio — · IPTU R$ 480/mês",
    details: "260 m² · 4 dorm · 4 vagas",
    fullDetails: "260 m² · 4 dormitórios (2 suítes) · 4 vagas · 2 pavimentos",
    features: [
      "Quintal amplo",
      "Churrasqueira",
      "Escritório",
      "Aquecimento central",
      "Aceita pet",
    ],
    description:
      "Casa com dois pavimentos no coração de Moinhos de Vento, próxima aos principais restaurantes e comércios do bairro. Quintal amplo com churrasqueira.",
    gradient: "from-purple-500 to-pink-600",
    galleryGradients: [
      "from-green-500 to-purple-500",
      "from-coral-400 to-pink-600",
      "from-purple-400 to-purple-600",
      "from-amber-500 to-coral-600",
    ],
    agent: CAMILA,
    stats: { visitsThisMonth: 3, attendanceRate: "88%", publishedAt: "10 de maio de 2026" },
    locationNote: "Moinhos de Vento, Porto Alegre/RS · a 4 minutos do parque",
    publicStats: { area: "260 m²", bedrooms: "4 (2 suítes)", parking: "4", floor: "2 pavimentos" },
  },
  {
    slug: "harmonia-745",
    category: "Apartamento",
    status: "available",
    address: "Rua Harmonia, 745 — Vila Madalena",
    fullAddress: "Rua Harmonia, 745 · Apto 22 — Vila Madalena, São Paulo/SP",
    price: "R$ 890.000",
    priceExtra: "Condomínio R$ 420 · IPTU R$ 78/mês",
    details: "64 m² · 2 dorm · 1 vaga",
    fullDetails: "64 m² · 2 dormitórios · 1 vaga · 2º andar",
    features: ["Perto de bares e restaurantes", "Varanda", "Portaria 24h"],
    description:
      "Apartamento compacto e bem localizado na Vila Madalena, a poucos metros de bares, restaurantes e do metrô. Ótimo para quem busca vida noturna e praticidade.",
    gradient: "from-coral-300 to-coral-600",
    galleryGradients: [
      "from-purple-400 to-purple-600",
      "from-green-500 to-purple-500",
      "from-pink-500 to-purple-600",
      "from-amber-500 to-coral-600",
    ],
    agent: DIEGO,
    stats: { visitsThisMonth: 8, attendanceRate: "75%", publishedAt: "18 de agosto de 2026" },
    locationNote: "Vila Madalena, São Paulo/SP · a 3 minutos dos bares",
    publicStats: { area: "64 m²", bedrooms: "2", parking: "1", floor: "2º andar" },
  },
  {
    slug: "alameda-santos-1500",
    category: "Studio",
    status: "reserved",
    address: "Alameda Santos, 1500 — Jardim Paulista",
    fullAddress: "Alameda Santos, 1500 · Studio 12 — Jardim Paulista, São Paulo/SP",
    price: "R$ 3.200/mês",
    priceExtra: "Condomínio R$ 380 · IPTU R$ 60/mês",
    details: "38 m² · 1 dorm · sem vaga",
    fullDetails: "38 m² · 1 dormitório · sem vaga · 6º andar",
    features: [
      "Mobiliado",
      "Perto da Av. Paulista",
      "Portaria 24h",
      "Lavanderia compartilhada",
    ],
    description:
      "Studio mobiliado a poucos minutos da Avenida Paulista, ideal para quem trabalha na região. Prédio com lavanderia compartilhada e portaria 24 horas.",
    gradient: "from-purple-300 to-purple-500",
    galleryGradients: [
      "from-coral-400 to-pink-600",
      "from-green-500 to-purple-500",
      "from-purple-400 to-purple-600",
      "from-amber-500 to-coral-600",
    ],
    agent: MARINA,
    stats: { visitsThisMonth: 11, attendanceRate: "65%", publishedAt: "25 de agosto de 2026" },
    locationNote: "Jardim Paulista, São Paulo/SP · a 6 minutos da Av. Paulista",
    publicStats: { area: "38 m²", bedrooms: "1", parking: "Sem vaga", floor: "6º andar" },
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((property) => property.slug === slug);
}
