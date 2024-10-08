import { Randomizer, Shuffler, standardShuffler } from '../../src/utils/random_utils'
import * as deck from '../../src/model/Deck'
import * as hand from '../../src/model/Hand'
import * as uno from '../../src/model/Game'

export function createInitialDeck(): deck.Deck {
  return deck.createDeck()
}

export type HandProps = {
  players: string[]
  dealer: number
  shuffler?: Shuffler<deck.Card>
  cardsPerPlayer?: number
}

export function createHand({
    players, 
    dealer, 
    shuffler = standardShuffler,
    cardsPerPlayer = 7
  }: HandProps): hand.Hand {
  return hand.createHand(players, dealer, shuffler, cardsPerPlayer)
}

export function createGame(props: Partial<uno.Props>): uno.Game {
  return uno.createGame(props)
}
