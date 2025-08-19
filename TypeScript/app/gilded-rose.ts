import { Item } from "./Item";


//mise e, constante pour possible modification future. 1 seul endroit connu de tous ou modifier.
const NAMES = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  CONJURED: 'Conjured',
} as const;

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }


  updateQuality() {
    for (const item of this.items) {
      if (!this.isSulfuras(item)) {

        if (!this.isAgedBrie(item) && !this.isBackstage(item)) {
          this.downQuality(item);
        } else {
          this.upQuality(item);
          if (this.isBackstage(item)) {
            if (item.sellIn < 11) this.upQuality(item);
            if (item.sellIn < 6)  this.upQuality(item);
          }
        }
        item.sellIn--;
        if (item.sellIn < 0) {
          if (!this.isAgedBrie(item)) {
            if (!this.isBackstage(item)) {
              this.downQuality(item);
            } else {
              item.quality = 0; 
            }
          } else {
            this.upQuality(item);
          }
        }
      }
    }

    return this.items;
  }


  //Bolean True si l'item est Aged Brie
  private isAgedBrie(item: Item): boolean {
    return item.name === NAMES.AGED_BRIE;
  }

  //Bolean True si l'item est BACKSTAGE
  private isBackstage(item: Item): boolean {
    return item.name === NAMES.BACKSTAGE;
  }

  //Bolean True si l'item est SULFURAS
  private isSulfuras(item: Item): boolean {
    return item.name === NAMES.SULFURAS;
  }

  //Bolean True si l'item est seulement == "Conjured"
  private isConjuredSolo(item: Item): boolean {
    return item.name === NAMES.CONJURED;
  }

  // Monte la qualité de 1
  private upQuality(item: Item, up = 1): void {
    item.quality = this.checkQuality(item.quality + up);
  }
  // Diminue la qualité de 1
  private downQuality(item: Item, down = 1): void {
    item.quality = this.checkQuality(item.quality - down);
  }

  // Vérifie que la qualité est bien entre le MIN et le MAX
  private checkQuality(q: number): number {
    return Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, q));
  }

  
}




/*
  - Déplacement de item dans un fichier dédiée
  - De multiple if ont la même condition
  - De multiple fois la même String, smell sonar
  - Il y a 2 fonctionnement métier : Calcul SellIn et Calcul Quality
  - Petite incomphréension sur un item conjured, c'est,  un item avec le nom == "Conjured" / un nom qui commence par conjured 
/ un autre item comme aged brie peut-il être "conjured aged brie" ?  par simplicité je vais partir sur le nom ==="Conjured"
  - Trop de fois un -1 / +1 et de vérification de qualité a 50 ou 0
*/