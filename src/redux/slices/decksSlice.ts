import {
  ROBOT_CARDS,
  ENERGY_CARDS,
  PLANT_CARDS,
  WATER_CARDS,
  ASTRONAUT_CARDS,
  PLAN_CARDS,
} from "@/constants/StarshipCards";
import { Card } from "@/interfaces/Card";
import { Action } from "@/constants/Actions";
import { shuffle } from "@/utils/shuffle";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Deck = Card[];

interface DecksState {
  firstDeck: Deck;
  secondDeck: Deck;
  thirdDeck: Deck;
  flippedFirstCardDeck: Deck;
  flippedSecondCardDeck: Deck;
  flippedThirdCardDeck: Deck;
}

function createInitialDecks(): DecksState {
  function createDeckFromData(data: number[], action: Action): Card[] {
    return data.map((number) => ({ action, number }));
  }

  const initialDeck = [
    ...createDeckFromData(ROBOT_CARDS, "robot"),
    ...createDeckFromData(ENERGY_CARDS, "energy"),
    ...createDeckFromData(PLANT_CARDS, "plant"),
    ...createDeckFromData(WATER_CARDS, "water"),
    ...createDeckFromData(ASTRONAUT_CARDS, "astronaut"),
    ...createDeckFromData(PLAN_CARDS, "planning"),
  ];

  const shuffledDeck = shuffle(initialDeck);
  const flippedFirstCard = shuffledDeck.pop();
  const flippedSecondCard = shuffledDeck.pop();
  const flippedThirdCard = shuffledDeck.pop();
  if (!flippedFirstCard || !flippedSecondCard || !flippedThirdCard)
    throw new Error("no flipped card error");
  const deckSize = shuffledDeck.length / 3;
  return {
    firstDeck: shuffledDeck.slice(0, deckSize),
    secondDeck: shuffledDeck.slice(deckSize, deckSize * 2),
    thirdDeck: shuffledDeck.slice(deckSize * 2),
    flippedFirstCardDeck: [flippedFirstCard],
    flippedSecondCardDeck: [flippedSecondCard],
    flippedThirdCardDeck: [flippedThirdCard],
  };
}

function shuffleRemainedDecksFunction(state: DecksState): DecksState {
  return {
    ...state,
    firstDeck: shuffle(state.firstDeck),
    secondDeck: shuffle(state.secondDeck),
    thirdDeck: shuffle(state.thirdDeck),
  };
}

function flipCard(deck: Deck, flippedDeck: Deck): [Deck, Deck] {
  const newDeck = [...deck];
  const newFlippedDeck = [...flippedDeck];
  const card = newDeck.pop();
  if (card) {
    newFlippedDeck.push(card);
  }
  return [newDeck, newFlippedDeck];
}

function flipCardsFunction(state: DecksState): DecksState {
  const [newFirstDeck, newFlippedFirstDeck] = flipCard(
    state.firstDeck,
    state.flippedFirstCardDeck
  );
  const [newSecondDeck, newFlippedSecondDeck] = flipCard(
    state.secondDeck,
    state.flippedSecondCardDeck
  );
  const [newThirdDeck, newFlippedThirdDeck] = flipCard(
    state.thirdDeck,
    state.flippedThirdCardDeck
  );
  if (
    newFirstDeck.length === 0 ||
    newSecondDeck.length === 0 ||
    newThirdDeck.length === 0
  ) {
    return resetDecksFunction({
      firstDeck: newFirstDeck,
      secondDeck: newSecondDeck,
      thirdDeck: newThirdDeck,
      flippedFirstCardDeck: newFlippedFirstDeck,
      flippedSecondCardDeck: newFlippedSecondDeck,
      flippedThirdCardDeck: newFlippedThirdDeck,
    });
  }

  return {
    firstDeck: newFirstDeck,
    secondDeck: newSecondDeck,
    thirdDeck: newThirdDeck,
    flippedFirstCardDeck: newFlippedFirstDeck,
    flippedSecondCardDeck: newFlippedSecondDeck,
    flippedThirdCardDeck: newFlippedThirdDeck,
  };
}

function resetDecksFunction(state: DecksState): DecksState {
  return {
    ...state,
    firstDeck: shuffle([...state.firstDeck, ...state.flippedFirstCardDeck]),
    secondDeck: shuffle([...state.secondDeck, ...state.flippedSecondCardDeck]),
    thirdDeck: shuffle([...state.thirdDeck, ...state.flippedThirdCardDeck]),
    flippedFirstCardDeck: [],
    flippedSecondCardDeck: [],
    flippedThirdCardDeck: [],
  };
}

const initialState = createInitialDecks();
const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    shuffleRemainedDecks: (state) => shuffleRemainedDecksFunction(state),
    flipCards: (state) => flipCardsFunction(state),
    resetDecks: (state) => resetDecksFunction(state),
  },
});

export const { shuffleRemainedDecks, flipCards, resetDecks } =
  decksSlice.actions;

export const selectDecks = (state: RootState) => state.decks;

export default decksSlice.reducer;
