const calculateYearlyPrice = (price: number) => {
  return Math.ceil(price * 12 * (80 / 100));
};

export const planFeatures: { [key: string]: string[] } = {
  KICK_OFF_KIT: [
    "500 Generations",
    "100 Image Generations",
    "Project History",
    "Easy Top Up",
  ],
  PRIME_TIER_KIT: [
    "1500 Generations",
    "300 Image Generations",
    "Project History",
    "Easy Top Up",
  ],
  TOP_NOTCH_KIT: [
    "Unlimited Generations",
    "500 Image Generations",
    "Project History",
    "Easy Top Up",
  ],
  APP_CHAT: [
    "Unlimited Chat Generations",
    "Exclusive BHARAT Chat",
    "Easy Top Up",
  ],
  FUSION: ["Custom generations ", "Custom package", "Custom Pricing"],
  ADD_ON: ["Add 100 Generations"],
};

interface PlanDetails {
  [key: string]: {
    plans: {
      name: string;
      enum: string;
      price: (isMonthly: boolean) => number;
      generations: number;
    }[];
    topUp: {
      price: number;
    };
    imageGeneration: {
      price: number;
    };
    currency: string;
    symbol: string;
  };
}

export const planDetails: PlanDetails = {
  Australia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 15 : calculateYearlyPrice(15),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 45 : calculateYearlyPrice(45),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: 2500,
      },
    ],

    topUp: {
      price: 5,
    },

    imageGeneration: {
      price: 11,
    },

    currency: "aud",
    symbol: "A$",
  },
  Austria: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  Belgium: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  Brazil: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 45 : calculateYearlyPrice(45),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 90 : calculateYearlyPrice(90),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 140 : calculateYearlyPrice(140),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 120 : calculateYearlyPrice(120),
        generations: 2500,
      },
    ],

    topUp: {
      price: 15,
    },

    imageGeneration: {
      price: 34,
    },

    currency: "brl",
    symbol: "R$",
  },

  Bulgaria: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 17 : calculateYearlyPrice(17),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 35 : calculateYearlyPrice(35),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 55 : calculateYearlyPrice(55),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 45 : calculateYearlyPrice(45),
        generations: 2500,
      },
    ],

    topUp: {
      price: 6,
    },

    imageGeneration: {
      price: 13,
    },

    currency: "bgn",
    symbol: "лв.",
  },

  //   canada
  Canada: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 13 : calculateYearlyPrice(13),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 26 : calculateYearlyPrice(26),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 35 : calculateYearlyPrice(35),
        generations: 2500,
      },
    ],

    topUp: {
      price: 4,
    },

    imageGeneration: {
      price: 10,
    },

    currency: "cad",
    symbol: "$",
  },
  //   croatia
  Croatia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 65 : calculateYearlyPrice(65),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 130 : calculateYearlyPrice(130),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 200 : calculateYearlyPrice(200),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 170 : calculateYearlyPrice(170),
        generations: 2500,
      },
    ],

    topUp: {
      price: 21,
    },

    imageGeneration: {
      price: 50,
    },

    currency: "hrk",
    symbol: "kn",
  },
  //   cyprus
  Cyprus: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   czech republic
  "Czech Republic": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 200 : calculateYearlyPrice(200),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 420 : calculateYearlyPrice(420),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 650 : calculateYearlyPrice(650),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 540 : calculateYearlyPrice(540),
        generations: 2500,
      },
    ],

    topUp: {
      price: 68,
    },

    imageGeneration: {
      price: 160,
    },

    currency: "czk",
    symbol: "Kč",
  },

  //  Denmark
  Denmark: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 65 : calculateYearlyPrice(65),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 130 : calculateYearlyPrice(130),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 200 : calculateYearlyPrice(200),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 170 : calculateYearlyPrice(170),
        generations: 2500,
      },
    ],

    topUp: {
      price: 21,
    },

    imageGeneration: {
      price: 49,
    },

    currency: "dkk",
    symbol: "kr",
  },

  //   estonia
  Estonia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   Finland
  Finland: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   France
  France: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   Germany
  Germany: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   Gibraltar
  Gibraltar: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 8 : calculateYearlyPrice(8),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 15 : calculateYearlyPrice(15),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 20 : calculateYearlyPrice(20),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "gip",
    symbol: "£",
  },
  //   Greece
  Greece: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Hong Kong
  "Hong Kong": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 70 : calculateYearlyPrice(70),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 150 : calculateYearlyPrice(150),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 230 : calculateYearlyPrice(230),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 190 : calculateYearlyPrice(190),
        generations: 2500,
      },
    ],

    topUp: {
      price: 24,
    },

    imageGeneration: {
      price: 55,
    },

    currency: "hkd",
    symbol: "$",
  },
  //   Hungary
  Hungary: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 3200 : calculateYearlyPrice(3200),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 6700 : calculateYearlyPrice(6700),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 10300 : calculateYearlyPrice(10300),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 8500 : calculateYearlyPrice(8500),
        generations: 2500,
      },
    ],

    topUp: {
      price: 1064,
    },

    imageGeneration: {
      price: 2515,
    },

    currency: "huf",
    symbol: "Ft",
  },
  //   India
  India: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 750 : calculateYearlyPrice(750),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 1590 : calculateYearlyPrice(1590),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 2400 : calculateYearlyPrice(2400),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 2000 : calculateYearlyPrice(2000),
        generations: 2500,
      },
    ],

    topUp: {
      price: 250,
    },

    imageGeneration: {
      price: 590,
    },

    currency: "inr",
    symbol: "₹",
  },
  //   Ireland
  Ireland: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Italy
  Italy: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Japan
  Japan: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 1300 : calculateYearlyPrice(1300),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 2800 : calculateYearlyPrice(2800),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 4270 : calculateYearlyPrice(4270),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 3550 : calculateYearlyPrice(3550),
        generations: 2500,
      },
    ],

    topUp: {
      price: 441,
    },

    imageGeneration: {
      price: 1040,
    },

    currency: "jpy",
    symbol: "¥",
  },
  //   Latvia
  Latvia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Liechtenstein
  Liechtenstein: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "chf",
    symbol: "CHF",
  },

  //   Lithuania
  Lithuania: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Luxembourg
  Luxembourg: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   Malaysia
  Malaysia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 90 : calculateYearlyPrice(90),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 135 : calculateYearlyPrice(135),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 110 : calculateYearlyPrice(110),
        generations: 2500,
      },
    ],

    topUp: {
      price: 14,
    },

    imageGeneration: {
      price: 33,
    },

    currency: "myr",
    symbol: "RM",
  },

  //   Malta
  Malta: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },

  //   Mexico
  Mexico: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 150 : calculateYearlyPrice(150),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 320 : calculateYearlyPrice(320),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 490 : calculateYearlyPrice(490),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 400 : calculateYearlyPrice(400),
        generations: 2500,
      },
    ],

    topUp: {
      price: 51,
    },

    imageGeneration: {
      price: 120,
    },

    currency: "mxn",
    symbol: "$",
  },
  //   Netherlands
  Netherlands: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },
    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   New Zealand
  "New Zealand": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 15 : calculateYearlyPrice(15),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 32 : calculateYearlyPrice(32),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 50 : calculateYearlyPrice(50),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: 2500,
      },
    ],

    topUp: {
      price: 5,
    },

    imageGeneration: {
      price: 12,
    },

    currency: "nzd",
    symbol: "$",
  },
  //   Norway
  Norway: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 95 : calculateYearlyPrice(95),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 205 : calculateYearlyPrice(205),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 310 : calculateYearlyPrice(310),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 260 : calculateYearlyPrice(260),
        generations: 2500,
      },
    ],

    topUp: {
      price: 33,
    },

    imageGeneration: {
      price: 75,
    },

    currency: "nok",
    symbol: "kr",
  },
  //   Poland
  Poland: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 35 : calculateYearlyPrice(35),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 80 : calculateYearlyPrice(80),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 120 : calculateYearlyPrice(120),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 100 : calculateYearlyPrice(100),
        generations: 2500,
      },
    ],

    topUp: {
      price: 12,
    },

    imageGeneration: {
      price: 31,
    },

    currency: "pln",
    symbol: "zł",
  },

  //   Portugal
  Portugal: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Romania
  Romania: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 90 : calculateYearlyPrice(90),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 130 : calculateYearlyPrice(130),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 110 : calculateYearlyPrice(110),
        generations: 2500,
      },
    ],

    topUp: {
      price: 14,
    },

    imageGeneration: {
      price: 33,
    },

    currency: "ron",
    symbol: "lei",
  },

  //   Singapore
  Singapore: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 12 : calculateYearlyPrice(12),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 40 : calculateYearlyPrice(40),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 35 : calculateYearlyPrice(35),
        generations: 2500,
      },
    ],

    topUp: {
      price: 4,
    },

    imageGeneration: {
      price: 10,
    },

    currency: "sgd",
    symbol: "$",
  },
  //   Slovakia
  Slovakia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Slovenia
  Slovenia: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    imageGeneration: {
      price: 7,
    },

    topUp: {
      price: 3,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Spain
  Spain: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 18 : calculateYearlyPrice(18),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 30 : calculateYearlyPrice(30),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "eur",
    symbol: "€",
  },
  //   Sweden
  Sweden: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 100 : calculateYearlyPrice(100),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 210 : calculateYearlyPrice(210),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 320 : calculateYearlyPrice(320),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 265 : calculateYearlyPrice(265),
        generations: 2500,
      },
    ],

    topUp: {
      price: 33,
    },

    imageGeneration: {
      price: 78,
    },

    currency: "sek",
    symbol: "kr",
  },

  //   Switzerland
  Switzerland: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 8 : calculateYearlyPrice(8),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 17 : calculateYearlyPrice(17),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 21 : calculateYearlyPrice(21),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },
    imageGeneration: {
      price: 7,
    },

    currency: "chf",
    symbol: "chf",
  },
  //   Thailand
  Thailand: {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 320 : calculateYearlyPrice(320),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 670 : calculateYearlyPrice(670),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 1020 : calculateYearlyPrice(1020),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 850 : calculateYearlyPrice(850),
        generations: 2500,
      },
    ],

    topUp: {
      price: 106,
    },

    imageGeneration: {
      price: 250,
    },

    currency: "thb",
    symbol: "฿",
  },

  //   United Arab Emirates
  "United Arab Emirates": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 35 : calculateYearlyPrice(35),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 70 : calculateYearlyPrice(70),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 105 : calculateYearlyPrice(105),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 90 : calculateYearlyPrice(90),
        generations: 2500,
      },
    ],

    topUp: {
      price: 11,
    },

    imageGeneration: {
      price: 26,
    },

    currency: "aed",
    symbol: "د.إ",
  },

  //   United Kingdom
  "United Kingdom": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 8 : calculateYearlyPrice(8),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 15 : calculateYearlyPrice(15),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 25 : calculateYearlyPrice(25),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 20 : calculateYearlyPrice(20),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "gbp",
    symbol: "£",
  },

  //   United States
  "United States": {
    plans: [
      {
        name: "Kick Off Kit",
        enum: "KICK_OFF_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 9 : calculateYearlyPrice(9),
        generations: 500,
      },
      {
        name: "Prime Tier Kit",
        enum: "PRIME_TIER_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 19 : calculateYearlyPrice(19),
        generations: 1500,
      },
      {
        name: "Top Notch Kit",
        enum: "TOP_NOTCH_KIT",
        price: (isMonthly: boolean) =>
          isMonthly ? 29 : calculateYearlyPrice(29),
        generations: Infinity,
      },
      {
        name: "App Chat",
        enum: "APP_CHAT",
        price: (isMonthly: boolean) =>
          isMonthly ? 24 : calculateYearlyPrice(24),
        generations: 2500,
      },
    ],

    topUp: {
      price: 3,
    },

    imageGeneration: {
      price: 7,
    },

    currency: "usd",
    symbol: "$",
  },
};

export const countries = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Gibraltar",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Malta",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];
