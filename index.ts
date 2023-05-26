const anki = require("anki-apkg-export").default;
import { readFile, writeFile } from "fs/promises";

async function main() {
  const apkg = new anki("1: Hiragana");

  const raw = await readFile("meta.json", "utf-8");
  const meta = JSON.parse(raw);

  for (const card of meta) {
    const mp3: string = card.mp3;
    const img: string = card.img;
    const jp: string = card.jp;
    const ph: string = card.ph;
    const desc: string = card.desc;

    try {
      console.log(mp3, img);
      const mp3d = await readFile(`assets/${mp3}`);
      const imgd = await readFile(`assets/${img}`);
      apkg.addMedia(mp3, mp3d);
      apkg.addMedia(img, imgd);
      const body = `${ph}<br>${desc}<br><img src="${img}"/><br>[sound:${mp3}]`;
      apkg.addCard(jp, body);
      console.log(jp, body);
    } catch (e) {
      console.log(e);
    }
  }

  console.log("saving...");
  const saved = await apkg.save();
  await writeFile("hiragana.apkg", saved, "binary");
  console.log("done!");
}

main();
