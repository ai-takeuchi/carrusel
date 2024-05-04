=== Carrusel ===
Contributors: Ai Takeuchi
Tags: carousel, slider, shortcode
Requires at least: 4.0
Tested up to: 5.9
Stable tag: 1.0
License: MIT

Simple carousel plugin for WordPress.

== Description ==

Carrusel is a simple carousel plugin for WordPress that allows you to easily create carousels or sliders using a shortcode.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/carrusel` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Usage ==

To create a carousel, use the `[carrusel]` shortcode with the following optional attributes:

- `post_type`: Specify the post type of the items to be displayed in the carousel. Default is `'post'`.
- `id`: ID of the carousel. Default is `'carrusel'`.
- `wait_duration`: Wait duration in milliseconds before transitioning to the next slide. Default is `3000`.
- `animation_duration`: Animation duration in milliseconds for slide transition. Default is `300`.
- `show_indicator`: Whether to display indicators for each slide. Default is `'true'`.
- `enable_indicator_event`: Whether to enable indicator events. Default is `'true'`.
- `indicator_event_type_quick`: Whether to enable quick motion for indicator events. Default is `'false'`.
- `show_change_content_button`: Whether to show content change buttons. Default is `'true'`.

Example:

[carrusel post_type='front-carrusel' id="carrusel"]

== Changelog ==

= 1.0 =
* Initial release.

== Frequently Asked Questions ==

= How do I change the settings of the carousel? =
You can modify the shortcode attributes to customize the carousel's behavior and appearance.

== Screenshots ==

1. Screenshot of the Carrusel plugin in action.

== Upgrade Notice ==

= 1.0 =
Initial release.

