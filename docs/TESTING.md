Testing guide — Manual browser checklist

1. Start dev server
   - Run `npm install` if dependencies haven't been installed.
   - Run `npm run dev` and open the provided localhost URL (usually http://localhost:5173).

2. Verify landing and navigation
   - Confirm the Splash screen loads.
   - Click Start Mission and ensure ModeSelection appears.
   - Choose Addition/Multiplication/Division and confirm the PLAYING view shows a question.

3. Problem flow and scoring
   - Select correct and incorrect answers; verify feedback overlay, points/streak updates, and that problems change after a short delay.
   - Confirm `localStorage` updates: open devtools Application > Local Storage and inspect keys prefixed with `gameState_`.

4. Rewards
   - Open Rewards from the top bar, attempt to redeem an item you cannot afford (button disabled).
   - Earn points (answer questions correctly) and redeem an item; confirm points decreased and redeemed entry appears in Parent's Corner.

5. Parents Corner
   - Click Parent's Corner and attempt to enter an incorrect PIN — confirm rejection.
   - Enter the PIN to authenticate and mark a redeemed reward as fulfilled; confirm the state updates.

6. Speech and conversation
   - Toggle Mute to disable TTS; observe behavior when alien speaks or when you talk.
   - Test Talk button: click it and speak; verify the app attempts to use SpeechRecognition (browser-dependent).
   - Verify that when speech APIs are unavailable, the app gracefully reports that listening isn't available.

7. Accessibility checks
   - With keyboard only: Tab through interactive controls — ensure each control is reachable.
   - Use screen reader (VoiceOver/NVDA) to confirm labels for buttons and input fields (Parent PIN label should be read).
   - Verify the progress and feedback overlays are announced via aria-live (consider adding this in future updates).

8. Error conditions
   - Invalidate the Gemini API key and confirm the app falls back to the offline reply when trying to get AI content.
   - Clear localStorage and restart to confirm fresh game state.

Notes
- Speech features require Chrome/Edge for SpeechRecognition; Safari has different levels of support.
- For automated tests, mock Web Speech and Gemini wrappers.
