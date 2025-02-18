import * as Symbols from "@latapals/symbols"
import WorkItem from "@components/WorkItem"
import Link from "next/link"
import projectData from "/public/data/projects.json"
import InfiniteScrollClient from "@components/InfiniteScrollClient"
import styles from "./styles.module.css"
import Marquee from "react-fast-marquee"

const projects = projectData

export default async function Homepage() {
  const logos = [
    { src: "/assets/friend_logos/rsms.svg", alt: "Rasmus Andersson" },
    { src: "/assets/friend_logos/jace.svg", alt: "Jace Attard" },
    { src: "/assets/friend_logos/decipad.svg", alt: "Decipad" },
    { src: "/assets/friend_logos/kaidogenkai.svg", alt: "Kaido Genkai" },
    { src: "/assets/friend_logos/stevenmerzlak.svg", alt: "Steven Merzlak" },
    { src: "/assets/friend_logos/yasoku.svg", alt: "Yasoku Publishing" },
    { src: "/assets/friend_logos/ravarcheon.svg", alt: "Ravarcheon" },
    { src: "/assets/friend_logos/andymccune.svg", alt: "Andy McCune" },
    { src: "/assets/friend_logos/gleb.svg", alt: "Gleb Sabirzyanov" }
  ]

  return (
    <>
      <h1>Creating magical things</h1>
      <p role="doc-subtitle">I’m an interdisciplinary designer with a passion to make computing friendlier and more enjoyable for everyone.</p>
      <Link className="button mt-8" href="/about">Read about me <Symbols.ArrowRightCircle /></Link>

      <div className={styles.lovedBy + " lovedBy"}>
        <span className={styles.lovedByText}>Loved by</span>
        <Marquee speed={100} className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none">
            {logos.map((logo, index) => (
              <li><img key={index} src={logo.src} alt={logo.alt} /></li>
            ))}
          </ul>
        </Marquee>
      </div>

      <main className="projects">
        { projects.map(item => {
          return (
            <WorkItem image={item.thumbnail} title={item.title} client={item?.company} status={item?.status} year={item?.year} />
          )
        }) }
      </main>
    </>
  )
}
