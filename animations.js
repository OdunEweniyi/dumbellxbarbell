// Precise Stick Figure Exercise Illustrations
const ExerciseAnimations = {
    // Colors
    figureColor: '#E91E63',
    guideColor: '#4ecdc4',
    equipmentColor: '#888',
    bgColor: '#1a1a2e',

    createSVG(stickFigure, title, steps) {
        return `
        <div style="width:100%;height:100%;background:${this.bgColor};border-radius:12px;display:flex;flex-direction:column;overflow:hidden;">
            <!-- Title -->
            <div style="padding:12px;text-align:center;border-bottom:1px solid #333;">
                <h3 style="margin:0;color:${this.figureColor};font-size:16px;font-weight:bold;letter-spacing:1px;">${title}</h3>
            </div>

            <!-- Stick Figure Illustration -->
            <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:10px;">
                <svg viewBox="0 0 200 160" style="width:100%;max-width:280px;height:auto;">
                    ${stickFigure}
                </svg>
            </div>

            <!-- Instructions -->
            <div style="padding:12px;background:rgba(0,0,0,0.4);border-top:1px solid #333;">
                <p style="margin:0;color:#fff;font-size:12px;line-height:1.5;white-space:pre-line;">${steps}</p>
            </div>
        </div>`;
    },

    // ==================== WARM-UP ====================

    jumpingJacks(frame) {
        const phase = Math.abs(Math.sin((frame % 30) / 30 * Math.PI));
        const armAngle = phase * 60;
        const legSpread = phase * 25;

        const figure = `
            <!-- Ground -->
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Position 1: Together (gray) -->
            <g opacity="0.3" transform="translate(50, 0)">
                <circle cx="50" cy="25" r="12" fill="none" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="50" y1="37" x2="50" y2="85" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="50" y1="50" x2="35" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="50" y1="50" x2="65" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="50" y1="85" x2="45" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="50" y1="85" x2="55" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
            </g>

            <!-- Position 2: Spread (animated) -->
            <g transform="translate(50, ${-phase * 5})">
                <circle cx="50" cy="25" r="12" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="50" y1="37" x2="50" y2="85" stroke="${this.figureColor}" stroke-width="3"/>
                <!-- Arms up -->
                <line x1="50" y1="50" x2="${50 - 20 - armAngle * 0.3}" y2="${70 - armAngle}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="50" y1="50" x2="${50 + 20 + armAngle * 0.3}" y2="${70 - armAngle}" stroke="${this.figureColor}" stroke-width="3"/>
                <!-- Legs spread -->
                <line x1="50" y1="85" x2="${50 - 5 - legSpread}" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="50" y1="85" x2="${50 + 5 + legSpread}" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
                <!-- Feet -->
                <ellipse cx="${50 - 5 - legSpread}" cy="122" rx="6" ry="3" fill="${this.figureColor}"/>
                <ellipse cx="${50 + 5 + legSpread}" cy="122" rx="6" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- Arrow indicating motion -->
            <path d="M160,40 L170,30 L170,35 L185,35 L185,45 L170,45 L170,50 Z" fill="${this.guideColor}" opacity="0.6"/>
            <path d="M160,100 L170,90 L175,95 L175,105 L170,110 Z" fill="${this.guideColor}" opacity="0.6" transform="rotate(45, 165, 100)"/>
        `;

        return this.createSVG(figure, 'JUMPING JACKS',
            '1. Start: feet together, arms at sides\n2. Jump: spread legs, raise arms overhead\n3. Jump back to starting position\n4. Keep a steady rhythm');
    },

    armCircles(frame) {
        const angle = (frame * 6) % 360;
        const rad = angle * Math.PI / 180;
        const armX = Math.sin(rad) * 30;
        const armY = Math.cos(rad) * 30;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Circle path guides -->
            <circle cx="55" cy="55" r="30" fill="none" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>
            <circle cx="145" cy="55" r="30" fill="none" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>

            <!-- Body -->
            <circle cx="100" cy="30" r="12" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="42" x2="100" y2="90" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms circling -->
            <line x1="100" y1="55" x2="${55 + armX}" y2="${55 - armY}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="55" x2="${145 - armX}" y2="${55 + armY}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Hands -->
            <circle cx="${55 + armX}" cy="${55 - armY}" r="4" fill="${this.figureColor}"/>
            <circle cx="${145 - armX}" cy="${55 + armY}" r="4" fill="${this.figureColor}"/>

            <!-- Legs -->
            <line x1="100" y1="90" x2="88" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="90" x2="112" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="88" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="112" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Direction arrows on circles -->
            <path d="M75,28 L80,22 L82,27" fill="none" stroke="${this.guideColor}" stroke-width="2"/>
            <path d="M125,28 L130,22 L132,27" fill="none" stroke="${this.guideColor}" stroke-width="2"/>
        `;

        return this.createSVG(figure, 'ARM CIRCLES',
            '1. Stand tall, extend arms to sides\n2. Make circles with straight arms\n3. Start small, gradually bigger\n4. 30s forward, then 30s backward');
    },

    bwSquats(frame) {
        const cycle = (frame % 50) / 50;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const squat = phase * 35;
        const kneeOut = phase * 15;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Standing position (gray) -->
            <g opacity="0.25" transform="translate(-35, 0)">
                <circle cx="100" cy="30" r="10" fill="none" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="40" x2="100" y2="80" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="55" x2="80" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="55" x2="120" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="80" x2="92" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="80" x2="108" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
            </g>

            <!-- Squatting figure (animated) -->
            <g transform="translate(15, 0)">
                <!-- Head -->
                <circle cx="100" cy="${30 + squat * 0.5}" r="12" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Torso (slight forward lean) -->
                <line x1="100" y1="${42 + squat * 0.5}" x2="${100 + phase * 5}" y2="${80 + squat * 0.3}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Arms forward for balance -->
                <line x1="100" y1="${55 + squat * 0.4}" x2="${75 - phase * 10}" y2="${55 + squat * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="100" y1="${55 + squat * 0.4}" x2="${125 + phase * 10}" y2="${55 + squat * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Upper legs -->
                <line x1="${100 + phase * 5}" y1="${80 + squat * 0.3}" x2="${85 - kneeOut}" y2="${95 + squat}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${100 + phase * 5}" y1="${80 + squat * 0.3}" x2="${115 + kneeOut}" y2="${95 + squat}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Lower legs -->
                <line x1="${85 - kneeOut}" y1="${95 + squat}" x2="${88 - kneeOut * 0.5}" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${115 + kneeOut}" y1="${95 + squat}" x2="${112 + kneeOut * 0.5}" y2="125" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Feet flat -->
                <ellipse cx="${88 - kneeOut * 0.5}" cy="127" rx="8" ry="3" fill="${this.figureColor}"/>
                <ellipse cx="${112 + kneeOut * 0.5}" cy="127" rx="8" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- Depth guide -->
            <line x1="160" y1="${85 + squat}" x2="175" y2="${85 + squat}" stroke="${this.guideColor}" stroke-width="2" stroke-dasharray="3,3"/>
            <text x="178" y="${88 + squat}" fill="${this.guideColor}" font-size="8">parallel</text>
        `;

        return this.createSVG(figure, 'BODYWEIGHT SQUATS',
            '1. Feet shoulder-width apart\n2. Push hips back, bend knees\n3. Lower until thighs parallel\n4. Keep chest up, knees over toes\n5. Drive through heels to stand');
    },

    hipHinges(frame) {
        const cycle = (frame % 50) / 50;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const bend = phase * 50;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Standing (gray) -->
            <g opacity="0.25">
                <circle cx="60" cy="30" r="10" fill="none" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="40" x2="60" y2="80" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="55" x2="45" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="55" x2="75" y2="70" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="80" x2="55" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="80" x2="65" y2="120" stroke="${this.figureColor}" stroke-width="2"/>
            </g>

            <!-- Hinged position -->
            <g transform="translate(50, 0)">
                <!-- Head -->
                <circle cx="${70 + bend * 0.8}" cy="${30 + bend * 0.3}" r="12" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Torso - hinged forward -->
                <line x1="${68 + bend * 0.6}" y1="${42 + bend * 0.3}" x2="70" y2="85" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Arms hanging -->
                <line x1="${69 + bend * 0.4}" y1="${55 + bend * 0.2}" x2="${60 + bend * 0.5}" y2="${80 + bend * 0.5}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${69 + bend * 0.4}" y1="${55 + bend * 0.2}" x2="${80 + bend * 0.5}" y2="${80 + bend * 0.5}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Legs - slight knee bend -->
                <line x1="70" y1="85" x2="63" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="70" y1="85" x2="77" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
                <ellipse cx="63" cy="122" rx="7" ry="3" fill="${this.figureColor}"/>
                <ellipse cx="77" cy="122" rx="7" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- Hip hinge arrow -->
            <path d="M85,70 Q75,85 85,100" fill="none" stroke="${this.guideColor}" stroke-width="2"/>
            <polygon points="83,97 85,105 90,98" fill="${this.guideColor}"/>
            <text x="60" y="90" fill="${this.guideColor}" font-size="8">hips back</text>

            <!-- Flat back guide -->
            <line x1="${120 + bend * 0.6}" y1="${42 + bend * 0.3}" x2="120" y2="85" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="3,3" opacity="0.5" transform="translate(50,0)"/>
        `;

        return this.createSVG(figure, 'HIP HINGES',
            '1. Stand with slight knee bend\n2. Push hips BACK (not down)\n3. Keep back flat, not rounded\n4. Feel stretch in hamstrings\n5. Squeeze glutes to stand');
    },

    dbHalos(frame) {
        const angle = (frame * 5) % 360;
        const rad = angle * Math.PI / 180;
        const dbX = Math.sin(rad) * 20;
        const dbY = Math.cos(rad) * 10;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Halo path around head -->
            <ellipse cx="100" cy="35" rx="28" ry="14" fill="none" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>

            <!-- Body -->
            <circle cx="100" cy="35" r="12" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="47" x2="100" y2="95" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms holding dumbbell overhead -->
            <line x1="100" y1="60" x2="${85 + dbX * 0.5}" y2="${45 - dbY * 0.5}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="60" x2="${115 + dbX * 0.5}" y2="${45 - dbY * 0.5}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Dumbbell -->
            <g transform="translate(${100 + dbX}, ${30 - dbY})">
                <rect x="-18" y="-4" width="8" height="8" rx="1" fill="${this.equipmentColor}"/>
                <rect x="10" y="-4" width="8" height="8" rx="1" fill="${this.equipmentColor}"/>
                <rect x="-10" y="-2" width="20" height="4" rx="1" fill="#aaa"/>
            </g>

            <!-- Legs -->
            <line x1="100" y1="95" x2="88" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="95" x2="112" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="88" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="112" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Direction arrow -->
            <path d="M135,25 L142,20 L140,28" fill="none" stroke="${this.guideColor}" stroke-width="2"/>
        `;

        return this.createSVG(figure, 'DUMBBELL HALOS',
            '1. Hold DB at chest with both hands\n2. Circle it around your head\n3. Keep elbows high, core tight\n4. Go slow and controlled\n5. Alternate directions');
    },

    // ==================== LOWER BODY ====================

    bbBackSquat(frame) {
        const cycle = (frame % 60) / 60;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const squat = phase * 40;
        const kneeOut = phase * 15;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Figure with barbell -->
            <g transform="translate(10, 0)">
                <!-- Barbell on back -->
                <rect x="45" y="${28 + squat * 0.4}" width="100" height="5" rx="2" fill="${this.equipmentColor}"/>
                <rect x="35" y="${24 + squat * 0.4}" width="15" height="13" rx="2" fill="#666"/>
                <rect x="140" y="${24 + squat * 0.4}" width="15" height="13" rx="2" fill="#666"/>

                <!-- Head -->
                <circle cx="95" cy="${22 + squat * 0.5}" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Torso -->
                <line x1="95" y1="${33 + squat * 0.5}" x2="${95 + phase * 8}" y2="${75 + squat * 0.3}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Arms on bar -->
                <line x1="95" y1="${45 + squat * 0.4}" x2="65" y2="${30 + squat * 0.4}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="95" y1="${45 + squat * 0.4}" x2="125" y2="${30 + squat * 0.4}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Upper legs -->
                <line x1="${95 + phase * 8}" y1="${75 + squat * 0.3}" x2="${80 - kneeOut}" y2="${90 + squat}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${95 + phase * 8}" y1="${75 + squat * 0.3}" x2="${110 + kneeOut}" y2="${90 + squat}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Lower legs -->
                <line x1="${80 - kneeOut}" y1="${90 + squat}" x2="${82 - kneeOut * 0.3}" y2="122" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${110 + kneeOut}" y1="${90 + squat}" x2="${108 + kneeOut * 0.3}" y2="122" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Feet -->
                <ellipse cx="${82 - kneeOut * 0.3}" cy="124" rx="8" ry="3" fill="${this.figureColor}"/>
                <ellipse cx="${108 + kneeOut * 0.3}" cy="124" rx="8" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- Depth line -->
            <line x1="165" y1="${90 + squat}" x2="180" y2="${90 + squat}" stroke="${this.guideColor}" stroke-width="2"/>
        `;

        return this.createSVG(figure, 'BARBELL BACK SQUAT',
            '1. Bar on upper back (not neck)\n2. Feet shoulder-width, toes slightly out\n3. Brace core, squat down\n4. Thighs to parallel or below\n5. Drive through heels to stand');
    },

    dbRdl(frame) {
        const cycle = (frame % 60) / 60;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const bend = phase * 55;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Standing ghost -->
            <g opacity="0.2">
                <circle cx="60" cy="25" r="10" fill="none" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="35" x2="60" y2="75" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="75" x2="55" y2="115" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="60" y1="75" x2="65" y2="115" stroke="${this.figureColor}" stroke-width="2"/>
            </g>

            <!-- RDL position -->
            <g transform="translate(40, 0)">
                <!-- Head -->
                <circle cx="${70 + bend * 0.9}" cy="${25 + bend * 0.35}" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Torso - hinged, FLAT BACK -->
                <line x1="${68 + bend * 0.7}" y1="${36 + bend * 0.35}" x2="70" y2="80" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Arms straight down with DBs -->
                <line x1="${69 + bend * 0.5}" y1="${50 + bend * 0.25}" x2="${65 + bend * 0.6}" y2="${75 + bend * 0.6}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${69 + bend * 0.5}" y1="${50 + bend * 0.25}" x2="${75 + bend * 0.6}" y2="${75 + bend * 0.6}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Dumbbells -->
                <rect x="${58 + bend * 0.6}" y="${75 + bend * 0.6}" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>
                <rect x="${68 + bend * 0.6}" y="${75 + bend * 0.6}" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>

                <!-- Legs - slight bend -->
                <line x1="70" y1="80" x2="64" y2="118" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="70" y1="80" x2="76" y2="118" stroke="${this.figureColor}" stroke-width="3"/>
                <ellipse cx="64" cy="120" rx="7" ry="3" fill="${this.figureColor}"/>
                <ellipse cx="76" cy="120" rx="7" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- Hamstring stretch indicator -->
            <path d="M145,95 C150,100 150,110 145,115" fill="none" stroke="${this.guideColor}" stroke-width="2"/>
            <text x="152" y="108" fill="${this.guideColor}" font-size="7">stretch</text>
        `;

        return this.createSVG(figure, 'DUMBBELL RDL',
            '1. Hold DBs at thighs\n2. Slight knee bend (stays fixed)\n3. Hinge at hips, push butt back\n4. Lower DBs along legs\n5. Feel hamstring stretch, return');
    },

    gobletReverseLunges(frame) {
        const cycle = (frame % 60) / 60;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const lunge = phase * 35;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Figure in lunge -->
            <g transform="translate(0, 0)">
                <!-- Head -->
                <circle cx="100" cy="${25 + lunge * 0.3}" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Torso - upright -->
                <line x1="100" y1="${36 + lunge * 0.3}" x2="100" y2="${80 + lunge * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Arms holding goblet -->
                <line x1="100" y1="${50 + lunge * 0.25}" x2="88" y2="${60 + lunge * 0.25}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="100" y1="${50 + lunge * 0.25}" x2="112" y2="${60 + lunge * 0.25}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Dumbbell at chest -->
                <rect x="92" y="${58 + lunge * 0.25}" width="16" height="10" rx="2" fill="${this.equipmentColor}"/>

                <!-- Front leg - bent 90° -->
                <line x1="100" y1="${80 + lunge * 0.2}" x2="${90 - lunge * 0.2}" y2="${95 + lunge * 0.8}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${90 - lunge * 0.2}" y1="${95 + lunge * 0.8}" x2="${92 - lunge * 0.1}" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
                <ellipse cx="${92 - lunge * 0.1}" cy="127" rx="7" ry="3" fill="${this.figureColor}"/>

                <!-- Back leg - extended back -->
                <line x1="100" y1="${80 + lunge * 0.2}" x2="${115 + lunge * 0.8}" y2="${100 + lunge * 0.5}" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="${115 + lunge * 0.8}" y1="${100 + lunge * 0.5}" x2="${120 + lunge * 0.6}" y2="${125 + lunge * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>
                <ellipse cx="${123 + lunge * 0.5}" cy="${127 + lunge * 0.15}" rx="5" ry="3" fill="${this.figureColor}"/>
            </g>

            <!-- 90 degree angle indicator -->
            <path d="M${85 - lunge * 0.15},${100 + lunge * 0.6} L${85 - lunge * 0.15},${108 + lunge * 0.6} L${92 - lunge * 0.1},${108 + lunge * 0.6}" fill="none" stroke="${this.guideColor}" stroke-width="1.5"/>
        `;

        return this.createSVG(figure, 'GOBLET REVERSE LUNGES',
            '1. Hold DB at chest (goblet grip)\n2. Step one foot BACK\n3. Lower until front knee is 90°\n4. Back knee toward floor\n5. Push through front heel to return');
    },

    // ==================== UPPER PUSH ====================

    bbFloorPress(frame) {
        const cycle = (frame % 50) / 50;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const press = phase * 30;

        const figure = `
            <!-- Floor -->
            <rect x="20" y="130" width="160" height="6" rx="2" fill="#333"/>

            <!-- Body lying on floor -->
            <!-- Head -->
            <ellipse cx="45" cy="115" rx="10" ry="8" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso on floor -->
            <line x1="55" y1="115" x2="120" y2="115" stroke="${this.figureColor}" stroke-width="8"/>

            <!-- Arms pressing up -->
            <line x1="70" y1="112" x2="70" y2="${85 - press}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="112" x2="100" y2="${85 - press}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Barbell -->
            <rect x="45" y="${75 - press}" width="80" height="5" rx="2" fill="${this.equipmentColor}"/>
            <rect x="35" y="${71 - press}" width="15" height="13" rx="2" fill="#666"/>
            <rect x="120" y="${71 - press}" width="15" height="13" rx="2" fill="#666"/>

            <!-- Legs bent, feet flat -->
            <line x1="120" y1="118" x2="135" y2="100" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="135" y1="100" x2="140" y2="128" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="120" y1="122" x2="145" y2="108" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="145" y1="108" x2="155" y2="128" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="142" cy="130" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="157" cy="130" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Elbow angle indicator -->
            <text x="55" y="100" fill="${this.guideColor}" font-size="7">45°</text>
        `;

        return this.createSVG(figure, 'BARBELL FLOOR PRESS',
            '1. Lie on floor, knees bent, feet flat\n2. Grip bar slightly wider than shoulders\n3. Lower until triceps touch floor\n4. Elbows at ~45° angle (not flared)\n5. Press up to lockout');
    },

    dbArnoldPress(frame) {
        const cycle = (frame % 60) / 60;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const press = phase * 40;
        const rotate = phase * 90;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Body -->
            <circle cx="100" cy="35" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="46" x2="100" y2="95" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Start position (gray) - palms facing body -->
            <g opacity="0.25">
                <line x1="100" y1="55" x2="75" y2="50" stroke="${this.figureColor}" stroke-width="2"/>
                <line x1="100" y1="55" x2="125" y2="50" stroke="${this.figureColor}" stroke-width="2"/>
                <rect x="68" y="45" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>
                <rect x="118" y="45" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>
            </g>

            <!-- Arms pressing and rotating -->
            <line x1="100" y1="55" x2="${70 - press * 0.3}" y2="${50 - press}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="55" x2="${130 + press * 0.3}" y2="${50 - press}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Dumbbells rotating (shown by orientation) -->
            <g transform="translate(${63 - press * 0.3}, ${45 - press}) rotate(${rotate}, 7, 3)">
                <rect x="0" y="0" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>
            </g>
            <g transform="translate(${123 + press * 0.3}, ${45 - press}) rotate(${-rotate}, 7, 3)">
                <rect x="0" y="0" width="14" height="6" rx="1" fill="${this.equipmentColor}"/>
            </g>

            <!-- Legs -->
            <line x1="100" y1="95" x2="88" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="95" x2="112" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="88" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="112" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Rotation arrow -->
            <path d="M145,60 Q155,50 150,40" fill="none" stroke="${this.guideColor}" stroke-width="1.5"/>
            <polygon points="148,42 150,35 155,43" fill="${this.guideColor}"/>
            <text x="158" y="50" fill="${this.guideColor}" font-size="7">rotate</text>
        `;

        return this.createSVG(figure, 'ARNOLD PRESS',
            '1. Start: DBs at shoulders, palms IN\n2. Press up while rotating palms OUT\n3. At top: arms straight, palms forward\n4. Reverse the motion back down\n5. Smooth, controlled rotation');
    },

    dbTricepKickbacks(frame) {
        const cycle = (frame % 45) / 45;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const kick = phase * 45;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Bent over figure -->
            <!-- Head -->
            <circle cx="135" cy="50" r="10" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso bent forward -->
            <line x1="130" y1="58" x2="90" y2="85" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Upper arm - parallel to floor (fixed) -->
            <line x1="105" y1="75" x2="105" y2="55" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Forearm - kicks back -->
            <line x1="105" y1="55" x2="${105 + kick * 0.8}" y2="${55 - kick * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Dumbbell -->
            <rect x="${102 + kick * 0.8}" y="${50 - kick * 0.2}" width="12" height="5" rx="1" fill="${this.equipmentColor}"/>

            <!-- Support arm on knee -->
            <line x1="95" y1="80" x2="75" y2="100" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Legs -->
            <line x1="90" y1="85" x2="70" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="90" y1="85" x2="100" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="70" cy="122" rx="7" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="100" cy="122" rx="7" ry="3" fill="${this.figureColor}"/>

            <!-- Extension path -->
            <path d="M105,55 Q120,45 ${140},${45}" fill="none" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>

            <!-- Upper arm guide -->
            <line x1="108" y1="75" x2="108" y2="52" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="112" y="65" fill="${this.guideColor}" font-size="6">fixed</text>
        `;

        return this.createSVG(figure, 'TRICEP KICKBACKS',
            '1. Bend over, flat back\n2. Upper arm parallel to floor (FIXED)\n3. Only forearm moves\n4. Extend arm straight back\n5. Squeeze tricep at top, control down');
    },

    // ==================== UPPER PULL ====================

    bbBentOverRow(frame) {
        const cycle = (frame % 55) / 55;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const pull = phase * 35;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Bent over figure -->
            <!-- Head -->
            <circle cx="130" cy="45" r="10" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso at 45° -->
            <line x1="125" y1="53" x2="90" y2="85" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms pulling bar -->
            <line x1="100" y1="75" x2="${85 - pull * 0.2}" y2="${100 - pull}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="75" x2="${115 + pull * 0.2}" y2="${100 - pull}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Barbell -->
            <rect x="55" y="${98 - pull}" width="90" height="5" rx="2" fill="${this.equipmentColor}"/>
            <rect x="45" y="${94 - pull}" width="15" height="13" rx="2" fill="#666"/>
            <rect x="140" y="${94 - pull}" width="15" height="13" rx="2" fill="#666"/>

            <!-- Legs -->
            <line x1="90" y1="85" x2="75" y2="122" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="90" y1="85" x2="105" y2="122" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="75" cy="124" rx="7" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="105" cy="124" rx="7" ry="3" fill="${this.figureColor}"/>

            <!-- Pull direction arrow -->
            <path d="M160,${100 - pull * 0.5} L160,${80 - pull * 0.5}" stroke="${this.guideColor}" stroke-width="2"/>
            <polygon points="155,${83 - pull * 0.5} 160,${75 - pull * 0.5} 165,${83 - pull * 0.5}" fill="${this.guideColor}"/>

            <!-- Shoulder blade cue -->
            <text x="155" y="${70 - pull * 0.5}" fill="${this.guideColor}" font-size="6">squeeze</text>
        `;

        return this.createSVG(figure, 'BENT-OVER ROW',
            '1. Hinge forward ~45°, flat back\n2. Arms hang straight down\n3. Pull bar to lower chest/upper abs\n4. Squeeze shoulder blades together\n5. Lower with control');
    },

    dbRenegadeRows(frame) {
        const cycle = (frame % 60) / 60;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const row = phase * 30;
        const side = Math.floor((frame % 120) / 60);

        const figure = `
            <line x1="20" y1="145" x2="180" y2="145" stroke="#333" stroke-width="2"/>

            <!-- Plank body -->
            <!-- Head -->
            <circle cx="45" cy="75" r="9" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso - straight plank line -->
            <line x1="52" y1="80" x2="130" y2="95" stroke="${this.figureColor}" stroke-width="4"/>

            <!-- Support arm (straight down) -->
            <line x1="${side === 0 ? 75 : 60}" y1="${side === 0 ? 88 : 85}" x2="${side === 0 ? 75 : 60}" y2="130" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Rowing arm -->
            <line x1="${side === 0 ? 60 : 75}" y1="${side === 0 ? 85 : 88}" x2="${side === 0 ? 50 - row * 0.3 : 85 + row * 0.3}" y2="${side === 0 ? 100 - row : 105 - row}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Dumbbells -->
            <rect x="${side === 0 ? 70 : 42 - row * 0.3}" y="${side === 0 ? 132 : 95 - row}" width="10" height="6" rx="1" fill="${this.equipmentColor}"/>
            <rect x="${side === 0 ? 55 : 77 + row * 0.3}" y="${side === 0 ? 95 - row : 132}" width="10" height="6" rx="1" fill="${this.equipmentColor}"/>

            <!-- Hips -->
            <ellipse cx="130" cy="98" rx="8" ry="6" fill="${this.figureColor}" opacity="0.5"/>

            <!-- Legs -->
            <line x1="133" y1="100" x2="150" y2="130" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="130" y1="102" x2="160" y2="130" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="152" cy="132" rx="5" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="162" cy="132" rx="5" ry="3" fill="${this.figureColor}"/>

            <!-- Hip level guide -->
            <line x1="125" y1="95" x2="140" y2="95" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="125" y="92" fill="${this.guideColor}" font-size="6">level</text>
        `;

        return this.createSVG(figure, 'RENEGADE ROWS',
            '1. Plank position on dumbbells\n2. Feet wide for stability\n3. Row ONE dumbbell to hip\n4. Keep hips LEVEL (don\'t rotate)\n5. Alternate sides');
    },

    dbHammerCurls(frame) {
        const cycle = (frame % 50) / 50;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const curl = phase * 55;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Body -->
            <circle cx="100" cy="30" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="41" x2="100" y2="90" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms - elbows pinned at sides -->
            <!-- Upper arms (fixed) -->
            <line x1="100" y1="55" x2="80" y2="85" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="55" x2="120" y2="85" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Forearms curling (shown at angle based on phase) -->
            <line x1="80" y1="85" x2="${75 - curl * 0.1}" y2="${115 - curl}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="120" y1="85" x2="${125 + curl * 0.1}" y2="${115 - curl}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Dumbbells (vertical - hammer grip) -->
            <rect x="${70 - curl * 0.1}" y="${110 - curl}" width="6" height="14" rx="1" fill="${this.equipmentColor}"/>
            <rect x="${123 + curl * 0.1}" y="${110 - curl}" width="6" height="14" rx="1" fill="${this.equipmentColor}"/>

            <!-- Legs -->
            <line x1="100" y1="90" x2="88" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="90" x2="112" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="88" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="112" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Elbow fixed indicator -->
            <circle cx="80" cy="85" r="3" fill="none" stroke="${this.guideColor}" stroke-width="1"/>
            <circle cx="120" cy="85" r="3" fill="none" stroke="${this.guideColor}" stroke-width="1"/>
            <text x="60" y="82" fill="${this.guideColor}" font-size="6">fixed</text>
        `;

        return this.createSVG(figure, 'HAMMER CURLS',
            '1. Stand with DBs, palms facing IN\n2. Elbows pinned at your sides\n3. Curl weights up together\n4. Only forearms move\n5. Lower with control');
    },

    // ==================== CORE ====================

    russianTwists(frame) {
        const twist = Math.sin((frame % 40) / 40 * Math.PI * 2) * 25;

        const figure = `
            <line x1="20" y1="145" x2="180" y2="145" stroke="#333" stroke-width="2"/>

            <!-- V-sit position -->
            <!-- Head (rotates with torso) -->
            <circle cx="${100 + twist * 0.3}" cy="45" r="10" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso leaned back -->
            <line x1="${100 + twist * 0.2}" y1="55" x2="100" y2="95" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms holding weight, moving side to side -->
            <line x1="${100 + twist * 0.2}" y1="70" x2="${85 + twist}" y2="85" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="${100 + twist * 0.2}" y1="70" x2="${115 + twist}" y2="85" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Weight -->
            <rect x="${92 + twist}" y="82" width="16" height="8" rx="2" fill="${this.equipmentColor}"/>

            <!-- Hips/butt on ground -->
            <ellipse cx="100" cy="100" rx="12" ry="8" fill="${this.figureColor}" opacity="0.5"/>

            <!-- Legs elevated in V -->
            <line x1="95" y1="98" x2="70" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="70" y1="120" x2="60" y2="135" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="105" y1="98" x2="130" y2="120" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="130" y1="120" x2="140" y2="135" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="58" cy="137" rx="5" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="142" cy="137" rx="5" ry="3" fill="${this.figureColor}"/>

            <!-- Rotation arrow -->
            <path d="M70,60 L85,60" stroke="${this.guideColor}" stroke-width="1.5"/>
            <path d="M115,60 L130,60" stroke="${this.guideColor}" stroke-width="1.5"/>
            <polygon points="68,57 60,60 68,63" fill="${this.guideColor}"/>
            <polygon points="132,57 140,60 132,63" fill="${this.guideColor}"/>
        `;

        return this.createSVG(figure, 'RUSSIAN TWISTS',
            '1. Sit with knees bent, feet OFF floor\n2. Lean back ~45° (V position)\n3. Hold weight at chest\n4. Rotate torso side to side\n5. Touch weight to floor each side');
    },

    plank(frame) {
        const breathe = Math.sin(frame * 0.1) * 1;

        const figure = `
            <line x1="20" y1="140" x2="180" y2="140" stroke="#333" stroke-width="2"/>

            <!-- Plank position -->
            <!-- Head -->
            <circle cx="40" cy="${75 + breathe}" r="9" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso - STRAIGHT LINE -->
            <line x1="47" y1="${80 + breathe}" x2="140" y2="95" stroke="${this.figureColor}" stroke-width="4"/>

            <!-- Forearms on ground (forearm plank) -->
            <line x1="55" y1="${85 + breathe}" x2="55" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="70" y1="${88 + breathe}" x2="70" y2="125" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Hands/fists -->
            <ellipse cx="55" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="70" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>

            <!-- Hips - inline with shoulders (not sagging, not piked) -->
            <ellipse cx="140" cy="97" rx="8" ry="6" fill="${this.figureColor}" opacity="0.4"/>

            <!-- Legs -->
            <line x1="143" y1="98" x2="160" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="140" y1="100" x2="170" y2="125" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Feet (toes on ground) -->
            <ellipse cx="162" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="172" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>

            <!-- Straight line guide -->
            <line x1="35" y1="${70 + breathe}" x2="175" y2="93" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="4,4" opacity="0.6"/>
            <text x="85" y="65" fill="${this.guideColor}" font-size="7">straight line</text>
        `;

        return this.createSVG(figure, 'PLANK',
            '1. Forearms and toes on floor\n2. Body in STRAIGHT line\n3. Don\'t sag hips or pike up\n4. Squeeze glutes, brace core\n5. Breathe! Don\'t hold breath');
    },

    deadBug(frame) {
        const cycle = (frame % 50) / 50;
        const phase = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
        const extend = phase * 40;
        const side = Math.floor((frame % 100) / 50);

        const figure = `
            <!-- Floor -->
            <rect x="20" y="125" width="160" height="5" rx="2" fill="#333"/>

            <!-- Body lying on back -->
            <!-- Head -->
            <ellipse cx="40" cy="105" rx="9" ry="7" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso on floor -->
            <line x1="48" y1="105" x2="120" y2="105" stroke="${this.figureColor}" stroke-width="5"/>

            <!-- Low back pressed to floor indicator -->
            <line x1="60" y1="112" x2="100" y2="112" stroke="${this.guideColor}" stroke-width="2"/>
            <text x="65" y="122" fill="${this.guideColor}" font-size="6">back flat</text>

            ${side === 0 ? `
                <!-- Right arm up (stationary), Left arm extending back -->
                <line x1="70" y1="102" x2="70" y2="70" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="85" y1="102" x2="${70 - extend * 0.5}" y2="${85 + extend * 0.3}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Left leg up (stationary), Right leg extending out -->
                <line x1="115" y1="108" x2="100" y2="80" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="100" y1="80" x2="90" y2="65" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="120" y1="108" x2="${135 + extend * 0.6}" y2="${100 + extend * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>
            ` : `
                <!-- Left arm up (stationary), Right arm extending back -->
                <line x1="85" y1="102" x2="85" y2="70" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="70" y1="102" x2="${55 - extend * 0.5}" y2="${85 + extend * 0.3}" stroke="${this.figureColor}" stroke-width="3"/>

                <!-- Right leg up (stationary), Left leg extending out -->
                <line x1="120" y1="108" x2="105" y2="80" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="105" y1="80" x2="95" y2="65" stroke="${this.figureColor}" stroke-width="3"/>
                <line x1="115" y1="108" x2="${130 + extend * 0.6}" y2="${100 + extend * 0.2}" stroke="${this.figureColor}" stroke-width="3"/>
            `}

            <!-- Opposite labels -->
            <text x="150" y="60" fill="${this.guideColor}" font-size="7">opposite</text>
            <text x="150" y="70" fill="${this.guideColor}" font-size="7">arm + leg</text>
        `;

        return this.createSVG(figure, 'DEAD BUG',
            '1. Lie on back, arms up, knees bent 90°\n2. Press lower back INTO floor\n3. Extend OPPOSITE arm and leg\n4. Don\'t let back arch!\n5. Return and switch sides');
    },

    // ==================== COOL DOWN ====================

    quadStretch(frame) {
        const sway = Math.sin(frame * 0.08) * 2;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Standing on one leg -->
            <!-- Head -->
            <circle cx="90" cy="${35 + sway}" r="10" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso upright -->
            <line x1="90" y1="${45 + sway}" x2="90" y2="${90 + sway}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Left arm out for balance -->
            <line x1="90" y1="${60 + sway}" x2="60" y2="${55 + sway}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Right arm reaching back to hold foot -->
            <line x1="90" y1="${60 + sway}" x2="115" y2="${85 + sway}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Standing leg (left) -->
            <line x1="90" y1="${90 + sway}" x2="85" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="85" cy="127" rx="7" ry="3" fill="${this.figureColor}"/>

            <!-- Stretched leg (right) - heel to butt -->
            <line x1="90" y1="${90 + sway}" x2="105" y2="${100 + sway}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="105" y1="${100 + sway}" x2="115" y2="${88 + sway}" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="117" cy="${86 + sway}" rx="5" ry="4" fill="${this.figureColor}"/>

            <!-- Quad stretch indicator -->
            <path d="M108,${95 + sway} Q115,${92 + sway} 112,${85 + sway}" fill="none" stroke="${this.guideColor}" stroke-width="1.5"/>
            <text x="125" y="${95 + sway}" fill="${this.guideColor}" font-size="7">stretch</text>

            <!-- Knees together indicator -->
            <line x1="92" y1="${95 + sway}" x2="102" y2="${97 + sway}" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="2,2"/>
        `;

        return this.createSVG(figure, 'QUAD STRETCH',
            '1. Stand on one leg\n2. Grab ankle, pull heel to glute\n3. Keep knees TOGETHER\n4. Stand tall, don\'t lean forward\n5. Hold 30 seconds each side');
    },

    hamstringStretch(frame) {
        const breathe = Math.sin(frame * 0.08) * 2;

        const figure = `
            <line x1="20" y1="145" x2="180" y2="145" stroke="#333" stroke-width="2"/>

            <!-- Seated position -->
            <!-- Legs extended straight -->
            <line x1="70" y1="115" x2="160" y2="115" stroke="${this.figureColor}" stroke-width="4"/>
            <ellipse cx="162" cy="115" rx="7" ry="4" fill="${this.figureColor}"/>

            <!-- Hips/butt -->
            <ellipse cx="65" cy="112" rx="10" ry="8" fill="${this.figureColor}" opacity="0.4"/>

            <!-- Torso folding forward -->
            <line x1="70" y1="108" x2="${105 + breathe}" y2="${85 - breathe}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Head -->
            <circle cx="${115 + breathe}" cy="${78 - breathe}" r="9" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms reaching for toes -->
            <line x1="${100 + breathe}" y1="${90 - breathe}" x2="145" y2="105" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="${100 + breathe}" y1="${93 - breathe}" x2="150" y2="108" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Hamstring stretch indicator -->
            <path d="M80,100 Q90,95 85,85" fill="none" stroke="${this.guideColor}" stroke-width="1.5"/>
            <text x="45" y="95" fill="${this.guideColor}" font-size="7">stretch</text>

            <!-- Reach toward toes -->
            <path d="M145,100 L155,100" stroke="${this.guideColor}" stroke-width="1" stroke-dasharray="2,2"/>
        `;

        return this.createSVG(figure, 'HAMSTRING STRETCH',
            '1. Sit with legs extended straight\n2. Keep back as flat as possible\n3. Reach toward your toes\n4. Feel stretch in back of legs\n5. Hold and breathe deeply');
    },

    catCow(frame) {
        const cycle = (frame % 60) / 60;
        const phase = Math.sin(cycle * Math.PI * 2);
        const arch = phase * 15;
        const isCow = phase > 0;

        const figure = `
            <line x1="20" y1="145" x2="180" y2="145" stroke="#333" stroke-width="2"/>

            <!-- All fours -->
            <!-- Hands on ground -->
            <line x1="55" y1="${85 - arch * 0.3}" x2="55" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="75" y1="${88 - arch * 0.3}" x2="75" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="55" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="75" cy="127" rx="4" ry="3" fill="${this.figureColor}"/>

            <!-- Spine - curves based on cat/cow -->
            <path d="M60,${82 - arch * 0.3} Q100,${80 + arch * 1.5} 140,${90 - arch * 0.3}" fill="none" stroke="${this.figureColor}" stroke-width="4"/>

            <!-- Head -->
            <circle cx="50" cy="${isCow ? 68 - arch : 95 + arch * 0.5}" r="9" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Knees on ground -->
            <line x1="140" y1="${92 - arch * 0.3}" x2="140" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="155" y1="${94 - arch * 0.3}" x2="155" y2="125" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Cat/Cow labels -->
            ${isCow ? `
                <text x="100" y="55" fill="${this.guideColor}" font-size="9" text-anchor="middle">COW</text>
                <text x="100" y="65" fill="${this.guideColor}" font-size="6" text-anchor="middle">belly down, head up</text>
                <path d="M100,70 L100,${80 + arch}" stroke="${this.guideColor}" stroke-width="1"/>
                <polygon points="97,${77 + arch} 100,${83 + arch} 103,${77 + arch}" fill="${this.guideColor}"/>
            ` : `
                <text x="100" y="55" fill="${this.guideColor}" font-size="9" text-anchor="middle">CAT</text>
                <text x="100" y="65" fill="${this.guideColor}" font-size="6" text-anchor="middle">round up, tuck chin</text>
                <path d="M100,${85 + arch} L100,72" stroke="${this.guideColor}" stroke-width="1"/>
                <polygon points="97,75 100,68 103,75" fill="${this.guideColor}"/>
            `}
        `;

        return this.createSVG(figure, 'CAT-COW STRETCH',
            '1. Start on hands and knees\n2. COW: Drop belly, lift head & tailbone\n3. CAT: Round spine UP, tuck chin\n4. Flow smoothly between positions\n5. Breathe: inhale cow, exhale cat');
    },

    childsPose(frame) {
        const breathe = Math.sin(frame * 0.06) * 2;

        const figure = `
            <line x1="20" y1="140" x2="180" y2="140" stroke="#333" stroke-width="2"/>

            <!-- Child's pose - curled forward -->
            <!-- Arms extended forward on floor -->
            <line x1="60" y1="100" x2="30" y2="${95 + breathe}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="75" y1="105" x2="35" y2="${100 + breathe}" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="28" cy="${95 + breathe}" rx="4" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="33" cy="${100 + breathe}" rx="4" ry="3" fill="${this.figureColor}"/>

            <!-- Head resting down -->
            <ellipse cx="55" cy="${105 + breathe}" rx="8" ry="7" fill="none" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Torso curved forward -->
            <path d="M63,${108 + breathe} Q90,${115 + breathe} 115,105" fill="none" stroke="${this.figureColor}" stroke-width="4"/>

            <!-- Hips sitting on heels -->
            <ellipse cx="125" cy="108" rx="15" ry="10" fill="${this.figureColor}" opacity="0.4"/>

            <!-- Folded legs (shins on floor) -->
            <line x1="130" y1="115" x2="150" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="152" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Relaxation indicator -->
            <text x="85" y="85" fill="${this.guideColor}" font-size="7">relax</text>
            <text x="140" y="90" fill="${this.guideColor}" font-size="6">sit on heels</text>
        `;

        return this.createSVG(figure, "CHILD'S POSE",
            '1. Kneel, then sit back on heels\n2. Fold forward, arms extended\n3. Rest forehead on floor\n4. Let everything relax\n5. Breathe deeply, hold 60 seconds');
    },

    // REST
    rest(frame) {
        const breathe = Math.sin(frame * 0.1) * 3;

        const figure = `
            <line x1="20" y1="150" x2="180" y2="150" stroke="#333" stroke-width="2"/>

            <!-- Relaxed standing figure -->
            <circle cx="100" cy="${35 + breathe}" r="11" fill="none" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="${46 + breathe}" x2="100" y2="${95 + breathe}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Arms relaxed at sides -->
            <line x1="100" y1="${60 + breathe}" x2="75" y2="${85 + breathe}" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="${60 + breathe}" x2="125" y2="${85 + breathe}" stroke="${this.figureColor}" stroke-width="3"/>

            <!-- Legs -->
            <line x1="100" y1="${95 + breathe}" x2="88" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <line x1="100" y1="${95 + breathe}" x2="112" y2="125" stroke="${this.figureColor}" stroke-width="3"/>
            <ellipse cx="88" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>
            <ellipse cx="112" cy="127" rx="6" ry="3" fill="${this.figureColor}"/>

            <!-- Water bottle -->
            <rect x="145" y="90" width="12" height="25" rx="3" fill="${this.guideColor}"/>
            <rect x="148" y="85" width="6" height="8" rx="2" fill="${this.guideColor}" opacity="0.7"/>

            <!-- Breathing indicator -->
            <text x="100" y="15" fill="${this.guideColor}" font-size="10" text-anchor="middle">BREATHE</text>
        `;

        return this.createSVG(figure, 'REST',
            '• Catch your breath\n• Hydrate - drink water\n• Shake out your muscles\n• Prepare for next exercise');
    }
};

// Animation controller
class AnimationController {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.frame = 0;
        this.currentExercise = null;
        this.animationId = null;
        this.isRunning = false;
    }

    setExercise(exerciseKey) {
        this.currentExercise = exerciseKey;
        this.frame = 0;
        this.renderFrame();
    }

    renderFrame() {
        if (!this.currentExercise || !this.container) return;
        const fn = ExerciseAnimations[this.currentExercise];
        if (fn) {
            this.container.innerHTML = fn.call(ExerciseAnimations, this.frame);
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    animate() {
        if (!this.isRunning) return;
        this.renderFrame();
        this.frame++;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    pause() { this.stop(); }
    resume() { this.start(); }
}

window.AnimationController = AnimationController;
window.ExerciseAnimations = ExerciseAnimations;
