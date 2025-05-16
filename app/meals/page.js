import Link from "next/link";

import classes from './page.module.css'
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Browse our collection of delicious meals.',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />
}

export default async function MealsPage() {
    const meals = await getMeals();

    return (
      <>
        <header className={classes.header}>
          <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
          <p>Discover delicious food from around the world and cooked yourself.</p>
          <p className={classes.cta}><Link href="/meals/share">Share Your Recipe</Link></p>
        </header>
        <main className={classes.main}>
          <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
            <Meals/>
          </Suspense>

        </main>
      </>
    );
  }