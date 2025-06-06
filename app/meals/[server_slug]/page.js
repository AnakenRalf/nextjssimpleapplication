import styles from './page.module.css'
import Image from 'next/image'

import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

// dynamic metadata generation
export async function generateMetadata({ params }){
  const meal = getMeal(params.server_slug)
  // !! if not check - we got error instead custom error route beacose meal will be undefined
  if (!meal) {
    notFound()
  }

  return {
    title: meal.title,
    description: meal.summary
  }
}

export default function PostPage({ params }) {
  const meal = getMeal(params.server_slug)

  if (!meal) {
    notFound()
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>TITLE</h1>
          <p className={styles.creator}> 
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={styles.instructions} dangerouslySetInnerHTML={
          {__html: meal.instructions}
        }>
        </p>
      </main>
    </>
  }