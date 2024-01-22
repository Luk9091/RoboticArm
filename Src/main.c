#include <stdio.h>
#include <pico/stdio.h>
#include <pico/stdlib.h>
#include <pico/multicore.h>

#include <pico/cyw43_arch.h>
#include <lwip/apps/httpd.h>
#include "utilities.h"
#include "ssi.h"
#include "cgi.h"

#include "OC.h"
#include <hardware/gpio.h>
#include <hardware/adc.h>

#include "servo.h"

#include "PASS.h"
#ifndef SSID
#define SSID        // Enter yours SSID
#define PASS        // Enter yours PASSWORD
#endif

#define BLINK_LED 16


void all_servo_Init(Servo_t *arm, Servo_t *base, Servo_t *rotor, Servo_t *hand){
    static bool is_init = false;
    if (is_init){
        printf("Serve are init\n");
        return;
    }
    is_init = true;

    arm->GPIO   = SERVO_ARM_PIN;
    base->GPIO  = SERVO_BASE_PIN;
    rotor->GPIO = SERVO_ROTOR_PIN;
    hand->GPIO  = SERVO_HAND_PIN;

    adc_init();
    Servo_init(arm);
    Servo_init(base);
    Servo_init(rotor);
    Servo_init(hand);

    arm->angle = 180-45;
    base->angle = 90;
    rotor->angle = 90;
    hand->angle = 45;
}


err_t wifi_init(Servo_t *arm, Servo_t *base, Servo_t *rotor, Servo_t *hand){
    static bool is_init = false;
    if (is_init){
        printf("WiFi module is init\n");
        return ERR_OK;
    }
    is_init= true;

    if(cyw43_arch_init_with_country(CYW43_COUNTRY_POLAND)){
        printf("WiFi init failed!\n");
        return ERR_CONN;
    }
    cyw43_arch_enable_sta_mode();
    if(cyw43_arch_wifi_connect_timeout_ms(SSID, PASS, CYW43_AUTH_WPA2_AES_PSK, 30000) != PICO_OK){
        printf("Cannot connected to %s\n", SSID);
        return ERR_CONN;
    }
    get_IP();    

    httpd_init();
    

    ssi_init(arm, base, hand, rotor);
    cgi_init(arm, base, hand, rotor);
    printf("Open http server\n");
    return ERR_OK;
}




int main(){
    Servo_t arm;
    Servo_t base;
    Servo_t rotor;
    Servo_t hand;

    stdio_init_all();
    all_servo_Init(&arm, &base, &rotor, &hand);
    OC_init();
    
    if (wifi_init(&arm, &base, &rotor, &hand) != ERR_OK){
        cyw43_arch_deinit();
        return -1;
    }

    gpio_init(BLINK_LED);
    gpio_set_dir(BLINK_LED, GPIO_OUT);

    uint oc_check_value = 0;
    

    cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, !cyw43_arch_gpio_get(CYW43_WL_GPIO_LED_PIN));
    sleep_ms(250);
    while(1){
        Servo_goto(&arm);
        Servo_goto(&base);
        Servo_goto(&rotor);
        Servo_goto(&hand);
        gpio_put(BLINK_LED, !gpio_get(BLINK_LED));
        sleep_ms(10);

        oc_check_value = OC_check();
        if(oc_check_value & OC_ARM_NUM)   OC_run_timer(&arm, OC_ARM_NUM);     else if (arm.start)   arm.backUp   = arm.current_angle;
        if(oc_check_value & OC_BASE_NUM)  OC_run_timer(&base, OC_BASE_NUM);   else if (base.start)  base.backUp  = base.current_angle;
        if(oc_check_value & OC_ROTOR_NUM) OC_run_timer(&rotor, OC_ROTOR_NUM); else if (rotor.start) rotor.backUp = rotor.current_angle;
        
        if(oc_check_value & OC_HAND_NUM) hand.angle = hand.backUp; else if (hand.start) hand.backUp = hand.current_angle;
    }

    return 0;
}
