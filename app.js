// Main Workout Timer Application
class WorkoutApp {
    constructor() {
        // DOM Elements
        this.screens = {
            start: document.getElementById('start-screen'),
            workout: document.getElementById('workout-screen'),
            rest: document.getElementById('rest-screen'),
            complete: document.getElementById('complete-screen')
        };

        this.elements = {
            startBtn: document.getElementById('start-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            skipRestBtn: document.getElementById('skip-rest-btn'),
            restartBtn: document.getElementById('restart-btn'),
            openMusicBtn: document.getElementById('open-music-btn'),
            musicLink: document.getElementById('music-link'),
            downloadFeedBtn: document.getElementById('download-feed-btn'),
            downloadStoryBtn: document.getElementById('download-story-btn'),
            downloadTextBtn: document.getElementById('download-text-btn'),
            homeBtn: document.getElementById('home-btn'),

            progressBar: document.getElementById('progress-bar'),
            progressText: document.getElementById('progress-text'),
            phaseIndicator: document.getElementById('phase-indicator'),
            exerciseName: document.getElementById('exercise-name'),
            setInfo: document.getElementById('set-info'),
            animationContainer: document.getElementById('animation-container'),
            timerValue: document.getElementById('timer-value'),
            upNext: document.getElementById('up-next'),
            upNextExercise: document.getElementById('up-next-exercise'),
            elapsedTime: document.getElementById('elapsed-time'),
            totalTime: document.getElementById('total-time'),

            restTimer: document.getElementById('rest-timer'),
            restUpNext: document.getElementById('rest-up-next'),

            finalTime: document.getElementById('final-time'),

            pauseIcon: document.getElementById('pause-icon'),
            playIcon: document.getElementById('play-icon'),

            // Sidebar elements
            sidebar: document.getElementById('workout-sidebar'),
            sidebarToggle: document.getElementById('sidebar-toggle'),
            sidebarList: document.getElementById('sidebar-list')
        };

        // State
        this.workoutSequence = [];
        this.currentIndex = 0;
        this.timeRemaining = 0;
        this.totalElapsed = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.timerInterval = null;
        this.elapsedInterval = null;

        // Animation controller
        this.animationController = new AnimationController('animation-container');

        // Audio context for beeps
        this.audioContext = null;

        // Initialize
        this.init();
    }

    init() {
        // Set up event listeners
        this.elements.startBtn.addEventListener('click', () => this.startWorkout());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.prevBtn.addEventListener('click', () => this.previousStep());
        this.elements.nextBtn.addEventListener('click', () => this.nextStep());
        this.elements.skipRestBtn.addEventListener('click', () => this.skipRest());
        this.elements.restartBtn.addEventListener('click', () => this.restart());
        this.elements.openMusicBtn.addEventListener('click', () => this.openMusic());
        this.elements.downloadFeedBtn.addEventListener('click', () => this.downloadWorkoutImage('feed'));
        this.elements.downloadStoryBtn.addEventListener('click', () => this.downloadWorkoutImage('story'));
        this.elements.downloadTextBtn.addEventListener('click', () => this.downloadWorkoutText());
        this.elements.homeBtn.addEventListener('click', () => this.goHome());

        // Sidebar toggle
        this.elements.sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Generate workout sequence
        this.workoutSequence = WorkoutData.getWorkoutSequence();

        // Update total time display
        const estimatedSeconds = WorkoutData.getEstimatedDuration();
        this.elements.totalTime.textContent = this.formatTime(estimatedSeconds);

        // Build sidebar list
        this.buildSidebarList();
    }

    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playBeep(frequency = 800, duration = 150, type = 'sine') {
        if (!this.audioContext) {
            this.initAudio();
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    playCountdownBeep() {
        this.playBeep(600, 100);
    }

    playCompleteBeep() {
        // Two-tone completion sound
        this.playBeep(800, 150);
        setTimeout(() => this.playBeep(1000, 200), 150);
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens[screenName].classList.add('active');
    }

    startWorkout() {
        // Initialize audio on user interaction
        this.initAudio();

        this.currentIndex = 0;
        this.totalElapsed = 0;
        this.isRunning = true;
        this.isPaused = false;

        this.showScreen('workout');
        this.loadCurrentStep();
        this.startElapsedTimer();
    }

    loadCurrentStep() {
        const current = this.workoutSequence[this.currentIndex];

        if (!current) {
            this.completeWorkout();
            return;
        }

        if (current.type === 'exercise') {
            this.showScreen('workout');
            this.displayExercise(current);
        } else if (current.type === 'rest') {
            this.showScreen('rest');
            this.displayRest(current);
        }

        this.updateProgress();
        this.updateSidebarHighlight();
        this.startTimer();
    }

    displayExercise(item) {
        // Update phase indicator
        this.elements.phaseIndicator.textContent = item.phase;
        this.elements.phaseIndicator.className = 'phase-indicator ' + item.phaseCss;

        // Update exercise name
        this.elements.exerciseName.textContent = item.name;

        // Update set/rep info
        let info = '';
        if (item.setNumber) {
            info = `Set ${item.setNumber}/${item.totalSets} • ${item.reps} reps`;
        } else if (item.roundNumber) {
            info = `Round ${item.roundNumber}/${item.totalRounds} • ${item.duration}s`;
        } else {
            info = `${item.duration} seconds`;
        }
        if (item.equipment) {
            info += ` • ${item.equipment}`;
        }
        if (item.note) {
            info += ` (${item.note})`;
        }
        this.elements.setInfo.textContent = info;

        // Set timer
        this.timeRemaining = item.duration;
        this.elements.timerValue.textContent = this.timeRemaining;
        this.elements.timerValue.classList.remove('warning');

        // Update animation
        this.animationController.setExercise(item.animation);
        this.animationController.start();

        // Update "Up Next"
        this.updateUpNext();
    }

    displayRest(item) {
        this.timeRemaining = item.duration;
        this.elements.restTimer.textContent = this.timeRemaining;

        // Update what's coming next
        const nextExercise = this.getNextExercise();
        if (nextExercise) {
            this.elements.restUpNext.textContent = nextExercise.name;
        } else {
            this.elements.restUpNext.textContent = 'Workout Complete!';
        }

        // Stop exercise animation during rest
        this.animationController.stop();
    }

    getNextExercise() {
        for (let i = this.currentIndex + 1; i < this.workoutSequence.length; i++) {
            if (this.workoutSequence[i].type === 'exercise') {
                return this.workoutSequence[i];
            }
        }
        return null;
    }

    updateUpNext() {
        const next = this.getNextExercise();
        if (next) {
            let nextText = next.name;
            if (next.setNumber) {
                nextText += ` (Set ${next.setNumber})`;
            } else if (next.roundNumber) {
                nextText += ` (Round ${next.roundNumber})`;
            }
            this.elements.upNextExercise.textContent = nextText;
            this.elements.upNext.style.display = 'block';
        } else {
            this.elements.upNext.style.display = 'none';
        }
    }

    updateProgress() {
        // Count completed exercise steps
        let completedSteps = 0;
        let totalSteps = 0;

        this.workoutSequence.forEach((item, index) => {
            if (item.type === 'exercise') {
                totalSteps++;
                if (index < this.currentIndex) {
                    completedSteps++;
                }
            }
        });

        const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
        this.elements.progressBar.style.width = percentage + '%';
        this.elements.progressText.textContent = percentage + '%';
    }

    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timeRemaining--;

                // Update display
                const current = this.workoutSequence[this.currentIndex];
                if (current.type === 'exercise') {
                    this.elements.timerValue.textContent = this.timeRemaining;

                    // Warning state for last 5 seconds
                    if (this.timeRemaining <= 5 && this.timeRemaining > 0) {
                        this.elements.timerValue.classList.add('warning');
                        this.playCountdownBeep();
                    }
                } else {
                    this.elements.restTimer.textContent = this.timeRemaining;

                    // Countdown beeps for rest
                    if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
                        this.playCountdownBeep();
                    }
                }

                // Time's up
                if (this.timeRemaining <= 0) {
                    this.playCompleteBeep();
                    clearInterval(this.timerInterval);
                    this.currentIndex++;
                    this.loadCurrentStep();
                }
            }
        }, 1000);
    }

    startElapsedTimer() {
        if (this.elapsedInterval) {
            clearInterval(this.elapsedInterval);
        }

        this.elapsedInterval = setInterval(() => {
            if (!this.isPaused && this.isRunning) {
                this.totalElapsed++;
                this.elements.elapsedTime.textContent = this.formatTime(this.totalElapsed);
            }
        }, 1000);
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.elements.pauseIcon.style.display = 'none';
            this.elements.playIcon.style.display = 'block';
            this.animationController.pause();
        } else {
            this.elements.pauseIcon.style.display = 'block';
            this.elements.playIcon.style.display = 'none';
            this.animationController.resume();
        }
    }

    previousStep() {
        if (this.currentIndex > 0) {
            // Go back to previous exercise (skip rest periods)
            this.currentIndex--;
            while (this.currentIndex > 0 && this.workoutSequence[this.currentIndex].type === 'rest') {
                this.currentIndex--;
            }
            clearInterval(this.timerInterval);
            this.loadCurrentStep();
        }
    }

    nextStep() {
        if (this.currentIndex < this.workoutSequence.length - 1) {
            this.currentIndex++;
            clearInterval(this.timerInterval);
            this.loadCurrentStep();
        }
    }

    skipRest() {
        this.currentIndex++;
        clearInterval(this.timerInterval);
        this.loadCurrentStep();
    }

    completeWorkout() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        clearInterval(this.elapsedInterval);
        this.animationController.stop();

        this.elements.finalTime.textContent = this.formatTime(this.totalElapsed);
        this.showScreen('complete');

        // Celebration beeps
        setTimeout(() => this.playBeep(523, 150), 0);
        setTimeout(() => this.playBeep(659, 150), 150);
        setTimeout(() => this.playBeep(784, 150), 300);
        setTimeout(() => this.playBeep(1047, 300), 450);

        // Applause!
        setTimeout(() => this.playApplause(), 600);

        // Mark all as completed in sidebar
        this.elements.sidebarList.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            item.classList.add('completed');
        });
    }

    restart() {
        this.currentIndex = 0;
        this.totalElapsed = 0;
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timerInterval);
        clearInterval(this.elapsedInterval);
        this.animationController.stop();

        // Reset UI
        this.elements.pauseIcon.style.display = 'block';
        this.elements.playIcon.style.display = 'none';
        this.elements.elapsedTime.textContent = '00:00';
        this.elements.progressBar.style.width = '0%';
        this.elements.progressText.textContent = '0%';

        this.showScreen('start');
    }

    goHome() {
        if (this.isRunning && !confirm('Are you sure you want to exit the workout?')) {
            return;
        }
        this.restart();
    }

    openMusic() {
        const link = this.elements.musicLink.value.trim();
        if (link) {
            window.open(link, '_blank');
        }
    }

    handleKeyPress(e) {
        if (!this.isRunning) return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePause();
                break;
            case 'ArrowLeft':
                this.previousStep();
                break;
            case 'ArrowRight':
                this.nextStep();
                break;
            case 'KeyS':
                if (this.workoutSequence[this.currentIndex]?.type === 'rest') {
                    this.skipRest();
                }
                break;
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Sidebar methods
    toggleSidebar() {
        this.elements.sidebar.classList.toggle('open');
    }

    buildSidebarList() {
        let html = '';
        let currentPhase = '';

        this.workoutSequence.forEach((item, index) => {
            if (item.type === 'exercise') {
                // Start new phase section if needed
                if (item.phase !== currentPhase) {
                    if (currentPhase !== '') {
                        html += '</div>'; // Close previous phase
                    }
                    currentPhase = item.phase;
                    html += `<div class="sidebar-phase">
                        <div class="sidebar-phase-title ${item.phaseCss}">${item.phase}</div>`;
                }

                let info = '';
                if (item.setNumber) {
                    info = `Set ${item.setNumber}`;
                } else if (item.roundNumber) {
                    info = `Round ${item.roundNumber}`;
                } else {
                    info = `${item.duration}s`;
                }

                html += `<div class="sidebar-item" data-index="${index}">
                    <span>${item.name}</span>
                    <span class="sidebar-item-info">${info}</span>
                </div>`;
            }
        });

        if (currentPhase !== '') {
            html += '</div>'; // Close last phase
        }

        this.elements.sidebarList.innerHTML = html;

        // Add click listeners
        this.elements.sidebarList.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.navigateToExercise(index);
            });
        });
    }

    navigateToExercise(index) {
        if (!this.isRunning) {
            // Start workout first if not running
            this.initAudio();
            this.isRunning = true;
            this.isPaused = false;
            this.startElapsedTimer();
        }

        clearInterval(this.timerInterval);
        this.currentIndex = index;
        this.loadCurrentStep();
        this.updateSidebarHighlight();

        // Close sidebar on mobile
        if (window.innerWidth <= 480) {
            this.elements.sidebar.classList.remove('open');
        }
    }

    updateSidebarHighlight() {
        // Remove all highlights
        this.elements.sidebarList.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active', 'completed');
        });

        // Mark completed and active
        this.elements.sidebarList.querySelectorAll('.sidebar-item').forEach(item => {
            const index = parseInt(item.dataset.index);
            if (index < this.currentIndex) {
                item.classList.add('completed');
            } else if (index === this.currentIndex) {
                item.classList.add('active');
            }
        });
    }

    // Applause sound
    playApplause() {
        if (!this.audioContext) {
            this.initAudio();
        }

        // Create applause-like sound using noise
        const duration = 3;
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(2, bufferSize, this.audioContext.sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = buffer.getChannelData(channel);
            for (let i = 0; i < bufferSize; i++) {
                // Create crackling/clapping sound
                const t = i / this.audioContext.sampleRate;
                const envelope = Math.exp(-t * 0.5) * (1 - Math.exp(-t * 20));
                const noise = (Math.random() * 2 - 1);
                // Add some rhythmic variation to simulate clapping
                const rhythm = 0.5 + 0.5 * Math.sin(t * 8 * Math.PI);
                data[i] = noise * envelope * rhythm * 0.3;
            }
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;

        // Add filter to make it sound more like applause
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 0.5;

        source.connect(filter);
        filter.connect(this.audioContext.destination);
        source.start();
    }

    // Download workout image for Instagram (feed or story)
    downloadWorkoutImage(type = 'feed') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set dimensions based on type
        if (type === 'story') {
            canvas.width = 1080;
            canvas.height = 1920; // 9:16 ratio
        } else {
            canvas.width = 1080;
            canvas.height = 1350; // 4:5 ratio
        }

        const isStory = type === 'story';
        const scale = isStory ? 1.2 : 1;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0a0f');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#0a0a0f');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle pattern/texture
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 4, 0, Math.PI * 2);
            ctx.fill();
        }

        let y = isStory ? 120 : 60;

        // Title
        ctx.font = `bold ${Math.floor(52 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = '#ff6b6b';
        ctx.textAlign = 'center';
        ctx.fillText('FULL BODY WORKOUT', canvas.width / 2, y);
        y += 55 * scale;

        // Subtitle
        ctx.font = `${Math.floor(26 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText('45 min • ~375 kcal', canvas.width / 2, y);
        y += 25 * scale;

        // Decorative line
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(300, y);
        ctx.lineTo(780, y);
        ctx.stroke();
        y += 45 * scale;

        // Equipment box
        ctx.fillStyle = 'rgba(78, 205, 196, 0.15)';
        ctx.beginPath();
        ctx.roundRect(60, y, canvas.width - 120, 80 * scale, 15);
        ctx.fill();
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(60, y, canvas.width - 120, 80 * scale, 15);
        ctx.stroke();

        ctx.font = `bold ${Math.floor(20 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = '#4ecdc4';
        ctx.textAlign = 'center';
        ctx.fillText('EQUIPMENT: 5kg, 7.5kg, 10kg DBs + 20kg Barbell', canvas.width / 2, y + 50 * scale);
        y += 110 * scale;

        // Phase colors
        const phaseColors = {
            'Warm-up': '#ffd93d',
            'Lower Body': '#9b59b6',
            'Upper Push': '#e74c3c',
            'Upper Pull': '#3498db',
            'Core Finisher': '#f39c12',
            'Cool-down': '#1abc9c'
        };

        // Draw phases
        ctx.textAlign = 'left';

        WorkoutData.phases.forEach((phase) => {
            const color = phaseColors[phase.name] || '#fff';

            // Calculate phase duration
            let phaseDuration = 0;
            phase.exercises.forEach(ex => {
                if (ex.sets) {
                    phaseDuration += ex.sets * (ex.reps * 3) + (ex.sets - 1) * (ex.restTime || 60);
                } else if (ex.rounds) {
                    phaseDuration += ex.rounds * ex.duration + (ex.rounds - 1) * (ex.restBetweenRounds || 0);
                } else {
                    phaseDuration += ex.duration;
                }
            });
            const phaseMins = Math.ceil(phaseDuration / 60);

            // Phase header with background
            ctx.fillStyle = color + '20';
            ctx.beginPath();
            ctx.roundRect(60, y - 25, canvas.width - 120, 35 * scale, 8);
            ctx.fill();

            ctx.fillStyle = color;
            ctx.font = `bold ${Math.floor(24 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
            ctx.fillText(phase.name.toUpperCase(), 80, y);

            // Phase duration on the right
            ctx.textAlign = 'right';
            ctx.font = `${Math.floor(18 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
            ctx.fillStyle = color + 'aa';
            ctx.fillText(`~${phaseMins} min`, canvas.width - 80, y);
            ctx.textAlign = 'left';

            y += 38 * scale;

            // Exercises
            ctx.font = `${Math.floor(20 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;

            phase.exercises.forEach((ex) => {
                let exerciseText = `• ${ex.name}`;
                if (ex.sets) {
                    exerciseText += `  ${ex.sets}x${ex.reps}`;
                } else if (ex.rounds) {
                    exerciseText += `  ${ex.rounds}x${ex.duration}s`;
                } else {
                    exerciseText += `  ${ex.duration}s`;
                }
                if (ex.equipment) {
                    exerciseText += `  (${ex.equipment})`;
                }

                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.fillText(exerciseText, 100, y);
                y += 30 * scale;
            });

            y += 18 * scale;
        });

        // Footer
        y = canvas.height - (isStory ? 150 : 80);
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.floor(28 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText("LET'S GET IT! 💪", canvas.width / 2, y);

        // Date
        ctx.font = `${Math.floor(18 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), canvas.width / 2, y + 40);

        // Download as PNG
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `workout-${type}-${new Date().toISOString().split('T')[0]}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    // Download workout as text file
    downloadWorkoutText() {
        let content = `FULL BODY WORKOUT SHEET
========================
Duration: ~45 minutes
Calories: ~375 kcal
Date: ${new Date().toLocaleDateString()}

EQUIPMENT NEEDED:
- 5kg Dumbbells
- 7.5kg Dumbbells
- 10kg Dumbbells
- 20kg Barbell

`;

        WorkoutData.phases.forEach(phase => {
            // Calculate phase duration
            let phaseDuration = 0;
            phase.exercises.forEach(ex => {
                if (ex.sets) {
                    phaseDuration += ex.sets * (ex.reps * 3) + (ex.sets - 1) * (ex.restTime || 60);
                } else if (ex.rounds) {
                    phaseDuration += ex.rounds * ex.duration + (ex.rounds - 1) * (ex.restBetweenRounds || 0);
                } else {
                    phaseDuration += ex.duration;
                }
            });
            const phaseMins = Math.ceil(phaseDuration / 60);

            content += `\n${'='.repeat(40)}\n${phase.name.toUpperCase()} (~${phaseMins} min)\n${'='.repeat(40)}\n\n`;

            phase.exercises.forEach(ex => {
                content += `[ ] ${ex.name}`;
                if (ex.sets) {
                    content += ` - ${ex.sets} sets x ${ex.reps} reps`;
                } else if (ex.rounds) {
                    content += ` - ${ex.rounds} rounds x ${ex.duration}s`;
                } else {
                    content += ` - ${ex.duration} seconds`;
                }
                if (ex.equipment) {
                    content += ` (${ex.equipment})`;
                }
                if (ex.note) {
                    content += `\n    Note: ${ex.note}`;
                }
                if (ex.restTime) {
                    content += `\n    Rest: ${ex.restTime}s between sets`;
                }
                content += '\n\n';
            });
        });

        content += `\n${'='.repeat(40)}
NOTES:
${'='.repeat(40)}

_________________________________

_________________________________

_________________________________

_________________________________


Great workout! Remember to stay hydrated!
`;

        // Create and download file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `workout-sheet-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.workoutApp = new WorkoutApp();
});
