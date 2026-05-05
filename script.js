/**
 * College Portal - Pure Canvas Procedural 2D Character Animation
 */

const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
const loginContainer = document.getElementById('login-container');

// State Machine
const STATES = {
    WALKING: 0,
    STOPPING: 1,
    REACHING: 2,
    DRAWING: 3,
    IDLE: 4
};

let width, height;
let currentState = STATES.WALKING;
let globalTime = 0;

// Character Setup
const charScale = 1.3;
let charX = -200; // start off-screen
let charY = 0;
let targetCharX = 0; // will be calculated based on screen width
let groundY = 0;

// Animation Variables
let walkCycle = 0;
let walkSpeed = 3.5;
let stopProgress = 0;
let reachProgress = 0;
let drawProgress = 0;
let idleTime = 0;

// Physics / Kinematics variables
let leftLegAngle = 0;
let rightLegAngle = 0;
let leftArmAngle = 0;
let rightArmAngle = 0;
let bodyBob = 0;
let tasselAngle = 0;
let tasselVel = 0;

// The glowing rectangle coords
let rectX, rectY, rectW, rectH;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    groundY = height * 0.75;
    
    // Character stops exactly in front of the gate (shifted to left to avoid the wide UI card overalpping)
    targetCharX = width * 0.35; 

    // Target rectangle bounds for the login card
    // The CSS .login-container is at right: 1rem, bottom: 1rem.
    rectW = 460;
    // Estimate card height with the grid 
    rectH = 480;
    rectX = width - rectW - 16; // ~1rem
    rectY = height - rectH - 16; // ~1rem
}

window.addEventListener('resize', resize);
resize();

// --- DRAWING PRIMITIVES ---
function drawCircle(x, y, r, fill) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
}

function drawRoundedRect(x, y, w, h, r, fill) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fillStyle = fill;
    ctx.fill();
}

// --- CHARACTER DRAWING ---
// Theme Colors
const gownColor = '#24324c'; // Lighter navy shade
const stoleColor = '#f5b041';
const skinColor = '#eab896';
const hairColor = '#fcd34d';
const pantsColor = '#1f2937';
const shoeColor = '#030712';
const bagColor = '#4b5563';

