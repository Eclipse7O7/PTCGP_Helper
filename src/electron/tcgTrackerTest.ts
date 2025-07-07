import TCGdex from "@tcgdex/sdk";

const tcgdex = new TCGdex('en');

(async () =>{
   try {
      const card = await tcgdex.card.get('swsh3-136');
      if (card) {
         console.log(card.name);
      } else {
         console.error('Card not found.');
      }
   } catch (error) {
      console.error('Error fetching card:', error);
   }
})();
