import MealItem from './meal-item';
import styles from './meals-grid.module.css';


export default function MealsGrid({ meals }) {
    if (!meals) {
        throw new Error('MealsGrid requires a meals prop');
    }
    return <ul className={styles.meals}>
        {meals.map(meal => {
            if (!meal || !meal.id) {
                throw new Error('MealsGrid requires a meal with an id');
            }
            return <li key={meal.id}><MealItem {...meal} /></li>
        })}
    </ul>;
}
