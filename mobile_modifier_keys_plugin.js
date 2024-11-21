// Mobile Modifier Keys Plugin for Blockbench
(function() {
    let id = 'mobile_modifier_keys_plugin';
    let name = 'Mobile Modifier Keys';
    let icon = 'touch_app';

    let ctrlButton, shiftButton, altButton;
    let modifierState = {
        ctrl: false,
        shift: false,
        alt: false
    };
    let originalIsPressed;

    Plugin.register(id, {
        title: name,
        icon: icon,
        author: 'Your Name', // Replace with your name
        description: 'Adds modifier keys (Ctrl, Shift, Alt) as buttons in the modeling view for mobile users.',
        version: '1.0.0',
        variant: 'both',
        onload() {
            // Create Ctrl button
            ctrlButton = new Action('mobile_ctrl', {
                name: 'Ctrl (Strg)',
                description: 'Toggle Ctrl modifier',
                icon: 'control_point',
                click: function() {
                    modifierState.ctrl = !modifierState.ctrl;
                    this.icon = modifierState.ctrl ? 'control_point_duplicate' : 'control_point';
                    this.update();
                }
            });

            // Create Shift button
            shiftButton = new Action('mobile_shift', {
                name: 'Shift',
                description: 'Toggle Shift modifier',
                icon: 'arrow_upward',
                click: function() {
                    modifierState.shift = !modifierState.shift;
                    this.icon = modifierState.shift ? 'arrow_circle_up' : 'arrow_upward';
                    this.update();
                }
            });

            // Create Alt button
            altButton = new Action('mobile_alt', {
                name: 'Alt',
                description: 'Toggle Alt modifier',
                icon: 'format_color_fill',
                click: function() {
                    modifierState.alt = !modifierState.alt;
                    this.icon = modifierState.alt ? 'format_color_reset' : 'format_color_fill';
                    this.update();
                }
            });

            // Add buttons to the toolbar
            Toolbar.addAction(ctrlButton, 'tools');
            Toolbar.addAction(shiftButton, 'tools');
            Toolbar.addAction(altButton, 'tools');

            // Override the Keybinds.isPressed function
            originalIsPressed = Keybinds.isPressed;
            Keybinds.isPressed = function(key) {
                if (key === 'ctrl') {
                    return modifierState.ctrl || originalIsPressed('ctrl');
                }
                if (key === 'shift') {
                    return modifierState.shift || originalIsPressed('shift');
                }
                if (key === 'alt') {
                    return modifierState.alt || originalIsPressed('alt');
                }
                return originalIsPressed(key);
            };
        },
        onunload() {
            // Remove buttons from the toolbar
            ctrlButton.delete();
            shiftButton.delete();
            altButton.delete();

            // Restore the original Keybinds.isPressed function
            Keybinds.isPressed = originalIsPressed;
        }
    });
})();
