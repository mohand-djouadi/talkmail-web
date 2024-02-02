import Picker from "emoji-picker-react"
import React, { useState } from "react"
import "../styles/EmojiInput.css"

export const EmojisInput = ({ value, onChange, onSend }) => {
  const [showPicker, setShowPicker] = useState(false)

  const onEmojiClick = (event) => {
    onChange((prevInput) => prevInput + event.emoji)
    setShowPicker(false)
  }

  return (
    <div className='input-container'>
      <div className='input-emoji-wrapper'>
        <input
          className='input-field'
          type='Text'
          placeholder='Text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className='emoji-icon'
          onClick={() => setShowPicker((val) => !val)}>
          <EmojiIcon />
        </button>
      </div>

      <button
        className='send-button'
        onClick={onSend}>
        send
      </button>
      {showPicker && (
        <div className='picker-container'>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  )
  const EmojiIcon = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='28'
        height='28'
        viewBox='0 0 24 24'>
        <path
          fill='none'
          d='M0 0h24v24H0V0z'
        />
        <circle
          cx='15.5'
          cy='9.5'
          r='1.5'
        />
        <circle
          cx='8.5'
          cy='9.5'
          r='1.5'
        />
        <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z' />
      </svg>
    )
}

