import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {  
    // immitate error db behaviour
    // throw new Error("Some error goes here");
      
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {  
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {  
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    // store image in Public folder
    const extension = meal.image.name.split('.').pop(); // get extension
    const fileName = `${meal.slug}.${extension}`; // create filename
    const stream =fs.createWriteStream(`./public/images/${fileName}`);    
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("error saving image");
        }
    }); 

    meal.image = `/images/${fileName}`;

    return db.prepare(`
        INSERT INTO meals (
            slug,
            title,
            image,
            summary,
            instructions,
            creator,
            creator_email
        ) VALUES (
            @slug,
            @title,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email
        )
     `).run(meal);
}