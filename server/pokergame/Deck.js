class Deck {
  constructor() {
    this.suits = ['s', 'h', 'd', 'c'];
    this.ranks = [
      'A',
      'K',
      'Q',
      'J',
      '10',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
    ];
    this.cards = this.createDeckAndShuffle();
  }

  createDeckAndShuffle() {
    let cards = [];

    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        cards.push({ suit, rank });
      });
    });

    // Use Fisher-Yates shuffle algorithm for O(n) performance
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  }

  count() {
    return this.cards.length;
  }

  draw() {
    const count = this.count();
    // Use pop() which is O(1) since the deck is already shuffled properly
    if (count > 0)
      return this.cards.pop();
    else return null;
  }
}

module.exports = Deck;
