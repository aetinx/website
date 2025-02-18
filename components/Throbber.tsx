import styles from "./Throbber.module.css"

export default function Throbber({ size = "1em", ...props }) {
  return (
    <svg style={{ width: size, height: size }} {...props} className={ styles.main } viewBox="0 0 24 24" fill="none">
      <circle
        className={ styles.track }
        cx="12"
        cy="12"
        r="10"
        strokeOpacity="0.25"
        strokeWidth="4"
      />
      <circle
        className={ styles.tail }
        cx="12"
        cy="12"
        r="10"
        strokeLinecap="round"
        strokeWidth="4"
        pathLength="1"
      />
    </svg>
  )
}