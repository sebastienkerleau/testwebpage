const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    const radii = circle.querySelectorAll('.radius');
    radii.forEach(radius => {
        let isDragging = false;
        let initialAngle = 0; // Initial angle when vertical
        let initialPosition;

        // Reference to the angle display element
        const angleDisplay = document.getElementById('angleDisplay');

        // Mouse event listeners
        radius.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', dragRadius);
        document.addEventListener('mouseup', stopDragging);

        // Touch event listeners
        radius.addEventListener('touchstart', startDragging);
        document.addEventListener('touchmove', dragRadius);
        document.addEventListener('touchend', stopDragging);

        function startDragging(e) {
            isDragging = true;
            e.preventDefault(); // Prevent default touch behavior (like scrolling)

            // Reset initial position and angle
            initialPosition = {
                x: e.clientX || e.touches[0].clientX,
                y: e.clientY || e.touches[0].clientY
            };
            initialAngle = Math.atan2(initialPosition.y - circle.getBoundingClientRect().top - circle.clientHeight / 2,
                                      initialPosition.x - circle.getBoundingClientRect().left - circle.clientWidth / 2);
        }

        function dragRadius(e) {
            if (isDragging) {
                let event;
                if (e.type === 'touchmove') {
                    event = e.touches[0]; // For touch events, get the first touch point
                } else {
                    event = e; // For mouse events, use the event directly
                }

                rotateRadius(event);
            }
        }

        function stopDragging() {
            isDragging = false;
        }

        function rotateRadius(event) {
            const rect = circle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentX = event.clientX || event.touches[0].clientX;
            const currentY = event.clientY || event.touches[0].clientY;

            // Calculate current angle
            const currentAngle = Math.atan2(currentY - centerY, currentX - centerX);
            const angleDifference = currentAngle - initialAngle;

            // Update the rotation of the radius
            radius.style.transform = `translateX(-50%) rotate(${angleDifference}rad)`;
            radius.style.transformOrigin = 'bottom';

            // Update angle display
            angleDisplay.textContent = `Angle: ${angleDifference.toFixed(2)} radians`;

            // You can now use angleDifference as the angle between the initial and current position
            console.log(`Angle difference: ${angleDifference * (180 / Math.PI)} degrees`);
        }
    });
});
