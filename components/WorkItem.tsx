"use client"

import styles from "./WorkItem.module.css"

export default function WorkItem(props) {
  return <div className={ styles.main }>
    <img src={ props.image } />
    <div className={ styles.info }>
      <span>{ props.title }</span>
      <span>{ props.client }</span>
      <span>{ [(props.year ? `${props.year}` : "Ongoing"), (props.status == "Concept" ? "(Concept)" : null)].filter(Boolean).join(" ") }</span>
    </div>
  </div>
}