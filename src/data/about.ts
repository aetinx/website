type Profile = {
  skills: string[]
  recognition: RecognitionItem[]
  education: EducationItem[]
  interests: string[]
  contacts: Contact[]
}

type RecognitionItem = {
  issuer: string
  title: string
  year: number | string
  url?: string
}

type EducationItem = {
  school: string
  study: string
  years: {
    from: number
    to: number
  }
}

type TestimonialItem = {
  author: string
  quote: string
}

type Contact = {
  name: string
  url?: string
}

const profile: Profile = {
  skills: [
    "Brand & identity",
    "Iconography",
    "Lettering",
    "Livery design",
    "Photography",
    "Product design",
    "UI animation",
    "Web design",
    "Web technologies"
  ],
  recognition: [
    {
      issuer: "Headers Club",
      title: "Featured header: x.com/aetinx",
      year: "2025",
      url: "https://headers.club/"
    },
    {
      issuer: "Astro Weekly",
      title: "Astro Weekly #101",
      year: "2025",
      url: "https://newsletter.astroweekly.dev/p/astro-weekly-101"
    }
  ],
  education: [
    {
      school: "Eastern Maine Community College",
      study: "Digital Graphic Design, A.A.S.",
      years: {
        from: 2024,
        to: 2026
      }
    },
    {
      school: "Mid-Maine Technical Center",
      study: "Mass Media and Communications",
      years: {
        from: 2023,
        to: 2024
      }
    }
  ],
  interests: [
    "NASCAR",
    "Neon Genesis: Evangelion",
    "Ghost in the Shell: S.A.C.",
    "Listening to music",
    "Racing simulators",
    "Kraft Mac & Cheese",
    "Windows 7 and XP",
    "Browsing art on the Web",
    "JavaScript",
    "Figma’s Otto Layout"
  ],
  contacts: [
    {
      name: "Jace Attard",
      url: "https://ja.mt"
    },
    {
      name: "Ana Howard",
      url: "https://ana.sh"
    },
    {
      name: "Lucia Scarlet",
      url: "https://lucia.red"
    },
    {
      name: "Blank Resident",
      url: "https://www.linkedin.com/in/blankresident/"
    },
    {
      name: "Gleb Sabirzyanov",
      url: "https://gleb.sexy"
    },
    {
      name: "Gabriel Foulon",
      url: "https://x.com/GabFoulon"
    },
    {
      name: "Liam Fennell",
      url: "https://fennell.cv"
    },
    {
      name: "Henor Kelmendi",
      url: "https://henor.is/"
    },
    {
      name: "Clément Rozé",
      url: "https://clementroze.com/"
    },
    {
      name: "Tom Heliere",
      url: "https://tomthings.fr/"
    },
    {
      name: "Celeste (vmfunc)",
      url: "https://vmfunc.re/"
    },
    {
      name: "Skyler Curtis Fox",
      url: "https://x.com/SkylerCurtisFox"
    },
    {
      name: "Vince Linise",
      url: "https://vincelinise.com/"
    },
    {
      name: "Newar A.",
      url: "https://www.newar.net/"
    },
    {
      name: "Wojtek Witkowski",
      url: "https://wojtek.im/"
    },
    {
      name: "Raffi Chilingaryan",
      url: "https://www.raffi.zip/"
    },
    {
      name: "Zach Roszczewski",
      url: "https://www.zachroszczewski.com/"
    },
    {
      name: "William Gibson",
      url: "https://william.cv/"
    },
    {
      name: "Liam Matteson",
      url: "https://www.liam.cv/"
    },
    {
      name: "Eian Blade",
      url: "https://eian.studio/"
    }
  ]
}

export default profile
