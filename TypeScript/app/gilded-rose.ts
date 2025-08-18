import { Item } from "./Item";


//mise e, constante pour possible modification future. 1 seul endroit à modifier.
const NAMES = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
} as const;

const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }


  updateQuality() {
    for (const item of this.items) {

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (this.isBackstage(item)) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = 0
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }

    return this.items;
  }

  //Bolean True si l'item esy Aged Brie
  private isAgedBrie(item: Item): boolean {
    return item.name === NAMES.AGED_BRIE;
  }

  //Bolean True si l'item esy BACKSTAGE
  private isBackstage(item: Item): boolean {
    return item.name === NAMES.BACKSTAGE;
  }

  //Bolean True si l'item esy SULFURAS
  private isSulfuras(item: Item): boolean {
    return item.name === NAMES.SULFURAS;
  }
}




/*
- Déplacement de item dans un fichier dédiée
- De multiple if ont la même condition
- De multiple fois la même String, smell sonar

*/