import { Card, Colour } from "./Card";
import { announce, standardShuffler } from "../utils/random_utils";

export const colors: Colour[] = ["Red", "Blue", "Green", "Yellow"];
export type Deck = {
  readonly preparedDeck: Card[];
  shuffle: () => void;
  deal: (numberOfCards: number) => Card[];
  size: () => number;
  discardTopCard: () => Card;
  addCards: (newCards: Card[]) => void;
};

///helper functions
const addActionCards = (preparedDeck: Card[], colour: Colour) => {
  const actionCards: Card[] = [
    { type: "SKIP", colour },
    { type: "REVERSE", colour },
    { type: "DRAWTWO", colour },
  ];

  actionCards.forEach((card) => {
    preparedDeck.push(card, { ...card });
  });
};

const addNumberedCards = (preparedDeck: Card[], colour: Colour) => {
  for (let i = 0; i <= 9; i++) {
    const newCard: Card = { type: "NUMBERED", colour, value: i };
    preparedDeck.push(newCard);
    if (i > 0) preparedDeck.push({ ...newCard });
  }
};

const addWildCards = (preparedDeck: Card[]) => {
  for (let i = 0; i < 4; i++) {
    preparedDeck.push({ type: "WILD", colour: "None" });
    preparedDeck.push({ type: "WILDDRAWFOUR", colour: "None" });
  }
};

export const createDeck = (): Deck => {
  let preparedDeck: Card[] = [];

  colors.forEach((colour) => {
    addNumberedCards(preparedDeck, colour);
    addActionCards(preparedDeck, colour);
  });

  addWildCards(preparedDeck);

  const shuffle = () => {
    console.log(announce("Shuffling the deck..."));
    standardShuffler(preparedDeck);
  };

  const discardTopCard = (): Card => preparedDeck.pop() as Card;

  const deal = (numberOfCards: number): Card[] => {
    const dealtCards: Card[] = [];
    for (let i = 0; i < numberOfCards; i++) {
      const card = preparedDeck.pop();
      if (card) dealtCards.push(card);
    }
    return dealtCards;
  };

  const size = () => preparedDeck.length;

  const addCards = (newCards: Card[]) => {
    preparedDeck.push(...newCards);
    shuffle();
  };

  console.log(size());

  return { shuffle, deal, preparedDeck, size, discardTopCard, addCards };
};
