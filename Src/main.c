#include <stdio.h>
#include <pico/stdio.h>
#include <pico/stdlib.h>
#include <pico/multicore.h>

#include <pico/cyw43_arch.h>

#include <hardware/gpio.h>
#include <hardware/adc.h>

#include "servo.h"
#include "distance.h"




#define BLINK_LED 16

Servo_t base;
Servo_t holder;
Servo_t arm;
Servo_t hand;

void all_servo_Init(){
    base.GPIO   = 20;
    holder.GPIO = 18;
    arm.GPIO    = 19;
    hand.GPIO   = 17;

    // hand.min = 0;
    // hand.max = 90;

    adc_init();
    Servo_init(&base);
    Servo_init(&holder);
    Servo_init(&arm);
    Servo_init(&hand);
}

void blinking(){
    gpio_init(BLINK_LED);
    gpio_set_dir(BLINK_LED, GPIO_OUT);

    while(true){
        gpio_put(BLINK_LED, !gpio_get(BLINK_LED));
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, !cyw43_arch_gpio_get(CYW43_WL_GPIO_LED_PIN));
        sleep_ms(250);
    }
}


int main(){
    stdio_init_all();

    if(cyw43_arch_init()){
        printf("WiFi init failed!\n");
        return -1;
    }
    sleep_ms(5);
    multicore_launch_core1(blinking);

    // adc_gpio_init(DISTANCE_PIN);
    adc_init();
    all_servo_Init();

    // Servo_setAngle(&hand, 20);
    // Servo_setAngle(&arm, 140);
    Servo_setAngle(&base, 90);
    // Servo_setAngle(&holder, 70);

    // volatile int distance;

    int readAngle;
    while(1){

        sleep_ms(250);
    }
    return 0;
}
