import MusicClientWrapper from "./MusicClientWrapper"
//import Clock from "@components/Clock"

export const metadata = {
  openGraph: {
    title: "About Adrian Keim"
  },
  title: "About me"
}

export default function About() {
  return (
    <>
      <h1>About me</h1>
      <p className="text-[length:--font-size-body] color-(--on-surface-variant)">My name is Adrian Keim, and I’m a designer based in the snowy state of Maine. I have backgrounds in various creative fields, such as iconography, brand design, interface design, web development and vexillology. I’ve already had a little bit of experience in fields such as photography, video production, and motion design.</p>
      <main>
        <MusicClientWrapper />
      </main>
    </>
  )
}