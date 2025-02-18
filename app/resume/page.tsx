import profileData from "@data/cv.json"
import styles from "./styles.module.css"

export const metadata = {
  openGraph: {
    title: "Resume"
  },
  title: "Resume"
}

export default function About() {
  return (
    <>
      <h1>Resume</h1>
      <main>
        <section className={ styles.section }>
          <h3>Projects</h3>
          {profileData.projects.map(item => {
            let titleText = item.title + (item.company ? ` at ${item.company}` : "")
            return (
              <article className={ styles.article }>
                <div>
                  <span>{ item.year }</span>
                </div>
                <div>
                  <div>{ item.url ? <a href={item.url} target="_blank">{ titleText }&nbsp;<sup>↗</sup></a> : titleText }</div>
                  <div><p>{ item.description }</p></div>
                </div>
              </article>
            )
          })}
        </section>
        <section className={ styles.section }>
          <h3>Side Projects</h3>
          {profileData.sideProjects.map(item => {
            let titleText = item.title + (item.company ? ` at ${item.company}` : "")
            return (
              <article className={ styles.article }>
                <div>
                  <span>{ item.year }</span>
                </div>
                <div>
                  <div>{ item.url ? <a href={item.url} target="_blank">{ titleText }&nbsp;<sup>↗</sup></a> : titleText }</div>
                  <div><p>{ item.description }</p></div>
                </div>
              </article>
            )
          })}
        </section>
        <section className={ styles.section }>
          <h3>Work Experience</h3>
          {profileData.workExperience.map(item => {
            let titleText = item.title + (item.company ? ` at ${item.company}` : "")
            return (
              <article className={ styles.article }>
                <div>
                  <span>{ item.year }</span>
                </div>
                <div>
                  <div>{ item.url ? <a href={item.url} target="_blank">{ titleText }&nbsp;<sup>↗</sup></a> : titleText }</div>
                  <div><p>{ item.description }</p></div>
                  <div><p>{ item.location }</p></div>
                </div>
              </article>
            )
          })}
        </section>
        <section className={ styles.section }>
          <h3>Contact</h3>
          {profileData.contact.map(item => {
            return (
              <article className={ styles.article }>
                <div>
                  <span>{ item.platform }</span>
                </div>
                <div>
                  <div>{ item.url ? <a href={item.url} target="_blank">{ item.handle }&nbsp;<sup>↗</sup></a> : item.handle }</div>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </>
  )
}