function drawCharacter(x, y) {
    ctx.save();
    ctx.translate(x, y + bodyBob);
    ctx.scale(charScale, charScale);

    // Pivot sizes
    const legLength = 60;
    const armLength = 55;

    // --- Back Arm (Right Arm) ---
    ctx.save();
    ctx.translate(0, -60);
    ctx.rotate(rightArmAngle);
    // Arm sleeve
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, armLength, 8);
    ctx.fill();
    // Hand
    drawCircle(0, armLength + 5, 6, skinColor);
    ctx.restore();

    // --- Back Leg (Right Leg) ---
    ctx.save();
    ctx.translate(4, 0);
    ctx.rotate(rightLegAngle);
    ctx.fillStyle = pantsColor;
    ctx.fillRect(-6, 0, 12, legLength); // leg
    ctx.fillStyle = shoeColor;
    drawRoundedRect(-10, legLength, 24, 12, 6, shoeColor); // shoe
    ctx.restore();

    // --- Bag (Behind body but in front of back leg/arm) ---
    ctx.save();
    ctx.translate(-15, -40);
    ctx.rotate(0.1);
    drawRoundedRect(-12, -15, 24, 30, 4, bagColor); // bag body
    ctx.strokeStyle = '#374151'; // strap
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(25, -45); // connect to shoulder
    ctx.stroke();
    ctx.restore();

    // --- Body (Gown) ---
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.moveTo(-15, -70); // shoulder L
    ctx.lineTo(15, -70);  // shoulder R
    ctx.lineTo(22, 10);   // bottom R
    ctx.lineTo(-22, 10);  // bottom L
    ctx.closePath();
    ctx.fill();

    // --- Stole (Gold Accent) ---
    ctx.fillStyle = stoleColor;
    ctx.beginPath();
    ctx.moveTo(-5, -70);
    ctx.lineTo(5, -70);
    ctx.lineTo(8, -20);
    ctx.lineTo(2, -15);
    ctx.lineTo(-2, -15);
    ctx.lineTo(-8, -20);
    ctx.closePath();
    ctx.fill();

    // --- Front Leg (Left Leg) ---
    ctx.save();
    ctx.translate(-4, 0);
    ctx.rotate(leftLegAngle);
    ctx.fillStyle = pantsColor;
    ctx.fillRect(-6, 0, 12, legLength);
    ctx.fillStyle = shoeColor;
    drawRoundedRect(-10, legLength, 24, 12, 6, shoeColor);
    ctx.restore();

    // --- Head & Face ---
    ctx.save();
    ctx.translate(0, -80); // Neck pivot
    
    // Golden Hair (Back)
    ctx.fillStyle = hairColor;
    drawCircle(0, 0, 20, hairColor);
    
    // Face
    drawCircle(2, 2, 16, skinColor);
    
    // Eye
    ctx.fillStyle = '#000';
    drawCircle(10, -2, 2.5, '#000');
    // Smile
    ctx.beginPath();
    ctx.arc(12, 4, 3, 0, Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // --- Graduation Cap ---
    ctx.fillStyle = gownColor;
    // Cap Base
    ctx.beginPath();
    ctx.ellipse(0, -14, 15, 6, 0, 0, Math.PI*2);
    ctx.fill();
    // Cap Top (Diamond)
    ctx.beginPath();
    ctx.moveTo(0, -26); // top
    ctx.lineTo(28, -18); // right
    ctx.lineTo(0, -10); // bottom
    ctx.lineTo(-28, -18); // left
    ctx.closePath();
    ctx.fill();
    
    // Cap Button
    drawCircle(0, -18, 3, stoleColor);

    // Tassel Physics
    ctx.translate(0, -18);
    ctx.rotate(tasselAngle);
    ctx.strokeStyle = stoleColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 12); // string
    ctx.stroke();
    drawCircle(16, 12, 3, stoleColor); // tassel end

    ctx.restore(); // end head

    // --- Front Arm (Left Arm) ---
    // If state is drawing/reaching, override Left Arm angle physically
    ctx.save();
    ctx.translate(0, -60);
    
    let currentLeftArmAngle = leftArmAngle;
    let handX = 0;
    let handY = armLength + 5;

    if (currentState === STATES.REACHING) {
        // Arm bends back to bag
        currentLeftArmAngle = -Math.PI / 3 * reachProgress;
    } else if (currentState === STATES.DRAWING) {
        // Arm points forward to draw
        currentLeftArmAngle = (Math.PI / 2) * drawProgress; // pointing at rect
    } else if (currentState === STATES.IDLE && drawProgress === 1) {
        // Holding diploma
        currentLeftArmAngle = Math.PI / 4; 
    }

    ctx.rotate(currentLeftArmAngle);

    // Sleeve
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, armLength, 8);
    ctx.fill();
    
    // Hand
    drawCircle(0, handY, 6, skinColor);

    // If IDLE and done drawing, show diploma in hand
    if (currentState === STATES.IDLE && drawProgress === 1) {
        ctx.save();
        ctx.translate(0, handY);
        ctx.rotate(-Math.PI/2);
        // Diploma roll
        ctx.fillStyle = '#fdfbf7';
        ctx.fillRect(-10, -5, 20, 10);
        ctx.strokeStyle = stoleColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-2, -5);
        ctx.lineTo(-2, 5);
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore(); // end front arm

    ctx.restore(); // end character root
}

