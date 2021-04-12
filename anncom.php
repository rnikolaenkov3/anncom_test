<?php
/*
 * Plugin Name: Тестовый плагин для anncom
 * Description: Тестовый плагин для anncom
 * Author:      Николаенков Роман
 * Version:     0.0.1
 */

function anncome_handler($attr, $content=null, $code="") {
    try {
        if (!isset($attr['url'])) {
            throw new DomainException('Не указан url');
        }

        wp_enqueue_script('my-script', plugins_url('/js/anncom.js', __FILE__), [], '1.0', true);

        $html = '<div class="anncom-container"><ul class="anncom-wrap" data-url="' . $attr['url'] . '"></ul>';
        $html = $html . '<button type="button" class="anncom-container__clear">Очистить</button>';
        $html = $html . '<button type="button" class="anncom-container__add">Получить</button></div>';

        return $html;
    } catch (Exception $e) {
        return $e->getMessage();
    }
}


add_shortcode('anncom-ext-url', 'anncome_handler');




