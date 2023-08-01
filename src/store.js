import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTweetStore = create(
  persist(
    (set, get) => ({
      tweets: [
        { id: 1, tweet: 'primer tweet' },
        { id: 2, tweet: 'segundo tweet' },
        { id: 3, tweet: 'terce tweet', },
        { id: 4, tweet: 'cuarto tweet' },
      ],

      addTweets: (newTweet) => set((state) => ({
        tweets: [...state.tweets, { id: get().tweets.length + 1, tweet: newTweet }]
      })),

      deleteTweet: (tweetId) => set((state) => ({
        tweets: state.tweets.filter((tweet) =>
          tweet.id != tweetId
        )
      })),

      updateTweet: (tweetId, updatedTweet) =>
        set((state) => ({
          tweets: state.tweets.map((tweet) =>
            tweet.id === tweetId ? { ...tweet, tweet: updatedTweet } : tweet
          )
        }))

    }), {
    name: 'tweet-storage',
  })
);

export default useTweetStore;