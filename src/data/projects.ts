type Project = {
  desc: string
  name: string
  thumbnails: {
    url: string
    alt?: string
  }[]
  tags: Array<
    | "logomark"
    | "lettering"
    | "visual identity"
    | "graphics"
    | "web"
    | "software"
    | "product"
    | "iconography"
    | "systems"
    | "3d"
    | "liveries"
  >
  ongoing?: boolean
  concept?: boolean
}

const projects: Record<string, Project> = {
  yasoku: {
    desc: "Indie and artist-focused publishing and merchandise storefront.",
    name: "Yasoku Publishing",
    thumbnails: [
      {
        url: "blue.png",
        alt: "Wordmark designed for Yasoku Publishing.",
      },
      {
        url: "logo.png",
        alt: "Logo designed for Yasoku Publishing."
      },
      /* {
        url: "old-style.png",
        alt: "Alternate Yasoku Publishing wordmark based on its older design."
      }, */
      /* {
        url: "general-icons.png",
        alt: "Custom icons designed for Yasoku Publishing.",
      }, */
      {
        url: "laundry-icons.png",
        alt: "Custom laundry icons designed for Yasoku Publishing.",
      },
      /* {
        url: "product-card.png",
        alt: "Product card for the Yasoku Publishing online storefront.",
      }, */
      {
        url: "storefront-homepage.png",
        alt: "UI design for the homepage of Yasoku Publishing's online storefront.",
      },
      {
        url: "storefront-product.png",
        alt: "UI design for a product page on Yasoku Publishing's online storefront.",
      },
      /* {
        url: "mtn-dew.png",
        alt: "Custom logos for Mountain Dew themed Yasoku Publishing logo variants.",
      },
      {
        url: "cot.png",
        alt: "Render of a NASCAR Car of Tomorrow Chevrolet Impala SS with a Dale Earnhardt Jr. inspired livery sponsored by Yasoku Publishing.",
      }, */
    ],
    tags: ["iconography", "lettering", "logomark", "visual identity", "web"],
    ongoing: true,
  },
  symbols: {
    desc: "A collection of icon sets, featuring hundreds upon hundreds of symbols.",
    name: "Symbols",
    thumbnails: [
      {
        url: "auburn.png",
        alt: "Preview of Symbols Auburn",
      },
      {
        url: "belmont.png",
        alt: "Preview of Symbols Belmont",
      },
      {
        url: "belmont-grid.png",
        alt: "Preview of symbols from Symbols Belmont on 32x32 grids.",
      },
      {
        url: "legacy-0.png",
        alt: "Preview of symbols from a legacy icon set.",
      },
      {
        url: "legacy-1.png",
        alt: "Preview of symbols from a legacy icon set.",
      }
    ],
    tags: ["graphics", "iconography", "web"],
    ongoing: true,
  },
  archial: {
    desc: "Desktop app for saving and organizing reference media.",
    name: "Archial",
    thumbnails: [
      {
        url: "logo.png",
        alt: "Archial logo and wordmark.",
      },
      {
        url: "interface.png",
        alt: "Interface for the desktop application Archial.",
      },
      {
        url: "homepage.png",
        alt: "Design of a homepage for the desktop application Archial.",
      },
    ],
    tags: ["lettering", "logomark", "product", "software", "visual identity", "web"],
    ongoing: true,
  },
  "weeby-stitches": {
    desc: "Online indie storefront for anime-inspired apparel and accessories.",
    name: "Weeby Stitches",
    thumbnails: [
      {
        url: "0.png",
        alt: "Weeby Stitches wordmark.",
      },
      {
        url: "1.jpg",
        alt: "Hats from Weeby Stitches featuring stickers designed by Adrian Keim (@aetinx).",
      },
    ],
    tags: ["lettering", "logomark", "graphics"],
  },
  flags: {
    desc: "An extensive set of over 550 flags of nations, micronations, languages, ideologies, and more.",
    name: "Flags of the World",
    thumbnails: [
      {
        url: "0.png",
        alt: "Display of flag icons designed by Adrian Keim (@aetinx).",
      },
      {
        url: "microlang.png",
        alt: "Display of flag icons for microlanguages.",
      },
      {
        url: "maritime.png",
        alt: "Display of maritime flag icons.",
      },
      {
        url: "rare.png",
        alt: "Display of flag icons for uncommon flags.",
      },
      {
        url: "syria.png",
        alt: "Display of multiple flag icons for Syria.",
      },
      {
        url: "1.png",
        alt: "Display of flag icons designed by Adrian Keim (@aetinx).",
      },
    ],
    tags: ["graphics", "iconography"],
    ongoing: true,
  },
  liveries: {
    desc: "Custom paint schemes created for the cult-classic racing simulator NASCAR Racing 2003 Season.",
    name: "Liveries for NR2003",
    thumbnails: [
      {
        url: "u98m4u92u4cm92m3c9.png",
        alt: "Custom livery of Adrian Keim #37 Tinder Chevrolet Monte Carlo for the Cup Series in NASCAR Racing 2003 Season.",
      },
      {
        url: "34c354563463ds0oiyutyjrjr.png",
        alt: "Custom livery of Adrian Keim #37 Tinder Chevrolet Monte Carlo for the Cup Series in NASCAR Racing 2003 Season.",
      },
      /* {
        url: "37h4th38ndjhjsfmnazUntitled.png",
        alt: "Custom render of Adrian Keim #37 Yasoku Publishing Chevrolet Impala NASCAR Car of Tomorrow at New Hampsire Motor Speedway."
      }, */
      {
        url: "Greenshot 2025-08-07 15-33-25.png",
        alt: "NR2003 Cup Series car with a custom livery (Adrian Keim #37 Boys & Girls Clubs of America) shown racing at Oxford Plains Speedway during an in-game race.",
      },
      {
        url: "Greenshot 2025-01-07 01-57-07.png",
        alt: "Cars from the NCS22 mod in NASCAR Racing 2003 Season, with custom liveries, during an in-game race.",
      },
      {
        url: "Greenshot 2025-01-06 21-30-10.png",
        alt: "Cars from the NCS22 mod in NASCAR Racing 2003 Season, with custom liveries, during an in-game race.",
      },
      {
        url: "Greenshot 2025-01-06 22-10-48.png",
        alt: "Cars from the NCS22 mod in NASCAR Racing 2003 Season, with custom liveries, during an in-game race.",
      },
      {
        url: "Greenshot 2025-01-07 00-12-38.png",
        alt: "NR2003 car from the NCS22 mod with a custom livery (Rob Thompson #25 Arrow) shown racing during an in-game race.",
      },
    ],
    tags: ["3d", "graphics", "liveries"],
    concept: true,
  },
}

export default projects
