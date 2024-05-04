# Carousel Function

This JavaScript function is designed to control a carousel (slider) for use in websites or web applications. It includes various features such as flexible parameter settings and handling of mouse events.

## Usage

1. Set up the slider in your HTML file

```html
<div id="carrusel">
    <ul class="sliders">
        <li>Slide 1</li>
        <li>Slide 2</li>
        <li>Slide 3</li>
        <!-- Additional slides -->
    </ul>

    <div class="btn-container">
        <button class="prevBtn">Previous</button>
        <button class="nextBtn">Next</button>
    </div>

    <div class="indicators"></div>
</div>
```

2. Call the function in your JavaScript file

```javascript
// Set up the parameters object
const params = {
    id: 'carrusel',  // ID of the carousel
    waitDuration: 3000,  // Wait duration (milliseconds)
    animationDuration: 300,  // Animation duration (milliseconds)
    showIndicator: true,  // Whether to show indicators
    enableIndicatorEvent: true,  // Whether to enable indicator events
    indicatorEventTypeQuick: false,  // Whether to enable indicator events type is quick motion
    showChangeContentButton: true,  // Whether to show content change buttons
};

// Call the function
carrusel(params);
```

## Parameters

- id: ID of the HTML element for the carousel
- waitDuration: Time to wait for auto-slide transition (milliseconds)
- animationDuration: Duration of slide animation (milliseconds)
- showIndicator: Whether to show indicators
- enableIndicatorEvent: Whether to enable indicator click events
- indicatorEventTypeQuick: Whether to enable indicator events type as quick motion
- showChangeContentButton: Whether to show content change buttons

## License

Available under the MIT License. See LICENSE for more information.