// --- FRONT-FACING CHARACTER DRAWING ---
function drawFrontCharacter(x, y) {
    ctx.save();
    ctx.translate(x, y + bodyBob);
    ctx.scale(charScale, charScale);

    // --- Legs ---
    ctx.fillStyle = pantsColor;
    ctx.fillRect(-12, 0, 10, 60); // Left leg
    ctx.fillRect(2, 0, 10, 60);  // Right leg
    ctx.fillStyle = shoeColor;
    drawRoundedRect(-16, 60, 14, 12, 6, shoeColor); // Left shoe
    drawRoundedRect(-2, 60, 14, 12, 6, shoeColor);  // Right shoe

    // --- Body (Gown) ---
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.moveTo(-25, -70); // shoulder L
    ctx.lineTo(25, -70);  // shoulder R
    ctx.lineTo(30, 10);   // bottom R
    ctx.lineTo(-30, 10);  // bottom L
    ctx.closePath();
    ctx.fill();

    // --- Stole (Gold Accent) ---
    ctx.fillStyle = stoleColor;
    ctx.beginPath();
    // V neck
    ctx.moveTo(-10, -70);
    ctx.lineTo(10, -70);
    ctx.lineTo(15, -20);
    ctx.lineTo(8, -15);
    ctx.lineTo(0, -50);
    ctx.lineTo(-8, -15);
    ctx.lineTo(-15, -20);
    ctx.closePath();
    ctx.fill();

    // --- Left Arm (Holds Diploma) ---
    ctx.save();
    ctx.translate(-25, -60);
    // Sleeve
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, 55, 8);
    ctx.fill();
    // Hand
    drawCircle(0, 60, 6, skinColor);
    
    // Holding diploma
    ctx.save();
    ctx.translate(0, 60);
    ctx.rotate(Math.PI/6);
    ctx.fillStyle = '#fdfbf7';
    ctx.fillRect(-8, -4, 24, 8); // diploma body
    ctx.strokeStyle = stoleColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, 4);
    ctx.stroke();
    ctx.restore();
    
    ctx.restore();

    // --- Right Arm (Rested) ---
    ctx.save();
    ctx.translate(25, -60);
    ctx.fillStyle = gownColor;
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, 55, 8);
    ctx.fill();
    // Hand
    drawCircle(0, 60, 6, skinColor);
    ctx.restore();

    // --- Head & Face ---
    ctx.save();
    ctx.translate(0, -80); 
    
    // Golden Hair (Back/Base)
    ctx.fillStyle = hairColor;
    drawCircle(0, 0, 22, hairColor);
    
    // Face
    drawCircle(0, 2, 16, skinColor);
    
    // Eyes
    ctx.fillStyle = '#000';
    drawCircle(-5, -2, 2.5, '#000'); // Left Eye
    drawCircle(5, -2, 2.5, '#000');  // Right Eye
    
    // Smile
    ctx.beginPath();
    ctx.arc(0, 4, 4, 0, Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // --- Graduation Cap ---
    ctx.fillStyle = gownColor;
    // Cap Base
    ctx.beginPath();
    ctx.ellipse(0, -14, 18, 6, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Cap Top (Diamond)
    ctx.save();
    ctx.translate(0, -18);
    // Skewing vertically for perspective
    ctx.transform(1, 0, 0, 0.3, 0, 0); 
    ctx.beginPath();
    ctx.moveTo(0, -35); // top
    ctx.lineTo(35, 0); // right
    ctx.lineTo(0, 35); // bottom
    ctx.lineTo(-35, 0); // left
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // Cap Button
    drawCircle(0, -18, 3, stoleColor);

    // Tassel Physics
    ctx.translate(0, -18);
    ctx.rotate(tasselAngle * 0.5); // Sways half as much looking forward
    ctx.strokeStyle = stoleColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-12, 15); // string hanging leftish
    ctx.stroke();
    drawCircle(-12, 15, 3, stoleColor); // tassel end

    ctx.restore(); // end head

    ctx.restore(); // end character root
}

// --- MAGIC DRAWING EFFECT ---
function drawMagicRectangle() {
    if (currentState !== STATES.DRAWING) return;

    // We animate the borders of the rectangle based on drawProgress (0 to 1)
    const perimeter = (rectW * 2) + (rectH * 2);
    const currentDrawLength = perimeter * drawProgress;

    ctx.strokeStyle = '#f5b041'; // Gold
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f5b041';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(rectX, rectY); // start top-left

    let drawn = 0;
    
    // Top line
    if (currentDrawLength > drawn) {
        let segSpan = Math.min(rectW, currentDrawLength - drawn);
        ctx.lineTo(rectX + segSpan, rectY);
        drawn += rectW;
    }
    // Right line
    if (currentDrawLength > drawn) {
        let segSpan = Math.min(rectH, currentDrawLength - drawn);
        ctx.lineTo(rectX + rectW, rectY + segSpan);
        drawn += rectH;
    }
    // Bottom line
    if (currentDrawLength > drawn) {
        let segSpan = Math.min(rectW, currentDrawLength - drawn);
        ctx.lineTo(rectX + rectW - segSpan, rectY + rectH);
        drawn += rectW;
    }
    // Left line
    if (currentDrawLength > drawn) {
        let segSpan = Math.min(rectH, currentDrawLength - drawn);
        ctx.lineTo(rectX, rectY + rectH - segSpan);
    }
    
    ctx.stroke();
    
    // Particles trailing the draw
    if (drawProgress < 1) {
        // Calculate magic wand tip position
        let wandX = rectX;
        let wandY = rectY;
        if (drawn < rectW) {
            wandX = rectX + currentDrawLength;
        } else if (drawn < rectW + rectH) {
            wandX = rectX + rectW;
            wandY = rectY + (currentDrawLength - rectW);
        } else if (drawn < rectW * 2 + rectH) {
            wandX = rectX + rectW - (currentDrawLength - rectW - rectH);
            wandY = rectY + rectH;
        } else {
            wandX = rectX;
            wandY = rectY + rectH - (currentDrawLength - rectW * 2 - rectH);
        }

        drawCircle(wandX, wandY, 4, '#fff');
        ctx.shadowBlur = 0;
    }

    ctx.shadowBlur = 0; // reset
}

