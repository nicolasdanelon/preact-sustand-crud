import { useState, useEffect } from 'preact/hooks';
import useTweetStore from './store.js'
import './app.css'

const AddTweetFields = () => {
  const { addTweets } = useTweetStore();
  const [tweet, setTweet] = useState('');

  const onChange = (e) => {
    setTweet(e.target.value);
  }

  return (
    <>
      <h2>Agregar Tweet</h2>
      <input type="text" onChange={onChange} value={tweet} />
      <input type="button" value="+" onClick={() => {
        addTweets(tweet);
        setTweet('');
      }} />
    </>
  )
}

const UpdateTweetFields = ({ id, tweetContent }) => {
  const [tweet, setTweet] = useState(tweetContent);
  const [theId, setId] = useState(id);
  const { updateTweet } = useTweetStore();

  const onChange = (e) => {
    setTweet(e.target.value);
  }

  useEffect(() => {
    setTweet(tweetContent)
  }, [tweetContent]);

  useEffect(() => {
    setId(id)
  }, [id]);

  return (
    <>
      <h2>Update Tweet</h2>
      <input type="text" onChange={onChange} value={tweet} />
      <input type="button" value="⟳" onClick={() => {
        updateTweet(theId, tweet);
        setTweet('');
        setId(0);
      }} />
    </>
  )
}

export function App() {
  const { tweets, deleteTweet } = useTweetStore();
  const [data, setData] = useState({ id: 0, tweet: '' });

  return (
    <>
      <AddTweetFields />
      <hr />
      <UpdateTweetFields id={data.id} tweetContent={data.tweet} />
      <hr />
      <div class="card">
        {tweets.map((item, index) => {
          return (
            <>
              <p key={`tweet_${item.id}_${index}`} class="read-the-docs">
                {item.tweet}
              </p>
              <button type="button" onClick={() => {
                deleteTweet(item.id);
              }}>&times;</button>
              &nbsp;
              <button type="button" onClick={() => {
                setData({
                  id: item.id,
                  tweet: item.tweet
                })
              }}>Update</button>
            </>
          )
        })}
      </div>
    </>
  )
}
