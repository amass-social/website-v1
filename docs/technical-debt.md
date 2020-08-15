# List of known issues with the app


## Minor Issues
#### <ChatInput/>
  - After selecting an emoji from <EmojiSelect/>, this component will automatically focus on the <AdjustableTextArea/> input. However, it always focuses to the end of the input, which is unintuitive if the user's cursor was in the middle of the textarea before.
    - For some reason, the standard methods of [.setSelectionRange()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange) and [.selectionEnd = end](https://stackoverflow.com/questions/34968174/set-text-cursor-position-in-a-textarea) don't seem to work.
    - This might be a react.js state thing?