// --- BACKGROUND: UNIVERSITY & PATH ---
function drawBackground() {
    const buildingColor = '#0f172a'; // slightly lighter than pure space
    const pillarColor = '#1e293b';
    const accentGold = '#f5b041';
    
    // Base building rects
    const bWidth = 800;
    const bHeight = 400;
    const bX = targetCharX - bWidth / 2;
    const bY = groundY - bHeight;

    // Draw main building background block
    ctx.fillStyle = buildingColor;
    ctx.fillRect(bX, bY, bWidth, bHeight);

    // Draw central archway (Gate)
    const gateW = 220;
    const gateH = 250;
    const gateX = targetCharX - gateW / 2;
    const gateY = groundY - gateH;
    
    // Gate arch
    ctx.fillStyle = '#050811'; // extremely dark inside the gate
    ctx.beginPath();
    ctx.moveTo(gateX, groundY);
    ctx.lineTo(gateX, gateY + gateW / 2);
    ctx.arc(targetCharX, gateY + gateW / 2, gateW / 2, Math.PI, 0);
    ctx.lineTo(gateX + gateW, groundY);
    ctx.fill();

    // Inner gate details (metal bars concept)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    for(let i = gateX + 20; i < gateX + gateW; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, groundY);
        ctx.lineTo(i, gateY + gateW/2);
        ctx.stroke();
    }
    
    // Upper Frieze / Pediment
    const friezeY = bY + 40;
    ctx.fillStyle = pillarColor;
    ctx.fillRect(bX - 20, friezeY, bWidth + 40, 80);

    // Pillars
    const pWidth = 40;
    const pSpacing = (bWidth - (pWidth * 6)) / 5;
    ctx.fillStyle = pillarColor;
    for(let i = 0; i < 6; i++) {
        // Skip middle pillars to leave arch open
        if (i === 2 || i === 3) continue;
        const px = bX + i * (pWidth + pSpacing);
        ctx.fillRect(px, friezeY + 80, pWidth, bHeight - 120);
        // Pillar bases and caps
        ctx.fillStyle = '#334155';
        ctx.fillRect(px - 5, bY + bHeight - 15, pWidth + 10, 15); // Base
        ctx.fillRect(px - 5, friezeY + 80, pWidth + 10, 15);      // Cap
        ctx.fillStyle = pillarColor;
    }

    // Classic Triangular Roof
    ctx.fillStyle = pillarColor;
    ctx.beginPath();
    ctx.moveTo(targetCharX, bY - 80); // top point
    ctx.lineTo(bX - 40, friezeY);
    ctx.lineTo(bX + bWidth + 40, friezeY);
    ctx.fill();
    // Inner triangle
    ctx.fillStyle = buildingColor;
    ctx.beginPath();
    ctx.moveTo(targetCharX, bY - 55); 
    ctx.lineTo(bX + 10, friezeY - 10);
    ctx.lineTo(bX + bWidth - 10, friezeY - 10);
    ctx.fill();

    // TEXT: Riphah International College
    ctx.fillStyle = accentGold;
    ctx.font = 'bold 28px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('RIPHAH INTERNATIONAL COLLEGE', targetCharX, friezeY + 40);

    // Ground line / Path - BEIGE
    const beigeColor = '#e3dac9'; 
    ctx.fillStyle = beigeColor;
    ctx.fillRect(0, groundY, width, height - groundY);
    
    // Sidewalk edge highlight
    ctx.fillStyle = accentGold;
    ctx.fillRect(0, groundY, width, 4);

    // Pathway perspective lines on ground
    ctx.strokeStyle = '#d4c7b1'; // slightly darker beige for contrast
    ctx.lineWidth = 4;
    for(let i = bgOffset % 100; i < width; i += 100) {
        ctx.beginPath();
        // Parallel vertical lines for sidewalk slabs
        ctx.moveTo(i, groundY + 4);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
}

