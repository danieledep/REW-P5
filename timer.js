let wheelDuration = 3000,
    timer;


    class Timer {
      constructor () {
        this.startTime = millis();
        this.endTime = millis()+ wheelDuration;
        this.running  = true;
        this.normalValue=0;
      }

      isFinished () {
        if ((millis() > this.endTime ) && (this.running)) return true
        else return false
      }

      pauseTimer() {
        this.pausedNormal = timer.normalized();
        this.running = false;
        this.pausedTime = millis();
        this.timeLeft = this.endTime - this.pausedTime;
        this.timeElapsed = millis() - this.pausedTime;

      }

      restartTimer() {
        this.startTime = millis()- this.timeElapsed;
        this.endTime = millis() + this.timeLeft;
        this.normalValue = this.pausedNormal;
        this.running = true;

      }

      resetTimer () {
        this.startTime = millis();
        this.endTime = millis()+ wheelDuration;
        this.normalValue = 0;
        this.running  = true;
      }

      normalized () {
        if (this.running)
        return map(millis(), this.startTime, this.endTime, this.normalValue, 1)
        else return map(this.pausedTime, this.startTime, this.endTime, this.normalValue, 1)
      }
    }
