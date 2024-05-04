<?php

/**
 * Plugin Name: Carrusel
 * Plugin URI: https://github.com/ai-takeuchi/carrusel
 * Description: Simple carousel plugin for WordPress
 * Version: 1.0
 * Author: Ai Takeuchi
 * Author URI: https://memo.silverpigeon.jp/
 * License: MIT
 */

namespace carrusel_shortcode;

\add_action('wp_enqueue_scripts',  function () {
    \wp_enqueue_style('carrusel', \plugin_dir_url(__FILE__) . 'css/carrusel.css', array(), '1.0', 'all');
    \wp_enqueue_script('carrusel', \plugin_dir_url(__FILE__) . 'js/carrusel.js', array(), '1.0', true);
}, 100);

/**
 * e.g.
 * [carrusel post_type='front-carrusel' id="carrusel"]
 */
\add_shortcode('carrusel', function ($atts, $content, $tag) {
    // Initialize $atts object default value
    $atts = \shortcode_atts(array(
        'post_type' => 'post',
        'id' => 'carrusel', // カルーセルのID // ID of the carousel
        'wait_duration' => 3000,  // 待機時間（ミリ秒） // Wait duration (milliseconds)
        'animation_duration' => 300,  // アニメーションの時間（ミリ秒） // Animation duration (milliseconds)
        'show_indicator' => 'true',  // インジケーターを表示するかどうか // Whether to show indicators
        'enable_indicator_event' => 'true',  // インジケーターのイベントを有効にするかどうか // Whether to enable indicator events
        'indicator_event_type_quick' => 'false',  // インジケーターのイベントの種類を Quick にするかどうか // Whether to enable indicator events type is quick motion
        'show_change_content_button' => 'true',  // コンテンツ変更ボタンを表示するかどうか // Whether to show content change buttons
    ), $atts);

    \add_action('wp_footer', function () use ($atts) {
        echo '<script>carrusel({
            id:"' . $atts['id'] . '",
            waitDuration:' . $atts['wait_duration'] . ',
            animationDuration:' . $atts['animation_duration'] . ',
            showIndicator:' . $atts['show_indicator'] . ',
            enableIndicatorEvent:' . $atts['enable_indicator_event'] . ',
            indicatorEventTypeQuick:' . $atts['indicator_event_type_quick'] . ',
            showChangeContentButton:' . $atts['show_change_content_button'] . ',
        });</script>';
    }, 101);

    return htmlContent($atts);
});

function htmlContent($atts) {
    $html = '';

    // The Query.
    $args = array(
        'post_type' => $atts['post_type'], // 'front-carrusel', // 'post',
        'posts_per_page' => -1,  // 全ての投稿を取得
        'no_found_rows' => true, // ページャーを使う時は false
    );

    $the_query = new \WP_Query($args);

    // The Loop.
    if ($the_query->have_posts()) {
        $html .= '<div id="' . $atts['id'] . '" class="carrusel">
        <div class="sliders-wrap">
            <ul class="sliders">';
        while ($the_query->have_posts()) {
            $the_query->the_post();
            $content = apply_filters('the_content', \get_the_content());
            $html .= '<li>
                <div class="content">
                    <div class="post-title">' . \esc_html(\get_the_title()) . '</div>
                    <div class="post-content">' . $content . '</div>
                </div>
            </li>';
        }
        $html .= '</ul>
            <div class="btn-container">
                <img src="' . \plugin_dir_url(__FILE__) . 'img/prev.svg" alt="Previous" class="btn prevBtn">
                <div></div>
                <img src="' . \plugin_dir_url(__FILE__) . 'img/next.svg" alt="Next" class="btn nextBtn">
            </div>
        </div><!-- wrap -->
        <div class="indicators"></div>
    </div><!-- id -->';
    } else {
        $html .= \esc_html('Sorry, no posts matched your criteria.');
    }
    // Restore original Post Data.
    \wp_reset_postdata();

    return $html;
}