// Background panning offset
let bgOffset = 0;

// --- UPDATE LOGIC ---
function update() {
    globalTime += 0.016; // Approx 60fps dt

    switch (currentState) {
        case STATES.WALKING:
            charX += walkSpeed;
            // Background moves slightly to simulate parallax path
            bgOffset -= walkSpeed * 0.5;
            walkCycle += 0.1;
            
            // Kinematics calculations
            leftLegAngle = Math.sin(walkCycle) * 0.5;
            rightLegAngle = Math.sin(walkCycle + Math.PI) * 0.5;
            leftArmAngle = Math.sin(walkCycle + Math.PI) * 0.4; // opposite of left leg
            rightArmAngle = Math.sin(walkCycle) * 0.4;
            bodyBob = Math.abs(Math.sin(walkCycle * 2)) * -5;

            // Simple pendulum physics for tassel
            const accel = Math.cos(walkCycle) * -0.05;
            tasselVel += accel;
            tasselVel *= 0.9; // damp
            tasselAngle += tasselVel;

            // Have we reached the center destination?
            if (charX >= targetCharX) {
                currentState = STATES.STOPPING;
            }
            break;

        case STATES.STOPPING:
            // Lerp limbs back to neutral
            stopProgress += 0.05;
            leftLegAngle *= 0.8;
            rightLegAngle *= 0.8;
            leftArmAngle *= 0.8;
            rightArmAngle *= 0.8;
            bodyBob *= 0.8;
            
            tasselAngle *= 0.95; // settle tassel

            if (stopProgress >= 1) {
                leftLegAngle = rightLegAngle = leftArmAngle = rightArmAngle = bodyBob = 0;
                currentState = STATES.REACHING;
            }
            break;

        case STATES.REACHING:
            // Reach for the bag
            reachProgress += 0.03;
            if (reachProgress >= 1) {
                reachProgress = 1;
                // Wait briefly then start drawing
                setTimeout(() => {
                    if(currentState === STATES.REACHING) currentState = STATES.DRAWING;
                }, 300);
            }
            break;

        case STATES.DRAWING:
            // Draw the magic rectangle
            drawProgress += 0.015;
            
            // Arm tracks the drawing motion roughly
            if (drawProgress >= 1) {
                drawProgress = 1;
                currentState = STATES.IDLE;
                
                // Trigger HTML Login Card!
                setTimeout(() => {
                    loginContainer.classList.add('visible');
                }, 100);
            }
            break;

        case STATES.IDLE:
            idleTime += 0.05;
            // Idle breathing animation
            bodyBob = Math.sin(idleTime) * -2;
            leftLegAngle = rightLegAngle = rightArmAngle = 0;
            // Tassel sways gently in air conditioning
            tasselAngle = Math.sin(idleTime * 0.5) * 0.1;
            break;
    }
}

// --- MAIN LOOP ---
function loop() {
    // Clear
    ctx.clearRect(0, 0, width, height);

    update();
    
    // Draw background (sky is handled by CSS, we draw building + path)
    drawBackground();
    
    // Draw magic rectangle if in progress or done (until HTML covers it)
    if (currentState === STATES.DRAWING) {
        drawMagicRectangle();
    }
    
    if (currentState === STATES.IDLE) {
        // Draw front-facing character when idle and login is visible
        drawFrontCharacter(charX, groundY);
    } else {
        // Draw side-profile character otherwise
        drawCharacter(charX, groundY);
    }

    requestAnimationFrame(loop);
}

// Start
requestAnimationFrame(loop);

// --- DOM INTERACTIONS ---
document.addEventListener('DOMContentLoaded', () => {
    const togglePwdBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password-input');
    
    if (togglePwdBtn && passwordInput) {
        togglePwdBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePwdBtn.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
            togglePwdBtn.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
        });
    }
});
