#include "servo.h"
#include <stdio.h>
#include <hardware/clocks.h>


// Servo need 50Hz, f_sys = 125HMz
#define PRESCALER   100
#define TOP       24999

#define LEVEL_MIN 600
#define LEVEL_MAX 3200

#define ADC_MAX 3850
#define ADC_MIN 260


void Servo_init(Servo_t *servo){
    // static uint PWM_STATE = 0;
    static uint ADC_STATE = 0;
    servo->start = true;

    if (servo->step == 0)
        servo->step = 1;

    // PWM INIT
    gpio_set_function(servo->GPIO, GPIO_FUNC_PWM);
    uint slice_num = pwm_gpio_to_slice_num(servo->GPIO);

    pwm_config config = pwm_get_default_config();

    config.div = PRESCALER << PWM_CH0_DIV_INT_LSB;
    config.top = TOP;

    pwm_init(slice_num, &config, true);

    if (servo->ADC_PIN >= 26 && servo->ADC_PIN <= 28){
        adc_gpio_init(servo->ADC_PIN);
        servo->current_angle = Servo_readAngle(servo);
    } else {
        servo->current_angle = 0;
    }
}


void Servo_setAngle(Servo_t *servo, uint angle){
    uint16_t level = LEVEL_MIN + angle * ((LEVEL_MAX - LEVEL_MIN) / 180);
    servo->current_angle = angle;
    pwm_set_gpio_level(servo->GPIO, level);
}


int Servo_readAngle(Servo_t *servo){
    adc_select_input(servo->ADC_PIN - 26);
    int value = adc_read();

    value = ((value - ADC_MIN) * 180) / (ADC_MAX - ADC_MIN);
    if (servo->flipRead)
        value = 180 - value;
    return value;
}


void Servo_goto(Servo_t *servo){
    uint small_step = servo->step;

    if (servo->current_angle != servo->angle){
        if (abs(servo->angle - servo->current_angle) < servo->step){
            small_step = abs(servo->angle - servo->current_angle);
        }
        if(servo->current_angle > servo->angle){
            servo->current_angle -= small_step;
        } else {
            servo->current_angle += small_step;
        }

        Servo_setAngle(servo, servo->current_angle);
    }
}

void Servo_start(Servo_t *servo){
    uint slice = pwm_gpio_to_slice_num(servo->GPIO);
    pwm_set_enabled(slice, true);
}

void Servo_stop(Servo_t *servo){
    uint slice = pwm_gpio_to_slice_num(servo->GPIO);
    pwm_set_enabled(slice, false);
}