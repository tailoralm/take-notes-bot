import VoiceToTextRoutine from './services/voice-to-text.routine';
import nodeSchedule from 'node-schedule';
export default class RoutinesController {
  constructor() {}

  voiceToTextRoutine() {
    const voiceToTextRoutine = new VoiceToTextRoutine();

    // Run every 5 minutes
    nodeSchedule.scheduleJob('*/5 * * * *', () => {
      voiceToTextRoutine.run();
    });
  }
}
