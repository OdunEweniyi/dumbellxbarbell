// Exercise definitions for the workout
const WorkoutData = {
    phases: [
        {
            name: 'Warm-up',
            cssClass: 'warm',
            color: '#ffd93d',
            exercises: [
                { name: 'Jumping Jacks', animation: 'jumpingJacks', duration: 60, type: 'timed' },
                { name: 'Arm Circles', animation: 'armCircles', duration: 60, type: 'timed' },
                { name: 'Bodyweight Squats', animation: 'bwSquats', duration: 60, type: 'timed' },
                { name: 'Hip Hinges', animation: 'hipHinges', duration: 60, type: 'timed' },
                { name: 'DB Halos', animation: 'dbHalos', duration: 60, type: 'timed', equipment: '5kg' }
            ]
        },
        {
            name: 'Lower Body',
            cssClass: 'lower',
            color: '#9b59b6',
            exercises: [
                { name: 'BB Back Squat', animation: 'bbBackSquat', sets: 4, reps: 10, restTime: 60, type: 'sets', equipment: '20kg barbell' },
                { name: 'DB Romanian Deadlift', animation: 'dbRdl', sets: 3, reps: 12, restTime: 45, type: 'sets', equipment: '10kg each hand' },
                { name: 'Goblet Reverse Lunges', animation: 'gobletReverseLunges', sets: 3, reps: 12, restTime: 45, type: 'sets', equipment: '10kg single DB', note: '12 each leg' }
            ]
        },
        {
            name: 'Upper Push',
            cssClass: 'push',
            color: '#e74c3c',
            exercises: [
                { name: 'BB Floor Press', animation: 'bbFloorPress', sets: 4, reps: 10, restTime: 60, type: 'sets', equipment: '20kg barbell' },
                { name: 'DB Arnold Press', animation: 'dbArnoldPress', sets: 3, reps: 12, restTime: 45, type: 'sets', equipment: '7.5kg each hand' },
                { name: 'DB Tricep Kickbacks', animation: 'dbTricepKickbacks', sets: 3, reps: 15, restTime: 30, type: 'sets', equipment: '5kg each hand' }
            ]
        },
        {
            name: 'Upper Pull',
            cssClass: 'pull',
            color: '#3498db',
            exercises: [
                { name: 'BB Bent-Over Row', animation: 'bbBentOverRow', sets: 4, reps: 10, restTime: 60, type: 'sets', equipment: '20kg barbell' },
                { name: 'DB Renegade Rows', animation: 'dbRenegadeRows', sets: 3, reps: 8, restTime: 45, type: 'sets', equipment: '7.5kg each hand', note: '8 each arm' },
                { name: 'DB Hammer Curls', animation: 'dbHammerCurls', sets: 3, reps: 12, restTime: 30, type: 'sets', equipment: '7.5kg each hand' }
            ]
        },
        {
            name: 'Core Finisher',
            cssClass: 'core',
            color: '#f39c12',
            exercises: [
                { name: 'Russian Twists', animation: 'russianTwists', duration: 40, type: 'timed', rounds: 2, restBetweenRounds: 0, equipment: '5kg single DB' },
                { name: 'Plank Hold', animation: 'plank', duration: 40, type: 'timed', rounds: 2, restBetweenRounds: 0 },
                { name: 'Dead Bug', animation: 'deadBug', duration: 40, type: 'timed', rounds: 2, restBetweenRounds: 0 }
            ]
        },
        {
            name: 'Cool-down',
            cssClass: 'cool',
            color: '#1abc9c',
            exercises: [
                { name: 'Quad Stretch', animation: 'quadStretch', duration: 45, type: 'timed' },
                { name: 'Hamstring Stretch', animation: 'hamstringStretch', duration: 60, type: 'timed' },
                { name: 'Cat-Cow', animation: 'catCow', duration: 60, type: 'timed' },
                { name: "Child's Pose", animation: 'childsPose', duration: 60, type: 'timed' }
            ]
        }
    ],

    // Calculate total workout steps
    getTotalSteps() {
        let steps = 0;
        this.phases.forEach(phase => {
            phase.exercises.forEach(ex => {
                if (ex.type === 'sets') {
                    steps += ex.sets; // Each set is a step
                } else if (ex.rounds) {
                    steps += ex.rounds; // Each round is a step
                } else {
                    steps += 1; // Timed exercise is one step
                }
            });
        });
        return steps;
    },

    // Get flattened list of all workout items (exercises + rest)
    getWorkoutSequence() {
        const sequence = [];
        let stepIndex = 0;

        this.phases.forEach((phase, phaseIndex) => {
            phase.exercises.forEach((exercise, exerciseIndex) => {
                if (exercise.type === 'sets') {
                    // Add each set and rest period
                    for (let set = 1; set <= exercise.sets; set++) {
                        sequence.push({
                            type: 'exercise',
                            phase: phase.name,
                            phaseCss: phase.cssClass,
                            phaseColor: phase.color,
                            exercise: exercise,
                            name: exercise.name,
                            animation: exercise.animation,
                            setNumber: set,
                            totalSets: exercise.sets,
                            reps: exercise.reps,
                            duration: this.getSetDuration(exercise.reps),
                            stepIndex: stepIndex++,
                            equipment: exercise.equipment,
                            note: exercise.note
                        });

                        // Add rest after each set except the last set of the last exercise
                        const isLastSet = set === exercise.sets;
                        const isLastExercise = exerciseIndex === phase.exercises.length - 1;
                        const isLastPhase = phaseIndex === this.phases.length - 1;

                        if (!isLastSet || (!isLastExercise && !isLastPhase)) {
                            sequence.push({
                                type: 'rest',
                                duration: exercise.restTime || 60,
                                phase: phase.name,
                                phaseCss: phase.cssClass
                            });
                        }
                    }
                } else if (exercise.rounds) {
                    // Timed exercise with rounds
                    for (let round = 1; round <= exercise.rounds; round++) {
                        sequence.push({
                            type: 'exercise',
                            phase: phase.name,
                            phaseCss: phase.cssClass,
                            phaseColor: phase.color,
                            exercise: exercise,
                            name: exercise.name,
                            animation: exercise.animation,
                            roundNumber: round,
                            totalRounds: exercise.rounds,
                            duration: exercise.duration,
                            stepIndex: stepIndex++,
                            equipment: exercise.equipment,
                            note: exercise.note
                        });

                        // Add rest between rounds
                        if (round < exercise.rounds) {
                            sequence.push({
                                type: 'rest',
                                duration: exercise.restBetweenRounds || 20,
                                phase: phase.name,
                                phaseCss: phase.cssClass
                            });
                        }
                    }

                    // Rest before next exercise
                    const isLastExercise = exerciseIndex === phase.exercises.length - 1;
                    const isLastPhase = phaseIndex === this.phases.length - 1;
                    if (!isLastExercise || !isLastPhase) {
                        sequence.push({
                            type: 'rest',
                            duration: 15,
                            phase: phase.name,
                            phaseCss: phase.cssClass
                        });
                    }
                } else {
                    // Simple timed exercise
                    sequence.push({
                        type: 'exercise',
                        phase: phase.name,
                        phaseCss: phase.cssClass,
                        phaseColor: phase.color,
                        exercise: exercise,
                        name: exercise.name,
                        animation: exercise.animation,
                        duration: exercise.duration,
                        stepIndex: stepIndex++,
                        equipment: exercise.equipment,
                        note: exercise.note
                    });

                    // Short transition rest in warm-up and cool-down
                    const isLastExercise = exerciseIndex === phase.exercises.length - 1;
                    const isLastPhase = phaseIndex === this.phases.length - 1;
                    if (!isLastExercise) {
                        sequence.push({
                            type: 'rest',
                            duration: 10,
                            phase: phase.name,
                            phaseCss: phase.cssClass
                        });
                    } else if (!isLastPhase) {
                        sequence.push({
                            type: 'rest',
                            duration: 30,
                            phase: phase.name,
                            phaseCss: phase.cssClass
                        });
                    }
                }
            });
        });

        return sequence;
    },

    // Estimate duration for a set based on reps
    getSetDuration(reps) {
        // Assume ~3 seconds per rep
        return reps * 3;
    },

    // Get estimated total workout time in seconds
    getEstimatedDuration() {
        let totalSeconds = 0;
        const sequence = this.getWorkoutSequence();
        sequence.forEach(item => {
            totalSeconds += item.duration;
        });
        return totalSeconds;
    }
};

// Export for use in main app
window.WorkoutData = WorkoutData;
