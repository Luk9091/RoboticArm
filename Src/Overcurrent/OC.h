#ifndef __OVER_CURRENT__H
#define __OVER_CURRENT__H

#include <stdlib.h>
#include <stdio.h>
#include <pico/stdlib.h>
#include <pico/stdio.h>
#include <hardware/gpio.h>
#include <hardware/timer.h>
#include "servo.h"
#include "ssi.h"

#define OC_ARM_NUM       2
#define OC_BASE_NUM      1
#define OC_ROTOR_NUM     8
#define OC_HAND_NUM      4

#define OC_ARM_PIN      11
#define OC_BASE_PIN     10
#define OC_ROTOR_PIN    13
#define OC_HAND_PIN     12


void OC_init();
static inline uint OC_check(){
    return (gpio_get_all() & (1 << OC_ARM_PIN | 1 << OC_BASE_PIN | 1 << OC_ROTOR_PIN | 1 << OC_HAND_PIN)) >> OC_BASE_PIN ;
}
void OC_run_timer(Servo_t *servo, uint num);


#endif
