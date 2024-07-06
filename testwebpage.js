const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    const radii = circle.querySelectorAll('.radius:not(.non-draggable)'); // Select all radii except the non-draggable one
    radii.forEach(radius => {
        let isDragging = false;
        let initialAngle;
        let initialPosition;

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

            // Calculate initial angle on first touch/mouse down
            if (!initialPosition) {
                initialPosition = {
                    x: event.clientX || event.touches[0].clientX,
                    y: event.clientY || event.touches[0].clientY
                };
                initialAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            }

            // Calculate current angle based on initial angle and current touch/mouse position
            const currentAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            const angle = currentAngle - initialAngle;

            radius.style.transform = `translateX(-50%) rotate(${angle}rad)`;
            radius.style.transformOrigin = 'bottom';

            // Update arrowhead (pseudo-element) rotation
            radius.style.setProperty('--angle', angle + 'rad');
        }
    });
});
