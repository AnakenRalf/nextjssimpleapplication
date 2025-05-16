'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidDataInForm(text) {    
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {    
    const meal = {
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
    };

    if (
      isInvalidDataInForm(meal.creator) ||
      isInvalidDataInForm(meal.creator_email) ||
      isInvalidDataInForm(meal.title) ||
      isInvalidDataInForm(meal.summary) ||
      isInvalidDataInForm(meal.instructions) ||
      isInvalidDataInForm(meal.image) ||
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0
    ) {
      return {
        message: 'Invalid data in form',
      }
    }

    await saveMeal(meal);
    // Magor for production app
    // revalidatePath('/meals', 'layout'); for revalidation all nested routes
    revalidatePath('/meals'); //revalidate only this route
    redirect('/meals');
}