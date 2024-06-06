import fs from 'fs';
import { rundomId } from './idgener.js';
import { error } from 'console';
export function addTitle(body) {
    let a = rundomId()
    try {
        const text = JSON.parse(fs.readFileSync('./basa/basejson.json', 'utf8'));
        let copy = Object.assign([], text);
        const doc = {
            image: `https://sleepy-plateau-27607-ec90ed518680.herokuapp.com/author/posts/blog/download/img?id=${a}`,
            name: body.name,
            skills: body.skills,
            description: body.description,
            id: a,
            linkc: [
                { tiktok: body.tiktok },
                { instagram: body.instagram },
                { youtube: body.youtube },
                { xsolid: body.xsolid },
                { linkedin: body.linkedin },
                { pinterest: body.pinterest },
                { facebook: body.facebook },
            ]
        };
        let mas = []
        for (let item in doc.linkc) {
            if (Object.values(doc.linkc[item])[0] === '') {
                console.log(1)
                continue
            }
            else {
                mas.push(doc.linkc[item])
            }
        }
        fs.rename('./uploads/' + body.image, './uploadsstatik/' + doc.id + '.png', error => {
            if (error) throw error
        })
        
        let copy1 = Object.assign({}, doc);
        copy1.linkc = mas
        text.authors.push(copy1);
        fs.writeFileSync('./basa/basejson.json', JSON.stringify(text));
        return true;
    } catch (error) {
        console.log('Ошибка создания поста', error);
    }
}